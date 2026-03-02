import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function CleanATS({ data }) {
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
  } = data;

  const sections = [];

  /* ================= HEADER ================= */
  sections.push(
    <div key="header" className="mb-10 break-words">
      <header className="text-center">
        <h1 className="text-[14pt] font-extrabold uppercase mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {personalInfo.headline && (
          <p className="text-[12pt] mb-2">{personalInfo.headline}</p>
        )}

        <div className="text-[12pt] flex flex-wrap justify-center gap-x-2 break-all">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </header>
    </div>,
  );

  /* ================= SUMMARY ================= */
  if (summary) {
    sections.push(
      <Section key="summary" title="Professional Summary">
        <p className="text-[12pt] break-words text-justify">{summary}</p>
      </Section>,
    );
  }

  /* ================= EDUCATION ================= */
  if (education.length > 0) {
    sections.push(
      <Section key="education" title="Education">
        {education.map((edu, i) => (
          <div key={i} className="mb-4 break-words">
            <div className="flex justify-between">
              <span className="font-semibold">
                {edu.institution}
                {edu.location ? `, ${edu.location}` : ""}
              </span>
              <span>{edu.endDate || edu.year}</span>
            </div>

            <div className="font-bold">{edu.degree}</div>

            {edu.description && <div>{edu.description}</div>}
          </div>
        ))}
      </Section>,
    );
  }

  /* ================= EXPERIENCE ================= */
  if (workExperience.length > 0) {
    sections.push(
      <Section key="experience" title="Relevant Experience">
        {workExperience.map((job, i) => (
          <div key={i} className="mb-6 break-words">
            <div className="flex justify-between">
              <span>
                {job.company}
                {job.location ? `, ${job.location}` : ""}
              </span>
              <span>
                {job.startDate} – {job.endDate || "Present"}
              </span>
            </div>

            <div className="font-bold mb-2">{job.role}</div>

            {job.description && (
              <ul className="list-disc ml-5 space-y-1">
                {job.description
                  .split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx} className="break-words">
                      {line}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </Section>,
    );
  }

  /* ================= PROJECTS ================= */
  if (projects.length > 0) {
    sections.push(
      <Section key="projects" title="Projects">
        {projects.map((project, i) => (
          <div key={i} className="mb-4 break-words">
            <div className="flex justify-between">
              <span className="font-bold">
                {project.title || "Project Name"}
              </span>
              {project.date && <span>{project.date}</span>}
            </div>

            {project.link && (
              <div className="break-all text-[12pt]">{project.link}</div>
            )}

            {project.description && <p>{project.description}</p>}

            {project.technologies && (
              <p>
                <strong>Technologies:</strong> {project.technologies}
              </p>
            )}
          </div>
        ))}
      </Section>,
    );
  }

  /* ================= TECHNICAL SKILLS ================= */
  if (technicalSkills.length > 0) {
    sections.push(
      <Section key="technicalSkills" title="Technical Skills">
        <p className="break-words">{technicalSkills.join(", ")}</p>
      </Section>,
    );
  }

  /* ================= SOFT SKILLS ================= */
  if (softSkills.length > 0) {
    sections.push(
      <Section key="softSkills" title="Soft Skills">
        <p className="break-words">{softSkills.join(", ")}</p>
      </Section>,
    );
  }

  /* ================= ACHIEVEMENTS ================= */
  if (achievements.length > 0) {
    sections.push(
      <Section key="achievements" title="Achievements">
        <ul className="list-disc ml-5 space-y-1">
          {achievements.map((item, i) => (
            <li key={i} className="break-words">
              {typeof item === "string"
                ? item
                : `${item.title || ""} ${item.description || ""}`}
            </li>
          ))}
        </ul>
      </Section>,
    );
  }

  /* ================= CERTIFICATIONS ================= */
  if (certifications.length > 0) {
    sections.push(
      <Section key="certifications" title="Certifications">
        <ul className="list-disc ml-5 space-y-1">
          {certifications.map((cert, i) => (
            <li key={i} className="break-words">
              {cert.title || cert}
              {cert.issuer && ` - ${cert.issuer}`}
              {cert.date && ` (${cert.date})`}
            </li>
          ))}
        </ul>
      </Section>,
    );
  }

  /* ================= LANGUAGES ================= */
  if (languages.length > 0) {
    sections.push(
      <Section key="languages" title="Languages">
        <p className="break-words">{languages.join(", ")}</p>
      </Section>,
    );
  }

  /* ================= INTERESTS ================= */
  if (hobbies.length > 0) {
    sections.push(
      <Section key="hobbies" title="Interests">
        <p className="break-words">
          {hobbies.map((h) => h.title || h).join(", ")}
        </p>
      </Section>,
    );
  }

  return (
    <div
      className="resume-document"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <A4PaginatedDocument>{sections}</A4PaginatedDocument>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-8 break-words">
      <h2 className="text-[14pt] font-bold border-b-2 border-black pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
