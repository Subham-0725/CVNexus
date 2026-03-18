import Resume from "../models/Resume.js";
import ResumeContent from "../models/ResumeContent.js";
import Document from "../models/Document.js";
import { generatePDF, generateDOCX, buildTemplateHTML } from "../services/export.service.js";

/* ================= EXPORT HANDLER ================= */

export const exportResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { format, filename } = req.query;

    console.log('Export request:', { id, format, filename });

    if (!["pdf", "docx"].includes(format)) {
      return res.status(400).json({
        error: "Invalid export format",
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

    console.log("Resume found:", resume.title);
    console.log("Resume data:", JSON.stringify(resume.data, null, 2));

    // Prefer structured content document if present
    const content = await ResumeContent.findOne({
      resumeId: resume._id,
      userId: req.user.id,
    });

    const exportData = content
      ? {
        personalInfo: content.personalInfo,
        summary: content.summary,
        education: content.education,
        workExperience: content.workExperience,
        projects: content.projects,
        technicalSkills: content.technicalSkills,
        softSkills: content.softSkills,
        certifications: content.certifications,
        achievements: content.achievements,
        languages: content.languages,
        hobbies: content.hobbies,
      }
      : resume.data || {};

    /* ================= PDF ================= */
    if (format === "pdf") {
      const html = buildTemplateHTML(exportData, resume.templateSlug);
      console.log('Generated HTML length:', html.length);

      const buffer = await generatePDF(html);
      console.log('PDF buffer size:', buffer.length);

      // Save to Document Library BEFORE sending response
      try {
        const doc = await Document.create({
          userId: req.user.id,
          resumeId: resume._id,
          title: filename || resume.title || "Untitled Resume",
          format: "pdf",
          fileData: Buffer.from(buffer),
          fileSize: buffer.length,
          templateSlug: resume.templateSlug,
        });
        console.log("✅ Document saved to library:", doc._id);
      } catch (err) {
        console.error("❌ Failed to save document:", err.message);
        console.error("Full error:", err);
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename || resume.title || "resume"}.pdf"`,
      );
      res.setHeader("Content-Length", buffer.length);

      return res.end(buffer);
    }

    /* ================= DOCX ================= */
    if (format === "docx") {
      const buffer = await generateDOCX(exportData);
      console.log('DOCX buffer size:', buffer.length);

      // Save PDF copy to Document Library
      try {
        const html = buildTemplateHTML(exportData, resume.templateSlug);
        const pdfBuffer = await generatePDF(html);
        await Document.create({
          userId: req.user.id,
          resumeId: resume._id,
          title: filename || resume.title || "Untitled Resume",
          format: "pdf",
          fileData: Buffer.from(pdfBuffer),
          fileSize: pdfBuffer.length,
          templateSlug: resume.templateSlug,
        });
        console.log("✅ PDF copy saved to library");
      } catch (err) {
        console.error("❌ Failed to save PDF copy:", err);
      }

      res.set({
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${filename || resume.title}.docx`,
      });

      return res.send(buffer);
    }
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({
      error: "Failed to export resume",
    });
  }
};
