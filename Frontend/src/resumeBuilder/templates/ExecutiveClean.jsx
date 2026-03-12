import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function ExecutiveClean({ data }) {
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

  const blocks = [];

  /* ================= 1. HEADER ================= */
  const contactItems = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  blocks.push(
    <div key="header" className="mb-2 break-inside-avoid w-full">
      <h1 className="text-[32pt] font-bold text-[#3b5998] leading-none mb-1.5 tracking-tight break-all">
        {personalInfo.fullName || "First Last"}
      </h1>

      {personalInfo.headline && (
        <div className="text-[14pt] text-slate-600 mb-2 break-words">
          {personalInfo.headline}
        </div>
      )}

      {contactItems.length > 0 && (
        <div className="flex flex-wrap text-[9.5pt] text-slate-500 mb-3 items-center gap-1.5">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="break-all">{item}</span>
              {index < contactItems.length - 1 && (
                <span className="text-[10px]">&bull;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>,
  );

  /* ================= 1b. SUMMARY ================= */
  if (summary) {
    const paras = summary.split("\n").filter(Boolean);
    paras.forEach((p, idx) => {
      blocks.push(
        <div
          key={`sum-${idx}`}
          className="text-[9.5pt] text-slate-500 leading-relaxed text-justify mb-2 break-words min-w-0 break-inside-avoid w-full"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        >
          {p}
        </div>,
      );
    });
    blocks.push(<Spacer key="spacer-summary" />);
  }

  /* ================= HELPER: SMART DESCRIPTION PARSER ================= */
  const parseDescription = (desc) => {
    const lines = desc ? desc.split("\n").filter(Boolean) : [];
    const items = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (/^[-•*]\s*/.test(trimmed)) {
        items.push({ type: "bullet", text: trimmed.replace(/^[-•*]\s*/, "") });
      } else {
        items.push({ type: "paragraph", text: trimmed });
      }
    });

    return items;
  };

  /* ================= 2. WORK EXPERIENCE ================= */
  if (workExperience.length > 0) {
    workExperience.forEach((job, idx) => {
      const items = parseDescription(job.description);

      const headerJsx = (
        <>
          {idx === 0 && <SectionTitle title="WORK EXPERIENCE" />}
          <div
            className={`flex justify-between items-end mb-0.5 ${idx > 0 ? "mt-2" : ""}`}
          >
            <span className="font-bold text-[10.5pt] text-slate-800 break-words">
              {job.role}
            </span>
            <span className="font-bold text-[10pt] text-slate-800 flex-shrink-0 ml-4">
              {job.startDate} – {job.endDate || "Present"}
            </span>
          </div>
          <div className="text-[10pt] text-slate-500 mb-1.5 break-words">
            {job.company}
            {job.location ? `, ${job.location}` : ""}
          </div>
        </>
      );

      if (items.length === 0) {
        blocks.push(
          <div key={`job-${idx}-head`} className="break-inside-avoid w-full">
            {headerJsx}
          </div>,
        );
      } else {
        // Group header with the FIRST text item so the header is never orphaned
        blocks.push(
          <div key={`job-${idx}-head`} className="break-inside-avoid w-full">
            {headerJsx}
            {items[0].type === "paragraph" ? (
              <Paragraph text={items[0].text} />
            ) : (
              <Bullet text={items[0].text} />
            )}
          </div>,
        );
        // Push all remaining text items as independent blocks
        for (let i = 1; i < items.length; i++) {
          blocks.push(
            <div
              key={`job-${idx}-item-${i}`}
              className="break-inside-avoid w-full"
            >
              {items[i].type === "paragraph" ? (
                <Paragraph text={items[i].text} />
              ) : (
                <Bullet text={items[i].text} />
              )}
            </div>,
          );
        }
      }
      blocks.push(<Spacer key={`spacer-job-${idx}`} />);
    });
  }

  /* ================= 3. PROJECTS ================= */
  if (projects.length > 0) {
    projects.forEach((proj, idx) => {
      const items = parseDescription(proj.description);

      const headerJsx = (
        <>
          {idx === 0 && <SectionTitle title="PROJECTS" />}
          <div
            className={`flex justify-between items-end mb-0.5 ${idx > 0 ? "mt-2" : ""}`}
          >
            <span className="font-bold text-[10.5pt] text-slate-800 break-words">
              {proj.title}
            </span>
            {proj.date && (
              <span className="font-bold text-[10pt] text-slate-800 flex-shrink-0 ml-4">
                {proj.date}
              </span>
            )}
          </div>
          {proj.link && (
            <div className="text-[9.5pt] text-[#3b5998] mb-1.5 break-all">
              {proj.link}
            </div>
          )}
        </>
      );

      if (items.length === 0) {
        blocks.push(
          <div key={`proj-${idx}-head`} className="break-inside-avoid w-full">
            {headerJsx}
          </div>,
        );
      } else {
        // Group header with FIRST item
        blocks.push(
          <div key={`proj-${idx}-head`} className="break-inside-avoid w-full">
            {headerJsx}
            {items[0].type === "paragraph" ? (
              <Paragraph text={items[0].text} />
            ) : (
              <Bullet text={items[0].text} />
            )}
          </div>,
        );
        // Independent blocks for the rest
        for (let i = 1; i < items.length; i++) {
          blocks.push(
            <div
              key={`proj-${idx}-item-${i}`}
              className="break-inside-avoid w-full"
            >
              {items[i].type === "paragraph" ? (
                <Paragraph text={items[i].text} />
              ) : (
                <Bullet text={items[i].text} />
              )}
            </div>,
          );
        }
      }
      blocks.push(<Spacer key={`spacer-proj-${idx}`} />);
    });
  }

  /* ================= 4. EDUCATION ================= */
  if (education.length > 0) {
    education.forEach((edu, idx) => {
      blocks.push(
        <div key={`edu-${idx}`} className="mb-3 break-inside-avoid w-full">
          {idx === 0 && <SectionTitle title="EDUCATION" />}
          <div className="flex justify-between items-end mb-0.5">
            <span className="font-bold text-[10.5pt] text-slate-800 break-words">
              {edu.institution}
              {edu.location ? `, ${edu.location}` : ""}
            </span>
            <span className="font-bold text-[10pt] text-slate-800 flex-shrink-0 ml-4">
              {edu.startDate ? `${edu.startDate} – ` : ""}
              {edu.endDate || edu.year}
            </span>
          </div>
          <div className="text-[10pt] text-slate-500 break-words">
            {edu.degree}
          </div>
          {edu.description && (
            <div
              className="text-[9.5pt] text-slate-500 mt-1 leading-relaxed break-words min-w-0"
              style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
              {edu.description}
            </div>
          )}
        </div>,
      );
    });
    blocks.push(<Spacer key="spacer-edu" />);
  }

  /* ================= 5. SKILLS & OTHER ================= */
  let skillsBlocks = [];
  if (technicalSkills.length > 0)
    skillsBlocks.push({
      label: "Technical Skills",
      value: technicalSkills.join(", "),
    });
  if (softSkills.length > 0)
    skillsBlocks.push({ label: "Soft Skills", value: softSkills.join(", ") });
  if (languages.length > 0)
    skillsBlocks.push({ label: "Languages", value: languages.join(", ") });
  if (certifications.length > 0)
    skillsBlocks.push({
      label: "Certifications",
      value: certifications.map((c) => c.title || c).join(", "),
    });
  if (achievements.length > 0)
    skillsBlocks.push({
      label: "Achievements",
      value: achievements
        .map((a) => (typeof a === "string" ? a : a.title))
        .join(", "),
    });
  if (hobbies.length > 0)
    skillsBlocks.push({
      label: "Interests",
      value: hobbies.map((h) => h.title || h).join(", "),
    });

  if (skillsBlocks.length > 0) {
    // Push title first
    blocks.push(
      <div key="skills-title" className="break-inside-avoid w-full">
        <SectionTitle title="SKILLS & OTHER" />
      </div>,
    );
    // Push each skill category as an independent block
    skillsBlocks.forEach((skill, i) => {
      blocks.push(
        <div
          key={`skill-${i}`}
          className="text-[9.5pt] text-slate-500 leading-relaxed mb-1 break-words min-w-0 break-inside-avoid w-full"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        >
          <span className="font-bold text-slate-800">{skill.label}:</span>{" "}
          {skill.value}
        </div>,
      );
    });
  }

  return (
    <div
      className="resume-document bg-white font-sans text-slate-800 break-words"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <A4PaginatedDocument>{blocks}</A4PaginatedDocument>
    </div>
  );
}

/* ================= REUSABLE MICRO-COMPONENTS ================= */
function SectionTitle({ title }) {
  return (
    <h2 className="text-[10pt] font-bold uppercase tracking-widest text-[#3b5998] border-b-[1.5px] border-slate-200 pb-1 mb-2 mt-2 break-words">
      {title}
    </h2>
  );
}

function Paragraph({ text }) {
  return (
    <div
      className="text-[9.5pt] text-slate-500 mb-1.5 leading-relaxed text-justify break-words min-w-0"
      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
    >
      {text}
    </div>
  );
}

function Bullet({ text }) {
  return (
    <div
      className="flex items-start text-[9.5pt] text-slate-500 leading-relaxed text-justify break-words min-w-0 mb-1"
      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
    >
      <span className="text-[#3b5998] ml-2 mr-2 text-[14px] leading-tight flex-shrink-0">
        &bull;
      </span>
      <span className="break-words min-w-0">{text}</span>
    </div>
  );
}

function Spacer() {
  return <div className="h-3 w-full" />;
}
