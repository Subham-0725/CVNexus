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

  // Helper to accurately estimate how many lines a text block will visually occupy
  const calcLines = (text, charsPerLine) => {
    if (!text) return 0;
    return Math.ceil(String(text).length / charsPerLine) * 1.2;
  };

  const mainQueue = [];
  const sidebarQueue = [];

  const pushMain = (jsx, lines) => mainQueue.push({ jsx, lines });
  const pushSidebar = (jsx, lines) => sidebarQueue.push({ jsx, lines });

  /* ================= 1. POPULATE MAIN QUEUE (Left Column) ================= */

  // Header
  if (Object.keys(personalInfo).length > 0) {
    pushMain(
      <div className="mb-6 mt-2 break-inside-avoid">
        <h1 className="text-[36pt] font-extrabold text-[#5b4a8e] leading-none mb-3 break-words">
          {personalInfo.fullName || "First Last"}
        </h1>
        <p className="text-[14pt] text-slate-500 break-words font-medium">
          {personalInfo.headline}
        </p>
      </div>,
      5,
    );
  }

  // Summary
  if (summary) {
    const paras = summary.split("\n").filter(Boolean);
    if (paras.length > 0) {
      // Group header with first paragraph to avoid orphans
      pushMain(
        <div className="break-inside-avoid">
          <MainTitle title="SUMMARY" />
          <Paragraph text={paras[0]} />
        </div>,
        3 + calcLines(paras[0], 80),
      );
      // Push remaining paragraphs independently
      for (let i = 1; i < paras.length; i++) {
        pushMain(
          <div className="break-inside-avoid">
            <Paragraph text={paras[i]} />
          </div>,
          calcLines(paras[i], 80),
        );
      }
      pushMain(<Spacer />, 1);
    }
  }

  // Experience
  if (workExperience.length > 0) {
    workExperience.forEach((job, idx) => {
      const bullets = job.description
        ? job.description.split("\n").filter(Boolean)
        : [];

      const headerJsx = (
        <>
          {idx === 0 && <MainTitle title="WORK EXPERIENCE" />}
          <div className="mb-1.5 mt-1">
            <div className="flex justify-between items-end mb-0.5">
              <span className="font-bold text-[11pt] text-slate-700 break-words">
                {job.company}
                {job.location ? `, ${job.location}` : ""}
              </span>
              <span className="text-[9.5pt] font-bold text-slate-800 flex-shrink-0 ml-4">
                {job.startDate} – {job.endDate || "Present"}
              </span>
            </div>
            <div className="text-[10pt] text-slate-600 break-words">
              {job.role}
            </div>
          </div>
        </>
      );

      // Group Job Header with its first bullet point
      if (bullets.length > 0) {
        pushMain(
          <div className="break-inside-avoid">
            {headerJsx}
            <Bullet text={bullets[0]} />
          </div>,
          (idx === 0 ? 3 : 0) + 3 + calcLines(bullets[0], 75),
        );
        // Push remaining bullets independently
        for (let i = 1; i < bullets.length; i++) {
          pushMain(
            <div className="break-inside-avoid">
              <Bullet text={bullets[i]} />
            </div>,
            calcLines(bullets[i], 75),
          );
        }
      } else {
        pushMain(
          <div className="break-inside-avoid">{headerJsx}</div>,
          (idx === 0 ? 3 : 0) + 3,
        );
      }
      pushMain(<Spacer />, 1.5);
    });
  }

  // Projects
  if (projects.length > 0) {
    projects.forEach((proj, idx) => {
      const bullets = proj.description
        ? proj.description.split("\n").filter(Boolean)
        : [];

      const headerJsx = (
        <>
          {idx === 0 && <MainTitle title="PROJECTS" />}
          <div className="mb-1.5 mt-1 flex justify-between items-end">
            <span className="font-bold text-[11pt] text-slate-700 break-words">
              {proj.title}
            </span>
            {proj.date && (
              <span className="text-[9.5pt] font-bold text-slate-800 flex-shrink-0 ml-4">
                {proj.date}
              </span>
            )}
          </div>
        </>
      );

      if (bullets.length > 0) {
        pushMain(
          <div className="break-inside-avoid">
            {headerJsx}
            <Bullet text={bullets[0]} />
          </div>,
          (idx === 0 ? 3 : 0) + 2 + calcLines(bullets[0], 75),
        );
        for (let i = 1; i < bullets.length; i++) {
          pushMain(
            <div className="break-inside-avoid">
              <Bullet text={bullets[i]} />
            </div>,
            calcLines(bullets[i], 75),
          );
        }
      } else {
        pushMain(
          <div className="break-inside-avoid">{headerJsx}</div>,
          (idx === 0 ? 3 : 0) + 2,
        );
      }
      pushMain(<Spacer />, 1.5);
    });
  }

  // Achievements
  if (achievements.length > 0) {
    pushMain(
      <div className="break-inside-avoid">
        <MainTitle title="ACHIEVEMENTS" />
        <Bullet
          text={
            typeof achievements[0] === "string"
              ? achievements[0]
              : `${achievements[0].title} ${achievements[0].description || ""}`
          }
        />
      </div>,
      3 + calcLines(achievements[0], 75),
    );
    for (let i = 1; i < achievements.length; i++) {
      let text =
        typeof achievements[i] === "string"
          ? achievements[i]
          : `${achievements[i].title} ${achievements[i].description || ""}`;
      pushMain(
        <div className="break-inside-avoid">
          <Bullet text={text} />
        </div>,
        calcLines(text, 75),
      );
    }
    pushMain(<Spacer />, 1.5);
  }

  // Certifications
  if (certifications.length > 0) {
    const renderCert = (cert) => (
      <div className="flex items-start gap-3 mb-1.5 mt-1">
        <span className="text-[#5b4a8e] mt-[6px] text-[7px] flex-shrink-0">
          ●
        </span>
        <div
          className="text-[9.5pt] leading-relaxed text-slate-600 break-words min-w-0"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        >
          <span className="font-semibold text-slate-700">
            {cert.title || cert}
          </span>
          {cert.issuer && ` — ${cert.issuer}`}
          {cert.date && ` (${cert.date})`}
        </div>
      </div>
    );

    pushMain(
      <div className="break-inside-avoid">
        <MainTitle title="CERTIFICATIONS" />
        {renderCert(certifications[0])}
      </div>,
      3 + calcLines(certifications[0].title || certifications[0], 75),
    );
    for (let i = 1; i < certifications.length; i++) {
      pushMain(
        <div className="break-inside-avoid">
          {renderCert(certifications[i])}
        </div>,
        calcLines(certifications[i].title || certifications[i], 75),
      );
    }
    pushMain(<Spacer />, 1.5);
  }

  /* ================= 2. POPULATE SIDEBAR QUEUE (Right Column) ================= */

  // Empty top spacer to align naturally with the giant Header in the main column
  pushSidebar(<div className="mt-6"></div>, 1);

  // Contact
  const contacts = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  if (contacts.length > 0) {
    pushSidebar(
      <div className="break-inside-avoid">
        <SidebarTitle title="CONTACT" />
        <SideBullet text={contacts[0]} />
      </div>,
      3 + calcLines(contacts[0], 30),
    );
    for (let i = 1; i < contacts.length; i++) {
      pushSidebar(
        <div className="break-inside-avoid">
          <SideBullet text={contacts[i]} />
        </div>,
        calcLines(contacts[i], 30),
      );
    }
    pushSidebar(<Spacer />, 1.5);
  }

  // Skills
  if (allSkills.length > 0) {
    let firstSkill =
      typeof allSkills[0] === "string" ? allSkills[0] : allSkills[0].title;
    pushSidebar(
      <div className="break-inside-avoid">
        <SidebarTitle title="SKILLS" />
        <SideBullet text={firstSkill} />
      </div>,
      3 + calcLines(firstSkill, 30),
    );
    for (let i = 1; i < allSkills.length; i++) {
      let text =
        typeof allSkills[i] === "string" ? allSkills[i] : allSkills[i].title;
      pushSidebar(
        <div className="break-inside-avoid">
          <SideBullet text={text} />
        </div>,
        calcLines(text, 30),
      );
    }
    pushSidebar(<Spacer />, 1.5);
  }

  // Education
  if (education.length > 0) {
    const renderEdu = (edu) => (
      <div className="mb-4 text-[9pt] text-slate-500 mt-1">
        <div className="font-bold text-[9.5pt] text-slate-700 break-words">
          {edu.institution}
        </div>
        <div className="break-words leading-tight mt-0.5">{edu.degree}</div>
        <div className="text-[8.5pt] mt-0.5">
          {edu.location ? `${edu.location} – ` : ""}
          {edu.startDate ? `${edu.startDate} – ` : ""}
          {edu.endDate || edu.year}
        </div>
        {edu.description && (
          <div className="mt-1 text-[8.5pt] break-words leading-snug">
            {edu.description}
          </div>
        )}
      </div>
    );

    pushSidebar(
      <div className="break-inside-avoid">
        <SidebarTitle title="EDUCATION" />
        {renderEdu(education[0])}
      </div>,
      3 + 3,
    );
    for (let i = 1; i < education.length; i++) {
      pushSidebar(
        <div className="break-inside-avoid">{renderEdu(education[i])}</div>,
        3,
      );
    }
    pushSidebar(<Spacer />, 0.5);
  }

  // Languages
  if (languages.length > 0) {
    pushSidebar(
      <div className="break-inside-avoid">
        <SidebarTitle title="LANGUAGES" />
        <SideBullet text={languages[0]} />
      </div>,
      3 + calcLines(languages[0], 30),
    );
    for (let i = 1; i < languages.length; i++) {
      pushSidebar(
        <div className="break-inside-avoid">
          <SideBullet text={languages[i]} />
        </div>,
        calcLines(languages[i], 30),
      );
    }
    pushSidebar(<Spacer />, 1.5);
  }

  // Hobbies / Other
  if (hobbies.length > 0) {
    let firstHobby =
      typeof hobbies[0] === "string" ? hobbies[0] : hobbies[0].title;
    pushSidebar(
      <div className="break-inside-avoid">
        <SidebarTitle title="OTHER" />
        <SideBullet text={firstHobby} />
      </div>,
      3 + calcLines(firstHobby, 30),
    );
    for (let i = 1; i < hobbies.length; i++) {
      let text = typeof hobbies[i] === "string" ? hobbies[i] : hobbies[i].title;
      pushSidebar(
        <div className="break-inside-avoid">
          <SideBullet text={text} />
        </div>,
        calcLines(text, 30),
      );
    }
    pushSidebar(<Spacer />, 1.5);
  }

  /* ================= 3. WATERFALL ZIPPER ALGORITHM ================= */
  const sections = [];
  let rowCount = 0;

  while (mainQueue.length > 0 || sidebarQueue.length > 0) {
    let rowMain = [];
    let rowSide = [];
    let mLines = 0;
    let sLines = 0;

    // Seed row
    if (mainQueue.length > 0) {
      let item = mainQueue.shift();
      rowMain.push(
        <div key={`M-${rowCount}-${rowMain.length}`}>{item.jsx}</div>,
      );
      mLines += item.lines;
    }
    if (sidebarQueue.length > 0) {
      let item = sidebarQueue.shift();
      rowSide.push(
        <div key={`S-${rowCount}-${rowSide.length}`}>{item.jsx}</div>,
      );
      sLines += item.lines;
    }

    // Micro-Balance lines to keep columns completely flush horizontally
    let added = true;
    while (added) {
      added = false;
      if (sLines - mLines > 2.5 && mainQueue.length > 0) {
        let item = mainQueue.shift();
        rowMain.push(
          <div key={`M-${rowCount}-${rowMain.length}`}>{item.jsx}</div>,
        );
        mLines += item.lines;
        added = true;
      }
      if (mLines - sLines > 2.5 && sidebarQueue.length > 0) {
        let item = sidebarQueue.shift();
        rowSide.push(
          <div key={`S-${rowCount}-${rowSide.length}`}>{item.jsx}</div>,
        );
        sLines += item.lines;
        added = true;
      }
    }

    // We pass `break-inside-avoid` to the entire flex row.
    // This strictly tells the A4PaginatedDocument to cleanly jump the entire row to Page 2 if it doesn't fit!
    sections.push(
      <div
        key={`row-${rowCount++}`}
        className="flex w-full break-inside-avoid items-stretch"
      >
        <div className="w-[65%] flex flex-col pr-8 flex-shrink-0 min-w-0 pt-0.5 pb-0.5">
          {rowMain}
        </div>
        <div className="w-[35%] flex flex-col px-6 bg-[#f8f6fc] flex-shrink-0 min-w-0 pt-0.5 pb-0.5">
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
    <h2 className="text-[10pt] font-bold uppercase tracking-wider text-[#5b4a8e] mb-3 mt-3 border-b-[1.5px] border-[#e6e3f0] pb-1 break-words">
      {title}
    </h2>
  );
}

