import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function BoldSidebar({ data }) {
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

  const allSkills = [...technicalSkills, ...softSkills];

  // Helper to estimate vertical weight of text blocks
  const estimateLines = (text, charsPerLine) => {
    if (!text) return 0;
    return Math.ceil(String(text).length / charsPerLine) * 1.2;
  };

  const mainQueue = [];
  const sidebarQueue = [];

  const pushMain = (jsx, weight) => mainQueue.push({ jsx, weight });
  const pushSide = (jsx, weight) => sidebarQueue.push({ jsx, weight });

  /* ================= 1. POPULATE MAIN QUEUE (Left Column) ================= */

  if (Object.keys(personalInfo).length > 0) {
    pushMain(
      <div className="mb-4 mt-2">
        <h1 className="text-[34pt] font-extrabold text-[#65538f] leading-none mb-2.5 break-all tracking-tight">
          {personalInfo.fullName || "First Last"}
        </h1>
        <p className="text-[14pt] text-slate-500 break-words font-medium">
          {personalInfo.headline}
        </p>
      </div>,
      8,
    );
  }

  if (summary) {
    const paras = summary.split("\n").filter(Boolean);
    if (paras.length > 0) {
      pushMain(
        <div>
          <MainTitle title="SUMMARY" />
          <Paragraph text={paras[0]} />
        </div>,
        4 + estimateLines(paras[0], 80),
      );
      for (let i = 1; i < paras.length; i++) {
        pushMain(
          <div>
            <Paragraph text={paras[i]} />
          </div>,
          estimateLines(paras[i], 80),
        );
      }
    }
  }

  if (workExperience.length > 0) {
    workExperience.forEach((job, idx) => {
      const bullets = job.description
        ? job.description.split("\n").filter(Boolean)
        : [];
      const headerJsx = (
        <div className={`mb-1.5 ${idx === 0 ? "" : "mt-2"}`}>
          {idx === 0 && <MainTitle title="WORK EXPERIENCE" />}
          <div className="font-bold text-[11pt] text-slate-700 break-words mb-0.5">
            {job.company}
            {job.location ? `, ${job.location}` : ""}
          </div>
          <div className="flex justify-between items-end mb-0.5">
            <span className="text-[10pt] text-slate-500 break-words">
              {job.role}
            </span>
            <span className="text-[9.5pt] font-bold text-slate-800 flex-shrink-0 ml-4">
              {job.startDate} – {job.endDate || "Present"}
            </span>
          </div>
        </div>
      );

      if (bullets.length > 0) {
        pushMain(
          <div>
            {headerJsx}
            <Bullet text={bullets[0]} />
          </div>,
          5 + estimateLines(bullets[0], 75),
        );
        for (let i = 1; i < bullets.length; i++) {
          pushMain(
            <div>
              <Bullet text={bullets[i]} />
            </div>,
            estimateLines(bullets[i], 75),
          );
        }
      } else {
        pushMain(<div>{headerJsx}</div>, 4);
      }
    });
  }

  if (achievements.length > 0) {
    pushMain(
      <div>
        <MainTitle title="VOLUNTEERING & ACHIEVEMENTS" />
        <Bullet
          text={
            typeof achievements[0] === "string"
              ? achievements[0]
              : `${achievements[0].title} ${achievements[0].description || ""}`
          }
        />
      </div>,
      4 + estimateLines(achievements[0], 75),
    );
    for (let i = 1; i < achievements.length; i++) {
      let text =
        typeof achievements[i] === "string"
          ? achievements[i]
          : `${achievements[i].title} ${achievements[i].description || ""}`;
      pushMain(
        <div>
          <Bullet text={text} />
        </div>,
        estimateLines(text, 75),
      );
    }
  }

  if (projects.length > 0) {
    projects.forEach((proj, idx) => {
      const bullets = proj.description
        ? proj.description.split("\n").filter(Boolean)
        : [];
      const headerJsx = (
        <div className={`mb-1 mt-2`}>
          {idx === 0 && <MainTitle title="PROJECTS" />}
          <div className="flex justify-between items-end">
            <span className="font-bold text-[11pt] text-slate-700 break-words">
              {proj.title}
            </span>
            {proj.date && (
              <span className="text-[9.5pt] font-bold text-slate-800 flex-shrink-0 ml-4">
                {proj.date}
              </span>
            )}
          </div>
          {proj.link && (
            <div className="text-[9pt] text-[#65538f] mt-0.5 mb-1 break-all">
              {proj.link}
            </div>
          )}
        </div>
      );

      if (bullets.length > 0) {
        pushMain(
          <div>
            {headerJsx}
            <Bullet text={bullets[0]} />
          </div>,
          5 + estimateLines(bullets[0], 75),
        );
        for (let i = 1; i < bullets.length; i++) {
          pushMain(
            <div>
              <Bullet text={bullets[i]} />
            </div>,
            estimateLines(bullets[i], 75),
          );
        }
      } else {
        pushMain(<div>{headerJsx}</div>, 4);
      }
    });
  }

  /* ================= 2. POPULATE SIDEBAR QUEUE (Right Column) ================= */

  // Spacer to push the sidebar contact info below the main Header zone
  pushSide(<div className="h-[75px] w-full" />, 6);

  const contacts = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  if (contacts.length > 0) {
    pushSide(
      <div>
        <SidebarTitle title="CONTACT" />
        <SideBullet text={contacts[0]} />
      </div>,
      4 + estimateLines(contacts[0], 30),
    );
    for (let i = 1; i < contacts.length; i++) {
      pushSide(
        <div>
          <SideBullet text={contacts[i]} />
        </div>,
        estimateLines(contacts[i], 30),
      );
    }
  }

  if (allSkills.length > 0) {
    let firstSkill =
      typeof allSkills[0] === "string" ? allSkills[0] : allSkills[0].title;
    pushSide(
      <div>
        <SidebarTitle title="SKILLS" />
        <SideBullet text={firstSkill} />
      </div>,
      4 + estimateLines(firstSkill, 30),
    );
    for (let i = 1; i < allSkills.length; i++) {
      let text =
        typeof allSkills[i] === "string" ? allSkills[i] : allSkills[i].title;
      pushSide(
        <div>
          <SideBullet text={text} />
        </div>,
        estimateLines(text, 30),
      );
    }
  }

  if (education.length > 0) {
    const renderEdu = (edu) => (
      <div className="mb-3 text-[9pt] text-slate-500 mt-1">
        <div className="text-[9.5pt] text-slate-700 break-words mb-0.5 font-semibold">
          {edu.institution}
        </div>
        <div className="break-words leading-tight">{edu.degree}</div>
        {edu.description && (
          <div className="mt-0.5 text-[8.5pt] break-words leading-snug">
            {edu.description}
          </div>
        )}
        <div className="text-[8.5pt] mt-0.5 text-slate-400">
          {edu.location ? `${edu.location} – ` : ""}
          {edu.startDate ? `${edu.startDate} – ` : ""}
          {edu.endDate || edu.year}
        </div>
      </div>
    );

    pushSide(
      <div>
        <SidebarTitle title="EDUCATION" />
        {renderEdu(education[0])}
      </div>,
      6,
    );
    for (let i = 1; i < education.length; i++) {
      pushSide(<div>{renderEdu(education[i])}</div>, 4);
    }
  }

  if (certifications.length > 0) {
    pushSide(
      <div>
        <SidebarTitle title="CERTIFICATIONS" />
        <SideBullet text={certifications[0].title || certifications[0]} />
      </div>,
      4 + estimateLines(certifications[0].title || certifications[0], 30),
    );
    for (let i = 1; i < certifications.length; i++) {
      pushSide(
        <div>
          <SideBullet text={certifications[i].title || certifications[i]} />
        </div>,
        estimateLines(certifications[i].title || certifications[i], 30),
      );
    }
  }

  if (languages.length > 0) {
    pushSide(
      <div>
        <SidebarTitle title="LANGUAGES" />
        <SideBullet text={languages[0]} />
      </div>,
      4 + estimateLines(languages[0], 30),
    );
    for (let i = 1; i < languages.length; i++) {
      pushSide(
        <div>
          <SideBullet text={languages[i]} />
        </div>,
        estimateLines(languages[i], 30),
      );
    }
  }

  if (hobbies.length > 0) {
    let firstHobby =
      typeof hobbies[0] === "string" ? hobbies[0] : hobbies[0].title;
    pushSide(
      <div>
        <SidebarTitle title="OTHER" />
        <SideBullet text={firstHobby} />
      </div>,
      4 + estimateLines(firstHobby, 30),
    );
    for (let i = 1; i < hobbies.length; i++) {
      let text = typeof hobbies[i] === "string" ? hobbies[i] : hobbies[i].title;
      pushSide(
        <div>
          <SideBullet text={text} />
        </div>,
        estimateLines(text, 30),
      );
    }
  }

  /* ================= 3. CHUNK PACKING ALGORITHM ================= */
  const sections = [];
  let rowCount = 0;
  // This value determines how tall a row gets before we start a new one.
  // Keeps rows compact so page breaks are clean.
  const CHUNK_MAX_WEIGHT = 14;

  while (mainQueue.length > 0 || sidebarQueue.length > 0) {
    let rowMain = [];
    let rowSide = [];
    let mWeight = 0;
    let sWeight = 0;

    while (mainQueue.length > 0 && mWeight < CHUNK_MAX_WEIGHT) {
      let item = mainQueue.shift();
      rowMain.push(
        <div key={`m-${rowCount}-${rowMain.length}`}>{item.jsx}</div>,
      );
      mWeight += item.weight;
    }

    while (sidebarQueue.length > 0 && sWeight < CHUNK_MAX_WEIGHT) {
      let item = sidebarQueue.shift();
      rowSide.push(
        <div key={`s-${rowCount}-${rowSide.length}`}>{item.jsx}</div>,
      );
      sWeight += item.weight;
    }

    // No vertical margins on this wrapper ensures the right column background connects seamlessly
    sections.push(
      <div
        key={`row-${rowCount++}`}
        className="flex w-full items-stretch break-inside-avoid"
      >
        <div className="w-[65%] flex flex-col pr-8 pt-0.5 pb-0.5 flex-shrink-0 min-w-0">
          {rowMain}
        </div>
        <div className="w-[35%] flex flex-col px-6 bg-[#f4f0f8] pt-0.5 pb-0.5 flex-shrink-0 min-w-0">
          {rowSide}
        </div>
      </div>,
    );
  }

  return (
    <div
      className="resume-document bg-white font-sans text-slate-800"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <A4PaginatedDocument>{sections}</A4PaginatedDocument>
    </div>
  );
}

