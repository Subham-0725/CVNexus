import puppeteer from "puppeteer";
import { Document, Packer, Paragraph, TextRun } from "docx";

/* ================= PDF EXPORT ================= */

export async function generatePDF(html) {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const buffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "1in",
      right: "0.8in",
      bottom: "1in",
      left: "0.8in",
    },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size:8px; color:#9ca3af; width:100%; text-align:center;"></div>`,
    footerTemplate: `
      <div style="font-size:8px; color:#6b7280; width:100%; padding:0 36px; display:flex; justify-content:flex-end;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
  });

  await browser.close();
  return buffer;
}

/* ================= DOCX EXPORT ================= */

export async function generateDOCX(resumeData) {
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
  } = resumeData;

  const children = [];

  // Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName || "Your Name",
          bold: true,
          size: 32,
        }),
      ],
      spacing: { after: 200 },
    })
  );

  // Contact Info
  const contact = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
  ]
    .filter(Boolean)
    .join(" | ");
  if (contact) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contact, size: 20 })],
        spacing: { after: 300 },
      })
    );
  }

  // Summary
  if (summary) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "PROFESSIONAL SUMMARY", bold: true, size: 24 })],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: summary, size: 22 })],
        spacing: { after: 300 },
      })
    );
  }

  // Education
  if (education.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "EDUCATION", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree || ""}${
                edu.institution ? ` - ${edu.institution}` : ""
              }`,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: edu.year || "",
              italics: true,
              size: 20,
            }),
          ],
          spacing: { after: 200 },
        }),
      );

      if (edu.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: edu.description, size: 22 })],
            spacing: { after: 200 },
          }),
        );
      }
    });
  }

  // Work Experience
  if (workExperience.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "WORK EXPERIENCE", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    workExperience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.role || ""}${
                exp.company ? ` at ${exp.company}` : ""
              }`,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.startDate || ""}${
                exp.endDate ? ` - ${exp.endDate}` : ""
              }`,
              italics: true,
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        }),
      );

      if (exp.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: exp.description, size: 22 })],
            spacing: { after: 200 },
          }),
        );
      }
    });
  }

  // Projects
  if (projects.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "PROJECTS", bold: true, size: 24 })],
        spacing: { before: 200, after: 100 },
      }),
    );
    projects.forEach((proj) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: proj.title || "",
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 50 },
        }),
      );
      if (proj.link) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: proj.link,
                italics: true,
                size: 20,
              }),
            ],
            spacing: { after: 50 },
          }),
        );
      }
      if (proj.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: proj.description, size: 22 })],
            spacing: { after: 200 },
          }),
        );
      }
    });
  }

  // Technical Skills
  if (technicalSkills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "TECHNICAL SKILLS", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: technicalSkills.join(", "), size: 22 })],
        spacing: { after: 300 },
      }),
    );
  }

  // Soft Skills
  if (softSkills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "SOFT SKILLS", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: softSkills.join(", "), size: 22 })],
        spacing: { after: 300 },
      }),
    );
  }

  // Certifications
  if (certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "CERTIFICATIONS", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    certifications.forEach((cert) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${cert}`, size: 22 })],
          spacing: { after: 50 },
        }),
      );
    });
  }

  // Achievements
  if (achievements.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "ACHIEVEMENTS", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    achievements.forEach((ach) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${ach}`, size: 22 })],
          spacing: { after: 50 },
        }),
      );
    });
  }

  // Languages
  if (languages.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "LANGUAGES", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    languages.forEach((lang) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${lang}`, size: 22 })],
          spacing: { after: 50 },
        }),
      );
    });
  }

  // Interests
  if (hobbies.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "INTERESTS", bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
    );
    hobbies.forEach((hobby) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${hobby}`, size: 22 })],
          spacing: { after: 50 },
        }),
      );
    });
  }

  const doc = new Document({
    sections: [{ children }],
  });

  return await Packer.toBuffer(doc);
}
