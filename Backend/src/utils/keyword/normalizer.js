/**
 * Normalize resume/JD text for matching while preserving word boundaries.
 */
export function normalizeText(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .normalize("NFKC")
    .replace(/\u00a0/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s+#.\-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tokenize into alphanumeric chunks (keeps + in c++, # in c# when adjacent). */
export function tokenize(text) {
  const n = normalizeText(text);
  if (!n) return [];
  return n.split(/\s+/).filter(Boolean);
}