/* ================= REUSABLE MICRO-COMPONENTS ================= */
function MainTitle({ title }) {
  return (
    <h2 className="text-[10pt] font-bold uppercase tracking-wider text-[#65538f] mb-3 mt-5 border-b-[1.5px] border-[#dcd6e8] pb-1 break-words">
      {title}
    </h2>
  );
}

function SidebarTitle({ title }) {
  return (
    <h2 className="text-[10pt] font-bold uppercase tracking-wider text-[#65538f] mb-3 mt-5 border-b-[1.5px] border-[#dcd6e8] pb-1 break-words">
      {title}
    </h2>
  );
}

function Paragraph({ text }) {
  return (
    <p
      className="text-[9.5pt] leading-relaxed text-slate-500 text-justify mb-2 break-words min-w-0"
      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
    >
      {text}
    </p>
  );
}

function Bullet({ text }) {
  return (
    <div className="flex items-start gap-3 mb-1.5">
      <span className="text-[#65538f] mt-[7px] text-[6px] flex-shrink-0">
        ●
      </span>
      <p
        className="text-[9.5pt] leading-relaxed text-slate-500 text-justify break-words min-w-0"
        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
      >
        {text}
      </p>
    </div>
  );
}

function SideBullet({ text }) {
  return (
    <div className="flex items-start gap-2 mb-1.5 text-[9pt] text-slate-600">
      <span className="text-slate-400 mt-[4px] text-[10px] flex-shrink-0">
        •
      </span>
      <span className="break-words min-w-0 leading-snug">{text}</span>
    </div>
  );
}
