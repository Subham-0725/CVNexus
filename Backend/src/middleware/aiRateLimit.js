import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many AI requests. Please try again later.",
  },
});
