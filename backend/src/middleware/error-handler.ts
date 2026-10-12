import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { env } from "../config/env.js";
import { ApiError, ERROR_CODES } from "../utils/api-error.js";
import { logger } from "../utils/logger.js";

interface ErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId: string;
  };
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const requestId = req.requestId ?? "unknown";

  if (err instanceof ApiError) {
    if (!err.isOperational) {
      logger.error(err.message, {
        requestId,
        code: err.code,
        stack: err.stack,
      });
    }
    const body: ErrorBody = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
        requestId,
      },
    };
    res.status(err.status).json(body);
    return;
  }

  if (err instanceof ZodError) {
    res.status(ERROR_CODES.VALIDATION_ERROR).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validasi input gagal",
        details: err.issues.map((i) => ({
          field: i.path.join("."),
          code: i.code,
          message: i.message,
        })),
        requestId,
      },
    } satisfies ErrorBody);
    return;
  }

  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    res.status(ERROR_CODES.VALIDATION_ERROR).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Body JSON tidak valid",
        requestId,
      },
    } satisfies ErrorBody);
    return;
  }

  if ((err as { code?: unknown } | null)?.code === "23505") {
    res.status(ERROR_CODES.CONFLICT).json({
      success: false,
      error: {
        code: "CONFLICT",
        message: "Data duplikat — resource sudah ada",
        requestId,
      },
    } satisfies ErrorBody);
    return;
  }

  // Non-operational: jangan bocorkan detail internal ke client.
  logger.error(err instanceof Error ? err.message : "Unknown error", {
    requestId,
    stack: err instanceof Error ? err.stack : undefined,
  });
  res.status(ERROR_CODES.INTERNAL_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message:
        env.NODE_ENV === "production"
          ? "Terjadi kesalahan pada server"
          : err instanceof Error
            ? err.message
            : "Unknown error",
      requestId,
    },
  } satisfies ErrorBody);
};
