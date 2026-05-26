import { getGroqClient } from "../../config/groq.js";

function safeJsonParse(raw) {
  if (!raw || typeof raw !== "string") return null;
  let t = raw.trim();
  if (t.startsWith("```")) {
    t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  }
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

/**
 * Structured ATS + career coaching feedback via Groq.
 */
export async function generateFeedback({
  role,
  company,
  jobDescription,
  scoring,
  structure,
  jobSignals,
  normalizedResumeSnippet,
}) {
  const groq = getGroqClient();

  const snippet = (normalizedResumeSnippet || "").slice(0, 6000);
  const companyLine = company ? `Company: ${company}` : "Company: (not provided)";

  const prompt = `You are a friendly career coach explaining a résumé check to someone who is NOT in HR and does NOT know hiring jargon. Analyze this résumé against the job and return JSON only (no markdown).

${companyLine}
Target role: ${role}

Job description (excerpt may be truncated):
${(jobDescription || "").slice(0, 8000)}

Technical signals (for your reasoning only — do NOT repeat jargon like "JD" or "algorithmic" in the user-facing text):
- Overall match score: ${scoring.score}/100 (estimated blend; not from any single employer system)
- Score pillars (0–100 each): ${JSON.stringify(scoring.pillars || {})}
- Job ad asks for education (we detected): ${jobSignals?.educationMentioned ? "yes" : "no"}
- Job ad suggests minimum years (if parsed): ${jobSignals?.minYearsSuggested ?? "not detected"}
- Words/phrases from the job ad that appear on the résumé: ${(scoring.matched || []).slice(0, 40).join(", ") || "(none listed)"}
- Words/phrases from the job ad that are missing on the résumé: ${(scoring.missing || []).slice(0, 40).join(", ") || "(none listed)"}
- Résumé sections found: ${(structure.sectionsDetected || []).join(", ") || "unknown"}
- Email on résumé: ${structure.contact?.emailValid ? "yes" : "no"}
- Phone on résumé: ${structure.contact?.phoneValid ? "yes" : "no"}
- Rough work history length (estimate): ${structure.experienceMonths != null ? `${structure.experienceMonths} months` : "unknown"}
- Bullet-style lines in experience (approx): ${structure.contentQuality?.bulletLineCount ?? "unknown"}
- Lines with numbers/metrics in experience (approx): ${structure.contentQuality?.metricSignals ?? "unknown"}
- File layout warnings: ${JSON.stringify(structure.formattingFlags || [])}

Résumé text (plain, for context):
${snippet}

Return ONE JSON object with exactly these keys:

{
  "in_simple_terms": "2–4 short sentences in everyday English. Explain what the score means as if talking to a friend. If you say ATS, write it once as: ATS (the hiring software companies use to read résumés). Avoid terms like JD, keyword density, heuristic, parse. Use 'you' and 'your'.",
  "executive_summary": "3–5 sentences: still clear and conversational, a bit more detail than in_simple_terms. Same plain-English rules.",
  "what_you_have": ["Each bullet: one simple idea. Say what is going well for this job in normal words."],
  "what_to_add": ["Each bullet: say what is missing or weak in plain English (e.g. 'The employer asked for X — add a line about that' instead of 'missing JD token')."],
  "enhancements": ["Simple tips to make bullets stronger: numbers, clearer results, order of sections — no buzzwords."],
  "ats_formatting": ["Explain file/layout tips so anyone understands (e.g. 'use a simple layout' not 'multi-column parsing risk')."],
  "other_suggestions": ["Honest, kind tips: gaps, interview prep, etc. in simple language."]
}

Rules for ALL user-facing strings:
- Reading level: about 8th grade. Short sentences. No unexplained acronyms (spell out once if needed).
- If you mention a technical skill, you may add a tiny plain-English hint in parentheses only when it helps (e.g. "SQL (working with databases)").
- Be specific to this role and company when possible, but stay understandable.
- Do not invent jobs, degrees, or skills the candidate does not have.
- If the résumé is not in English, say so once simply in other_suggestions.
- JSON only. No markdown. No text outside the JSON.`;

  const res = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.35,
    max_tokens: 2048,
  });

  const content = res.choices[0]?.message?.content || "";
  const parsed = safeJsonParse(content);

  if (parsed && typeof parsed === "object") {
    return {
      structured: {
        in_simple_terms: String(parsed.in_simple_terms || ""),
        executive_summary: String(parsed.executive_summary || ""),
        what_you_have: Array.isArray(parsed.what_you_have)
          ? parsed.what_you_have.map(String)
          : [],
        what_to_add: Array.isArray(parsed.what_to_add)
          ? parsed.what_to_add.map(String)
          : [],
        enhancements: Array.isArray(parsed.enhancements)
          ? parsed.enhancements.map(String)
          : [],
        ats_formatting: Array.isArray(parsed.ats_formatting)
          ? parsed.ats_formatting.map(String)
          : [],
        other_suggestions: Array.isArray(parsed.other_suggestions)
          ? parsed.other_suggestions.map(String)
          : [],
      },
      rawText: content,
    };
  }

  return {
    structured: null,
    rawText: content,
  };
}
