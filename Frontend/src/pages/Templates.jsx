import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TemplateGrid from "../components/templates/TemplateGrid";
import { templates } from "../data/templates";

export default function Templates() {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId) => {
    navigate(`/builder/${templateId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* 1. TECHNICAL GRID BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(to right, #E2E8F0 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F8FAFC_100%)]" />
      </div>

      {/* UPDATED SPACING: 
         Reduced py-10 md:py-16 -> py-6 md:py-10 
      */}
      <div className="relative max-w-7xl mx-auto px-6 py-6 md:py-10">
        {/* HERO SECTION */}
        {/* Reduced mb-16 -> mb-10 */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative">
          {/* SPOTLIGHT GLOW */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 blur-3xl rounded-full -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Semantic Badge */}
            <div
              className="
              inline-flex items-center gap-2 px-4 py-1.5 mb-6 
              rounded-full bg-white border border-indigo-100 shadow-sm
              text-indigo-900 text-[11px] font-bold tracking-widest uppercase
            "
            >
              <Sparkles size={12} className="text-indigo-500" />
              <span className="opacity-90">CVNexus Library</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
              Start with a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                strong foundation.
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto font-medium">
              Select a structure below. Our builder handles the formatting so
              you can focus on the content.
            </p>
          </motion.div>
        </div>

        {/* GRID */}
        <TemplateGrid templates={templates} onSelect={handleSelectTemplate} />
      </div>
    </div>
  );
}
