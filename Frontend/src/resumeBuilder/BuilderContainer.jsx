import ResumeEditor from "./editor/ResumeEditor";
import ResumePreview from "./preview/ResumePreview";

import useResumeData from "./hooks/useResumeData";
import useTemplate from "./hooks/useTemplate";
import useAutosaveResume from "./hooks/useAutosaveResume";

export default function BuilderContainer({ resume }) {
  const { resumeData, setResumeData } = useResumeData(resume);
  const { templateSlug } = useTemplate(resume);

  useAutosaveResume(resume._id, resumeData);

  if (!resumeData) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-600">
        Initializing resume…
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="border-r border-slate-200 overflow-y-auto">
        <ResumeEditor resumeData={resumeData} onChange={setResumeData} />
      </div>
      <div className="overflow-y-auto bg-slate-100">
        <ResumePreview
          resume={{
            _id: resume._id,
            title: resume.title,
            templateSlug,
            data: resumeData,
          }}
        />
      </div>
    </div>
  );
}
