import { env } from "../config/env.js";

type Level = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};
const MIN_LEVEL: Level = env.NODE_ENV === "production" ? "info" : "debug";

function format(
  level: Level,
  msg: string,
  meta?: Record<string, unknown>,
): string {
  if (env.NODE_ENV === "production") {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message: msg,
      ...meta,
    });
  }
  const suffix = meta ? ` ${JSON.stringify(meta)}` : "";
  return `[${level.toUpperCase()}] ${msg}${suffix}`;
}

function shouldLog(level: Level): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[MIN_LEVEL];
}

export const logger = {
  debug(msg: string, meta?: Record<string, unknown>): void {
    if (shouldLog("debug")) console.debug(format("debug", msg, meta));
  },
  info(msg: string, meta?: Record<string, unknown>): void {
    if (shouldLog("info")) console.log(format("info", msg, meta));
  },
  warn(msg: string, meta?: Record<string, unknown>): void {
    if (shouldLog("warn")) console.warn(format("warn", msg, meta));
  },
  error(msg: string, meta?: Record<string, unknown>): void {
    if (shouldLog("error")) console.error(format("error", msg, meta));
  },
};
