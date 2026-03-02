import Resume from "../models/Resume.js";
import { generatePDF, generateDOCX } from "../services/export.service.js";

/* ================= EXPORT HANDLER ================= */

export const exportResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { format } = req.query;

    console.log('Export request:', { id, format });

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

    console.log('Resume found:', resume.title);
    console.log('Resume data:', JSON.stringify(resume.data, null, 2));

    /* ================= PDF ================= */
    if (format === "pdf") {
      const html = buildHTML(resume.data);
      console.log('Generated HTML length:', html.length);

      const buffer = await generatePDF(html);
      console.log('PDF buffer size:', buffer.length);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${resume.title || "resume"}.pdf"`,
      );
      res.setHeader("Content-Length", buffer.length);

      return res.end(buffer);
    }

    /* ================= DOCX ================= */
    if (format === "docx") {
      const buffer = await generateDOCX(resume.data);
      console.log('DOCX buffer size:', buffer.length);

      res.set({
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${resume.title}.docx`,
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

/* ================= HTML BUILDER FOR PDF ================= */

function buildHTML(data) {
  const {
    personalInfo = {},
    summary = "",
    education = [],
    workExperience = [],
    projects = [],
    technicalSkills = [],
    softSkills = [],
    certifications = [],
    achievements = [],
    languages = [],
    hobbies = [],
  } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          /* Page size & margins */
          @page {
            size: A4;
            margin: 1in 0.8in;
          }

          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #111827;
          }

          .page {
            max-width: 720px;
            margin: 0 auto;
          }

          h1 {
            font-size: 22pt;
            font-weight: bold;
            margin-bottom: 3px;
            letter-spacing: 0.5px;
          }

          h2 {
            font-size: 12.5pt;
            margin: 0;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }

          h3 {
            font-size: 11.25pt;
            font-weight: bold;
          }

          p { margin-bottom: 3px; }

          .header {
            text-align: center;
            margin-bottom: 14px;
          }

          .headline {
            font-size: 11pt;
            margin-bottom: 2px;
          }

          .contact {
            font-size: 9.5pt;
            color: #4b5563;
            border-top: 0.8px solid #111827;
            padding-top: 4px;
            margin-top: 6px;
            text-align: center;
          }

          .section {
            margin-top: 18px;
            page-break-inside: avoid;
          }

          .section-divider {
            border-bottom: 0.8px solid #111827;
            margin-top: 2px;
            margin-bottom: 6px;
          }

          .item {
            margin-bottom: 6px;
            page-break-inside: avoid;
          }

          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            column-gap: 16px;
          }

          .subtext {
            font-style: italic;
            color: #4b5563;
            white-space: nowrap;
          }

          ul {
            margin-left: 16px;
            margin-top: 2px;
            page-break-inside: avoid;
          }

          li {
            margin-bottom: 2px;
            page-break-inside: avoid;
          }

          .skills-line {
            font-size: 10.5pt;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <!-- Personal Info -->
          <div class="header">
            <h1>${personalInfo.fullName || "Your Name"}</h1>
            ${
              personalInfo.headline
                ? `<div class="headline">${personalInfo.headline}</div>`
                : ""
            }
            <div class="contact">
              ${
                [
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                  personalInfo.linkedin,
                ]
                  .filter(Boolean)
                  .join(" | ")
              }
            </div>
          </div>

          <!-- Professional Summary -->
          ${
            summary
              ? `
          <div class="section">
            <h2>Professional Summary</h2>
            <div class="section-divider"></div>
            <p>${summary}</p>
          </div>
          `
              : ""
          }

          <!-- Education -->
          ${
            education.length > 0
              ? `
          <div class="section">
            <h2>Education</h2>
            <div class="section-divider"></div>
            ${education
              .map(
                (edu) => `
              <div class="item">
                <div class="item-header">
                  <h3>${edu.institution || ""}${
                  edu.degree ? ` - ${edu.degree}` : ""
                }</h3>
                  <span class="subtext">${edu.year || ""}</span>
                </div>
                ${
                  edu.description
                    ? `<p>${edu.description.replace(/\n/g, "<br/>")}</p>`
                    : ""
                }
              </div>
            `,
              )
              .join("")}
          </div>
          `
              : ""
          }

          <!-- Work Experience -->
          ${
            workExperience.length > 0
              ? `
          <div class="section">
            <h2>Work Experience</h2>
            <div class="section-divider"></div>
            ${workExperience
              .map(
                (exp) => `
              <div class="item">
                <div class="item-header">
                  <h3>${exp.role || ""}${
                  exp.company ? ` at ${exp.company}` : ""
                }</h3>
                  <span class="subtext">${exp.startDate || ""}${
                  exp.endDate ? ` - ${exp.endDate}` : ""
                }</span>
                </div>
                ${
                  exp.description
                    ? `<p>${exp.description.replace(/\n/g, "<br/>")}</p>`
                    : ""
                }
              </div>
            `,
              )
              .join("")}
          </div>
          `
              : ""
          }

          <!-- Projects -->
          ${
            projects.length > 0
              ? `
          <div class="section">
            <h2>Projects</h2>
            <div class="section-divider"></div>
            ${projects
              .map(
                (proj) => `
              <div class="item">
                <h3>${proj.title || ""}</h3>
                ${
                  proj.link
                    ? `<p class="subtext">${proj.link}</p>`
                    : ""
                }
                ${
                  proj.description
                    ? `<p>${proj.description.replace(/\n/g, "<br/>")}</p>`
                    : ""
                }
              </div>
            `,
              )
              .join("")}
          </div>
          `
              : ""
          }

          <!-- Technical Skills -->
          ${
            technicalSkills.length > 0
              ? `
          <div class="section">
            <h2>Technical Skills</h2>
            <div class="section-divider"></div>
            <p class="skills-line">${technicalSkills.join(", ")}</p>
          </div>
          `
              : ""
          }

          <!-- Soft Skills -->
          ${
            softSkills.length > 0
              ? `
          <div class="section">
            <h2>Soft Skills</h2>
            <div class="section-divider"></div>
            <p class="skills-line">${softSkills.join(", ")}</p>
          </div>
          `
              : ""
          }

          <!-- Certifications -->
          ${
            certifications.length > 0
              ? `
          <div class="section">
            <h2>Certifications</h2>
            <div class="section-divider"></div>
            <ul>
              ${certifications.map((c) => `<li>${c}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }

          <!-- Achievements -->
          ${
            achievements.length > 0
              ? `
          <div class="section">
            <h2>Achievements</h2>
            <div class="section-divider"></div>
            <ul>
              ${achievements.map((ach) => `<li>${ach}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }

          <!-- Languages -->
          ${
            languages.length > 0
              ? `
          <div class="section">
            <h2>Languages</h2>
            <div class="section-divider"></div>
            <ul>
              ${languages.map((lang) => `<li>${lang}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }

          <!-- Interests -->
          ${
            hobbies.length > 0
              ? `
          <div class="section">
            <h2>Interests</h2>
            <div class="section-divider"></div>
            <ul>
              ${hobbies.map((h) => `<li>${h}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }
        </div>
      </body>
    </html>
  `;
}
