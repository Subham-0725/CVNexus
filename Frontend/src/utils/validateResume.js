const ACTION_VERB_REGEX =
  /\b(built|developed|led|improved|increased|designed|implemented|created|optimized|managed|delivered|launched|automated|achieved)\b/i;
const MEASURABLE_IMPACT_REGEX = /(\d|%|\$)/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;

const toArray = (value) => (Array.isArray(value) ? value : []);
const toString = (value) => (typeof value === "string" ? value : "");

export function validateResume(data) {
  const resume = data && typeof data === "object" ? data : {};
  const errors = {};

  const summary = toString(resume.summary).trim();
  if (!summary || summary.length < 50) {
    errors.summary = ["Summary too short"];
  } else if (summary.length > 500) {
    errors.summary = ["Summary too long"];
  }

  const workExperience = toArray(resume.workExperience);
  workExperience.forEach((item, index) => {
    const experience = item && typeof item === "object" ? item : {};
    const description = toString(experience.description).trim();
    const itemErrors = [];

    if (!description) {
      itemErrors.push("Missing description");
    } else {
      if (!ACTION_VERB_REGEX.test(description)) {
        itemErrors.push("No strong action verbs");
      }
      if (!MEASURABLE_IMPACT_REGEX.test(description)) {
        itemErrors.push("No measurable impact");
      }
    }

    if (itemErrors.length) {
      errors[`workExperience_${index}`] = itemErrors.slice(0, 3);
    }
  });

  const technicalSkills = toArray(resume.technicalSkills).filter(
    (skill) => !!toString(skill).trim()
  );
  if (technicalSkills.length > 15) {
    errors.skills = ["Too many skills (ATS risk)"];
  }

  const personalInfo =
    resume.personalInfo && typeof resume.personalInfo === "object"
      ? resume.personalInfo
      : {};

  const personalErrors = [];
  const email = toString(personalInfo.email).trim();
  if (email && !EMAIL_REGEX.test(email)) {
    personalErrors.push("Invalid email");
  }

  const phone = toString(personalInfo.phone).trim();
  if (phone && !PHONE_REGEX.test(phone)) {
    personalErrors.push("Invalid phone");
  }

  if (personalErrors.length) {
    errors.personalInfo = personalErrors.slice(0, 3);
  }

  return errors;
}
