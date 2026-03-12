import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function SoftProfessional({ data }) {
  const {
    personalInfo = {},
    summary,
    workExperience = [],
    projects = [],
    education = [],
    achievements = [],
    technicalSkills = [],
    softSkills = [],
    certifications = [],
    languages = [],
    hobbies = [],
  } = data;

  const sections = [];

  /* ================= HEADER ================= */
  sections.push(
    <div key="header" className="mb-6 break-inside-avoid">
      <header>
        <h1 className="text-[28pt] font-bold text-black leading-none mb-1 break-words">
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.headline && (
          <div className="text-[11pt] text-gray-800 mb-1.5 break-words">
            {personalInfo.headline}
          </div>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-black text-[9.5pt]">
          {personalInfo.phone && (
            <span className="break-all">{personalInfo.phone}</span>
          )}
          {personalInfo.email && (
            <span className="break-all">{personalInfo.email}</span>
          )}
          {personalInfo.linkedin && (
            <span className="break-all">{personalInfo.linkedin}</span>
          )}
          {personalInfo.location && (
            <span className="break-words">{personalInfo.location}</span>
          )}
          {personalInfo.website && (
            <span className="break-all">{personalInfo.website}</span>
          )}
        </div>
      </header>
    </div>,
  );

  /* ================= SUMMARY ================= */
  if (summary) {
    sections.push(
      <section key="summary" className="mb-6 break-inside-avoid">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt] mb-2">
          Summary
        </h2>
        <p className="text-[9.5pt] leading-relaxed text-black text-justify break-words whitespace-pre-wrap">
          {summary}
        </p>
      </section>,
    );
  }

  /* ================= EXPERIENCE ================= */
  if (workExperience.length > 0) {
    sections.push(
      <section key="experience-header" className="mb-3 break-inside-avoid">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt]">
          Experience
        </h2>
      </section>,
    );

    workExperience.forEach((job, i) => {
      sections.push(
        <div key={`exp-${i}`} className="mb-4 break-inside-avoid">
          <div className="flex justify-between items-baseline gap-4">
            <h3 className="text-[12pt] font-semibold text-black break-words">
              {job.role}
            </h3>
            <span className="text-[9.5pt] text-gray-800 whitespace-nowrap">
              {job.location}
            </span>
          </div>
          <div className="flex justify-between items-baseline mb-1.5 gap-4">
            <span className="text-[#2b83c9] text-[10pt] break-words">
              {job.company}
            </span>
            <span className="text-[9.5pt] text-gray-800 whitespace-nowrap">
              {job.startDate} - {job.endDate || "Present"}
            </span>
          </div>
          {job.description && (
            <ul className="list-disc ml-5 space-y-1 text-[9.5pt] text-black">
              {job.description
                .split("\n")
                .filter(Boolean)
                .map((line, idx) => (
                  <li
                    key={idx}
                    className="pl-1 break-words whitespace-pre-wrap"
                  >
                    {line}
                  </li>
                ))}
            </ul>
          )}
        </div>,
      );
    });
  }

  /* ================= PROJECTS ================= */
  if (projects.length > 0) {
    sections.push(
      <section key="projects-header" className="mb-3 break-inside-avoid mt-2">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt]">
          Projects
        </h2>
      </section>,
    );

    projects.forEach((project, i) => {
      sections.push(
        <div key={`proj-${i}`} className="mb-4 break-inside-avoid">
          <div className="flex justify-between items-baseline gap-4">
            <h3 className="text-[12pt] font-semibold text-black break-words">
              {project.title}
            </h3>
            <span className="text-[9.5pt] text-gray-800 whitespace-nowrap">
              {project.date}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              className="text-[#2b83c9] text-[9.5pt] mb-1 block break-all"
            >
              {project.link}
            </a>
          )}
          {project.description && (
            <p className="text-[9.5pt] text-black mt-1 break-words whitespace-pre-wrap">
              {project.description}
            </p>
          )}
        </div>,
      );
    });
  }

  /* ================= EDUCATION ================= */
  if (education.length > 0) {
    sections.push(
      <section key="education-header" className="mb-3 break-inside-avoid mt-2">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt]">
          Education
        </h2>
      </section>,
    );

    education.forEach((edu, i) => {
      sections.push(
        <div key={`edu-${i}`} className="mb-3 break-inside-avoid">
          <div className="flex justify-between items-baseline gap-4">
            <h3 className="text-[12pt] font-semibold text-black break-words">
              {edu.degree}
            </h3>
            <span className="text-[9.5pt] text-gray-800 whitespace-nowrap">
              {edu.location}
            </span>
          </div>
          <div className="flex justify-between items-baseline gap-4">
            <span className="text-[10pt] text-black break-words">
              {edu.institution}
            </span>
            <span className="text-[9.5pt] text-gray-800 whitespace-nowrap">
              {edu.startDate ? `${edu.startDate} - ` : ""}
              {edu.endDate || edu.year}
            </span>
          </div>
          {edu.description && (
            <p className="text-[9.5pt] text-black mt-1 break-words whitespace-pre-wrap">
              {edu.description}
            </p>
          )}
        </div>,
      );
    });
  }

  /* ================= KEY ACHIEVEMENTS ================= */
  if (achievements.length > 0) {
    sections.push(
      <section
        key="achievements-header"
        className="mb-3 mt-2 break-inside-avoid"
      >
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt]">
          Key Achievements
        </h2>
      </section>,
    );

    // Chunk the achievements into rows of 2 so the paginator can split rows across pages
    for (let i = 0; i < achievements.length; i += 2) {
      const pair = achievements.slice(i, i + 2);
      sections.push(
        <div
          key={`achievements-row-${i}`}
          className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4 break-inside-avoid"
        >
          {pair.map((item, j) => {
            const title = typeof item === "string" ? item : item.title;
            const desc = typeof item === "string" ? "" : item.description;
            return (
              <div key={j}>
                <h4 className="text-[#2b83c9] font-semibold text-[10pt] mb-1 break-words">
                  {title}
                </h4>
                {desc && (
                  <p className="text-[9.5pt] text-black leading-snug break-words whitespace-pre-wrap">
                    {desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>,
      );
    }
  }

  /* ================= BOTTOM GRID (Tech Skills, Soft Skills, Certs, Langs, Interests) ================= */
  const bottomBlocks = [];

  const joinedTechSkills = technicalSkills.filter(Boolean).join(", ");
  if (joinedTechSkills) {
    bottomBlocks.push(
      <div key="technical-skills">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt] mb-3">
          Technical Skills
        </h2>
        <p className="text-[9.5pt] text-black break-words whitespace-pre-wrap">
          {joinedTechSkills}
        </p>
      </div>,
    );
  }

  const joinedSoftSkills = softSkills.filter(Boolean).join(", ");
  if (joinedSoftSkills) {
    bottomBlocks.push(
      <div key="soft-skills">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt] mb-3">
          Soft Skills
        </h2>
        <p className="text-[9.5pt] text-black break-words whitespace-pre-wrap">
          {joinedSoftSkills}
        </p>
      </div>,
    );
  }

  if (certifications.length > 0) {
    bottomBlocks.push(
      <div key="certifications">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt] mb-3">
          Certifications
        </h2>
        <ul className="list-disc ml-4 space-y-1 text-[9.5pt] text-black">
          {certifications.map((cert, i) => (
            <li key={i} className="break-words">
              {cert.title || cert}
              {cert.date && ` (${cert.date})`}
            </li>
          ))}
        </ul>
      </div>,
    );
  }

  const joinedLangs = languages.filter(Boolean).join(", ");
  if (joinedLangs) {
    bottomBlocks.push(
      <div key="languages">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt] mb-3">
          Languages
        </h2>
        <p className="text-[9.5pt] text-black break-words whitespace-pre-wrap">
          {joinedLangs}
        </p>
      </div>,
    );
  }

  const joinedHobbies = hobbies
    .map((h) => h.title || h)
    .filter(Boolean)
    .join(", ");
  if (joinedHobbies) {
    bottomBlocks.push(
      <div key="interests">
        <h2 className="text-gray-500 font-bold uppercase tracking-widest text-[10pt] mb-3">
          Interests
        </h2>
        <p className="text-[9.5pt] text-black break-words whitespace-pre-wrap">
          {joinedHobbies}
        </p>
      </div>,
    );
  }

  // Chunk the bottom grid blocks into rows of 2 so the paginator can split rows across pages
  if (bottomBlocks.length > 0) {
    for (let i = 0; i < bottomBlocks.length; i += 2) {
      const pair = bottomBlocks.slice(i, i + 2);
      sections.push(
        <div
          key={`bottom-row-${i}`}
          className="grid grid-cols-2 gap-x-8 gap-y-6 mb-5 break-inside-avoid"
        >
          {pair}
        </div>,
      );
    }
  }

  return (
    <>
      <style>{`
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          background: white;
          margin-bottom: 24px;
          box-sizing: border-box;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          overflow-wrap: break-word;
          word-break: break-word;
        }
        
        @media print {
          .a4-page {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
            page-break-inside: avoid;
          }
          .a4-page:last-child {
            page-break-after: auto;
          }
        }
      `}</style>
      <div
        className="resume-document bg-white"
        style={{
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <A4PaginatedDocument>{sections}</A4PaginatedDocument>
      </div>
    </>
  );
}
