import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { env } from "../config/env.js";
import { users, type NewUser, type User } from "../db/auth/users.js";
import { db } from "../db/index.js";
import type { AuthUser, JwtAccessPayload } from "../types/auth.js";
import { ApiError } from "../utils/api-error.js";

/** Cost factor bcrypt — 12 sudah aman untuk kasus kita. */
const SALT_ROUNDS = 12;

/** User aman dikirim ke client — tanpa `password_hash`. */
export type SafeUser = Omit<User, "passwordHash">;

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  dob?: Date;
  gender?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

// ---------------------------------------------------------------------------
// Token
// ---------------------------------------------------------------------------

/**
 * `env.*_EXPIRES_IN` bertipe string biasa hasil Zod; jsonwebtoken memakai
 * branded `StringValue` (dari paket `ms`). Cast objek options di sini — env
 * sudah divalidasi Zod jadi nilainya sah.
 */
function signToken(user: AuthUser, secret: string, expiresIn: string): string {
  const payload: JwtAccessPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

function toAuthUser(user: User): AuthUser {
  return { id: user.id, email: user.email, role: user.role };
}

function signAccessToken(user: AuthUser): string {
  return signToken(user, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN);
}

function signRefreshToken(user: AuthUser): string {
  return signToken(user, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN);
}

function stripPassword(user: User): SafeUser {
  const { passwordHash: _ph, ...rest } = user;
  return rest;
}

function buildAuthResult(user: User): AuthResult {
  const authUser = toAuthUser(user);
  return {
    user: stripPassword(user),
    accessToken: signAccessToken(authUser),
    refreshToken: signRefreshToken(authUser),
  };
}

// ---------------------------------------------------------------------------
// Operasi
// ---------------------------------------------------------------------------

/** Daftar user baru. Email dinormalkan lowercase; unik di DB. */
export async function register(input: RegisterInput): Promise<AuthResult> {
  const email = input.email.toLowerCase();

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existing) {
    throw ApiError.conflict("Email sudah terdaftar");
  }

  const passwordHash = await hash(input.password, SALT_ROUNDS);
  const values: NewUser = {
    email,
    passwordHash,
    fullName: input.fullName,
    ...(input.phone !== undefined ? { phone: input.phone } : {}),
    ...(input.dob !== undefined ? { dob: input.dob } : {}),
    ...(input.gender !== undefined ? { gender: input.gender } : {}),
  };

  const [created] = await db.insert(users).values(values).returning();
  if (!created) {
    throw new ApiError("INTERNAL_ERROR", "Gagal membuat user");
  }

  return buildAuthResult(created);
}

/**
 * Login. Pesan "email atau password salah" disengaja sama untuk kasus user
 * tidak ada maupun password keliru — cegah user-enumeration.
 */
export async function login(input: LoginInput): Promise<AuthResult> {
  const user = await db.query.users.findFirst({
    where: eq(users.email, input.email.toLowerCase()),
  });
  const invalid = ApiError.unauthenticated("Email atau password salah");
  if (!user) {
    throw invalid;
  }

  const valid = await compare(input.password, user.passwordHash);
  if (!valid) {
    throw invalid;
  }

  if (!user.isActive) {
    throw ApiError.forbidden("Akun dinonaktifkan");
  }

  return buildAuthResult(user);
}

/** Tukar refresh token → access token baru. Refresh token tetap dipakai. */
export async function refresh(
  refreshToken: string,
): Promise<{ accessToken: string }> {
  const payload = verifyRefreshToken(refreshToken);

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.sub),
  });
  if (!user) {
    throw ApiError.unauthenticated("User tidak ditemukan");
  }
  if (!user.isActive) {
    throw ApiError.forbidden("Akun dinonaktifkan");
  }

  return { accessToken: signAccessToken(toAuthUser(user)) };
}

export function verifyRefreshToken(token: string): JwtAccessPayload {
  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
  } catch (err) {
    const reason =
      err instanceof jwt.TokenExpiredError
        ? "Token refresh kedaluwarsa"
        : "Token refresh tidak valid";
    throw ApiError.unauthenticated(reason);
  }
  if (typeof decoded === "string") {
    throw ApiError.unauthenticated("Token refresh tidak valid");
  }
  const { sub, email, role } = decoded as Partial<JwtAccessPayload>;
  if (!sub || !email || !role) {
    throw ApiError.unauthenticated("Payload token refresh tidak lengkap");
  }
  return { sub, email, role };
}
