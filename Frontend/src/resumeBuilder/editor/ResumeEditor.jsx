// src/resumeBuilder/editor/ResumeEditor.jsx
import PersonalInfo from "./sections/PersonalInfo";
import Summary from "./sections/Summary";
import TechnicalSkills from "./sections/TechnicalSkills";
import SoftSkills from "./sections/SoftSkills";
import WorkExperience from "./sections/WorkExperience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Achievements from "./sections/Achievements";
import Certifications from "./sections/Certifications";
import Languages from "./sections/Languages";
import Hobbies from "./sections/Hobbies";

export default function ResumeEditor({ resumeData, onChange }) {
  if (!resumeData) return null;

  const updateSection = (key, value) => {
    onChange({
      ...resumeData,
      [key]: value,
    });
  };

  return (
    <div className="space-y-8 p-6 overflow-y-auto">
      <PersonalInfo
        value={resumeData.personalInfo}
        onChange={(v) => updateSection("personalInfo", v)}
      />

      <Summary
        value={resumeData.summary}
        onChange={(v) => updateSection("summary", v)}
      />

      <WorkExperience
        value={resumeData.workExperience}
        onChange={(v) => updateSection("workExperience", v)}
      />

      <Projects
        value={resumeData.projects}
        onChange={(v) => updateSection("projects", v)}
      />

      <TechnicalSkills
        value={resumeData.technicalSkills}
        onChange={(v) => updateSection("technicalSkills", v)}
      />

      <SoftSkills
        value={resumeData.softSkills}
        onChange={(v) => updateSection("softSkills", v)}
      />

      <Education
        value={resumeData.education}
        onChange={(v) => updateSection("education", v)}
      />

      <Achievements
        value={resumeData.achievements}
        onChange={(v) => updateSection("achievements", v)}
      />

      <Certifications
        value={resumeData.certifications}
        onChange={(v) => updateSection("certifications", v)}
      />

      <Languages
        value={resumeData.languages}
        onChange={(v) => updateSection("languages", v)}
      />

      <Hobbies
        value={resumeData.hobbies}
        onChange={(v) => updateSection("hobbies", v)}
      />
    </div>
  );
}
