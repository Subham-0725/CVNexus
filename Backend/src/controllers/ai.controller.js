import { improveResumeText } from "../services/ai.service.js";

export async function improveText(req, res) {
  try {
    const { text, type } = req.body;

    if (!text || text.length < 10) {
      return res.status(400).json({ error: "Text too short" });
    }

    if (text.length > 2000) {
      return res.status(400).json({ error: "Text too long" });
    }

    const improved = await improveResumeText(text, type);
    res.json({ improved });
  } catch (error) {
    console.error("AI improve error:", error?.message || error);

    const isQuota =
      error?.status === 429 ||
      error?.message?.includes("429") ||
      error?.message?.includes("rate_limit") ||
      error?.message?.includes("quota");

    const status = isQuota ? 429 : 500;
    const message = isQuota
      ? "AI quota exceeded. Please try again later."
      : "AI improvement failed";
    res.status(status).json({ error: message });
  }
}
