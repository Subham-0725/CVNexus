import express from "express";
import cors from "cors";

const app = express();

/* ------------------------- Global Middleware ------------------------- */

// JSON body parsing
app.use(express.json({ limit: "2mb" }));

// CORS (open for dev, restrict later)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

/* --------------------------- Health Check ---------------------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* ------------------------ 404 Handler ------------------------ */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* ---------------------- Global Error Handler -------------------------- */
/* MUST be last */

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;
