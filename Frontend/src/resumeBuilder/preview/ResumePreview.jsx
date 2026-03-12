import { useState, useRef, useEffect } from "react";
import TemplateRenderer from "./TemplateRenderer";
import AppButton from "@/components/ui/AppButton"; // Using your shiny new button
import { useAuth } from "@clerk/clerk-react";

export default function ResumePreview({ resume }) {
  const [scale, setScale] = useState(0.9);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingFormat, setLoadingFormat] = useState(null);
  const { getToken } = useAuth();
  const menuRef = useRef(null);

  if (!resume) return null;

  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 1.2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.6));

  const downloadResume = async (format) => {
    try {
      const defaultName =
        resume.title && resume.title !== "Untitled Resume"
          ? resume.title
          : "My Resume";

      const enteredName = window.prompt(
        `Enter file name for your ${format.toUpperCase()} (without extension):`,
        defaultName,
      );

      // If user cancels or leaves it empty, abort download
      if (enteredName === null) {
        return;
      }

      const trimmedName = enteredName.trim();
      if (!trimmedName) {
        return;
      }

      // Very simple sanitization for common invalid filename characters
      const safeName = trimmedName.replace(/[<>:"/\\|?*]+/g, "_");

      setLoadingFormat(format);
      setMenuOpen(false);

      const token = await getToken();

      // Always persist the latest edited data before exporting
      try {
        const saveRes = await fetch(
          `http://localhost:5000/api/v1/resumes/${resume._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              data: resume.data,
              isDraft: false,
            }),
          },
        );

        if (!saveRes.ok) {
          console.warn("Failed to save resume before export");
        }
      } catch (saveErr) {
        console.error("Autosave before export failed:", saveErr);
      }

      const res = await fetch(
        `http://localhost:5000/api/v1/resumes/${resume._id}/export?format=${format}&filename=${encodeURIComponent(safeName)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeName}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setLoadingFormat(null);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full border-l bg-slate-50">
      {/* ================= Top Toolbar ================= */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm z-10">
        {/* Left Side: Indicator & Title */}
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-base font-medium text-slate-800">
            Resume Preview
          </span>
        </div>

        {/* Right Side: Controls */}
        <div className="flex items-center gap-6">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5">
            <button
              onClick={zoomOut}
              className="w-7 h-7 flex items-center justify-center text-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded transition"
            >
              −
            </button>
            <span className="text-sm font-medium w-12 text-center text-slate-600">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="w-7 h-7 flex items-center justify-center text-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded transition"
            >
              +
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-slate-200" />

          {/* Download Dropdown (Moved exactly to your green highlight) */}
          <div ref={menuRef} className="relative">
            <AppButton
              onClick={() => setMenuOpen((prev) => !prev)}
              isLoading={loadingFormat !== null}
              variant="solid" // or "primary" depending on your AppButton setup
              size="md"
            >
              {loadingFormat ? "Generating..." : "Download Resume ▼"}
            </AppButton>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-20">
                <button
                  onClick={() => downloadResume("pdf")}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition border-b border-slate-100"
                >
                  Download as PDF
                </button>
                <button
                  onClick={() => downloadResume("docx")}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                >
                  Download as DOCX
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= Preview Canvas ================= */}
      <div className="flex-1 overflow-auto flex justify-center py-10">
        <div
          className="transition-transform duration-200 ease-out shadow-2xl bg-white"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
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
