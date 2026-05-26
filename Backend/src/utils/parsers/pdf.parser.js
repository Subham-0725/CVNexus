import pdf from "pdf-parse";
import fs from "fs";

export async function parsePDF(path) {
  let buffer;
  try {
    buffer = fs.readFileSync(path);
  } catch {
    throw new Error("PDF_READ_FAILED");
  }

  if (!buffer || buffer.length < 100) {
    throw new Error("PDF_CORRUPT_OR_EMPTY");
  }

  try {
    const data = await pdf(buffer);
    const text = (data?.text || "").trim();
    return text;
  } catch (err) {
    console.error("pdf-parse error:", err?.message || err);
    throw new Error("PDF_PARSE_FAILED");
  }
}
