// src/resumeBuilder/utils/normalizeResumeData.js
import defaultResumeData from "./defaultResumeData";

export default function normalizeResumeData(data = {}) {
  return {
    ...defaultResumeData,
    ...data,
    personalInfo: {
      ...defaultResumeData.personalInfo,
      ...(data.personalInfo || {}),
    },
  };
}
