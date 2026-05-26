import React, { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";

export default function FileUpload({ setFile, currentFile }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Max size is 5MB.");
      return;
    }

    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
        ${isDragging ? "border-[#00D084] bg-[#00D084]/10 scale-[1.02]" : ""}
        ${currentFile && !isDragging ? "border-[#00D084]/50 bg-[#00D084]/5" : ""}
        ${!currentFile && !isDragging ? "border-zinc-300 hover:border-[#00D084] hover:bg-zinc-50 bg-white" : ""}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => processFile(e.target.files[0])}
        className="hidden"
        accept=".pdf,.docx"
      />

      {currentFile ? (
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <FileText size={40} className="text-[#00D084]" />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
              <CheckCircle2 size={18} className="text-[#00D084]" />
            </div>
          </div>
          <div className="text-center">
            <span className="block font-semibold text-zinc-900">
              {currentFile.name}
            </span>
            <span className="text-xs text-zinc-500">
              Click or drag to replace
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 transition-colors">
          <div
            className={`p-4 rounded-full mb-1 transition-colors ${isDragging ? "bg-[#00D084] text-white" : "bg-zinc-100 text-zinc-400"}`}
          >
            <UploadCloud size={32} />
          </div>
          <div className="text-center">
            <span className="block font-semibold text-zinc-700">
              {isDragging ? "Drop document here" : "Click or drag to upload"}
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold mt-1 block">
              PDF or DOCX (Max 5MB)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
