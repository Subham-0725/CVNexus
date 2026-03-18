import puppeteer from "puppeteer";
import { Document, Packer, Paragraph, TextRun } from "docx";

/* ================= PDF EXPORT ================= */

export async function generatePDF(html) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const buffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();
  return buffer;
}

/* ================= SHARED HTML HELPERS ================= */

const esc = (str) =>
  String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const nl2br = (str) => esc(str).replace(/\n/g, "<br/>");

const contactLine = (info, sep = " | ") =>
  [info.email, info.phone, info.location, info.linkedin, info.website]
    .filter(Boolean)
    .map(esc)
    .join(sep);

/* ===============================================================
   TEMPLATE HTML BUILDERS
   =============================================================== */

/* ---------- 1. CLEAN ATS ---------- */
function buildCleanATS(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const sec = (title, body) => `
    <div class="section">
      <h2>${esc(title)}</h2><div class="divider"></div>${body}
    </div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 1in 0.8in; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; font-size: 11pt; color: #111; line-height:1.5; }
    h1 { font-size:14pt; font-weight:900; text-transform:uppercase; text-align:center; letter-spacing:2px; }
    h2 { font-size:11pt; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
    h3 { font-size:11pt; font-weight:700; }
    .divider { border-bottom:1px solid #111; margin-bottom:6px; }
    .header { text-align:center; margin-bottom:14px; }
    .headline { font-size:11pt; margin:3px 0; }
    .contact { font-size:9.5pt; color:#444; margin-top:4px; }
    .section { margin-top:16px; page-break-inside:avoid; }
    .item { margin-bottom:6px; page-break-inside:avoid; }
    .row { display:flex; justify-content:space-between; }
    .sub { font-style:italic; color:#555; font-size:10pt; }
    ul { margin-left:16px; margin-top:2px; }
    li { margin-bottom:2px; }
    .skills { font-size:10.5pt; }
  </style></head><body>
    <div class="header">
      <h1>${esc(p.fullName || "Your Name")}</h1>
      ${p.headline ? `<div class="headline">${esc(p.headline)}</div>` : ""}
      <div class="contact">${contactLine(p)}</div>
    </div>
    ${summary ? sec("Professional Summary", `<p>${nl2br(summary)}</p>`) : ""}
    ${education.length ? sec("Education", education.map(e => `
      <div class="item"><div class="row">
        <h3>${esc(e.institution)}${e.degree ? ` — ${esc(e.degree)}` : ""}</h3>
        <span class="sub">${esc(e.year || "")}</span>
      </div>${e.description ? `<p>${nl2br(e.description)}</p>` : ""}</div>`).join("")) : ""}
    ${workExperience.length ? sec("Work Experience", workExperience.map(e => `
      <div class="item"><div class="row">
        <h3>${esc(e.role)}${e.company ? ` at ${esc(e.company)}` : ""}</h3>
        <span class="sub">${esc(e.startDate || "")}${e.endDate ? ` – ${esc(e.endDate)}` : ""}</span>
      </div>${e.description ? `<p>${nl2br(e.description)}</p>` : ""}</div>`).join("")) : ""}
    ${projects.length ? sec("Projects", projects.map(p => `
      <div class="item"><h3>${esc(p.title)}</h3>
      ${p.link ? `<p class="sub">${esc(p.link)}</p>` : ""}
      ${p.description ? `<p>${nl2br(p.description)}</p>` : ""}</div>`).join("")) : ""}
    ${technicalSkills.length ? sec("Technical Skills", `<p class="skills">${technicalSkills.map(esc).join(", ")}</p>`) : ""}
    ${softSkills.length ? sec("Soft Skills", `<p class="skills">${softSkills.map(esc).join(", ")}</p>`) : ""}
    ${certifications.length ? sec("Certifications", `<ul>${certifications.map(c => `<li>${esc(c.title || c)}</li>`).join("")}</ul>`) : ""}
    ${achievements.length ? sec("Achievements", `<ul>${achievements.map(a => `<li>${esc(a.title || a)}</li>`).join("")}</ul>`) : ""}
    ${languages.length ? sec("Languages", `<ul>${languages.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`) : ""}
    ${hobbies.length ? sec("Interests", `<ul>${hobbies.map(h => `<li>${esc(h.title || h)}</li>`).join("")}</ul>`) : ""}
  </body></html>`;
}

/* ---------- 2. MODERN ATS ---------- */
function buildModernATS(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const allSkills = [...technicalSkills, ...softSkills].filter(Boolean);

  const sec = (title, body) => `
    <section class="section">
      <hr class="divider"/>
      <h2>${esc(title)}</h2>
      <div class="sec-body">${body}</div>
    </section>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 0.8in; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size:10.5pt; color:#111; line-height:1.5; }
    h1 { font-size:28pt; font-weight:900; text-transform:uppercase; letter-spacing:3px; color:#111; text-align:center; }
    h2 { font-size:11pt; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:#111; margin-bottom:8px; }
    h3 { font-size:11pt; font-weight:700; color:#111; }
    .header { text-align:center; padding:20px 0 12px; }
    .headline { font-size:13pt; color:#444; font-weight:500; margin:4px 0 12px; }
    .contact { font-size:10pt; color:#444; display:flex; flex-wrap:wrap; justify-content:center; gap:16px; }
    .divider { border-top:1.5px solid #333; margin-bottom:10px; }
    .section { margin-top:18px; page-break-inside:avoid; }
    .sec-body { padding:0 4px; }
    .item { margin-bottom:14px; page-break-inside:avoid; }
    .row { display:flex; justify-content:space-between; align-items:baseline; }
    .meta { font-size:10pt; color:#555; margin-bottom:2px; }
    .sub { font-size:9.5pt; color:#555; white-space:nowrap; }
    ul { margin-left:18px; }
    li { margin-bottom:3px; }
    .skills-grid { columns:3; column-gap:20px; }
    .skills-grid li { break-inside:avoid; }
    .footer-bar { height:14px; background:#333; margin-top:24px; border-radius:2px; }
  </style></head><body>
    <div class="header">
      <h1>${esc(p.fullName || "Your Name")}</h1>
      ${p.headline ? `<p class="headline">${esc(p.headline)}</p>` : ""}
      <div class="contact">
        ${[p.phone, p.email, p.location, p.linkedin].filter(Boolean).map(esc).map(v => `<span>${v}</span>`).join("")}
      </div>
    </div>
    ${summary ? sec("About Me", `<p>${nl2br(summary)}</p>`) : ""}
    ${education.length ? sec("Education", education.map(e => `
      <div class="item">
        <p class="meta">${esc(e.institution || "")}${e.year ? ` | ${esc(e.year)}` : ""}</p>
        <h3>${esc(e.degree || "")}</h3>
        ${e.description ? `<p>${nl2br(e.description)}</p>` : ""}
      </div>`).join("")) : ""}
    ${workExperience.length ? sec("Work Experience", workExperience.map(e => `
      <div class="item">
        <p class="meta">${esc(e.company || "")}${e.startDate ? ` | ${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : " – Present"}` : ""}</p>
        <h3>${esc(e.role || "")}</h3>
        ${e.description ? `<p>${nl2br(e.description)}</p>` : ""}
      </div>`).join("")) : ""}
    ${projects.length ? sec("Projects", projects.map(pr => `
      <div class="item">
        <div class="row"><span class="meta">${esc(pr.title || "")}</span>${pr.link ? `<span class="sub">${esc(pr.link)}</span>` : ""}</div>
        ${pr.description ? `<p>${nl2br(pr.description)}</p>` : ""}
      </div>`).join("")) : ""}
    ${allSkills.length ? sec("Skills", `<ul class="skills-grid">${allSkills.map(s => `<li>${esc(s)}</li>`).join("")}</ul>`) : ""}
    ${achievements.length ? sec("Achievements", `<ul>${achievements.map(a => `<li>${esc(a.title || a)}</li>`).join("")}</ul>`) : ""}
    ${certifications.length ? sec("Certifications", certifications.map(c => `<div class="item"><h3>${esc(c.title || c)}</h3></div>`).join("")) : ""}
    ${languages.length ? sec("Languages", `<p>${languages.map(esc).join(" • ")}</p>`) : ""}
    ${hobbies.length ? sec("Interests", `<p>${hobbies.map(h => esc(h.title || h)).join(" • ")}</p>`) : ""}
    <div class="footer-bar"></div>
  </body></html>`;
}

/* ---------- 3. SOFT PROFESSIONAL ---------- */
function buildSoftProfessional(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const secTitle = (t) => `<h2 class="sec-title">${esc(t)}</h2>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 20mm; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: "Inter", Arial, sans-serif; font-size:9.5pt; color:#111; line-height:1.5; }
    h1 { font-size:24pt; font-weight:700; color:#000; margin-bottom:2px; }
    h2.sec-title { font-size:9.5pt; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#6b7280; margin-bottom:8px; margin-top:18px; }
    h3 { font-size:11pt; font-weight:600; color:#000; }
    .headline { font-size:10.5pt; color:#374151; margin-bottom:4px; }
    .contact { font-size:9pt; color:#111; display:flex; flex-wrap:wrap; gap:10px; margin-top:4px; }
    .item { margin-bottom:12px; page-break-inside:avoid; }
    .row { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
    .blue { color:#2b83c9; font-size:10pt; }
    .gray { font-size:9pt; color:#6b7280; white-space:nowrap; }
    ul { margin-left:16px; }
    li { margin-bottom:2px; }
    .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:16px 24px; margin-top:8px; }
  </style></head><body>
    <h1>${esc(p.fullName || "Your Name")}</h1>
    ${p.headline ? `<p class="headline">${esc(p.headline)}</p>` : ""}
    <div class="contact">
      ${[p.phone, p.email, p.linkedin, p.location].filter(Boolean).map(esc).map(v => `<span>${v}</span>`).join("")}
    </div>
    ${summary ? `${secTitle("Summary")}<p>${nl2br(summary)}</p>` : ""}
    ${workExperience.length ? `${secTitle("Experience")}${workExperience.map(e => `
      <div class="item">
        <div class="row"><h3>${esc(e.role || "")}</h3><span class="gray">${esc(e.location || "")}</span></div>
        <div class="row"><span class="blue">${esc(e.company || "")}</span><span class="gray">${esc(e.startDate || "")}${e.endDate ? ` – ${esc(e.endDate)}` : e.startDate ? " – Present" : ""}</span></div>
        ${e.description ? `<ul>${e.description.split("\n").filter(Boolean).map(l => `<li>${esc(l)}</li>`).join("")}</ul>` : ""}
      </div>`).join("")}` : ""}
    ${projects.length ? `${secTitle("Projects")}${projects.map(pr => `
      <div class="item">
        <div class="row"><h3>${esc(pr.title || "")}</h3><span class="gray">${esc(pr.date || "")}</span></div>
        ${pr.link ? `<p class="blue">${esc(pr.link)}</p>` : ""}
        ${pr.description ? `<p>${nl2br(pr.description)}</p>` : ""}
      </div>`).join("")}` : ""}
    ${education.length ? `${secTitle("Education")}${education.map(e => `
      <div class="item">
        <div class="row"><h3>${esc(e.degree || "")}</h3><span class="gray">${esc(e.location || "")}</span></div>
        <div class="row"><span>${esc(e.institution || "")}</span><span class="gray">${e.startDate ? `${esc(e.startDate)} – ` : ""}${esc(e.endDate || e.year || "")}</span></div>
        ${e.description ? `<p>${nl2br(e.description)}</p>` : ""}
      </div>`).join("")}` : ""}
    ${achievements.length ? `${secTitle("Key Achievements")}<div class="grid2">${achievements.map(a => {
    const title = typeof a === "string" ? a : a.title;
    const desc = typeof a === "string" ? "" : a.description;
    return `<div><p class="blue" style="font-weight:600">${esc(title)}</p>${desc ? `<p>${esc(desc)}</p>` : ""}</div>`;
  }).join("")}</div>` : ""}
    <div class="grid2">
      ${technicalSkills.length ? `<div><h2 class="sec-title" style="margin-top:0">Technical Skills</h2><p>${technicalSkills.map(esc).join(", ")}</p></div>` : ""}
      ${softSkills.length ? `<div><h2 class="sec-title" style="margin-top:0">Soft Skills</h2><p>${softSkills.map(esc).join(", ")}</p></div>` : ""}
      ${certifications.length ? `<div><h2 class="sec-title" style="margin-top:0">Certifications</h2><ul>${certifications.map(c => `<li>${esc(c.title || c)}</li>`).join("")}</ul></div>` : ""}
      ${languages.length ? `<div><h2 class="sec-title" style="margin-top:0">Languages</h2><p>${languages.map(esc).join(", ")}</p></div>` : ""}
      ${hobbies.length ? `<div><h2 class="sec-title" style="margin-top:0">Interests</h2><p>${hobbies.map(h => esc(h.title || h)).join(", ")}</p></div>` : ""}
    </div>
  </body></html>`;
}

/* ---------- 4. MODERN CREATIVE ---------- */
function buildModernCreative(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const sec = (title, body) => `
    <div class="section">
      <h2>${esc(title)}</h2>
      ${body}
    </div>`;

  const descList = (desc) => desc
    ? `<ul>${desc.split("\n").filter(Boolean).map(l => `<li>${esc(l)}</li>`).join("")}</ul>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 0.8in; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: "Times New Roman", Times, serif; font-size:10.5pt; color:#000; line-height:1.5; }
    h1 { font-size:24pt; font-weight:600; margin-bottom:2px; }
    h2 { font-size:11pt; font-weight:700; text-transform:uppercase; border-bottom:1.5px solid #000; padding-bottom:2px; margin-bottom:8px; margin-top:14px; letter-spacing:0.5px; }
    h3 { font-size:10.5pt; font-weight:700; }
    .headline { font-size:12pt; margin-bottom:2px; }
    .contact { font-size:10.5pt; margin-bottom:12px; }
    .section { margin-bottom:4px; page-break-inside:avoid; }
    .item { margin-bottom:8px; page-break-inside:avoid; }
    .row { display:flex; justify-content:space-between; }
    .italic { font-style:italic; }
    ul { margin-left:18px; margin-top:2px; }
    li { margin-bottom:2px; }
    .blue { color:#1d4ed8; }
  </style></head><body>
    <h1>${esc(p.fullName || "First Last")}</h1>
    ${p.headline ? `<p class="headline">${esc(p.headline)}</p>` : ""}
    <p class="contact">${contactLine(p)}</p>
    ${summary ? sec("Professional Summary", `<p>${nl2br(summary)}</p>`) : ""}
    ${workExperience.length ? sec("Experience", workExperience.map(e => `
      <div class="item">
        <div class="row"><strong>${esc(e.company || "")}</strong><span>${esc(e.startDate || "")}${e.endDate ? ` – ${esc(e.endDate)}` : e.startDate ? " – Present" : ""}</span></div>
        <div class="row"><span class="italic">${esc(e.role || "")}</span>${e.location ? `<span>${esc(e.location)}</span>` : ""}</div>
        ${descList(e.description)}
      </div>`).join("")) : ""}
    ${projects.length ? sec("Projects", projects.map(pr => `
      <div class="item">
        <div class="row"><strong>${esc(pr.title || "")}</strong>${pr.date ? `<span>${esc(pr.date)}</span>` : ""}</div>
        ${pr.link ? `<p class="blue">${esc(pr.link)}</p>` : ""}
        ${descList(pr.description)}
      </div>`).join("")) : ""}
    ${education.length ? sec("Education", education.map(e => `
      <div class="item">
        <div class="row"><strong>${esc(e.institution || "")}</strong><span>${e.startDate ? `${esc(e.startDate)} – ` : ""}${esc(e.endDate || e.year || "")}</span></div>
        <div class="row"><span>${esc(e.degree || "")}</span>${e.location ? `<span>${esc(e.location)}</span>` : ""}</div>
        ${descList(e.description)}
      </div>`).join("")) : ""}
    ${achievements.length ? sec("Achievements", `<ul>${achievements.map(a => `<li>${esc(typeof a === "string" ? a : `${a.title || ""} ${a.description || ""}`)}</li>`).join("")}</ul>`) : ""}
    ${(technicalSkills.length || softSkills.length || certifications.length || languages.length || hobbies.length) ? sec("Other", `<ul>
      ${technicalSkills.length ? `<li><strong>Technical Skills:</strong> ${technicalSkills.map(esc).join(", ")}</li>` : ""}
      ${softSkills.length ? `<li><strong>Soft Skills:</strong> ${softSkills.map(esc).join(", ")}</li>` : ""}
      ${certifications.length ? `<li><strong>Certifications:</strong> ${certifications.map(c => esc(c.title || c)).join(", ")}</li>` : ""}
      ${languages.length ? `<li><strong>Languages:</strong> ${languages.map(esc).join(", ")}</li>` : ""}
      ${hobbies.length ? `<li><strong>Interests:</strong> ${hobbies.map(h => esc(h.title || h)).join(", ")}</li>` : ""}
    </ul>`) : ""}
  </body></html>`;
}

/* ---------- 5. EXECUTIVE CLEAN ---------- */
function buildExecutiveClean(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const sec = (title, body) => `
    <div class="section">
      <h2>${esc(title)}</h2>${body}
    </div>`;

  const descItems = (desc) => {
    if (!desc) return "";
    return desc.split("\n").filter(Boolean).map(line => {
      const t = line.trim();
      return /^[-•*]/.test(t)
        ? `<div class="bullet"><span class="dot">•</span><span>${esc(t.replace(/^[-•*]\s*/, ""))}</span></div>`
        : `<p class="para">${esc(t)}</p>`;
    }).join("");
  };

  const skillRows = [
    technicalSkills.length ? `<div class="skill-row"><strong>Technical Skills:</strong> ${technicalSkills.map(esc).join(", ")}</div>` : "",
    softSkills.length ? `<div class="skill-row"><strong>Soft Skills:</strong> ${softSkills.map(esc).join(", ")}</div>` : "",
    languages.length ? `<div class="skill-row"><strong>Languages:</strong> ${languages.map(esc).join(", ")}</div>` : "",
    certifications.length ? `<div class="skill-row"><strong>Certifications:</strong> ${certifications.map(c => esc(c.title || c)).join(", ")}</div>` : "",
    achievements.length ? `<div class="skill-row"><strong>Achievements:</strong> ${achievements.map(a => esc(typeof a === "string" ? a : a.title)).join(", ")}</div>` : "",
    hobbies.length ? `<div class="skill-row"><strong>Interests:</strong> ${hobbies.map(h => esc(h.title || h)).join(", ")}</div>` : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 0.8in; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size:9.5pt; color:#475569; line-height:1.5; }
    h1 { font-size:28pt; font-weight:700; color:#3b5998; margin-bottom:4px; }
    h2 { font-size:10pt; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#3b5998; border-bottom:1.5px solid #e2e8f0; padding-bottom:3px; margin-bottom:8px; margin-top:14px; }
    .headline { font-size:13pt; color:#64748b; margin-bottom:4px; }
    .contact { font-size:9pt; color:#94a3b8; display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:8px; }
    .contact span { display:inline; }
    .contact .dot { color:#94a3b8; font-size:8px; }
    .section { margin-bottom:4px; page-break-inside:avoid; }
    .item { margin-bottom:10px; page-break-inside:avoid; }
    .row { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
    .role { font-weight:700; font-size:10pt; color:#1e293b; }
    .company { font-size:10pt; color:#64748b; }
    .date { font-weight:700; font-size:10pt; color:#1e293b; white-space:nowrap; }
    .para { font-size:9.5pt; color:#64748b; margin-bottom:4px; text-align:justify; }
    .bullet { display:flex; align-items:flex-start; gap:6px; margin-bottom:3px; }
    .dot { color:#3b5998; font-size:12px; line-height:1.4; flex-shrink:0; }
    .skill-row { font-size:9.5pt; color:#64748b; margin-bottom:3px; }
  </style></head><body>
    <h1>${esc(p.fullName || "First Last")}</h1>
    ${p.headline ? `<p class="headline">${esc(p.headline)}</p>` : ""}
    <div class="contact">
      ${[p.location, p.phone, p.email, p.linkedin].filter(Boolean).map((v, i, arr) =>
    `<span>${esc(v)}</span>${i < arr.length - 1 ? '<span class="dot">•</span>' : ""}`
  ).join("")}
    </div>
    ${summary ? `${summary.split("\n").filter(Boolean).map(s => `<p class="para">${esc(s)}</p>`).join("")}<div style="height:10px"></div>` : ""}
    ${workExperience.length ? sec("Work Experience", workExperience.map(e => `
      <div class="item">
        <div class="row"><span class="role">${esc(e.role || "")}</span><span class="date">${esc(e.startDate || "")}${e.endDate ? ` – ${esc(e.endDate)}` : e.startDate ? " – Present" : ""}</span></div>
        <p class="company">${esc(e.company || "")}${e.location ? `, ${esc(e.location)}` : ""}</p>
        ${descItems(e.description)}
      </div>`).join("")) : ""}
    ${projects.length ? sec("Projects", projects.map(pr => `
      <div class="item">
        <div class="row"><span class="role">${esc(pr.title || "")}</span>${pr.date ? `<span class="date">${esc(pr.date)}</span>` : ""}</div>
        ${pr.link ? `<p style="font-size:9pt;color:#3b5998">${esc(pr.link)}</p>` : ""}
        ${descItems(pr.description)}
      </div>`).join("")) : ""}
    ${education.length ? sec("Education", education.map(e => `
      <div class="item">
        <div class="row"><span class="role">${esc(e.institution || "")}${e.location ? `, ${esc(e.location)}` : ""}</span><span class="date">${e.startDate ? `${esc(e.startDate)} – ` : ""}${esc(e.endDate || e.year || "")}</span></div>
        <p class="company">${esc(e.degree || "")}</p>
        ${e.description ? `<p class="para">${esc(e.description)}</p>` : ""}
      </div>`).join("")) : ""}
    ${skillRows ? sec("Skills & Other", skillRows) : ""}
  </body></html>`;
}

/* ---------- 6. BOLD SIDEBAR ---------- */
function buildBoldSidebar(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const allSkills = [...technicalSkills, ...softSkills];

  const mainSec = (title, body) => `
    <h2 class="main-title">${esc(title)}</h2>${body}`;

  const sideSec = (title, body) => `
    <h2 class="side-title">${esc(title)}</h2>${body}`;

  const bullet = (text) => `<div class="bullet"><span class="dot">●</span><p>${esc(text)}</p></div>`;
  const sideBullet = (text) => `<div class="side-bullet"><span>•</span><span>${esc(text)}</span></div>`;

  const mainContent = [
    `<div class="name-block">
      <h1>${esc(p.fullName || "First Last")}</h1>
      ${p.headline ? `<p class="headline">${esc(p.headline)}</p>` : ""}
    </div>`,
    summary ? mainSec("SUMMARY", `<p class="para">${nl2br(summary)}</p>`) : "",
    workExperience.length ? mainSec("WORK EXPERIENCE", workExperience.map(e => `
      <div class="item">
        <div class="row"><strong>${esc(e.company || "")}${e.location ? `, ${esc(e.location)}` : ""}</strong><span class="date">${esc(e.startDate || "")}${e.endDate ? ` – ${esc(e.endDate)}` : e.startDate ? " – Present" : ""}</span></div>
        <p class="sub">${esc(e.role || "")}</p>
        ${e.description ? e.description.split("\n").filter(Boolean).map(l => bullet(l)).join("") : ""}
      </div>`).join("")) : "",
    achievements.length ? mainSec("VOLUNTEERING & ACHIEVEMENTS", achievements.map(a => bullet(typeof a === "string" ? a : `${a.title || ""} ${a.description || ""}`)).join("")) : "",
    projects.length ? mainSec("PROJECTS", projects.map(pr => `
      <div class="item">
        <div class="row"><strong>${esc(pr.title || "")}</strong>${pr.date ? `<span class="date">${esc(pr.date)}</span>` : ""}</div>
        ${pr.link ? `<p style="color:#65538f;font-size:9pt">${esc(pr.link)}</p>` : ""}
        ${pr.description ? pr.description.split("\n").filter(Boolean).map(l => bullet(l)).join("") : ""}
      </div>`).join("")) : "",
  ].filter(Boolean).join("");

  const contacts = [p.location, p.phone, p.email, p.linkedin, p.website].filter(Boolean);
  const sideContent = [
    contacts.length ? sideSec("CONTACT", contacts.map(sideBullet).join("")) : "",
    allSkills.length ? sideSec("SKILLS", allSkills.map(s => sideBullet(typeof s === "string" ? s : s.title)).join("")) : "",
    education.length ? sideSec("EDUCATION", education.map(e => `
      <div class="edu-item">
        <strong>${esc(e.institution || "")}</strong>
        <p>${esc(e.degree || "")}</p>
        <p class="edu-date">${e.startDate ? `${esc(e.startDate)} – ` : ""}${esc(e.endDate || e.year || "")}</p>
      </div>`).join("")) : "",
    certifications.length ? sideSec("CERTIFICATIONS", certifications.map(c => sideBullet(c.title || c)).join("")) : "",
    languages.length ? sideSec("LANGUAGES", languages.map(l => sideBullet(typeof l === "string" ? l : l)).join("")) : "",
    hobbies.length ? sideSec("OTHER", hobbies.map(h => sideBullet(h.title || h)).join("")) : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 0; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size:9.5pt; color:#475569; line-height:1.5; }
    .wrapper { display:flex; width:210mm; min-height:297mm; }
    .main { width:65%; padding:24mm 20mm 20mm 20mm; }
    .sidebar { width:35%; background:#f4f0f8; padding:24mm 14mm 20mm 14mm; }
    h1 { font-size:28pt; font-weight:900; color:#65538f; line-height:1; margin-bottom:6px; }
    .headline { font-size:13pt; color:#94a3b8; font-weight:500; }
    .name-block { margin-bottom:16px; }
    .main-title, .side-title { font-size:10pt; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#65538f; border-bottom:1.5px solid #dcd6e8; padding-bottom:3px; margin:16px 0 8px; }
    .item { margin-bottom:10px; page-break-inside:avoid; }
    .row { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
    .date { font-size:9pt; font-weight:700; color:#1e293b; white-space:nowrap; }
    .sub { font-size:9.5pt; color:#64748b; }
    .para { font-size:9.5pt; color:#64748b; text-align:justify; margin-bottom:4px; }
    .bullet { display:flex; align-items:flex-start; gap:8px; margin-bottom:4px; }
    .dot { color:#65538f; font-size:7px; margin-top:5px; flex-shrink:0; }
    .side-bullet { display:flex; gap:6px; margin-bottom:4px; font-size:9pt; color:#475569; }
    .edu-item { margin-bottom:8px; font-size:9pt; color:#64748b; }
    .edu-item strong { color:#334155; font-size:9.5pt; }
    .edu-date { font-size:8.5pt; color:#94a3b8; }
  </style></head><body>
    <div class="wrapper">
      <div class="main">${mainContent}</div>
      <div class="sidebar">${sideContent}</div>
    </div>
  </body></html>`;
}

/* ---------- 7. CLASSIC ELEGANT ---------- */
function buildClassicElegant(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const allSkills = [...technicalSkills, ...softSkills];

  const secTitle = (t) => `<h2 class="sec-title">${esc(t)}</h2>`;
  const arrow = (text) => `<div class="arrow-item"><span>→</span><span>${esc(text)}</span></div>`;

  const leftContent = [
    secTitle("CONTACT"),
    p.phone ? `<div class="contact-item"><span>📞</span><span>${esc(p.phone)}</span></div>` : "",
    p.location ? `<div class="contact-item"><span>📍</span><span>${esc(p.location)}</span></div>` : "",
    p.email ? `<div class="contact-item"><span>✉</span><span>${esc(p.email)}</span></div>` : "",
    p.linkedin ? `<div class="contact-item"><span>in</span><span>${esc(p.linkedin)}</span></div>` : "",
    education.length ? [secTitle("EDUCATION"), ...education.map(e => `
      <div class="edu-item">
        <strong>${esc(e.institution || "")}</strong>
        <p>${esc(e.degree || "")}</p>
        <p class="gray">${e.startDate ? `${esc(e.startDate)} – ` : ""}${esc(e.endDate || e.year || "")}</p>
      </div>`)].join("") : "",
    allSkills.length ? [secTitle("SKILLS"), ...allSkills.map(s => arrow(typeof s === "string" ? s : s.title))].join("") : "",
    certifications.length ? [secTitle("CERTIFICATION"), ...certifications.map(c => `<div class="edu-item"><strong>${esc(c.title || c)}</strong>${c.date ? `<p class="gray">${esc(c.date)}</p>` : ""}</div>`)].join("") : "",
    languages.length ? [secTitle("LANGUAGES"), `<p class="small">${languages.map(esc).join(", ")}</p>`].join("") : "",
    hobbies.length ? [secTitle("INTERESTS"), `<p class="small">${hobbies.map(h => esc(h.title || h)).join(", ")}</p>`].join("") : "",
  ].filter(Boolean).join("");

  const rightContent = [
    summary ? [secTitle("ABOUT ME"), ...summary.split("\n").filter(Boolean).map(s => `<p class="body-text">${esc(s)}</p>`)].join("") : "",
    workExperience.length ? [secTitle("WORK EXPERIENCE"), ...workExperience.map(e => `
      <div class="item">
        <h3>${esc(e.role || "")}</h3>
        <p class="company">${esc(e.company || "")} (${esc(e.startDate || "")} – ${esc(e.endDate || "Present")})</p>
        ${e.description ? e.description.split("\n").filter(Boolean).map(l => `<p class="body-text">${esc(l)}</p>`).join("") : ""}
      </div>`)].join("") : "",
    projects.length ? [secTitle("PROJECTS"), ...projects.map(pr => `
      <div class="item">
        <h3>${esc(pr.title || "")}</h3>
        ${pr.date ? `<p class="gray">${esc(pr.date)}</p>` : ""}
        ${pr.description ? pr.description.split("\n").filter(Boolean).map(l => `<p class="body-text">${esc(l)}</p>`).join("") : ""}
      </div>`)].join("") : "",
    achievements.length ? [secTitle("ACHIEVEMENTS"), ...achievements.map(a => {
      const text = typeof a === "string" ? a : `${a.title || ""} ${a.description || ""}`;
      return `<div class="ach-item"><span class="dot"></span><span>${esc(text)}</span></div>`;
    })].join("") : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 0; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: "Times New Roman", Times, serif; font-size:9.5pt; color:#374151; line-height:1.5; }
    .wrapper { width:210mm; min-height:297mm; padding:16mm 14mm 14mm; }
    .header { text-align:center; margin-bottom:16px; }
    h1 { font-size:28pt; font-weight:900; text-transform:uppercase; letter-spacing:3px; color:#000; }
    .headline-sub { font-size:11pt; text-transform:uppercase; letter-spacing:2px; color:#6b7280; margin-top:4px; }
    hr { border-top:1.5px solid #d1d5db; margin:10px 0; }
    .cols { display:flex; gap:24px; }
    .left { width:35%; flex-shrink:0; }
    .right { flex:1; }
    .sec-title { font-size:11pt; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#000; margin:14px 0 6px; }
    .contact-item { display:flex; gap:8px; align-items:flex-start; margin-bottom:6px; font-size:9pt; color:#374151; }
    .edu-item { margin-bottom:8px; }
    .edu-item strong { font-size:9.5pt; text-transform:uppercase; color:#000; }
    .gray { font-size:9pt; color:#6b7280; }
    .small { font-size:9.5pt; }
    .arrow-item { display:flex; gap:6px; margin-bottom:4px; font-size:9.5pt; }
    .item { margin-bottom:10px; page-break-inside:avoid; }
    h3 { font-size:10pt; font-weight:700; text-transform:uppercase; color:#000; }
    .company { font-size:10pt; text-transform:uppercase; color:#374151; margin-bottom:2px; }
    .body-text { font-size:10pt; color:#4b5563; text-align:justify; margin-bottom:3px; }
    .ach-item { display:flex; gap:6px; align-items:flex-start; margin-bottom:4px; font-size:10pt; color:#374151; }
    .dot { width:6px; height:6px; background:#374151; border-radius:50%; margin-top:6px; flex-shrink:0; }
  </style></head><body>
    <div class="wrapper">
      <div class="header">
        <h1>${esc(p.fullName || "YOUR NAME")}</h1>
        ${p.headline ? `<p class="headline-sub">${esc(p.headline)}</p>` : ""}
        <hr/>
      </div>
      <div class="cols">
        <div class="left">${leftContent}</div>
        <div class="right">${rightContent}</div>
      </div>
    </div>
  </body></html>`;
}

/* ---------- 8. PROFESSIONAL SIDEBAR ---------- */
function buildProfessionalSidebar(d) {
  const { personalInfo: p = {}, summary, technicalSkills = [], softSkills = [],
    workExperience = [], projects = [], education = [], achievements = [],
    certifications = [], languages = [], hobbies = [] } = d;

  const nameParts = (p.fullName || "YOUR NAME").trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const mainHeader = (title) => `
    <div class="main-header">
      <h2>${esc(title)}</h2>
      <div class="main-line"></div>
    </div>`;

  const timelineItem = (body) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      ${body}
    </div>`;

  const sideHeader = (title) => `
    <div class="side-header">
      <h2>${esc(title)}</h2>
      <div class="side-line"></div>
    </div>`;

  const sidebarContent = `
    <div class="name-block">
      <h1><span class="block">${esc(firstName)}</span>${lastName ? `<span class="block">${esc(lastName)}</span>` : ""}</h1>
      <p class="headline">${esc(p.headline || "Professional Title")}</p>
    </div>
    <div class="contacts">
      ${p.phone ? `<div class="contact-row"><span class="icon">📱</span><span>${esc(p.phone)}</span></div>` : ""}
      ${p.email ? `<div class="contact-row"><span class="icon">✉</span><span>${esc(p.email)}</span></div>` : ""}
      ${p.location ? `<div class="contact-row"><span class="icon">📍</span><span>${esc(p.location)}</span></div>` : ""}
      ${p.linkedin ? `<div class="contact-row"><span class="icon">in</span><span>${esc(p.linkedin)}</span></div>` : ""}
    </div>
    ${softSkills.length ? `${sideHeader("SKILLS")}<div class="side-list">${softSkills.map(s => `<div>${esc(s)}</div>`).join("")}</div>` : ""}
    ${technicalSkills.length ? `${sideHeader("SOFTWARE")}<div class="side-list">${technicalSkills.map(s => `<div>${esc(s)}</div>`).join("")}</div>` : ""}
    ${languages.length ? `${sideHeader("LANGUAGE")}<div class="side-list">${languages.map(l => `<div>${esc(l)}</div>`).join("")}</div>` : ""}
  `;

  const mainContent = `
    ${summary ? `${mainHeader("SUMMARY")}<p class="body-text">${nl2br(summary)}</p>` : ""}
    ${workExperience.length ? `${mainHeader("WORK EXPERIENCE")}${workExperience.map(e => timelineItem(`
      <p class="date-text">${esc(e.startDate || "")} – ${esc(e.endDate || "Present")}</p>
      <p class="item-title"><strong>${esc(e.role || "")}</strong>${e.company ? ` – ${esc(e.company)}` : ""}</p>
      ${e.location ? `<p class="italic-text">${esc(e.location)}</p>` : ""}
      ${e.description ? e.description.split("\n").filter(Boolean).map(l => `<p class="body-text">${esc(l)}</p>`).join("") : ""}
    `)).join("")}` : ""}
    ${education.length ? `${mainHeader("EDUCATION")}${education.map(e => timelineItem(`
      <p class="date-text">${e.startDate ? `${esc(e.startDate)} – ` : ""}${esc(e.endDate || e.year || "")}</p>
      <p class="item-title"><strong>${esc(e.institution || "")}</strong>${e.degree ? ` – ${esc(e.degree)}` : ""}</p>
      ${e.location ? `<p class="italic-text">${esc(e.location)}</p>` : ""}
      ${e.description ? `<p class="body-text">${esc(e.description)}</p>` : ""}
    `)).join("")}` : ""}
    ${projects.length ? `${mainHeader("PUBLICATIONS")}${projects.map(pr => timelineItem(`
      ${pr.date ? `<p class="date-text">${esc(pr.date)}</p>` : ""}
      <p class="item-title"><strong>${esc(pr.title || "")}</strong></p>
      ${pr.description ? `<p class="body-text">${esc(pr.description)}</p>` : ""}
    `)).join("")}` : ""}
    ${achievements.length ? `${mainHeader("AWARDS")}${achievements.map(a => timelineItem(`
      <p class="item-title">${esc(typeof a === "string" ? a : a.title || "")}</p>
    `)).join("")}` : ""}
    ${certifications.length ? `${mainHeader("CERTIFICATE")}${certifications.map(c => timelineItem(`
      <p class="item-title">${esc(c.title || c)}</p>
      ${c.date ? `<p class="date-text">${esc(c.date)}</p>` : ""}
    `)).join("")}` : ""}
    ${hobbies.length ? `${mainHeader("HOBBIES")}<p class="body-text">${hobbies.map(h => esc(h.title || h)).join(", ")}</p>` : ""}
  `;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 0; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size:10pt; color:#374151; line-height:1.5; }
    .wrapper { display:flex; width:210mm; min-height:297mm; }
    .sidebar { width:34%; background:#0A2647; color:white; padding:20mm 14mm; }
    .main { width:66%; padding:20mm 14mm 20mm 18mm; }
    h1 { font-size:26pt; font-weight:900; text-transform:uppercase; letter-spacing:2px; line-height:1.05; margin-bottom:8px; }
    .block { display:block; }
    .headline { font-size:11pt; font-weight:300; letter-spacing:1px; color:#8BA7C9; }
    .name-block { margin-bottom:20px; }
    .contacts { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; font-size:9pt; }
    .contact-row { display:flex; gap:8px; align-items:flex-start; }
    .icon { width:20px; flex-shrink:0; text-align:center; }
    .side-header h2 { font-size:11pt; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:4px; margin-top:16px; }
    .side-line { height:1.5px; background:white; margin-bottom:8px; }
    .side-list { display:flex; flex-direction:column; gap:6px; font-size:10pt; font-weight:300; }
    .main-header { margin-bottom:8px; margin-top:16px; }
    .main-header h2 { font-size:12pt; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#0A2647; margin-bottom:4px; }
    .main-line { height:1.5px; background:#8BA7C9; }
    .timeline-item { border-left:1.5px solid #8BA7C9; margin-left:6px; padding-left:16px; padding-bottom:16px; position:relative; }
    .timeline-dot { position:absolute; left:-6px; top:4px; width:10px; height:10px; border-radius:50%; border:2px solid #0A2647; background:white; }
    .date-text { font-size:9.5pt; color:#6b7280; margin-bottom:2px; }
    .item-title { font-size:10.5pt; color:#0A2647; margin-bottom:2px; }
    .italic-text { font-size:9.5pt; font-style:italic; color:#6b7280; }
    .body-text { font-size:10pt; color:#4b5563; text-align:justify; margin-bottom:3px; }
  </style></head><body>
    <div class="wrapper">
      <div class="sidebar">${sidebarContent}</div>
      <div class="main">${mainContent}</div>
    </div>
  </body></html>`;
}

/* ===============================================================
   DISPATCHER — picks the right builder by templateSlug
   =============================================================== */
export function buildTemplateHTML(data, templateSlug) {
  switch (templateSlug) {
    case "modern-ats-v1": return buildModernATS(data);
    case "soft-professional-v1": return buildSoftProfessional(data);
    case "modern-creative-v1": return buildModernCreative(data);
    case "executive-clean-v1": return buildExecutiveClean(data);
    case "bold-sidebar-v1": return buildBoldSidebar(data);
    case "classic-elegant-v1": return buildClassicElegant(data);
    case "professional-sidebar-v1": return buildProfessionalSidebar(data);
    case "clean-ats-v1":
    default: return buildCleanATS(data);
  }
}

/* ===============================================================
   DOCX EXPORT (template-agnostic structured document)
   =============================================================== */
export async function generateDOCX(resumeData) {
  const {
    personalInfo = {}, summary = "", education = [], workExperience = [],
    projects = [], technicalSkills = [], softSkills = [], certifications = [],
    achievements = [], languages = [], hobbies = [],
  } = resumeData;

  const children = [];

  children.push(new Paragraph({
    children: [new TextRun({ text: personalInfo.fullName || "Your Name", bold: true, size: 32 })],
    spacing: { after: 200 },
  }));

  const contact = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin]
    .filter(Boolean).join(" | ");
  if (contact) children.push(new Paragraph({ children: [new TextRun({ text: contact, size: 20 })], spacing: { after: 300 } }));

  const addSection = (title, items) => {
    children.push(new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 24 })], spacing: { before: 200, after: 100 } }));
    items.forEach(p => children.push(p));
  };

  if (summary) addSection("PROFESSIONAL SUMMARY", [
    new Paragraph({ children: [new TextRun({ text: summary, size: 22 })], spacing: { after: 300 } }),
  ]);

  if (education.length) addSection("EDUCATION", education.flatMap(e => [
    new Paragraph({ children: [new TextRun({ text: `${e.degree || ""}${e.institution ? ` - ${e.institution}` : ""}`, bold: true, size: 22 })], spacing: { after: 50 } }),
    new Paragraph({ children: [new TextRun({ text: e.year || "", italics: true, size: 20 })], spacing: { after: e.description ? 50 : 200 } }),
    ...(e.description ? [new Paragraph({ children: [new TextRun({ text: e.description, size: 22 })], spacing: { after: 200 } })] : []),
  ]));

  if (workExperience.length) addSection("WORK EXPERIENCE", workExperience.flatMap(e => [
    new Paragraph({ children: [new TextRun({ text: `${e.role || ""}${e.company ? ` at ${e.company}` : ""}`, bold: true, size: 22 })], spacing: { after: 50 } }),
    new Paragraph({ children: [new TextRun({ text: `${e.startDate || ""}${e.endDate ? ` - ${e.endDate}` : ""}`, italics: true, size: 20 })], spacing: { after: e.description ? 50 : 200 } }),
    ...(e.description ? [new Paragraph({ children: [new TextRun({ text: e.description, size: 22 })], spacing: { after: 200 } })] : []),
  ]));

  if (projects.length) addSection("PROJECTS", projects.flatMap(p => [
    new Paragraph({ children: [new TextRun({ text: p.title || "", bold: true, size: 22 })], spacing: { after: 50 } }),
    ...(p.link ? [new Paragraph({ children: [new TextRun({ text: p.link, italics: true, size: 20 })], spacing: { after: 50 } })] : []),
    ...(p.description ? [new Paragraph({ children: [new TextRun({ text: p.description, size: 22 })], spacing: { after: 200 } })] : []),
  ]));

  if (technicalSkills.length) addSection("TECHNICAL SKILLS", [new Paragraph({ children: [new TextRun({ text: technicalSkills.join(", "), size: 22 })], spacing: { after: 300 } })]);
  if (softSkills.length) addSection("SOFT SKILLS", [new Paragraph({ children: [new TextRun({ text: softSkills.join(", "), size: 22 })], spacing: { after: 300 } })]);
  if (certifications.length) addSection("CERTIFICATIONS", certifications.map(c => new Paragraph({ children: [new TextRun({ text: `• ${c.title || c}`, size: 22 })], spacing: { after: 50 } })));
  if (achievements.length) addSection("ACHIEVEMENTS", achievements.map(a => new Paragraph({ children: [new TextRun({ text: `• ${typeof a === "string" ? a : a.title}`, size: 22 })], spacing: { after: 50 } })));
  if (languages.length) addSection("LANGUAGES", languages.map(l => new Paragraph({ children: [new TextRun({ text: `• ${l}`, size: 22 })], spacing: { after: 50 } })));
  if (hobbies.length) addSection("INTERESTS", hobbies.map(h => new Paragraph({ children: [new TextRun({ text: `• ${h.title || h}`, size: 22 })], spacing: { after: 50 } })));

  const doc = new Document({ sections: [{ children }] });
  return await Packer.toBuffer(doc);
}
