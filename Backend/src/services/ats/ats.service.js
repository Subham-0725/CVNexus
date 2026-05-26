import fs from "fs";
import { parsePDF } from "../../utils/parsers/pdf.parser.js";
import { parseDOCX } from "../../utils/parsers/docx.parser.js";
import {
  extractJobDescriptionTerms,
} from "../../utils/keyword/extractor.js";
import { normalizeText } from "../../utils/keyword/normalizer.js";
import { scoreResume } from "./scoring.service.js";
import { generateFeedback } from "./feedback.service.js";
import {
  analyzeResumeStructure,
  analyzeJobSignals,
} from "../../utils/ats/resume.analysis.js";

function safeUnlink(path) {
  try {
    if (path && fs.existsSync(path)) fs.unlinkSync(path);
  } catch {
    /* ignore */
  }
}

function detectLanguageHint(text) {
  const letters = text.match(/\p{L}/gu) || [];
  if (letters.length < 40) return { likelyEnglish: true, nonLatinLetterRatio: 0 };
  const latin = text.match(/\p{Script=Latin}/gu) || [];
  const ratio = 1 - latin.length / letters.length;
  return {
    likelyEnglish: ratio < 0.35,
    nonLatinLetterRatio: Math.round(ratio * 100) / 100,
  };
}

/**
 * End-to-end ATS analysis: parse file, extract signals, score, AI feedback.
 */
export async function runATSAnalysis({ file, jobDescription, role, company }) {
  const filePath = file?.path;
  try {
    let rawText = "";
    const mime = file?.mimetype || "";

    if (mime === "application/pdf") {
      rawText = await parsePDF(filePath);
    } else if (
      mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      rawText = await parseDOCX(filePath);
    } else {
      throw new Error("UNSUPPORTED_FILE_TYPE");
    }

    const trimmed = (rawText || "").trim();
    if (trimmed.length < 40) {
      throw new Error("RESUME_TEXT_TOO_SHORT");
    }

    const alphanumericRatio =
      trimmed.length > 0
        ? (trimmed.match(/[a-zA-Z0-9]/g) || []).length / trimmed.length
        : 0;
    if (trimmed.length < 120 && alphanumericRatio < 0.25) {
      throw new Error("RESUME_POSSIBLY_IMAGE_ONLY");
    }

    const structure = analyzeResumeStructure(trimmed);
    const lang = detectLanguageHint(trimmed);
    structure.languageHint = lang;

    const cleanResume = structure.normalizedResume || normalizeText(trimmed);
    const cleanJD = normalizeText(jobDescription || "");
    const jdTerms = extractJobDescriptionTerms(cleanJD);
    const jobSignals = analyzeJobSignals(cleanJD);

    const scoring = scoreResume({
      jdTerms,
      normalizedResume: cleanResume,
      structure,
      targetRole: role,
      jobSignals,
    });

    let feedback = { structured: null, rawText: null };
    let feedbackError = null;
    try {
      feedback = await generateFeedback({
        role: role || "Role",
        company: company || "",
        jobDescription,
        scoring,
        structure,
        jobSignals,
        normalizedResumeSnippet: cleanResume,
      });
    } catch (e) {
      console.error("ATS Groq feedback failed:", e?.message || e);
      feedbackError =
        e?.message?.includes("GROQ_API_KEY") || e?.status === 401
          ? "AI_NOT_CONFIGURED"
          : "AI_UNAVAILABLE";
    }

    return {
      score: scoring.score,
      scoreTier:
        scoring.score >= 75 ? "good" : scoring.score >= 50 ? "moderate" : "bad",
      scoreModel: scoring.scoreModel,
      pillars: scoring.pillars,
      pillarWeights: scoring.pillarWeights,
      matchedSkills: scoring.matched,
      missingSkills: scoring.missing,
      breakdown: scoring.breakdown,
      jobSignals,
      structure: {
        sectionsDetected: structure.sectionsDetected,
        sectionCoverage: structure.sectionCoverage,
        contact: structure.contact,
        skills: structure.skills,
        experienceMonths: structure.experienceMonths,
        probableName: structure.probableName,
        formattingFlags: structure.formattingFlags,
        stats: structure.stats,
        contentQuality: structure.contentQuality,
        languageHint: structure.languageHint,
      },
      feedback: feedback.structured,
      feedbackRaw: feedbackError
        ? null
        : feedback.structured
          ? null
          : feedback.rawText,
      feedbackError,
    };
  } finally {
    safeUnlink(filePath);
  }
}
