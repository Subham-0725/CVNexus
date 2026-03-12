import React from "react";
import A4PaginatedDocument from "../preview/A4PaginatedDocument";

export default function ProfessionalSidebar({ data }) {
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

  const nameParts = personalInfo.fullName
    ? personalInfo.fullName.trim().split(" ")
    : ["YOUR", "NAME"];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  /* ================= LEFT SIDEBAR (Hanging Overlay) ================= */
  // Removed fixed height. It will naturally fit the content and won't exceed the page boundary.
  const sidebarElement = (
    <aside className="absolute top-0 left-0 w-[34%] bg-[#0A2647] text-white p-6 sm:p-8 pb-16 flex flex-col gap-6 z-20 min-w-0">
      {/* Name & Title */}
      <div className="mb-2 w-full min-w-0">
        <h1 className="text-[28pt] sm:text-[34pt] font-black uppercase leading-[1.05] tracking-wide mb-2 break-all overflow-hidden">
          <span className="block">{firstName}</span>
          {lastName && <span className="block">{lastName}</span>}
        </h1>
        <p className="text-[12pt] sm:text-[13pt] font-light tracking-wide text-[#8BA7C9] break-words">
          {personalInfo.headline || "Professional Title"}
        </p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-4 text-[9pt] sm:text-[9.5pt] w-full min-w-0 mt-2">
        {personalInfo.phone && (
          <ContactItem icon={<MobileIcon />} text={personalInfo.phone} />
        )}
        {personalInfo.email && (
          <ContactItem icon={<MailIcon />} text={personalInfo.email} />
        )}
        {personalInfo.location && (
          <ContactItem icon={<LocationIcon />} text={personalInfo.location} />
        )}
        {personalInfo.linkedin && (
          <ContactItem
            icon={<LinkedInIcon />}
            text={personalInfo.linkedin
              .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
              .replace(/\/$/, "")}
          />
        )}
        {personalInfo.website && (
          <ContactItem
            icon={<GlobeIcon />}
            text={personalInfo.website.replace(/^https?:\/\//, "")}
          />
        )}
      </div>

      {/* SKILLS */}
      {softSkills.length > 0 && (
        <div className="w-full mt-2 min-w-0">
          <SidebarHeader title="SKILLS" />
          <div className="flex flex-col gap-2 mt-4 w-full text-[10.5pt] font-light">
            {softSkills.map((skill, i) => (
              <div key={i} className="break-words leading-snug">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SOFTWARE */}
      {technicalSkills.length > 0 && (
        <div className="w-full mt-2 min-w-0">
          <SidebarHeader title="SOFTWARE" />
          <div className="flex flex-col gap-2 mt-4 w-full text-[10.5pt] font-light">
            {technicalSkills.map((skill, i) => (
              <div key={i} className="break-words leading-snug">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LANGUAGE */}
      {languages.length > 0 && (
        <div className="w-full mt-2 min-w-0">
          <SidebarHeader title="LANGUAGE" />
          <div className="flex flex-col gap-2 mt-4 w-full text-[10.5pt] font-light">
            {languages.map((lang, i) => (
              <div key={i} className="break-words leading-snug">
                {lang}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );

  const sections = [];
  let isFirstBlock = true;

  /* ================= CORE PAGINATION WRAPPER ================= */
  // Injects the sidebar ONLY into the first block.
  // Maintains the 34% left-margin across all pages so content never bleeds left.
  const pushBlock = (content, key) => {
    sections.push(
      <div key={key} className="w-full relative min-w-0 flex flex-row">
        {/* Only anchors the sidebar on Page 1 */}
        {isFirstBlock && sidebarElement}

        {/* Blank placeholder reserves the left 34% width across every page */}
        <div className="w-[34%] shrink-0 min-w-0 pointer-events-none bg-transparent"></div>

        {/* Main paginated right content */}
        <div className="w-[66%] shrink-0 pl-6 sm:pl-8 pr-4 sm:pr-6 min-w-0 bg-white">
          {content}
        </div>
      </div>,
    );
    isFirstBlock = false;
  };

  /* ================= 1. SUMMARY ================= */
  if (summary) {
    pushBlock(
      <div className="pt-8 pb-4">
        <MainHeader title="SUMMARY" />
        <p className="text-[10pt] leading-relaxed text-gray-600 text-justify break-all sm:break-words mt-3">
          {summary}
        </p>
      </div>,
      "summary",
    );
  }

  /* ================= 2. WORK EXPERIENCE ================= */
  if (workExperience.length > 0) {
    pushBlock(
      <div className={summary ? "pt-2 pb-4" : "pt-8 pb-4"}>
        <MainHeader title="WORK EXPERIENCE" />
      </div>,
      "work-header",
    );
    workExperience.forEach((job, i) => {
      pushBlock(
        <div className="border-l-[1.5px] border-[#8BA7C9] ml-[6px] pl-5 pb-6 relative min-w-0">
          <div className="absolute -left-[6.5px] top-1.5 w-[11px] h-[11px] rounded-full border-[2px] border-[#0A2647] bg-white"></div>

          <div className="text-[10pt] text-gray-500 mb-1">
            {job.startDate} - {job.endDate || "Present"},
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1.5 gap-1 sm:gap-4 min-w-0">
            <div className="text-[11pt] break-words">
              <span className="font-bold text-[#0A2647]">{job.role}</span>
              {job.company && (
                <span className="font-normal text-gray-700">
                  {" "}
                  - {job.company}
                </span>
              )}
            </div>
            {job.location && (
              <span className="text-[9.5pt] italic text-gray-500 shrink-0">
                {job.location}
              </span>
            )}
          </div>

          {job.description && (
            <div className="text-[10pt] text-gray-600 leading-relaxed space-y-1 break-all sm:break-words min-w-0">
              {job.description
                .split("\n")
                .filter(Boolean)
                .map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
            </div>
          )}
        </div>,
        `work-${i}`,
      );
    });
  }

  /* ================= 3. EDUCATION ================= */
  if (education.length > 0) {
    pushBlock(
      <div className="pt-2 pb-4">
        <MainHeader title="EDUCATION" />
      </div>,
      "edu-header",
    );
    education.forEach((edu, i) => {
      pushBlock(
        <div className="border-l-[1.5px] border-[#8BA7C9] ml-[6px] pl-5 pb-6 relative min-w-0">
          <div className="absolute -left-[6.5px] top-1.5 w-[11px] h-[11px] rounded-full border-[2px] border-[#0A2647] bg-white"></div>

          <div className="text-[10pt] text-gray-500 mb-1">
            {edu.startDate ? `${edu.startDate} - ` : ""}
            {edu.endDate || edu.year},
          </div>

          <div className="text-[11pt] break-words">
            <span className="font-bold text-[#0A2647]">{edu.institution}</span>
            {edu.degree && (
              <span className="font-normal text-gray-700"> - {edu.degree}</span>
            )}
          </div>

          {edu.location && (
            <div className="text-[9.5pt] italic text-gray-500 mt-0.5 break-words">
              {edu.location}
            </div>
          )}
          {edu.description && (
            <div className="text-[10pt] text-gray-600 mt-1 break-words">
              {edu.description}
            </div>
          )}
        </div>,
        `edu-${i}`,
      );
    });
  }

  /* ================= 4. PUBLICATIONS (Projects) ================= */
  if (projects.length > 0) {
    pushBlock(
      <div className="pt-2 pb-4">
        <MainHeader title="PUBLICATIONS" />
      </div>,
      "pub-header",
    );
    projects.forEach((project, i) => {
      pushBlock(
        <div className="border-l-[1.5px] border-[#8BA7C9] ml-[6px] pl-5 pb-6 relative min-w-0">
          <div className="absolute -left-[6.5px] top-1.5 w-[11px] h-[11px] rounded-full border-[2px] border-[#0A2647] bg-white"></div>

          {project.date && (
            <div className="text-[10pt] text-gray-500 mb-1">
              {project.date},
            </div>
          )}

          <div className="text-[11pt] font-bold text-[#0A2647] mb-0.5 break-words">
            {project.title}
          </div>

          {project.technologies && (
            <div className="text-[9.5pt] text-[#8BA7C9] font-medium mb-1 break-words">
              {project.technologies}
            </div>
          )}

          {project.description && (
            <div className="text-[10pt] text-gray-600 leading-relaxed break-words">
              {project.description}
            </div>
          )}
        </div>,
        `pub-${i}`,
      );
    });
  }

  /* ================= 5. AWARDS ================= */
  if (achievements.length > 0) {
    pushBlock(
      <div className="pt-2 pb-4">
        <MainHeader title="AWARDS" />
      </div>,
      "awards-header",
    );
    achievements.forEach((item, i) => {
      pushBlock(
        <div className="border-l-[1.5px] border-[#8BA7C9] ml-[6px] pl-5 pb-5 relative min-w-0">
          <div className="absolute -left-[6.5px] top-1.5 w-[11px] h-[11px] rounded-full border-[2px] border-[#0A2647] bg-white"></div>
          <div className="text-[10.5pt] text-gray-700 break-words">
            {typeof item === "string" ? (
              item
            ) : (
              <>
                <span className="font-medium text-[#0A2647]">{item.title}</span>
                {item.date && ` ${item.date}`}
              </>
            )}
          </div>
        </div>,
        `award-${i}`,
      );
    });
  }

  /* ================= 6. CERTIFICATE ================= */
  if (certifications.length > 0) {
    pushBlock(
      <div className="pt-2 pb-4">
        <MainHeader title="CERTIFICATE" />
      </div>,
      "cert-header",
    );
    certifications.forEach((cert, i) => {
      pushBlock(
        <div className="border-l-[1.5px] border-[#8BA7C9] ml-[6px] pl-5 pb-5 relative min-w-0">
          <div className="absolute -left-[6.5px] top-1.5 w-[11px] h-[11px] rounded-full border-[2px] border-[#0A2647] bg-white"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 min-w-0 pr-2">
            <span className="text-[10.5pt] text-gray-700 break-words">
              {cert.title || cert}
            </span>
            {cert.date && (
              <span className="text-[9.5pt] text-gray-500 shrink-0">
                {cert.date}
              </span>
            )}
          </div>
        </div>,
        `cert-${i}`,
      );
    });
  }

  /* ================= 7. HOBBIES ================= */
  if (hobbies.length > 0) {
    pushBlock(
      <div className="pt-2 pb-4">
        <MainHeader title="HOBBIES" />
      </div>,
      "hobbies-header",
    );
    pushBlock(
      <p className="text-[10pt] leading-relaxed text-gray-600 break-words pb-8">
        {hobbies.map((h) => (typeof h === "string" ? h : h.title)).join(", ")}
      </p>,
      "hobbies-content",
    );
  }

  return (
    <div className="resume-document bg-white font-sans w-full h-full text-left">
      <A4PaginatedDocument>{sections}</A4PaginatedDocument>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function SidebarHeader({ title }) {
  return (
    <div className="mb-1 w-full">
      <h2 className="text-[11.5pt] font-bold tracking-widest uppercase mb-2 break-all">
        {title}
      </h2>
      <div className="w-full h-[1.5px] bg-white"></div>
    </div>
  );
}

function MainHeader({ title }) {
  return (
    <div className="mb-1 w-full min-w-0">
      <h2 className="text-[12.5pt] font-bold tracking-wider text-[#0A2647] uppercase mb-2 break-all">
        {title}
      </h2>
      <div className="w-full h-[1.5px] bg-[#8BA7C9]"></div>
    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3 w-full min-w-0">
      <div className="w-[26px] h-[26px] flex-shrink-0 bg-white text-[#0A2647] rounded-full flex items-center justify-center p-[5.5px]">
        {icon}
      </div>
      <span className="break-all sm:break-words overflow-hidden leading-tight flex-1 text-[9.5pt] mt-0.5">
        {text}
      </span>
    </div>
  );
}

/* ================= SVG ICONS ================= */
function MobileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-5 1c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}
