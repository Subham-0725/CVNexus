import { normalizeText, tokenize } from "../keyword/normalizer.js";
import { canonicalizeTerm } from "../keyword/synonyms.js";
import { stopwords } from "../keyword/stopwords.js";

const SECTION_HEADINGS = [
  {
    id: "summary",
    patterns: [
      /^summary$/i,
      /^profile$/i,
      /^objective$/i,
      /^about\s*me$/i,
      /^professional\s*summary$/i,
    ],
  },
  {
    id: "experience",
    patterns: [
      /^experience$/i,
      /^work\s*experience$/i,
      /^employment$/i,
      /^professional\s*experience$/i,
      /^career\s*history$/i,
      /^relevant\s*experience$/i,
    ],
  },
  {
    id: "education",
    patterns: [
      /^education$/i,
      /^academic/i,
      /^qualifications$/i,
      /^degrees?$/i,
    ],
  },
  {
    id: "skills",
    patterns: [
      /^skills?$/i,
      /^technical\s*skills?$/i,
      /^core\s*competencies$/i,
      /^technologies$/i,
      /^tools$/i,
    ],
  },
  {
    id: "projects",
    patterns: [/^projects?$/i, /^portfolio$/i, /^selected\s*projects$/i],
  },
  {
    id: "certifications",
    patterns: [/^certifications?$/i, /^licenses?$/i, /^credentials$/i],
  },
];

const SOFT_SKILL_LEXICON = new Set(
  [
    "leadership",
    "communication",
    "teamwork",
    "collaboration",
    "problem",
    "solving",
    "adaptability",
    "creativity",
    "empathy",
    "negotiation",
    "presentation",
    "mentoring",
    "coaching",
    "stakeholder",
    "management",
    "organization",
    "time",
    "management",
    "critical",
    "thinking",
    "detail",
    "oriented",
    "interpersonal",
  ].map((s) => s.toLowerCase()),
);

const TECH_HINT = /^(sql|api|aws|gcp|azure|js|ts|html|css|git|ci|cd|ml|ai|nlp|etl|ui|ux|dba|sdk|ide|cli)$/i;

function lineLooksLikeHeading(line) {
  const t = line.trim();
  if (t.length < 2 || t.length > 80) return false;
  if (/^\d+[\).\s]/.test(t)) return false;
  if (/[@]/.test(t)) return false;
  const upperRatio = (t.match(/[A-Z]/g) || []).length / Math.max(t.length, 1);
  if (upperRatio > 0.5 && t.length < 50) return true;
  if (/:$/.test(t) && t.length < 60) return true;
  return SECTION_HEADINGS.some((s) => s.patterns.some((re) => re.test(t.replace(/:$/, ""))));
}

function matchSectionHeading(line) {
  const cleaned = line.trim().replace(/:$/, "");
  for (const sec of SECTION_HEADINGS) {
    if (sec.patterns.some((re) => re.test(cleaned))) return sec.id;
  }
  if (lineLooksLikeHeading(line) && cleaned.length < 40) return "unknown_section";
  return null;
}

const EMAIL_RE =
  /[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}/g;

