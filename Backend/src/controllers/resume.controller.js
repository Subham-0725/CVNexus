// src/controllers/resume.controller.js
import Resume from "../models/Resume.js";

/**
 * PATCH /resumes/:id
 * Autosave resume data
 */
export async function updateResume(req, res) {
  const { id } = req.params;
  const { data, isDraft = true } = req.body;

  if (!data || typeof data !== "object") {
    return res.status(400).json({ error: "Invalid resume data" });
  }

  const resume = await Resume.findOne({
    _id: id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({ error: "Resume not found" });
  }

  resume.data = data;
  resume.isDraft = isDraft;
  resume.lastEditedAt = new Date();

  await resume.save();

  res.json({
    success: true,
    lastEditedAt: resume.lastEditedAt,
  });
}
