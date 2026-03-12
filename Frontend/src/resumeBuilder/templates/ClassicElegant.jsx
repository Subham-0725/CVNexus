// src/resumeBuilder/templates/ClassicElegant.jsx
import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function ClassicElegant({ data }) {
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
    hobbies = [], // <--- Added hobbies (Interests)
  } = data;

  const allSkills = [...technicalSkills, ...softSkills];

  // Helper to accurately estimate how many lines a text block will visually occupy
  const calcLines = (text, charsPerLine) => {
    if (!text) return 0;
    return Math.ceil(String(text).length / charsPerLine) * 1.2;
  };

  const leftQueue = [];
  const rightQueue = [];

  const pushLeft = (jsx, lines) => leftQueue.push({ jsx, lines });
  const pushRight = (jsx, lines) => rightQueue.push({ jsx, lines });

  /* ================= 1. POPULATE LEFT QUEUE (Granular) ================= */
  if (Object.keys(personalInfo).length > 0) {
    pushLeft(<SectionTitle title="CONTACT" />, 2.5);
    if (personalInfo.phone)
      pushLeft(
        <ContactItem icon={<PhoneIcon />} text={personalInfo.phone} />,
        1.5,
      );
    if (personalInfo.location)
      pushLeft(
        <ContactItem icon={<LocationIcon />} text={personalInfo.location} />,
        1 + calcLines(personalInfo.location, 30),
      );
    if (personalInfo.email)
      pushLeft(
        <ContactItem icon={<EmailIcon />} text={personalInfo.email} />,
        1 + calcLines(personalInfo.email, 30),
      );
    if (personalInfo.website)
      pushLeft(
        <ContactItem icon={<GlobeIcon />} text={personalInfo.website} />,
        1 + calcLines(personalInfo.website, 30),
      );
    if (personalInfo.linkedin)
      pushLeft(
        <ContactItem icon={<LinkedinIcon />} text={personalInfo.linkedin} />,
        1 + calcLines(personalInfo.linkedin, 30),
      );
    pushLeft(<Spacer />, 1);
  }

  if (education.length > 0) {
    pushLeft(<SectionTitle title="EDUCATION" />, 2.5);
    education.forEach((edu) => {
      pushLeft(
        <div className="mb-3 text-[9.5pt]">
          <h3 className="uppercase font-bold text-black leading-tight break-words">
            {edu.institution}
          </h3>
          <p className="text-gray-800 leading-tight break-words">
            {edu.degree}
          </p>
          <p className="text-gray-600 break-words">
            {edu.startDate ? `${edu.startDate} - ` : ""}
            {edu.endDate || edu.year}
          </p>
        </div>,
        2.5 + calcLines(edu.institution, 30) + calcLines(edu.degree, 30),
      );
    });
    pushLeft(<Spacer />, 1);
  }

  if (allSkills.length > 0) {
    pushLeft(<SectionTitle title="SKILLS" />, 2.5);
    allSkills.forEach((skill) => {
      const text = typeof skill === "string" ? skill : skill.title;
      pushLeft(
        <div className="flex gap-2 items-start mb-1.5">
          <span className="font-bold text-black mt-[1px] flex-shrink-0">→</span>
          <span className="text-[9.5pt] leading-tight break-words min-w-0">
            {text}
          </span>
        </div>,
        1 + calcLines(text, 28),
      );
    });
    pushLeft(<Spacer />, 1);
  }

  if (certifications.length > 0) {
    pushLeft(<SectionTitle title="CERTIFICATION" />, 2.5);
    certifications.forEach((cert) => {
      pushLeft(
        <div className="mb-3 text-[9.5pt]">
          <h3 className="uppercase font-bold text-black leading-tight break-words">
            {cert.title || cert}
          </h3>
          {cert.date && (
            <p className="text-gray-600 break-words">{cert.date}</p>
          )}
          {cert.issuer && (
            <p className="text-gray-800 leading-tight break-words">
              {cert.issuer}
            </p>
          )}
        </div>,
        2.5 + calcLines(cert.title || cert, 30) + calcLines(cert.issuer, 30),
      );
    });
    pushLeft(<Spacer />, 1);
  }

  if (languages.length > 0) {
    pushLeft(<SectionTitle title="LANGUAGES" />, 2.5);
    pushLeft(
      <p className="text-[9.5pt] leading-relaxed break-words min-w-0">
        {languages.join(", ")}
      </p>,
      1 + calcLines(languages.join(", "), 30),
    );
    pushLeft(<Spacer />, 1);
  }

  // <--- Added Interests (Hobbies) to the Left Column --->
  if (hobbies.length > 0) {
    pushLeft(<SectionTitle title="INTERESTS" />, 2.5);
    const hobbiesText = hobbies.map((h) => h.title || h).join(", ");
    pushLeft(
      <p className="text-[9.5pt] leading-relaxed break-words min-w-0">
        {hobbiesText}
      </p>,
      1 + calcLines(hobbiesText, 30),
    );
    pushLeft(<Spacer />, 1);
  }

  /* ================= 2. POPULATE RIGHT QUEUE (Granular) ================= */
  if (summary) {
    pushRight(<SectionTitle title="ABOUT ME" />, 2.5);
    summary
      .split("\n")
      .filter(Boolean)
      .forEach((p) => {
        pushRight(
          <p
            className="text-[10pt] leading-relaxed text-gray-800 text-justify mb-2 break-words min-w-0"
            style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
          >
            {p}
          </p>,
          0.5 + calcLines(p, 75),
        );
      });
    pushRight(<Spacer />, 1);
  }

  if (workExperience.length > 0) {
    pushRight(<SectionTitle title="WORK EXPERIENCE" />, 2.5);
    workExperience.forEach((job) => {
      pushRight(
        <div className="mb-1.5">
          <h3 className="uppercase font-bold text-black text-[10.5pt] break-words">
            {job.role}
          </h3>
          <p className="text-[10pt] text-gray-800 uppercase break-words">
            {job.company} ({job.startDate} - {job.endDate || "Present"})
          </p>
        </div>,
        3,
      );
      if (job.description) {
        job.description
          .split("\n")
          .filter(Boolean)
          .forEach((p) => {
            pushRight(
              <p
                className="text-[10pt] leading-relaxed text-gray-700 text-justify mb-2 break-words min-w-0"
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
              >
                {p}
              </p>,
              0.5 + calcLines(p, 75),
            );
          });
      }
      pushRight(<Spacer />, 1);
    });
  }

  if (projects.length > 0) {
    pushRight(<SectionTitle title="PROJECTS" />, 2.5);
    projects.forEach((proj) => {
      pushRight(
        <div className="mb-1.5">
          <h3 className="uppercase font-bold text-black text-[10.5pt] break-words">
            {proj.title}
          </h3>
          {proj.date && (
            <p className="text-[10pt] text-gray-800 break-words">{proj.date}</p>
          )}
        </div>,
        2.5,
      );
      if (proj.description) {
        proj.description
          .split("\n")
          .filter(Boolean)
          .forEach((p) => {
            pushRight(
              <p
                className="text-[10pt] leading-relaxed text-gray-700 text-justify mb-2 break-words min-w-0"
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
              >
                {p}
              </p>,
              0.5 + calcLines(p, 75),
            );
          });
      }
      pushRight(<Spacer />, 1);
    });
  }

  if (achievements.length > 0) {
    pushRight(<SectionTitle title="ACHIEVEMENTS" />, 2.5);
    achievements.forEach((ach) => {
      const text =
        typeof ach === "string" ? ach : `${ach.title} ${ach.description || ""}`;
      pushRight(
        <div className="flex gap-2 items-start mb-1.5 text-[10pt] text-gray-800 text-justify">
          <span className="mt-[6px] w-1 h-1 bg-gray-800 rounded-full flex-shrink-0"></span>
          <span
            className="break-words min-w-0"
            style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
          >
            {text}
          </span>
        </div>,
        0.5 + calcLines(text, 70),
      );
    });
  }

  /* ================= 3. WATERFALL ZIPPER ALGORITHM ================= */
  const sections = [];

  // <--- Added Headline to Header --->
  sections.push(
    <div key="header" className="mb-8 w-full break-inside-avoid">
      <h1 className="text-[32pt] font-extrabold uppercase tracking-[0.2em] text-center text-black mb-3 break-words leading-none">
        {personalInfo.fullName || "YOUR NAME"}
      </h1>
      {personalInfo.headline && (
        <p className="text-[12pt] text-center uppercase tracking-[0.15em] text-gray-700 mb-6 break-words">
          {personalInfo.headline}
        </p>
      )}
      <hr className="border-gray-300 w-full border-t-[1.5px]" />
    </div>,
  );

  let rowCount = 0;

  while (leftQueue.length > 0 || rightQueue.length > 0) {
    let rowLeft = [];
    let rowRight = [];
    let lLines = 0;
    let rLines = 0;

    if (leftQueue.length > 0) {
      let item = leftQueue.shift();
      rowLeft.push(
        <div key={`L-${rowCount}-${rowLeft.length}`}>{item.jsx}</div>,
      );
      lLines += item.lines;
    }
    if (rightQueue.length > 0) {
      let item = rightQueue.shift();
      rowRight.push(
        <div key={`R-${rowCount}-${rowRight.length}`}>{item.jsx}</div>,
      );
      rLines += item.lines;
    }

    let added = true;
    while (added) {
      added = false;
      if (rLines - lLines > 2.5 && leftQueue.length > 0) {
        let item = leftQueue.shift();
        rowLeft.push(
          <div key={`L-${rowCount}-${rowLeft.length}`}>{item.jsx}</div>,
        );
        lLines += item.lines;
        added = true;
      }
      if (lLines - rLines > 2.5 && rightQueue.length > 0) {
        let item = rightQueue.shift();
        rowRight.push(
          <div key={`R-${rowCount}-${rowRight.length}`}>{item.jsx}</div>,
        );
        rLines += item.lines;
        added = true;
      }
    }

    sections.push(
      <div
        key={`packed-row-${rowCount++}`}
        className="flex w-full break-inside-avoid"
      >
        <div className="w-[35%] flex flex-col pr-8 flex-shrink-0 min-w-0">
          {rowLeft}
        </div>
        <div className="w-[65%] flex flex-col flex-shrink-0 min-w-0">
          {rowRight}
        </div>
      </div>,
    );
  }

  return (
    <div
      className="resume-document bg-white text-slate-800"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <A4PaginatedDocument>{sections}</A4PaginatedDocument>
    </div>
  );
}

/* ================= REUSABLE MICRO-COMPONENTS ================= */
function SectionTitle({ title }) {
  return (
    <h2 className="text-[12pt] font-bold uppercase tracking-[0.15em] mb-4 text-black break-words mt-1">
      {title}
    </h2>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 mb-2.5 text-[9.5pt] text-gray-800">
      {icon}
      <span className="break-all min-w-0 leading-tight">{text}</span>
    </div>
  );
}

function Spacer() {
  return <div className="h-4 w-full"></div>;
}

// ICONS
function PhoneIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-black flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-black flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-black flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-black flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-black flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.16-3.8c-1.08 0-1.8.57-2.14 1.14v-.95H9.6v8.91h3.6v-4.48c0-1.2.23-2.36 1.7-2.36 1.45 0 1.48 1.38 1.48 2.44v4.4h3.12M7.4 8.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4m-1.8 10.3h3.6V9.6H5.6v8.9z" />
    </svg>
  );
}
