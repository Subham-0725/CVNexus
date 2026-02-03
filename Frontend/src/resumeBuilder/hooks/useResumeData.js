// src/resumeBuilder/hooks/useResumeData.js
import { useState, useEffect } from "react";
import normalizeResumeData from "../utils/normalizeResumeData";

export default function useResumeData(resume) {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    if (resume) {
      setResumeData(normalizeResumeData(resume.data || {}));
    }
  }, [resume]);

  return {
    resumeData,
    setResumeData,
  };
}
