// src/resumeBuilder/templates/CleanATS.jsx
import React from "react";

export default function CleanATS({ data }) {
  const {
    personalInfo = {},
    summary,
    technicalSkills = [],
    softSkills = [],
    workExperience = [],
    education = [],
    achievements = [],
    certifications = [],
    languages = [],
    hobbies = [],
  } = data;

  const allSkills = [...technicalSkills, ...softSkills];

  // Professional Slate & Sage Palette
  const colors = {
    accent: "#6B8E6B", // Muted, sophisticated sage
    primary: "#111827", // Near-black for better readability
    secondary: "#6B7280", // Slate gray for metadata
    border: "#000000",
  };

  return (
    <div className="p-16 font-sans text-[10pt] leading-[1.5] text-[#111827] bg-white max-w-[850px] mx-auto">
      {/* ================= HEADER ================= */}
      <header className="mb-10">
        <h1 className="text-[34pt] font-black tracking-tighter uppercase leading-[0.85] text-black">
          {personalInfo.fullName || "MIA WYATT"}
        </h1>

        <div
          className="text-[13pt] font-bold mt-3 pb-2 border-b-[2.5px] border-black tracking-tight"
          style={{ color: colors.accent }}
        >
          {personalInfo.headline || "Professional Headline"}
        </div>

        {/* Minimalist Contact Info */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[8.5pt] font-bold text-gray-500 mt-4 uppercase tracking-[0.05em]">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: colors.accent }}>[at]</span>{" "}
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: colors.accent }}>[p]</span>{" "}
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: colors.accent }}>[in]</span> LinkedIn
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <span style={{ color: colors.accent }}>[l]</span>{" "}
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {summary && (
        <Section title="Summary">
          <p className="text-[#374151] leading-relaxed text-[10.5pt] max-w-[95%]">
            {summary}
          </p>
        </Section>
      )}

      {/* ================= SKILLS ================= */}
      {allSkills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
            {allSkills.map((skill, i) => (
              <span
                key={i}
                className="border-b-[1.5px] border-gray-200 px-1 py-0.5 text-[9pt] font-bold text-gray-600 uppercase tracking-wider"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {workExperience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-8">
            {workExperience.map((job, idx) => (
              <div key={job.id || idx}>
                <h3 className="text-[12pt] font-black text-black tracking-tight">
                  {job.role}
                </h3>

                <div
                  className="font-bold text-[10.5pt] mt-0.5"
                  style={{ color: colors.accent }}
                >
                  {job.company}
                </div>

                <div className="flex gap-4 text-[8.5pt] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-3">
                  <span>
                    {job.startDate} – {job.endDate || "Present"}
                  </span>
                  {job.location && <span>• {job.location}</span>}
                </div>

                {job.description && (
                  <ul className="list-none space-y-2 text-[#374151] text-[10pt]">
                    {job.description.split("\n").map((line, i) => (
                      <li
                        key={i}
                        className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-gray-300"
                      >
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

      {/* ================= EDUCATION ================= */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="mb-4">
              <div className="text-[11.5pt] font-extrabold text-black uppercase tracking-tight">
                {edu.degree}
              </div>
              <div
                className="font-bold text-[10pt]"
                style={{ color: colors.accent }}
              >
                {edu.institution}
              </div>
              <div className="text-[8.5pt] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                {edu.startDate || edu.year} – {edu.endDate || ""}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* ================= TWO-COLUMN GRID ================= */}
      <div className="grid grid-cols-2 gap-x-16 mt-4">
        {achievements.length > 0 && (
          <Section title="Key Achievements">
            <div className="space-y-6">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className="border-t border-gray-100 pt-3 first:border-0 first:pt-0"
                >
                  <div className="font-bold text-[10pt] flex items-start gap-3">
                    <span style={{ color: colors.accent }}>//</span>
                    <span className="leading-tight uppercase tracking-tight">
                      {a.title || a}
                    </span>
                  </div>
                  {a.description && (
                    <p className="text-[9pt] text-gray-500 ml-6 mt-1.5 leading-normal">
                      {a.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Training">
            <div className="space-y-6">
              {certifications.map((c, i) => (
                <div key={i}>
                  <div
                    className="font-bold text-[10pt] uppercase tracking-tight"
                    style={{ color: colors.accent }}
                  >
                    {c.title || c}
                  </div>
                  {c.description && (
                    <p className="text-[9pt] text-gray-500 mt-1.5 italic">
                      {c.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* ================= BOTTOM ROW (Languages & Interests) ================= */}
      <div className="grid grid-cols-2 gap-x-16">
        {languages.length > 0 && (
          <Section title="Languages">
            <div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-3">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="font-bold text-[9pt] uppercase tracking-widest"
                >
                  {lang}
                </div>
              ))}
            </div>
          </Section>
        )}

        {hobbies.length > 0 && (
          <Section title="Interests">
            <div className="space-y-4 border-t-2 border-black pt-3">
              {hobbies.slice(0, 2).map((h, i) => (
                <div key={i}>
                  <div className="font-bold text-[9pt] uppercase tracking-widest">
                    {h.title || h}
                  </div>
                  <p className="text-[8.5pt] text-gray-500 leading-tight">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="uppercase font-black text-[14pt] border-b-[2.5px] border-black mb-5 tracking-tight pb-1">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
