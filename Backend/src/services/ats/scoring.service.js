import {
  expandSynonyms,
  canonicalizeTerm,
} from "../../utils/keyword/synonyms.js";
import { normalizeText } from "../../utils/keyword/normalizer.js";
import { stopwords } from "../../utils/keyword/stopwords.js";

/**
 * Build a searchable haystack from normalized resume text + structured skills.
 */
function buildResumeHaystack(normalizedResume, structure) {
  const skillBlob = [
    ...(structure.skills?.technical || []),
    ...(structure.skills?.soft || []),
  ].join(" ");
  return normalizeText(`${normalizedResume} ${skillBlob}`);
}

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Count occurrences of any synonym group member in haystack (word-boundary style).
 */
function countTermFamily(haystack, term) {
  const variants = [...expandSynonyms(term)];
  let count = 0;
  for (const v of variants) {
    const escaped = escapeRe(v);
    const re = new RegExp(`(?:^|[^a-z0-9#+])${escaped}(?:$|[^a-z0-9#+])`, "gi");
    const m = haystack.match(re);
    if (m) count += m.length;
  }
  return count;
}

function termMatched(haystack, term) {
  return countTermFamily(haystack, term) > 0;
}

/**
 * Cap repeated mentions so keyword stuffing cannot inflate the score.
 */
function stuffingPenalty(rawCount, resumeWordCount) {
  if (rawCount <= 3) return 0;
  const ratio = resumeWordCount > 0 ? rawCount / resumeWordCount : 0;
  let penalty = 0;
  if (rawCount > 8) penalty += 12;
  else if (rawCount > 5) penalty += 6;
  if (ratio > 0.02) penalty += 10;
  return Math.min(25, penalty);
}

/**
 * How well the target role title appears in header / summary / top of file (recruiter skim).
 */
