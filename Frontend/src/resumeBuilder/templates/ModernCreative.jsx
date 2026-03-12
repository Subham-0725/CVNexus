// src/resumeBuilder/templates/ModernCreative.jsx
import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function ModernCreative({ data }) {
  const {
    personalInfo = {},
    summary,
    technicalSkills = [],
    softSkills = [],
    workExperience = [],
    projects = [],
    education = [],
    achievements = [],
    certifications = [],
    languages = [],
    hobbies = [],
  } = data || {};

  const sections = [];

  /* ================= 1. HEADER ================= */
  sections.push(
    <div
      key="header"
      className="w-full mb-3 break-inside-avoid font-serif text-black"
    >
      {/* 1. Name */}
      <h1 className="text-[26pt] font-semibold leading-none mb-1 text-black">
        {personalInfo.fullName || "First Last"}
      </h1>

      {/* 2. Headline */}
      {personalInfo.headline && (
        <p className="text-[12pt] text-black mb-1">{personalInfo.headline}</p>
      )}

      {/* 3. Email | Phone | Location | LinkedIn (Website added at end as fallback) */}
      <p className="text-[10.5pt] text-black">
        {[
          personalInfo.email,
          personalInfo.phone,
          personalInfo.location,
          personalInfo.linkedin,
          personalInfo.website,
        ]
          .filter(Boolean)
          .join(" | ")}
      </p>
    </div>,
  );

  /* ================= 2. SUMMARY ================= */
  if (summary) {
    sections.push(
      <div
        key="summary"
        className="mb-4 w-full break-inside-avoid font-serif text-[10.5pt] text-black"
      >
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2 mt-2">
          Professional Summary
        </h2>
        <p className="text-justify leading-relaxed whitespace-pre-wrap break-words min-w-0">
          {summary}
        </p>
      </div>,
    );
  }

  /* ================= 3. EXPERIENCE ================= */
  if (workExperience.length > 0) {
    workExperience.forEach((job, idx) => {
      sections.push(
        <div
          key={`exp-${idx}`}
          className="mb-3 w-full break-inside-avoid font-serif text-[10.5pt] text-black"
        >
          {/* Grouping header with the first item ensures no dangling titles on page breaks */}
          {idx === 0 && (
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2 mt-2">
              Experience
            </h2>
          )}

          <div className="flex justify-between font-bold">
            <span className="break-words">{job.company}</span>
            <span className="flex-shrink-0 ml-4">
              {job.startDate} – {job.endDate || "Present"}
            </span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="italic break-words">{job.role}</span>
            {job.location && (
              <span className="flex-shrink-0 ml-4">{job.location}</span>
            )}
          </div>

          {job.description && (
            <ul className="list-disc ml-[1.2rem] space-y-[2px]">
              {job.description
                .split("\n")
                .filter(Boolean)
                .map((bullet, i) => (
                  <li
                    key={i}
                    className="leading-relaxed break-words min-w-0"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {bullet}
                  </li>
                ))}
            </ul>
          )}
        </div>,
      );
    });
  }

  /* ================= 4. PROJECTS ================= */
  if (projects.length > 0) {
    projects.forEach((proj, idx) => {
      sections.push(
        <div
          key={`proj-${idx}`}
          className="mb-3 w-full break-inside-avoid font-serif text-[10.5pt] text-black"
        >
          {idx === 0 && (
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2 mt-2">
              Projects
            </h2>
          )}

          <div className="flex justify-between font-bold">
            <span className="break-words">{proj.title}</span>
            {proj.date && (
              <span className="flex-shrink-0 ml-4">{proj.date}</span>
            )}
          </div>

          {proj.technologies && (
            <div className="italic mb-1 break-words">
              Technologies: {proj.technologies}
            </div>
          )}
          {proj.link && (
            <div className="mb-1 text-blue-700 underline break-words">
              {proj.link}
            </div>
          )}

          {proj.description && (
            <ul className="list-disc ml-[1.2rem] space-y-[2px]">
              {proj.description
                .split("\n")
                .filter(Boolean)
                .map((bullet, i) => (
                  <li
                    key={i}
                    className="leading-relaxed break-words min-w-0"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {bullet}
                  </li>
                ))}
            </ul>
          )}
        </div>,
      );
    });
  }

  /* ================= 5. EDUCATION ================= */
  if (education.length > 0) {
    education.forEach((edu, idx) => {
      sections.push(
        <div
          key={`edu-${idx}`}
          className="mb-3 w-full break-inside-avoid font-serif text-[10.5pt] text-black"
        >
          {idx === 0 && (
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2 mt-2">
              Education
            </h2>
          )}

          <div className="flex justify-between font-bold">
            <span className="break-words">{edu.institution}</span>
            <span className="flex-shrink-0 ml-4">
              {edu.startDate ? `${edu.startDate} – ` : ""}
              {edu.endDate || edu.year}
            </span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="break-words">{edu.degree}</span>
            {edu.location && (
              <span className="flex-shrink-0 ml-4">{edu.location}</span>
            )}
          </div>

          {edu.description && (
            <ul className="list-disc ml-[1.2rem] space-y-[2px]">
              {edu.description
                .split("\n")
                .filter(Boolean)
                .map((bullet, i) => (
                  <li
                    key={i}
                    className="leading-relaxed break-words min-w-0"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {bullet}
                  </li>
                ))}
            </ul>
          )}
        </div>,
      );
    });
  }

  /* ================= 6. ACHIEVEMENTS ================= */
  if (achievements.length > 0) {
    sections.push(
      <div
        key="achievements"
        className="mb-4 w-full break-inside-avoid font-serif text-[10.5pt] text-black"
      >
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2 mt-2">
          Achievements
        </h2>
        <ul className="list-disc ml-[1.2rem] space-y-[2px]">
          {achievements.map((item, idx) => (
            <li
              key={idx}
              className="leading-relaxed break-words min-w-0"
              style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
              {typeof item === "string"
                ? item
                : `${item.title || ""} ${item.description || ""}`}
            </li>
          ))}
        </ul>
      </div>,
    );
  }

  /* ================= 7. OTHER (Skills, Certs, Languages, Hobbies) ================= */
  const otherBullets = [];

  if (technicalSkills.length > 0) {
    otherBullets.push(
      <li key="tech" className="leading-relaxed break-words min-w-0">
        <strong>Technical Skills:</strong> {technicalSkills.join(", ")}
      </li>,
    );
  }
  if (softSkills.length > 0) {
    otherBullets.push(
      <li key="soft" className="leading-relaxed break-words min-w-0">
        <strong>Soft Skills:</strong> {softSkills.join(", ")}
      </li>,
    );
  }
  if (certifications.length > 0) {
    otherBullets.push(
      <li key="certs" className="leading-relaxed break-words min-w-0">
        <strong>Certifications & Training:</strong>{" "}
        {certifications.map((c) => c.title || c).join(", ")}
      </li>,
    );
  }
  if (languages.length > 0) {
    otherBullets.push(
      <li key="langs" className="leading-relaxed break-words min-w-0">
        <strong>Languages:</strong> {languages.join(", ")}
      </li>,
    );
  }
  if (hobbies.length > 0) {
    otherBullets.push(
      <li key="hobbies" className="leading-relaxed break-words min-w-0">
        <strong>Interests:</strong>{" "}
        {hobbies.map((h) => h.title || h).join(", ")}
      </li>,
    );
  }

  if (otherBullets.length > 0) {
    sections.push(
      <div
        key="other"
        className="mb-4 w-full break-inside-avoid font-serif text-[10.5pt] text-black"
      >
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2 mt-2">
          Other
        </h2>
        <ul className="list-disc ml-[1.2rem] space-y-[2px]">{otherBullets}</ul>
      </div>,
    );
  }

  return (
    <div
      className="resume-document bg-white"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <A4PaginatedDocument>{sections}</A4PaginatedDocument>
    </div>
  );
}