const PHONE_RES = [
  /\+?\d{1,3}[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g,
  /\(\d{3}\)\s*\d{3}[\s.-]?\d{4}/g,
  /\b\d{3}[\s.-]\d{3}[\s.-]\d{4}\b/g,
];

function extractEmails(text) {
  const matches = text.match(EMAIL_RE) || [];
  return [...new Set(matches.map((e) => e.toLowerCase()))];
}

function extractPhones(text) {
  const found = new Set();
  for (const re of PHONE_RES) {
    const m = text.match(re) || [];
    for (const p of m) {
      const digits = p.replace(/\D/g, "");
      if (digits.length >= 10 && digits.length <= 15) found.add(p.trim());
    }
  }
  return [...found];
}

const MONTHS =
  "january february march april may june july august september october november december jan feb mar apr may jun jul aug sep sept oct nov dec".split(
    " ",
  );

function parseMonthToken(tok) {
  const t = tok.toLowerCase();
  const i = MONTHS.indexOf(t);
  if (i >= 0) {
    const idx = Math.floor(i / 2);
    return idx < 12 ? idx + 1 : null;
  }
  const n = parseInt(t, 10);
  if (n >= 1 && n <= 12) return n;
  return null;
}

function monthYearToIndex(year, month) {
  return year * 12 + month - 1;
}

function parseFlexibleDate(str) {
  const s = String(str).trim().toLowerCase();
  if (/^present|current|now|till\s*date$/.test(s)) return new Date();

  const yMatch = s.match(/\b(20\d{2}|19\d{2})\b/);
  if (!yMatch) return null;
  const year = parseInt(yMatch[1], 10);

  const mMatch = s.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)\b/i,
  );
  let month = 1;
  if (mMatch) {
    const pm = parseMonthToken(mMatch[1]);
    if (pm) month = pm;
  } else {
    const slash = s.match(/\b(\d{1,2})\/(\d{4})\b/);
    if (slash) month = parseInt(slash[1], 10) || 1;
    const iso = s.match(/\b(\d{4})-(\d{2})\b/);
    if (iso) month = parseInt(iso[2], 10) || 1;
  }
  return new Date(year, month - 1, 1);
}

/** Month year ranges: Jan 2020 – Present, 01/2019 - 03/2022, 2018-2020 */
const DATE_RANGE_RE =
  /\b((?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)\s+\d{4}|\d{1,2}\/\d{4}|\d{4}-\d{2}|\b(?:19|20)\d{2}\b)\s*[-–—]\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)\s+\d{4}|\d{1,2}\/\d{4}|\d{4}-\d{2}|\b(?:19|20)\d{2}\b|present|current|now|till\s*date)\b/gi;

/**
 * Estimate total months of experience from common resume date patterns.
 */
export function estimateExperienceMonths(text) {
  const ranges = [];
  let m;
  const re = new RegExp(DATE_RANGE_RE.source, "gi");
  while ((m = re.exec(text)) !== null) {
    const start = parseFlexibleDate(m[1]);
    let end = parseFlexibleDate(m[2]);
    if (!start) continue;
    if (/present|current|now|till/i.test(m[2])) end = new Date();
    if (!end || end < start) continue;
    const sm = start.getFullYear() * 12 + start.getMonth();
    const em = end.getFullYear() * 12 + end.getMonth();
    ranges.push([sm, em]);
  }

  if (ranges.length === 0) return null;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [a, b] of ranges) {
    if (!merged.length || a > merged[merged.length - 1][1] + 1) {
      merged.push([a, b]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], b);
    }
  }
  let total = 0;
  for (const [a, b] of merged) total += b - a + 1;
  return total;
}

function classifySkillToken(token) {
  const c = canonicalizeTerm(token);
  if (SOFT_SKILL_LEXICON.has(c)) return "soft";
  if (TECH_HINT.test(c) || /\d/.test(c) || c.includes("#") || c.includes("+"))
    return "technical";
  if (c.length <= 3) return "technical";
  if (
    /engineer|developer|software|data|cloud|stack|framework|library|database|server|network|security|devops|frontend|backend|fullstack/i.test(
      c,
    )
  )
    return "technical";
  return "technical";
}

function dedupeSkills(list) {
  const byCanon = new Map();
  for (const s of list) {
    const c = canonicalizeTerm(s);
    if (!byCanon.has(c)) byCanon.set(c, s);
  }
  return [...byCanon.values()];
}

/**
 * Full structural + contact analysis from plain extracted text.
 */
