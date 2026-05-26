import React from "react";
import FileUpload from "./FileUpload";
import { Zap, Info } from "lucide-react";

export default function AtsForm({
  formData,
  setFormData,
  setFile,
  onSubmit,
  file,
}) {
  const inputStyles =
    "w-full p-4 bg-[#F8FAFC] border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all duration-200";

  const roleOk = formData.role.trim().length > 0;
  const isJDValid = formData.jobDescription.trim().length >= 30;
  const isReady = file && isJDValid && roleOk;

  return (
    <div className="space-y-8 p-10 bg-white border border-zinc-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="space-y-3 pb-4 border-b border-zinc-100">
        <h1 className="text-4xl font-serif tracking-tight text-zinc-900">
          Contextual <span className="text-[#00D084] italic">Analysis</span>
        </h1>
        <p className="text-zinc-500 text-sm font-medium">
          Calibrate the ATS engine by providing the target role and description.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
              Role Title
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              className={inputStyles}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
              Company <span className="font-normal opacity-70">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              className={inputStyles}
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2 relative">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 flex justify-between">
            <span>Job Description *</span>
          </label>
          <textarea
            placeholder="Paste the full job description here..."
            className={`${inputStyles} min-h-[180px] resize-y leading-relaxed`}
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData({ ...formData, jobDescription: e.target.value })
            }
          />
          {!isJDValid && formData.jobDescription.length > 0 && (
            <p className="text-xs text-amber-500 flex items-center gap-1 mt-1 ml-1 absolute -bottom-5">
              <Info size={12} /> At least 30 characters for accurate JD
              matching.
            </p>
          )}
        </div>

        <div className="pt-6">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 block mb-3">
            Target Resume *
          </label>
          <FileUpload setFile={setFile} currentFile={file} />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!isReady}
        className={`mt-4 w-full flex items-center justify-center gap-2 font-semibold text-lg py-4 rounded-xl transition-all duration-300 
          ${
            isReady
              ? "bg-[#00D084] hover:bg-[#00B875] text-white shadow-[0_4px_14px_0_rgba(0,208,132,0.39)] hover:shadow-[0_6px_20px_rgba(0,208,132,0.23)] hover:-translate-y-0.5 active:scale-[0.98]"
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
          }`}
      >
        <Zap size={20} className={isReady ? "fill-white" : "fill-zinc-400"} />
        {isReady ? "Run ATS Check" : "Fill required fields to scan"}
      </button>
    </div>
  );
}
