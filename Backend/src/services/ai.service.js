import { getGroqClient } from "../config/groq.js";

const PROMPTS = {
  summary: (text) => `Improve this professional resume summary. Make it concise, impactful, ATS-friendly, and professional. Return plain text only, no markdown.\n\nText:\n${text}`,
  experience: (text) => `Rewrite this work experience description using strong action verbs and measurable achievements. Return plain text only, no markdown.\n\nText:\n${text}`,
  project: (text) => `Rewrite this project description for a resume focusing on technical impact and results. Return plain text only, no markdown.\n\nText:\n${text}`,
  education: (text) => `Improve this education section for clarity and professionalism. Return plain text only, no markdown.\n\nText:\n${text}`,
  generic: (text) => `Improve the following resume content while keeping it concise and professional. Return plain text only, no markdown.\n\nText:\n${text}`,
};

export async function improveResumeText(text, type = "generic") {
  const prompt = (PROMPTS[type] || PROMPTS.generic)(text);
  const groq = getGroqClient();

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1024,
  });

  return response.choices[0].message.content.trim();
}