export function analyzeResumeStructure(rawText) {
  const text = rawText || "";
  const normalized = normalizeText(text);
  const lines = text.split(/\r?\n/).map((l) => l.trim());

  const sectionsFound = new Set();
  let current = null;
  const sectionChunks = {};
  /** Ignore lines before the first real section so header/contact is not merged into Skills. */
  let seenFirstSection = false;

  for (const line of lines) {
    if (!line) continue;
    const sec = matchSectionHeading(line);
    if (sec && sec !== "unknown_section") {
      seenFirstSection = true;
      current = sec;
      sectionsFound.add(sec);
      sectionChunks[current] = sectionChunks[current] || [];
      continue;
    }
    if (seenFirstSection && current) {
      sectionChunks[current] = sectionChunks[current] || [];
      sectionChunks[current].push(line);
    }
  }

  const skillsBlock = (sectionChunks.skills || []).join(" ");
  const expNoise = /^(present|current|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|\d{4})$/i;
  const skillTokens = tokenize(skillsBlock)
    .concat(
      tokenize((sectionChunks.experience || []).join(" ")).filter((t) => {
        const tl = t.toLowerCase();
        return (
          t.length > 2 &&
          !stopwords.has(tl) &&
          !expNoise.test(tl) &&
          !/^\d+$/.test(tl)
        );
      }),
    )
    .slice(0, 500);

  const technical = [];
  const soft = [];
  for (const t of skillTokens) {
    const cls = classifySkillToken(t);
    if (cls === "soft") soft.push(t);
    else technical.push(t);
  }

  const emails = extractEmails(text);
  const phones = extractPhones(text);

  const lineLengths = lines.filter((l) => l.length > 0).map((l) => l.length);
  const avgLine =
    lineLengths.length > 0
      ? lineLengths.reduce((a, b) => a + b, 0) / lineLengths.length
      : 0;
  const shortLines = lineLengths.filter((l) => l < 35).length;
  const shortRatio =
    lineLengths.length > 0 ? shortLines / lineLengths.length : 0;

  const specialChars = (text.match(/[|│╔╗╚╝═─▀▄▪▫■●]/g) || []).length;
  const specialRatio = text.length > 0 ? specialChars / text.length : 0;

  const formattingFlags = [];
  if (shortRatio > 0.45 && lineLengths.length > 15) {
    formattingFlags.push({
      type: "multi_column_risk",
      severity: "warning",
      detail:
        "Many short lines detected; multi-column or table layouts often confuse ATS parsers.",
    });
  }
  if (specialRatio > 0.02) {
    formattingFlags.push({
      type: "heavy_graphics_or_table_chars",
      severity: "warning",
      detail:
        "Box-drawing or table characters found; prefer simple linear sections in the source file.",
    });
  }
  if (avgLine > 95 && lineLengths.length > 5) {
    formattingFlags.push({
      type: "dense_lines",
      severity: "info",
      detail:
        "Very long lines may indicate merged columns; ensure critical facts appear as plain text.",
    });
  }

  const alphanumericRatio =
    text.length > 0 ? (text.match(/[a-zA-Z0-9]/g) || []).length / text.length : 0;
  if (alphanumericRatio < 0.35 && text.length > 200) {
    formattingFlags.push({
      type: "low_text_signal",
      severity: "warning",
      detail:
        "Low readable text density; file may be image-heavy or poorly extracted.",
    });
  }

  let probableName = null;
  for (const line of lines.slice(0, 8)) {
    if (!line || line.length > 60) continue;
    if (EMAIL_RE.test(line) || PHONE_RES.some((re) => re.test(line))) continue;
    if (/^(resume|cv|curriculum)/i.test(line)) continue;
    const words = line.split(/\s+/).filter(Boolean);
    if (words.length >= 2 && words.length <= 5 && /^[A-Za-z\s.'-]+$/.test(line)) {
      probableName = line;
      break;
    }
  }

  const experienceMonths = estimateExperienceMonths(text);

  const experienceLines = sectionChunks.experience || [];
  const expText = experienceLines.join("\n");
  const bulletLines = experienceLines.filter((l) => {
    const t = l.trim();
    if (!t) return false;
    return (
      /^[\s\u2022\u2023\u25AA\u25CF\-\*•▪▸►]+/.test(l) ||
      /^\d+[\.)]\s/.test(t) ||
      /^[-–—]\s/.test(t)
    );
  }).length;

  const ACTION_VERBS = new Set(
    [
      "developed",
      "led",
      "built",
      "managed",
      "created",
      "implemented",
      "designed",
      "delivered",
      "improved",
      "increased",
      "reduced",
      "achieved",
      "owned",
      "coordinated",
      "executed",
      "launched",
      "spearheaded",
      "optimized",
      "engineered",
      "architected",
      "mentored",
      "analyzed",
      "established",
      "drove",
      "headed",
      "streamlined",
      "negotiated",
      "trained",
      "supervised",
      "directed",
    ].map((s) => s.toLowerCase()),
  );

  const actionVerbLines = experienceLines.filter((l) => {
    const raw = l.trim();
    if (!raw || raw.length < 4) return false;
    const firstWord = raw
      .split(/[\s,/]+/)[0]
      ?.toLowerCase()
      .replace(/[^a-z]/g, "");
    return firstWord && ACTION_VERBS.has(firstWord);
  }).length;

  const metricMatches =
    expText.match(
      /\d+\s*%|\$\s*[\d,.]+|[\d,.]+\s*(%|k|m|b)\b|[\d,.]+\s*(users?|customers?|clients?|revenue|sales|reduction|savings|members?|downloads?|requests?\/s|qps)|\d+\s*(x|fold)\b|\b(yoy|qoq|mom)\b/gi,
    ) || [];
  const metricHits = metricMatches.length;

  const summaryText = (sectionChunks.summary || []).join(" ");
  const headerWindow = [...lines.slice(0, 18), summaryText]
    .join(" ")
    .slice(0, 900);

  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  const mentionsEducation = /bachelor|master|mba|phd|ph\.d|b\.s\.|m\.s\.|b\.a\.|m\.a\.|associate|diploma|university|college degree/i.test(
    text,
  );

  return {
    sectionsDetected: [...sectionsFound],
    sectionCoverage: {
      summary: sectionsFound.has("summary"),
      experience: sectionsFound.has("experience"),
      education: sectionsFound.has("education"),
      skills: sectionsFound.has("skills"),
      projects: sectionsFound.has("projects"),
      certifications: sectionsFound.has("certifications"),
    },
    contact: {
      emails,
      phones,
      emailValid: emails.length > 0,
      phoneValid: phones.length > 0,
    },
    skills: {
      technical: dedupeSkills(technical).slice(0, 80),
      soft: dedupeSkills(soft).slice(0, 40),
    },
    experienceMonths,
    probableName,
    formattingFlags,
    stats: {
      charCount: text.length,
      lineCount: lines.length,
      wordCount,
      avgLineLength: Math.round(avgLine),
      shortLineRatio: Math.round(shortRatio * 100) / 100,
      alphanumericRatio: Math.round(alphanumericRatio * 100) / 100,
    },
    contentQuality: {
      bulletLineCount: bulletLines,
      metricSignals: metricHits,
      strongVerbLines: actionVerbLines,
      mentionsEducation,
      headerWindow: normalizeText(headerWindow).slice(0, 800),
    },
    normalizedResume: normalized,
  };
}

/**
 * Signals from the job description used for completeness / requirement checks.
 */
export function analyzeJobSignals(normalizedJD) {
  const jd = normalizedJD || "";
  const educationMentioned =
    /bachelor|bachelors|master's|masters|master\s|phd|ph\.d|degree required|college degree|university degree|bs\s|ba\s|ms\s|mba|b\.s\.|m\.s\.|associate degree|diploma/i.test(
      jd,
    );
  const m = jd.match(
    /(\d+)\+?\s*(?:\+)?\s*(?:years?|yrs|yr)\s+(?:of\s+)?(?:experience|exp)/i,
  );
  const minYearsSuggested = m ? Math.min(30, parseInt(m[1], 10) || 0) : null;
  return { educationMentioned, minYearsSuggested };
}
