import { Router } from "express";
import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { logger } from "../utils/logger.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
});

healthRouter.get("/ready", async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({
      success: true,
      data: { status: "ready", database: "up" },
    });
  } catch (err) {
    logger.error("Health check: database tidak tersedia", {
      error: err instanceof Error ? err.message : String(err),
    });
    res.status(503).json({
      success: false,
      error: {
        code: "SERVICE_UNAVAILABLE",
        message: "Database tidak tersedia",
        requestId: (_req as { requestId?: string }).requestId ?? "unknown",
      },
    });
  }
});
