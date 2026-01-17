import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Binary,
  XCircle,
  Eye,
  Bot,
  SearchX,
  ScanLine,
  FileWarning,
} from "lucide-react";

export default function ProblemStatement() {
  const [scanPercent, setScanPercent] = useState(0);
  const [status, setStatus] = useState("Initializing...");

  // Scanner Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPercent((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.35;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Update Status
  useEffect(() => {
    if (scanPercent < 30) setStatus("Scanning Header...");
    else if (scanPercent < 60) setStatus("Parsing Layout...");
    else if (scanPercent < 85) setStatus("Critical Error Found");
    else setStatus("Rejection Queued");
  }, [scanPercent]);

  return (
    <section className="relative w-full min-h-[90vh] bg-white overflow-hidden pt-20 pb-10 lg:pt-1 lg:pb-0">
      {/* --- FONT LOADING & GLOBAL STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-mono-code { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Background Decor */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#432DD7 1px, transparent 1px), linear-gradient(90deg, #432DD7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* --- LEFT: The Narrative --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Contextual Diagram Trigger for broader understanding */}
            <div className="hidden"></div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
              <AlertTriangle size={12} strokeWidth={2.5} />
              <span>The Hidden Barrier</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Your resume looks great. <br />
              <span className="text-slate-400">The robot disagrees.</span>
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg font-medium">
              You see a professional document. The ATS sees unstructured data.
              <span className="font-bold text-slate-900">
                {" "}
                75% of candidates
              </span>{" "}
              are rejected instantly because the software can't translate their
              design into code.
            </p>

            {/* Checklist */}
            <div className="space-y-6">
              {[
                {
                  icon: FileWarning,
                  title: "Parsing Failures",
                  desc: "Columns & tables scramble your work history.",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  icon: SearchX,
                  title: "Keyword Mismatch",
                  desc: "Synonyms don't count. You need exact matches.",
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
                {
                  icon: Eye,
                  title: "The 6-Second Rule",
                  desc: "Recruiters skim. If the bot doesn't highlight you, they won't either.",
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.bg} border border-white shadow-sm flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform duration-300 shrink-0`}
                  >
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- RIGHT: The "X-Ray" Visual --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[640px] w-full flex items-center justify-center"
          >
            {/* The Document Container */}
            <div className="relative w-full max-w-[480px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5">
              {/* --- LAYER 1: HUMAN VIEW --- */}
              <div className="absolute inset-0 p-10 flex flex-col bg-white">
                <div className="flex items-start justify-between mb-10">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 bg-slate-100 rounded-full border border-slate-50" />
                    <div className="space-y-3 pt-2">
                      <div className="h-5 w-40 bg-slate-900 rounded-md opacity-90" />
                      <div className="h-4 w-24 bg-[#432DD7] rounded-md opacity-80" />
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    PDF Preview
                  </div>
                </div>

                <div className="space-y-8 flex-1">
                  <div className="space-y-3">
                    <div className="h-4 w-32 bg-slate-200 rounded-md" />
                    <div className="h-2.5 w-full bg-slate-50 rounded-sm" />
                    <div className="h-2.5 w-full bg-slate-50 rounded-sm" />
                    <div className="h-2.5 w-3/4 bg-slate-50 rounded-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 p-4 -mx-4 rounded-xl border-2 border-dashed border-slate-100 bg-slate-50/30">
                    <div className="space-y-3">
                      <div className="h-4 w-20 bg-slate-200 rounded-md" />
                      <div className="h-2.5 w-full bg-slate-100 rounded-sm" />
                      <div className="h-2.5 w-5/6 bg-slate-100 rounded-sm" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 w-20 bg-slate-200 rounded-md" />
                      <div className="h-2.5 w-full bg-slate-100 rounded-sm" />
                      <div className="h-2.5 w-5/6 bg-slate-100 rounded-sm" />
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="h-4 w-24 bg-slate-200 rounded-md" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="h-7 w-20 bg-slate-50 rounded-md border border-slate-100"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- LAYER 2: ROBOT VIEW --- */}
              <motion.div
                className="absolute inset-0 bg-[#0F172A] p-8 font-mono-code text-[11px] leading-relaxed overflow-hidden text-slate-400"
                style={{
                  clipPath: `inset(0 ${100 - scanPercent}% 0 0)`,
                }}
              >
                <div className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-slate-500 flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold">
                    <Bot size={14} /> ATS_DEBUG_LOG_V2.1
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-sky-400">candidate</span> ={" "}
                    <span className="text-amber-300">&#123;</span>
                  </div>

                  <div className="pl-6 border-l-2 border-slate-800 space-y-5">
                    <div>
                      <p>
                        <span className="text-sky-300">"name"</span>:{" "}
                        <span className="text-emerald-400">"John Doe"</span>,
                      </p>
                      <p>
                        <span className="text-sky-300">"role"</span>:{" "}
                        <span className="text-rose-500 font-bold">null</span>,{" "}
                        <span className="text-slate-600 italic">
                          // Error: Graphic
                        </span>
                      </p>
                    </div>

                    <div className="relative group">
                      {scanPercent > 40 && scanPercent < 70 && (
                        <div className="absolute -left-8 -right-4 -top-2 -bottom-2 bg-rose-500/10 border-l-2 border-rose-500 animate-pulse" />
                      )}
                      <p className="text-slate-500 mb-1">
                        // Parsing Layout Structure...
                      </p>
                      <p className="text-rose-400 font-semibold">
                        Error: Column break detected.
                      </p>
                      <p className="text-slate-400 mt-1">
                        <span className="text-sky-300">"raw_text"</span>:
                        <span className="text-amber-200">
                          {" "}
                          "Exp 2020 Skills React 2021 Node..."
                        </span>
                      </p>
                      <div className="inline-flex items-center gap-2 mt-2 px-2 py-1 bg-rose-500/10 text-rose-300 rounded text-[10px] font-bold uppercase tracking-wide">
                        <AlertTriangle size={10} /> Data Merge Fail
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-500 mb-1">
                        // Checking Keywords...
                      </p>
                      <p>
                        Search:{" "}
                        <span className="text-emerald-400">
                          "Project Management"
                        </span>
                      </p>
                      <p>
                        Found:{" "}
                        <span className="text-rose-400">
                          "Managed various projects"
                        </span>
                      </p>
                      <p className="text-rose-500 font-bold mt-2 border-t border-rose-500/20 pt-2">
                        &gt;&gt; MATCH FAILED (0%)
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-amber-300">&#125;;</span>
                  </div>
                </div>
              </motion.div>

              {/* --- THE SCANNER LINE --- */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#432DD7]/0 via-[#432DD7] to-[#432DD7]/0 z-20 shadow-[0_0_20px_2px_rgba(67,45,215,0.5)]"
                style={{ left: `${scanPercent}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 bg-[#432DD7] text-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20 backdrop-blur-sm">
                    <ScanLine size={16} />
                  </div>
                  <div className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-2xl border border-white/10 whitespace-nowrap flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        scanPercent > 85
                          ? "bg-red-500 animate-pulse"
                          : "bg-emerald-400"
                      }`}
                    />
                    {status}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Decorative Floating Badge --- */}
            <motion.div
              className="absolute -bottom-8 -left-8 z-30 hidden md:block"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 ring-4 ring-rose-50/50">
                  <XCircle size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">
                    Final Status
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    Auto-Rejected
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
