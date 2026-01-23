import express from "express";
import cors from "cors";

import meRoute from "./routes/me.js";
import templatesRoute from "./routes/templates.js";
import resumesRoute from "./routes/resumes.js";

const app = express();

/**
 * Trust proxy (needed for auth + future rate limiting)
 */
app.set("trust proxy", 1);

/**
 * Body parsing
 */
app.use(express.json({ limit: "2mb" }));

/**
 * CORS
 * ⚠️ Keep this tight. Do NOT wildcard in prod.
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/**
 * API Routes
 */
app.use("/api/v1/me", meRoute);
app.use("/api/v1/templates", templatesRoute);
app.use("/api/v1/resumes", resumesRoute);

/**
 * Health check
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
