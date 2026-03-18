export function cleanText(text) {
  return text.replace(/\*\*/g, "").replace(/•/g, "-").trim();
}
