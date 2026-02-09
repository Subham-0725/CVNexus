// src/resumeBuilder/templates/CleanATS.jsx
import React from "react";

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

  return (
    <div
      className="w-full max-w-[210mm] mx-auto bg-white p-16 text-gray-900 text-[12pt] leading-normal selection:bg-gray-200"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* ================= HEADER ================= */}
      <header className="text-center mb-10">
        <h1 className="text-[14pt] font-extrabold uppercase tracking-tight text-black mb-3">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {personalInfo.headline && (
          <p className="text-[12pt] text-gray-700 font-medium mb-2">
            {personalInfo.headline}
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[12pt] text-gray-800 font-medium">
          {personalInfo.location && (
            <span>{personalInfo.location}</span>
          )}

          {!personalInfo.location && (
            <span>
              {[
                personalInfo.address,
                personalInfo.city,
                personalInfo.state,
                personalInfo.zip,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}

          {personalInfo.phone && (
            <>
              <span className="text-gray-400">|</span>
              <span>{personalInfo.phone}</span>
            </>
          )}

          {personalInfo.email && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:underline"
              >
                {personalInfo.email}
              </a>
            </>
          )}

          {personalInfo.linkedin && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </>
          )}

          {personalInfo.website && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {personalInfo.website.replace(/^https?:\/\//, "")}
              </a>
            </>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {summary && (
        <Section title="Professional Summary">
          <p className="text-[12pt] leading-relaxed text-justify text-gray-800">
            {summary}
          </p>
        </Section>
      )}

      {/* ================= EDUCATION ================= */}
      {education.length > 0 && (
        <Section title="Education">
          <div className="flex flex-col gap-4">
            {education.map((edu, idx) => (
              <div key={idx} className="relative">
                {/* Top Row: University & Date */}
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[12pt] font-semibold text-gray-900">
                    {edu.institution}
                    {edu.location ? `, ${edu.location}` : ""}
                  </span>
                  <span className="text-[12pt] font-medium text-gray-800 tabular-nums">
                    {edu.endDate || edu.year}
                  </span>
                </div>

                {/* Degree */}
                <div className="text-[12pt] font-bold text-black mb-1">
                  {edu.degree}
                </div>

                {/* Description / Coursework */}
                {edu.description && (
                  <div className="text-[12pt] text-gray-700 leading-snug">
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= RELEVANT EXPERIENCE ================= */}
      {workExperience.length > 0 && (
        <Section title="Relevant Experience">
          <div className="flex flex-col gap-6">
            {workExperience.map((job, idx) => (
              <div key={idx}>
                {/* Top Row: Company & Date */}
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[12pt] text-gray-900">
                    {job.company}
                    {job.location ? `, ${job.location}` : ""}
                  </span>
                  <span className="text-[12pt] font-medium text-gray-800 tabular-nums whitespace-nowrap">
                    {job.startDate} – {job.endDate || "Present"}
                  </span>
                </div>

                {/* Role */}
                <div className="text-[12pt] font-bold text-black mb-2">
                  {job.role}
                </div>

                {/* Bullets */}
                {job.description && (
                  <ul className="list-disc ml-5 space-y-1.5 text-[12pt] text-gray-800 marker:text-black">
                    {job.description
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i} className="pl-1 leading-snug">
                          {line}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= PROJECTS ================= */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="flex flex-col gap-5">
            {projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[12pt] font-bold text-black">
                    {project.title || "Project Name"}
                  </span>
                  {project.date && (
                    <span className="text-[12pt] text-gray-800 tabular-nums">
                      {project.date}
                    </span>
                  )}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12pt] text-blue-600 hover:underline block mb-1"
                  >
                    {project.link}
                  </a>
                )}
                {project.description && (
                  <p className="text-[12pt] text-gray-800 leading-snug mt-1">
                    {project.description}
                  </p>
                )}
                {project.technologies && (
                  <p className="text-[12pt] text-gray-700 mt-1">
                    <span className="font-semibold">Technologies:</span> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= TECHNICAL SKILLS ================= */}
      {technicalSkills.length > 0 && (
        <Section title="Technical Skills">
          <p className="text-[12pt] text-gray-800 leading-relaxed">
            {technicalSkills.join(", ")}
          </p>
        </Section>
      )}

      {/* ================= SOFT SKILLS ================= */}
      {softSkills.length > 0 && (
        <Section title="Soft Skills">
          <p className="text-[12pt] text-gray-800 leading-relaxed">
            {softSkills.join(", ")}
          </p>
        </Section>
      )}

      {/* ================= ACHIEVEMENTS ================= */}
      {achievements.length > 0 && (
        <Section title="Achievements">
          <ul className="list-disc ml-5 space-y-2 text-[12pt] text-gray-800 marker:text-black">
            {achievements.map((item, idx) => (
              <li key={idx} className="pl-1 leading-snug">
                {typeof item === "string" ? item : (
                  <>
                    {item.title && <span className="font-bold">{item.title}</span>}
                    {item.title && item.description && <span> - </span>}
                    {item.description}
                    {item.date && <span className="text-gray-700"> ({item.date})</span>}
                  </>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          <ul className="list-disc ml-5 space-y-2 text-[12pt] text-gray-800 marker:text-black">
            {certifications.map((cert, idx) => (
              <li key={idx} className="pl-1 leading-snug">
                {cert.title || cert}
                {cert.issuer && <span> - {cert.issuer}</span>}
                {cert.date && <span className="text-gray-700"> ({cert.date})</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ================= LANGUAGES ================= */}
      {languages.length > 0 && (
        <Section title="Languages">
          <p className="text-[12pt] text-gray-800 leading-relaxed">
            {languages.join(", ")}
          </p>
        </Section>
      )}

      {/* ================= INTERESTS ================= */}
      {hobbies.length > 0 && (
        <Section title="Interests">
          <p className="text-[12pt] text-gray-800 leading-relaxed">
            {hobbies.map((h) => h.title || h).join(", ")}
          </p>
        </Section>
      )}
    </div>
  );
}

// Reusable Section Component
function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-[14pt] font-extrabold uppercase tracking-widest border-b-2 border-black pb-2 mb-4 text-black">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