function scoreRoleTitleFit(targetRole, structure) {
  const roleNorm = normalizeText(targetRole || "");
  if (!roleNorm || roleNorm.length < 2) return 55;

  const tokens = roleNorm
    .split(/\s+/)
    .map((t) => t.replace(/^[.#]+|[.#]+$/g, ""))
    .filter((t) => t.length > 2 && !stopwords.has(t));

  if (!tokens.length) return 55;

  const headerHay = normalizeText(
    `${structure.contentQuality?.headerWindow || ""} ${(structure.normalizedResume || "").slice(0, 700)}`,
  );

  let hits = 0;
  for (const t of tokens) {
    const re = new RegExp(`(?:^|[^a-z0-9#+])${escapeRe(t)}(?:$|[^a-z0-9#+])`, "i");
    if (re.test(headerHay)) hits++;
  }

  return Math.round((hits / tokens.length) * 100);
}

/**
 * Section + contact completeness (ATS + human gatekeepers expect these).
 */
function scoreCompleteness(structure, jobSignals) {
  const cov = structure.sectionCoverage || {};
  let pts = 0;
  if (cov.experience) pts += 30;
  if (cov.skills) pts += 20;
  if (cov.education) pts += 15;
  else if (structure.contentQuality?.mentionsEducation) pts += 12;
  if (cov.summary) pts += 10;
  if (structure.contact?.emailValid) pts += 10;
  if (structure.contact?.phoneValid) pts += 7;
  if (cov.projects) pts += 4;
  if (cov.certifications) pts += 4;

  let score = Math.min(100, pts);

  if (
    jobSignals?.educationMentioned &&
    !cov.education &&
    !structure.contentQuality?.mentionsEducation
  ) {
    score = Math.max(0, score - 22);
  }

  const minY = jobSignals?.minYearsSuggested;
  const expMo = structure.experienceMonths;
  if (minY != null && minY > 0 && expMo != null) {
    const needed = minY * 12;
    if (expMo < needed * 0.45) score = Math.max(0, score - 18);
    else if (expMo < needed * 0.85) score = Math.max(0, score - 10);
  }

  return Math.min(100, score);
}

/**
 * Can automated parsers read this file? (approximation of ATS parse risk.)
 */
function scoreParseability(structure) {
  let score = 100;
  for (const f of structure.formattingFlags || []) {
    if (f.severity === "warning") score -= 12;
    else if (f.severity === "info") score -= 4;
  }
  const lowText = (structure.formattingFlags || []).some(
    (f) => f.type === "low_text_signal",
  );
  if (lowText) score -= 10;
  return Math.max(0, Math.min(100, score));
}

/**
 * Measurable wins + scannable bullets (what strong resumes show).
 */
function scoreImpact(structure) {
  const cq = structure.contentQuality || {};
  const bullets = cq.bulletLineCount || 0;
  const metrics = cq.metricSignals || 0;
  const verbs = cq.strongVerbLines || 0;
  const wc = structure.stats?.wordCount || 0;

  let score = 0;
  score += Math.min(38, bullets * 5);
  score += Math.min(38, metrics * 5);
  score += Math.min(34, verbs * 4);
  score = Math.min(100, score);

  if (wc > 0 && wc < 130) score = Math.max(0, score - 18);
  else if (wc > 0 && wc < 200) score = Math.max(0, score - 8);
  if (wc > 1100) score = Math.max(0, score - 6);

  if (!structure.sectionCoverage?.experience) {
    score = Math.min(score, 45);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Job-description keyword / phrase alignment (core ATS relevance signal).
 */
function scoreKeywordRelevance(jdTerms, haystack, resumeWordCount) {
  const uniqueJd = [];
  const seen = new Set();
  for (const t of jdTerms) {
    const c = canonicalizeTerm(t);
    if (!c || seen.has(c)) continue;
    seen.add(c);
    uniqueJd.push(t);
  }

  let rawKeywordPoints = 0;
  let stuffingDeduction = 0;
  const matched = [];
  const missing = [];

  if (uniqueJd.length === 0) {
    rawKeywordPoints = 52;
  } else {
    const perTerm = 100 / uniqueJd.length;
    for (const term of uniqueJd) {
      const rawCount = countTermFamily(haystack, term);
      if (termMatched(haystack, term)) {
        matched.push(term);
        rawKeywordPoints += perTerm;
        stuffingDeduction += stuffingPenalty(rawCount, resumeWordCount);
      } else {
        missing.push(term);
      }
    }
  }

  let keywordScore = Math.max(0, rawKeywordPoints - stuffingDeduction);
  keywordScore = Math.min(100, keywordScore);

  return {
    score: Math.round(keywordScore),
    matched,
    missing,
    stuffingDeduction: Math.round(stuffingDeduction),
    jdTermCount: uniqueJd.length,
  };
}

const PILLAR_WEIGHTS = {
  jobAdMatch: 0.36,
  roleTitleFit: 0.14,
  completeness: 0.22,
  atsReadability: 0.14,
  impactAndBullets: 0.14,
};

/**
 * Multi-pillar score modeled after common ATS + recruiter heuristics (estimated, not vendor-specific).
 */
export function scoreResume({
  jdTerms,
  normalizedResume,
  structure,
  targetRole,
  jobSignals,
}) {
  const haystack = buildResumeHaystack(normalizedResume, structure);
  const resumeWords = haystack.split(/\s+/).filter(Boolean);
  const resumeWordCount = resumeWords.length;

  const kw = scoreKeywordRelevance(jdTerms, haystack, resumeWordCount);

  const pillars = {
    jobAdMatch: kw.score,
    roleTitleFit: scoreRoleTitleFit(targetRole, structure),
    completeness: scoreCompleteness(structure, jobSignals || {}),
    atsReadability: scoreParseability(structure),
    impactAndBullets: scoreImpact(structure),
  };

  let composite = 0;
  for (const [key, w] of Object.entries(PILLAR_WEIGHTS)) {
    composite += pillars[key] * w;
  }

  let formatPenaltyPoints = 0;
  for (const f of structure.formattingFlags || []) {
    if (f.severity === "warning") formatPenaltyPoints += 6;
    else if (f.severity === "info") formatPenaltyPoints += 2;
  }
  formatPenaltyPoints = Math.min(20, formatPenaltyPoints);

  const score = Math.max(0, Math.min(100, Math.round(composite)));

  return {
    score,
    matched: kw.matched,
    missing: kw.missing,
    pillars,
    pillarWeights: PILLAR_WEIGHTS,
    breakdown: {
      pillars,
      deductions: {
        keywordStuffing: kw.stuffingDeduction,
        formatRiskPoints: formatPenaltyPoints,
      },
      jdTermCount: kw.jdTermCount,
      /** @deprecated use breakdown.pillars — kept for older clients */
      keywordMatch: pillars.jobAdMatch,
      structure: pillars.completeness,
      contact:
        (structure.contact?.emailValid ? 10 : 0) +
        (structure.contact?.phoneValid ? 7 : 0),
      formatPenalty: formatPenaltyPoints,
      stuffingPenaltyApplied: kw.stuffingDeduction,
    },
    scoreModel: "cvnexus-ats-v2",
  };
}
