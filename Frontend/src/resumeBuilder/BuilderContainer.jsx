import ResumeEditor from "./editor/ResumeEditor";
import ResumePreview from "./preview/ResumePreview";

import useResumeData from "./hooks/useResumeData";
import useTemplate from "./hooks/useTemplate";

export default function BuilderContainer({ resume }) {
  const { resumeData, setResumeData } = useResumeData(resume);
  const { templateSlug } = useTemplate(resume);

  // Safety: resume fetched but data not initialized yet
  if (!resumeData) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-600">
        Initializing resume…
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* ===================== EDITOR ===================== */}
      <div className="border-r border-slate-200 overflow-y-auto">
        <ResumeEditor resumeData={resumeData} onChange={setResumeData} />
      </div>

      {/* ===================== PREVIEW ===================== */}
      <div className="overflow-y-auto bg-slate-100">
        <ResumePreview
          resume={{
            templateSlug,
            data: resumeData,
          }}
        />
      </div>
    </div>
  );
}
