import { runATSAnalysis } from "../services/ats/ats.service.js";
import {
  validateATSInput,
  ATSValidationError,
} from "../validators/ats.validator.js";

const CLIENT_ERRORS = new Set([
  "UNSUPPORTED_FILE_TYPE",
  "RESUME_TEXT_TOO_SHORT",
  "RESUME_POSSIBLY_IMAGE_ONLY",
  "PDF_READ_FAILED",
  "PDF_CORRUPT_OR_EMPTY",
  "PDF_PARSE_FAILED",
  "DOCX_READ_FAILED",
  "DOCX_CORRUPT_OR_EMPTY",
  "DOCX_PARSE_FAILED",
]);

function mapErrorToResponse(err) {
  if (err instanceof ATSValidationError) {
    return { status: 400, message: err.message, code: err.code };
  }

  const code = err?.message;
  if (CLIENT_ERRORS.has(code)) {
    const messages = {
      UNSUPPORTED_FILE_TYPE: "Please upload a PDF or DOCX file.",
      RESUME_TEXT_TOO_SHORT:
        "Could not read enough text from this file. It may be empty, scanned, or corrupted.",
      RESUME_POSSIBLY_IMAGE_ONLY:
        "This file appears to be image-based or has very little selectable text. Try an exported PDF with text or a DOCX.",
      PDF_READ_FAILED: "Could not read the PDF file.",
      PDF_CORRUPT_OR_EMPTY: "The PDF appears empty or corrupted.",
      PDF_PARSE_FAILED: "Failed to parse the PDF.",
      DOCX_READ_FAILED: "Could not read the Word document.",
      DOCX_CORRUPT_OR_EMPTY: "The Word document appears empty or corrupted.",
      DOCX_PARSE_FAILED: "Failed to parse the Word document.",
    };
    return {
      status: 400,
      message: messages[code] || "Invalid or unreadable resume file.",
      code,
    };
  }

  if (code === "GROQ_API_KEY is not set in environment variables") {
    return {
      status: 503,
      message: "AI feedback is temporarily unavailable.",
      code: "AI_CONFIG",
    };
  }

  return {
    status: 500,
    message: err?.message || "ATS analysis failed.",
    code: "INTERNAL",
  };
}

export const analyzeATS = async (req, res) => {
  try {
    validateATSInput(req);

    if (!req.file) {
      return res.status(400).json({
        error: "Resume file is required.",
        code: "FILE_REQUIRED",
      });
    }

    const result = await runATSAnalysis({
      file: req.file,
      jobDescription: req.body.jobDescription,
      role: req.body.role,
      company: req.body.company,
    });

    return res.json(result);
  } catch (err) {
    console.error("ATS ERROR:", err);
    const { status, message, code } = mapErrorToResponse(err);
    return res.status(status).json({ error: message, code });
  }
};
