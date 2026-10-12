export const ERROR_CODES = {
  VALIDATION_ERROR: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export interface ErrorDetail {
  field?: string;
  code: string;
  message: string;
}

export class ApiError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details: ErrorDetail[] | undefined;
  readonly isOperational: boolean;

  constructor(
    code: ErrorCode,
    message: string,
    details?: ErrorDetail[],
    options?: { cause?: unknown; isOperational?: boolean },
  ) {
    super(
      message,
      options?.cause !== undefined ? { cause: options.cause } : undefined,
    );
    this.name = "ApiError";
    this.code = code;
    this.status = ERROR_CODES[code];
    this.details = details;
    this.isOperational = options?.isOperational ?? true;
  }

  static validation(message: string, details?: ErrorDetail[]): ApiError {
    return new ApiError("VALIDATION_ERROR", message, details);
  }

  static unauthenticated(message = "Autentikasi diperlukan"): ApiError {
    return new ApiError("UNAUTHENTICATED", message);
  }

  static forbidden(
    message = "Anda tidak punya akses ke resource ini",
  ): ApiError {
    return new ApiError("FORBIDDEN", message);
  }

  static notFound(message = "Resource tidak ditemukan"): ApiError {
    return new ApiError("NOT_FOUND", message);
  }

  static conflict(message: string): ApiError {
    return new ApiError("CONFLICT", message);
  }
}
