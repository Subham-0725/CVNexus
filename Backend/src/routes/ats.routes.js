import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { analyzeATS } from "../controllers/ats.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { attachUser } from "../middleware/attachUser.js";
import { aiLimiter } from "../middleware/aiRateLimit.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMime = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (allowedMime.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("UNSUPPORTED_FILE_TYPE"));
    }
  },
});

function handleMulterError(err, req, res, next) {
  if (!err) return next();
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "File is too large. Maximum size is 5MB.",
      code: "FILE_TOO_LARGE",
    });
  }
  if (err.message === "UNSUPPORTED_FILE_TYPE") {
    return res.status(400).json({
      error: "Please upload a PDF or DOCX file.",
      code: "UNSUPPORTED_FILE_TYPE",
    });
  }
  return next(err);
}

router.post(
  "/analyze",
  aiLimiter,
  requireAuth,
  attachUser,
  (req, res, next) => {
    upload.single("resume")(req, res, (e) => {
      if (e) return handleMulterError(e, req, res, next);
      next();
    });
  },
  analyzeATS,
);

export default router;
