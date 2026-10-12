import type { RequestHandler } from "express";
import ms, { type StringValue } from "ms";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../config/constants.js";
import { env } from "../config/env.js";
import * as authService from "../services/auth.js";
import { ApiError } from "../utils/api-error.js";
import { loginSchema, registerSchema } from "../validators/auth.js";

function authCookieOptions(maxAgeMs: number): {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  maxAge: number;
  path: string;
} {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAgeMs,
    path: "/",
  };
}

function cookieMaxAge(expiresIn: string): number | undefined {
  const v = ms(expiresIn as StringValue);
  return Number.isFinite(v) ? v : undefined;
}

function setAuthCookies(
  res: Parameters<RequestHandler>[1],
  accessToken: string,
  refreshToken: string,
): void {
  const accessAge = cookieMaxAge(env.JWT_ACCESS_EXPIRES_IN);
  const refreshAge = cookieMaxAge(env.JWT_REFRESH_EXPIRES_IN);

  res.cookie(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    authCookieOptions(accessAge ?? 900_000),
  );
  res.cookie(
    REFRESH_TOKEN_COOKIE,
    refreshToken,
    authCookieOptions(refreshAge ?? 604_800_000),
  );
}

function clearAuthCookies(res: Parameters<RequestHandler>[1]): void {
  res.clearCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
  res.clearCookie(REFRESH_TOKEN_COOKIE, { path: "/" });
}

/** POST /auth/register — daftar user baru, langsung login (cookie terpasang). */
export const register: RequestHandler = async (req, res) => {
  const parsed = registerSchema.parse(req.body);
  const { phone, dob, gender, ...rest } = parsed;

  const result = await authService.register({
    ...rest,
    ...(phone !== undefined ? { phone } : {}),
    ...(dob !== undefined ? { dob } : {}),
    ...(gender !== undefined ? { gender } : {}),
  });

  setAuthCookies(res, result.accessToken, result.refreshToken);
  res.status(201).json({ success: true, data: { user: result.user } });
};

/** POST /auth/login — autentikasi, set cookie token. */
export const login: RequestHandler = async (req, res) => {
  const input = loginSchema.parse(req.body);
  const result = await authService.login(input);

  setAuthCookies(res, result.accessToken, result.refreshToken);
  res.json({ success: true, data: { user: result.user } });
};

/** POST /auth/refresh — tukar refresh token (cookie) → access token baru. */
export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined;
  if (!token) {
    throw ApiError.unauthenticated("Refresh token tidak ditemukan");
  }

  const { accessToken } = await authService.refresh(token);
  res.cookie(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    authCookieOptions(cookieMaxAge(env.JWT_ACCESS_EXPIRES_IN) ?? 900_000),
  );
  res.json({ success: true, data: { message: "Access token diperbarui" } });
};

/** POST /auth/logout — hapus cookie token (stateless; tanpa blacklist). */
export const logout: RequestHandler = (_req, res) => {
  clearAuthCookies(res);
  res.json({ success: true, data: { message: "Berhasil logout" } });
};
