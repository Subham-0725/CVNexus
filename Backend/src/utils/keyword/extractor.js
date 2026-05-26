import { stopwords } from "./stopwords.js";
import { canonicalizeTerm } from "./synonyms.js";
import { normalizeText, tokenize } from "./normalizer.js";

const MIN_TOKEN_LEN = 2;
const MAX_PHRASE_LEN = 3;

function isStop(t) {
  return stopwords.has(t) || t.length < MIN_TOKEN_LEN;
}

/** Single tokens suitable for JD skill-like terms. */
export function extractKeywordTokens(text) {
  const norm = normalizeText(text);
  const raw = norm.split(/\s+/).filter((w) => w.length >= MIN_TOKEN_LEN);
  const out = [];
  const seen = new Set();
  for (const w of raw) {
    const c = canonicalizeTerm(w.replace(/^[.#]+|[.#]+$/g, ""));
    if (!c || isStop(c)) continue;
    if (seen.has(c)) continue;
    seen.add(c);
    out.push(c);
  }
  return out;
}

/**
 * Extract n-grams (1–3) from text, deduped by canonical form.
 * Biases toward tech-like patterns (contains digit, +, #, or length >= 4).
 */
export function extractPhrases(text) {
  const words = tokenize(text).map((w) => w.replace(/^[.#]+|[.#]+$/g, ""));
  const phrases = [];
  const seen = new Set();

  const pushPhrase = (parts) => {
    const joined = parts.join(" ");
    const canon = parts.map((p) => canonicalizeTerm(p)).join(" ");
    if (!canon || seen.has(canon)) return;
    if (parts.every((p) => isStop(canonicalizeTerm(p)))) return;
    seen.add(canon);
    phrases.push({ surface: joined, canonical: canon, parts });
  };

  for (let i = 0; i < words.length; i++) {
    for (let len = 1; len <= MAX_PHRASE_LEN && i + len <= words.length; len++) {
      const slice = words.slice(i, i + len);
      const meaningful = slice.some((p) => {
        const c = canonicalizeTerm(p);
        if (isStop(c)) return false;
        return (
          /\d/.test(p) ||
          p.includes("+") ||
          p.includes("#") ||
          p.length >= 4 ||
          len > 1
        );
      });
      if (meaningful) pushPhrase(slice);
    }
  }
  return phrases;
}

function wordSkillLike(w) {
  const c = canonicalizeTerm(w.replace(/^[.#]+|[.#]+$/g, ""));
  if (isStop(c)) return false;
  return (
    /\d/.test(w) ||
    w.includes("+") ||
    w.includes("#") ||
    c.length >= 4 ||
    TECH_ONE_SHOT.has(c)
  );
}

/** Short tokens that are still strong JD signals (e.g. go, sql). */
const TECH_ONE_SHOT = new Set([
  "sql",
  "go",
  "ui",
  "ux",
  "api",
  "ml",
  "ai",
  "aws",
  "gcp",
  "etl",
  "dba",
  "bi",
  "qa",
  "pm",
]);

/**
 * JD terms: deduped single tokens plus selective bigrams (avoids junk n-grams).
 */
export function extractJobDescriptionTerms(jdText) {
  const norm = normalizeText(jdText);
  const lines = norm.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  const singles = extractKeywordTokens(norm);
  const fromPriorityLines = [];
  for (const line of lines) {
    if (line.length > 160) continue;
    if (
      /requirements|qualifications|skills|responsibilities|what\s+you|must|should|nice\s+to|experience\s+with|proficient|familiar|knowledge|stack|tools|technologies/i.test(
        line,
      )
    ) {
      fromPriorityLines.push(...extractKeywordTokens(line));
    }
  }

  const bigrams = [];
  const seenBi = new Set();
  for (const line of lines) {
    const words = tokenize(line).map((w) => w.replace(/^[.#]+|[.#]+$/g, ""));
    for (let i = 0; i < words.length - 1; i++) {
      const a = words[i];
      const b = words[i + 1];
      if (!wordSkillLike(a) || !wordSkillLike(b)) continue;
      const ca = canonicalizeTerm(a);
      const cb = canonicalizeTerm(b);
      if (isStop(ca) || isStop(cb)) continue;
      const phrase = `${ca} ${cb}`;
      if (seenBi.has(phrase)) continue;
      seenBi.add(phrase);
      bigrams.push(phrase);
    }
  }

  const merged = [...new Set([...singles, ...fromPriorityLines, ...bigrams])];
  const filtered = merged.filter((t) => {
    const first = t.split(" ")[0];
    return t && !isStop(first);
  });

  const MAX = 80;
  return filtered.slice(0, MAX);
}