function SidebarTitle({ title }) {
  return (
    <h2 className="text-[10pt] font-bold uppercase tracking-wider text-[#5b4a8e] mb-3 mt-3 border-b-[1.5px] border-[#e6e3f0] pb-1 break-words">
      {title}
    </h2>
  );
}

function Paragraph({ text }) {
  return (
    <p
      className="text-[9.5pt] leading-relaxed text-slate-600 text-justify mb-2 break-words min-w-0"
      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
    >
      {text}
    </p>
  );
}

function Bullet({ text }) {
  return (
    <div className="flex items-start gap-3 mb-1.5">
      <span className="text-[#5b4a8e] mt-[6px] text-[7px] flex-shrink-0">
        ●
      </span>
      <p
        className="text-[9.5pt] leading-relaxed text-slate-600 text-justify break-words min-w-0"
        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
      >
        {text}
      </p>
    </div>
  );
}

function SideBullet({ text }) {
  return (
    <div className="flex items-start gap-2 mb-1.5 text-[9.5pt] text-slate-500">
      <span className="text-slate-400 mt-[2px] text-[10px] flex-shrink-0">
        •
      </span>
      <span className="break-words min-w-0 leading-snug">{text}</span>
    </div>
  );
}

function Spacer() {
  return <div className="h-3 w-full"></div>;
}
