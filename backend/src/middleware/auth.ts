import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_COOKIE } from "../config/constants.js";
import { env } from "../config/env.js";
import type { JwtAccessPayload, UserRole } from "../types/auth.js";
import { ApiError } from "../utils/api-error.js";

export function verifyAccessToken(token: string): JwtAccessPayload {
  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch (err) {
    const reason =
      err instanceof jwt.TokenExpiredError
        ? "Token sudah kedaluwarsa"
        : "Token tidak valid atau kedaluwarsa";
    throw ApiError.unauthenticated(reason);
  }
  if (typeof decoded === "string") {
    throw ApiError.unauthenticated("Token tidak valid");
  }
  const { sub, email, role } = decoded as Partial<JwtAccessPayload>;
  if (!sub || !email || !role) {
    throw ApiError.unauthenticated("Payload token tidak lengkap");
  }
  return { sub, email, role };
}

export const authenticate: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.[ACCESS_TOKEN_COOKIE] as string | undefined;
  if (!token) {
    next(ApiError.unauthenticated());
    return;
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch (err) {
    next(err instanceof ApiError ? err : ApiError.unauthenticated());
  }
};

export function requireRole(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      next(ApiError.unauthenticated());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(ApiError.forbidden());
      return;
    }
    next();
  };
}
