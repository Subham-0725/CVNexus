import Resume from "../models/Resume.js";
import ResumeContent from "../models/ResumeContent.js";

/**
 * PATCH /resumes/:id
 * Autosave full resume state
 */
export async function updateResume(req, res) {
  try {
    const { id } = req.params;
    const { data, isDraft = true } = req.body;

    if (!data || typeof data !== "object") {
      return res.status(400).json({
        error: "Invalid resume data",
      });
    }

    const resume = await Resume.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    // Store FULL editor state on main document (backwards compatible)
    resume.data = data;
    resume.isDraft = isDraft;
    resume.lastEditedAt = new Date();
    resume.version += 1;
    await resume.save();

    // Also upsert into structured ResumeContent collection
    await ResumeContent.findOneAndUpdate(
      { resumeId: resume._id, userId: req.user.id },
      {
        resumeId: resume._id,
        userId: req.user.id,
        ...data,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.json({
      success: true,
      version: resume.version,
      lastEditedAt: resume.lastEditedAt,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    return res.status(500).json({
      error: "Failed to update resume",
    });
  }
}

