import mammoth from "mammoth";
import fs from "fs";

export async function parseDOCX(path) {
  let buffer;
  try {
    buffer = fs.readFileSync(path);
  } catch {
    throw new Error("DOCX_READ_FAILED");
  }

  if (!buffer || buffer.length < 50) {
    throw new Error("DOCX_CORRUPT_OR_EMPTY");
  }

  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = (result?.value || "").trim();
    const messages = result?.messages || [];
    if (messages.some((m) => String(m?.type || "").toLowerCase() === "error")) {
      throw new Error("DOCX_PARSE_FAILED");
    }
    return text;
  } catch (err) {
    if (err.message === "DOCX_PARSE_FAILED") throw err;
    console.error("mammoth error:", err?.message || err);
    throw new Error("DOCX_PARSE_FAILED");
  }
}
