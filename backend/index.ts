import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { corsOptions } from "./src/config/cors.js";
import { API_PREFIX } from "./src/config/constants.js";
import { env } from "./src/config/env.js";
import { errorHandler } from "./src/middleware/error-handler.js";
import { notFoundHandler } from "./src/middleware/not-found.js";
import { requestId } from "./src/middleware/request-id.js";
import { apiRouter } from "./src/routes/index.js";
import { logger } from "./src/utils/logger.js";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(requestId);
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

app.use(API_PREFIX, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  logger.info(`Server berjalan di http://localhost:${env.PORT}${API_PREFIX}`, {
    env: env.NODE_ENV,
  });
});

function shutdown(signal: string): void {
  logger.info(`${signal} diterima — graceful shutdown`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
