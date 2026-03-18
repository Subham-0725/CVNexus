import express from "express";
import { improveText } from "../controllers/ai.controller.js";
import { aiLimiter } from "../middleware/aiRateLimit.js";

const router = express.Router();

router.post("/improve", aiLimiter, improveText);

export default router;
