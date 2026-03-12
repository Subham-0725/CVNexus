import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function ModernATS({ data }) {
  const {
    personalInfo = {},
    summary = "",
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
    <header key="header" className="pt-6 pb-4 text-center break-words">
      <h1 className="text-[32pt] font-black uppercase tracking-widest text-[#111111] leading-none mb-2">
        {personalInfo.fullName || "Your Name"}
      </h1>

      {personalInfo.headline && (
        <p className="text-[14pt] text-[#444444] font-medium mb-5">
          {personalInfo.headline}
        </p>
      )}

      {/* Contact Info Row: Phone -> Email -> Location -> LinkedIn */}
      <address className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10.5pt] text-[#444444] not-italic">
        {personalInfo.phone && (
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.8-3.9-8.7-8.7-8.7v2c3.7 0 6.7 3 6.7 6.7z" />
            </svg>
            {personalInfo.phone}
          </span>
        )}
        {personalInfo.email && (
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {personalInfo.email}
          </span>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
            </svg>
            {personalInfo.location}
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            {personalInfo.linkedin
              .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
              .replace(/\/$/, "")}
          </span>
        )}
      </address>
    </header>,
  );

  /* ================= ABOUT ME ================= */
  if (summary && summary.trim().length > 0) {
    sections.push(
      <Section key="summary" title="About Me">
        <p className="text-[10.5pt] text-[#333333] leading-relaxed text-justify">
          {summary}
        </p>
      </Section>,
    );
  }

  /* ================= EDUCATION ================= */
  if (education.length > 0) {
    sections.push(
      <Section key="education" title="Education">
        {education.map((edu, i) => (
          <div key={i} className="mb-4">
            <div className="text-[10.5pt] text-[#555555] mb-0.5">
              {edu.institution}
              {edu.location ? `, ${edu.location}` : ""}
              {(edu.startDate || edu.endDate || edu.year) && " | "}
              {edu.startDate ? `${edu.startDate} - ` : ""}
              {edu.endDate || edu.year}
            </div>
            <div className="font-bold text-[11.5pt] text-[#111111]">
              {edu.degree}
            </div>
            {edu.description && (
              <p className="text-[10pt] text-[#444444] leading-relaxed mt-1">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </Section>,
    );
  }

  /* ================= WORK EXPERIENCE ================= */
  if (workExperience.length > 0) {
    sections.push(
      <Section key="experience" title="Work Experience">
        {workExperience.map((job, i) => (
          <div key={i} className="mb-5">
            <div className="text-[10.5pt] text-[#555555] mb-0.5">
              {job.company}
              {job.location ? `, ${job.location}` : ""}
              {(job.startDate || job.endDate) && " | "}
              {job.startDate} {job.startDate && job.endDate ? "-" : ""}{" "}
              {job.endDate || (job.startDate ? "Present" : "")}
            </div>
            <div className="font-bold text-[11.5pt] text-[#111111]">
              {job.role}
            </div>
            {job.description && (
              <div className="text-[10pt] text-[#333333] leading-relaxed mt-1.5 space-y-1">
                {job.description
                  .split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
              </div>
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
          <div key={i} className="mb-4">
            <div className="text-[10.5pt] text-[#555555] mb-0.5 flex justify-between">
              <span>
                {project.title} {project.date ? `| ${project.date}` : ""}
              </span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
            <div className="font-bold text-[11.5pt] text-[#111111]">
              {project.technologies}
            </div>
            {project.description && (
              <p className="text-[10pt] text-[#333333] leading-relaxed mt-1">
                {project.description}
              </p>
            )}
          </div>
        ))}
      </Section>,
    );
  }

  /* ================= SKILLS ================= */
  const allSkills = [...technicalSkills, ...softSkills].filter(Boolean);
  if (allSkills.length > 0) {
    sections.push(
      <Section key="skills" title="Skills">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 list-disc ml-5 text-[10.5pt] text-[#222222] marker:text-[#444444]">
          {allSkills.map((skill, i) => (
            <li key={i} className="pl-1 break-words">
              {skill}
            </li>
          ))}
        </ul>
      </Section>,
    );
  }

  /* ================= ACHIEVEMENTS ================= */
  if (achievements.length > 0) {
    sections.push(
      <Section key="achievements" title="Achievements">
        <ul className="list-disc ml-5 text-[10.5pt] text-[#333333] space-y-1.5 marker:text-[#444444]">
          {achievements.map((item, i) => (
            <li key={i} className="pl-1 break-words">
              {typeof item === "string" ? (
                item
              ) : (
                <>
                  <span className="font-bold text-[#111111]">{item.title}</span>
                  {item.description && ` - ${item.description}`}
                </>
              )}
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
        {certifications.map((cert, i) => (
          <div key={i} className="mb-3">
            <div className="text-[10.5pt] text-[#555555] mb-0.5">
              {cert.issuer} {cert.date ? `| ${cert.date}` : ""}
            </div>
            <div className="font-bold text-[11pt] text-[#111111]">
              {cert.title || cert}
            </div>
          </div>
        ))}
      </Section>,
    );
  }

  /* ================= LANGUAGES ================= */
  if (languages.length > 0) {
    sections.push(
      <Section key="languages" title="Languages">
        <p className="text-[10.5pt] text-[#333333] px-1 font-medium">
          {languages.join(" • ")}
        </p>
      </Section>,
    );
  }

  /* ================= INTERESTS ================= */
  if (hobbies.length > 0) {
    sections.push(
      <Section key="hobbies" title="Interests">
        <p className="text-[10.5pt] text-[#333333] px-1 font-medium">
          {hobbies.map((h) => h.title || h).join(" • ")}
        </p>
      </Section>,
    );
  }

  /* ================= BOTTOM BAR ================= */
  sections.push(
    <div
      key="footer-bar"
      className="h-4 w-full bg-[#333333] mt-8 rounded-sm"
    ></div>,
  );

  return (
    <div className="resume-document bg-white font-sans p-8 pb-4 mx-auto max-w-[210mm]">
      <A4PaginatedDocument>{sections}</A4PaginatedDocument>
    </div>
  );
}

/* Helper Component for Standard Sections */
function Section({ title, children }) {
  return (
    <section className="mb-6 break-inside-avoid">
      <hr className="border-t-[1.5px] border-[#333333] mb-4" />
      <h2 className="text-[12pt] font-extrabold uppercase tracking-[0.18em] text-[#111111] mb-4 pl-1">
        {title}
      </h2>
      <div className="px-1">{children}</div>
    </section>
  );
}
