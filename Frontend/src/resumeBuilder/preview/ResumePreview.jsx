// src/resumeBuilder/preview/ResumePreview.jsx
import { useState } from "react";
import TemplateRenderer from "./TemplateRenderer";

export default function ResumePreview({ resume }) {
  const [scale, setScale] = useState(0.9);

  if (!resume) return null;

  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 1.2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.6));

  return (
    <div className="flex flex-col h-full bg-slate-100 border-l">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <span className="text-sm font-medium text-slate-700">
          Resume Preview
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="px-2 py-1 text-sm border rounded hover:bg-slate-100"
          >
            −
          </button>
          <span className="text-xs text-slate-500">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="px-2 py-1 text-sm border rounded hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 overflow-auto flex justify-center py-10">
        <div
          className="bg-white shadow-lg"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "210mm", // A4 width
            minHeight: "297mm", // A4 height
          }}
        >
          <TemplateRenderer
            templateSlug={resume.templateSlug}
            resumeData={resume.data}
          />
        </div>
      </div>
    </div>
  );
}
