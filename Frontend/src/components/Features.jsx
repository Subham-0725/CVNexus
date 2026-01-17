import { motion } from "framer-motion";
import {
  Layout,
  Cpu,
  SearchCode,
  ArrowRight,
  Sparkles,
  MousePointer2,
  Check,
  X,
  Maximize2,
  Bold,
  Italic,
  Underline,
  GripVertical,
  FileJson,
  FileType,
  FileText,
  Download, // <--- Added missing import
} from "lucide-react";

export default function Features() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-50/50 overflow-hidden font-jakarta">
      {/* --- Technical Grid Background --- */}
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* --- Header --- */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Cpu size={12} className="text-[#432DD7]" />
            <span>Product Suite</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
          >
            Engineered for{" "}
            <span className="text-[#432DD7]">precision hiring.</span>
          </motion.h2>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[460px]">
          {/* --- CARD 1: THE BUILDER (Precision Editor) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="p-8 pb-0 relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-900">
                  <Layout size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  01. STRUCTURE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Drag-and-Drop Builder
              </h3>
              <p className="text-slate-500 max-w-md text-sm leading-relaxed mb-8">
                A layout engine that respects ATS parsing rules. Snap sections
                into place with pixel-perfect precision.
              </p>

              {/* UI Mockup: Builder Interface */}
              <div className="flex-1 w-full bg-slate-100/50 rounded-t-xl border-t border-l border-r border-slate-200 overflow-hidden flex shadow-inner relative top-1">
                {/* Sidebar Mock */}
                <div className="w-52 bg-white border-r border-slate-200 p-4 flex flex-col gap-2 relative z-20">
                  <div className="flex gap-1.5 mb-6 px-1 opacity-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  </div>
                  <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 px-2">
                    Components
                  </div>
                  {["Experience", "Education", "Projects"].map((item) => (
                    <div
                      key={item}
                      className="group/item flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-grab transition-all hover:shadow-sm"
                    >
                      <span className="text-xs font-semibold text-slate-600 group-hover/item:text-slate-900">
                        {item}
                      </span>
                      <GripVertical
                        size={14}
                        className="text-slate-300 group-hover/item:text-slate-400"
                      />
                    </div>
                  ))}
                </div>

                {/* Canvas Mock */}
                <div className="flex-1 bg-slate-50 relative flex flex-col">
                  {/* Toolbar */}
                  <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-3 justify-between">
                    <div className="flex gap-1">
                      <div className="p-1.5 hover:bg-slate-100 rounded cursor-pointer text-slate-400 hover:text-slate-700 transition-colors">
                        <Bold size={14} />
                      </div>
                      <div className="p-1.5 hover:bg-slate-100 rounded cursor-pointer text-slate-400 hover:text-slate-700 transition-colors">
                        <Italic size={14} />
                      </div>
                      <div className="p-1.5 hover:bg-slate-100 rounded cursor-pointer text-slate-400 hover:text-slate-700 transition-colors">
                        <Underline size={14} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-slate-400">
                        A4 / Portrait
                      </span>
                      <Maximize2 size={14} className="text-slate-400" />
                    </div>
                  </div>

                  {/* Ruler Simulation */}
                  <div className="h-6 bg-slate-50 border-b border-slate-200 flex items-end px-6 space-x-8 text-[8px] text-slate-300 font-mono">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 w-[1px] bg-slate-300 relative"
                      >
                        <span className="absolute -top-3 -left-1">
                          {i * 10}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Document Surface */}
                  <div className="flex-1 p-6 overflow-hidden relative">
                    <div className="w-full h-full bg-white shadow-sm border border-slate-200/60 p-6 relative">
                      {/* Guidelines Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 bottom-0 left-6 w-[1px] border-l border-dashed border-[#432DD7]/30" />
                        <div className="absolute top-0 bottom-0 right-6 w-[1px] border-l border-dashed border-[#432DD7]/30" />
                      </div>

                      {/* Content Skeleton */}
                      <div className="space-y-5">
                        <div className="flex gap-4 items-center pb-4 border-b border-slate-50">
                          <div className="w-12 h-12 bg-slate-100 rounded-full" />
                          <div className="space-y-2">
                            <div className="h-3 w-40 bg-slate-800 rounded-sm opacity-90" />
                            <div className="h-2 w-24 bg-[#432DD7]/40 rounded-sm" />
                          </div>
                        </div>
                        {/* Active Drop Zone */}
                        <motion.div
                          className="h-24 border-2 border-dashed border-[#432DD7] bg-[#432DD7]/5 rounded-lg flex flex-col items-center justify-center gap-2 text-[#432DD7]"
                          initial={{ opacity: 0.5 }}
                          whileHover={{ opacity: 1, scale: 1.01 }}
                        >
                          <MousePointer2
                            size={18}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            fill="currentColor"
                          />
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            Drop Section Here
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- CARD 2: ATS SCANNER (System Terminal) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 group relative bg-[#0F172A] rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col"
          >
            <div className="p-8 pb-0 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-center text-emerald-400">
                  <SearchCode size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded font-mono">
                  02. ANALYZE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Deep Parser
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Simulates enterprise ATS algorithms to find keyword gaps and
                parsing errors.
              </p>
            </div>

            {/* UI Mockup: Code Editor/Terminal */}
            <div className="absolute bottom-0 inset-x-0 top-[220px] bg-[#02040a] border-t border-slate-800 p-0 font-mono text-[10px] leading-loose text-slate-400 overflow-hidden flex flex-col">
              {/* Editor Tabs */}
              <div className="flex border-b border-slate-800 bg-[#0F172A]">
                <div className="px-4 py-2 bg-[#02040a] text-emerald-400 border-t-2 border-emerald-400 text-[10px] font-bold flex items-center gap-2">
                  <FileJson size={10} /> analysis_log.json
                </div>
                <div className="px-4 py-2 text-slate-600 text-[10px] font-bold border-r border-slate-800 border-l">
                  preview.pdf
                </div>
              </div>

              <div className="p-4 flex gap-3 opacity-90 overflow-hidden relative">
                {/* Line Numbers */}
                <div className="flex flex-col text-slate-700 text-right select-none">
                  {["01", "02", "03", "04", "05"].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
                {/* Code Content */}
                <div className="flex flex-col gap-0.5 w-full">
                  <p>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">parseResult</span> ={" "}
                    <span className="text-yellow-300">{`{`}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-300">status</span>:{" "}
                    <span className="text-emerald-400">"SUCCESS"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-300">keywords</span>:{" "}
                    <span className="text-yellow-300">['React', 'Node']</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-300">score</span>:{" "}
                    <span className="text-emerald-400 font-bold">98</span>,
                  </p>
                  <p>
                    <span className="text-yellow-300">{`}`}</span>;
                  </p>
                </div>

                {/* Scan Beam */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-emerald-500/50 shadow-[0_0_15px_2px_rgba(16,185,129,0.4)] z-10"
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                />
              </div>
            </div>
          </motion.div>

          {/* --- CARD 3: AI SUGGESTIONS (Diff View) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="p-8 pb-0 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-center text-purple-600">
                  <Sparkles size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  03. OPTIMIZE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                AI Enhancer
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Auto-rewrite weak bullet points into high-impact, quantifiable
                achievements.
              </p>
            </div>

            {/* UI Mockup: Git Diff Style View */}
            <div className="absolute bottom-0 left-0 right-0 top-[220px] bg-slate-50/50 border-t border-slate-100 p-5 flex flex-col gap-3">
              {/* Bad (Removed) */}
              <div className="w-full bg-red-50/50 rounded-lg border border-red-100 p-3 relative group-hover:opacity-60 transition-opacity">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-red-100 text-red-600 p-0.5 rounded">
                    <X size={10} strokeWidth={3} />
                  </div>
                  <span className="text-[9px] font-bold text-red-400 uppercase">
                    Original
                  </span>
                </div>
                <p className="text-xs text-red-900/60 line-through decoration-red-300">
                  Managed a sales team.
                </p>
              </div>

              {/* Good (Added) */}
              <div className="w-full bg-emerald-50 rounded-lg border border-emerald-100 p-3 relative shadow-sm">
                <div className="absolute -right-2 -top-2 bg-purple-600 text-white p-1 rounded-full shadow-md z-10">
                  <Sparkles size={10} fill="currentColor" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-emerald-100 text-emerald-600 p-0.5 rounded">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase">
                    AI Suggestion
                  </span>
                </div>
                <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                  Led a team of 15, increasing annual revenue by{" "}
                  <span className="bg-emerald-200/50 px-1 rounded text-emerald-800 font-bold border border-emerald-200">
                    25% YoY
                  </span>
                  .
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- CARD 4: EXPORT & SHARE (Horizontal Layout) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 overflow-hidden flex flex-row items-center"
          >
            <div className="p-10 flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Download size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  04. DELIVER
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Universal Export
              </h3>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-8">
                Download as PDF for humans or a raw text format for specific ATS
                portals. Always perfectly formatted.
              </p>

              {/* Format Badges */}
              <div className="flex gap-3 mb-8">
                {[
                  { icon: FileText, label: "PDF" },
                  { icon: FileJson, label: "JSON" },
                  { icon: FileType, label: "TXT" },
                ].map((fmt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors cursor-default"
                  >
                    <fmt.icon size={12} /> {fmt.label}
                  </div>
                ))}
              </div>

              <button className="group inline-flex items-center gap-2 text-sm font-bold text-[#432DD7] hover:text-[#3521B5] transition-colors">
                Start Building Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            {/* UI Mockup: File Stack */}
            <div className="w-1/3 h-full bg-slate-50/50 border-l border-slate-100 relative flex items-center justify-center overflow-hidden">
              <div className="relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                {/* Main File */}
                <div className="w-32 h-44 bg-white rounded-xl border border-slate-200 shadow-xl flex flex-col relative z-20">
                  <div className="h-14 bg-red-50 rounded-t-xl border-b border-red-50 flex items-center justify-center text-red-500">
                    <FileText size={28} />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                    <div className="h-2 w-full bg-slate-100 rounded-full mt-2" />
                  </div>
                  <div className="mt-auto p-3 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400">
                      PDF
                    </span>
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <Check size={8} strokeWidth={4} />
                    </div>
                  </div>
                </div>

                {/* Decorative Back Layers */}
                <div className="absolute inset-0 bg-white rounded-xl border border-slate-200 shadow-sm z-10 rotate-6 translate-x-4 translate-y-2 opacity-60" />
                <div className="absolute inset-0 bg-white rounded-xl border border-slate-200 shadow-sm z-0 -rotate-6 -translate-x-4 translate-y-4 opacity-40" />

                {/* Download Action Overlay */}
                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-3 rounded-full shadow-lg text-slate-700">
                    <Download size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
