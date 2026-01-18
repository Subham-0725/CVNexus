import { motion } from "framer-motion";
import {
  UploadCloud,
  Search,
  ArrowRight,
  Sparkles,
  FileText,
  ScanLine,
  Check,
  FileJson,
  BarChart3,
  Zap,
  Loader2,
  Mail,
  ChevronRight,
  Terminal,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const StepCard = ({
  number,
  title,
  description,
  icon: Icon,
  children,
  isReversed,
  color,
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        isReversed ? "lg:flex-row-reverse" : ""
      } items-center gap-16 lg:gap-24 mb-32 last:mb-0 relative group`}
    >
      {/* --- Text Content --- */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 relative z-10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 shadow-[0_0_30px_-10px_rgba(var(--color-glow),0.3)]`}
          >
            <Icon size={24} />
          </div>
          <span
            className={`text-${color}-400 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-${color}-500/10 border border-${color}-500/20`}
          >
            Step 0{number}
          </span>
        </div>

        <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-lg">
          {description}
        </p>

        {/* Subtle decorative line */}
        <div className={`h-1 w-20 bg-${color}-500/30 rounded-full mt-8`} />
      </motion.div>

      {/* --- Visual Content --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="flex-1 w-full relative z-10"
      >
        {/* Ambient Glow Behind Visual */}
        <div
          className={`absolute inset-0 bg-${color}-500/20 blur-[80px] rounded-full opacity-40`}
        />

        {/* The Visual Container */}
        <div className="relative z-10 transform transition-transform duration-700 hover:scale-[1.02]">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    /* REFINED: Reduced top padding (pt-10/lg:pt-24) to close gap with Features section */
    <section className="relative pt-5 pb-32 lg:pt-10 lg:pb-48 bg-[#0B1121] overflow-hidden font-jakarta text-white">
      {/* --- Global Background Effects --- */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* --- Header --- */}
        <div className="text-center max-w-4xl mx-auto mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg"
          >
            <Zap size={12} className="fill-current animate-pulse" />
            <span>The Algorithmic Workflow</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8"
          >
            Pass the bot. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Impress the human.
            </span>
          </motion.h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            We use the same parsing technology as Fortune 500 ATS systems to
            reverse-engineer your perfect application.
          </p>
        </div>

        {/* --- STEP 1: INGESTION (Dark Mode Terminal) --- */}
        <StepCard
          number="1"
          title="Neural Ingestion"
          description="Drag and drop your PDF. Our OCR engine strips away formatting noise and converts your career history into a structured, machine-readable JSON graph."
          icon={Terminal}
          color="indigo"
        >
          <div className="rounded-2xl bg-[#1E1E1E] border border-slate-700 shadow-2xl overflow-hidden relative">
            {/* macOS Window Controls */}
            <div className="h-10 bg-[#252526] border-b border-[#333] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <div className="ml-4 text-[10px] text-slate-500 font-mono">
                parser_job_v2.ts
              </div>
            </div>

            {/* VS Code Style Terminal */}
            <div className="p-6 font-mono text-xs leading-relaxed text-slate-300">
              <div className="flex gap-3 mb-4 text-slate-500 border-b border-slate-700 pb-2">
                <span>OUTPUT</span>
                <span>DEBUG</span>
                <span>TERMINAL</span>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-green-500">➜</span>
                  <span className="text-blue-400"> ~</span>
                  <span> analyze --source resume.pdf</span>
                </p>
                <p className="text-slate-500 pt-1">
                  [INFO] Initializing OCR engine...
                </p>
                <p className="text-slate-400">
                  <span className="text-purple-400">✔</span> Text Extracted{" "}
                  <span className="text-slate-600">(12ms)</span>
                </p>
                <p className="text-slate-400">
                  <span className="text-purple-400">✔</span> Tables Sanitized{" "}
                  <span className="text-slate-600">(45ms)</span>
                </p>
                <div className="mt-4 p-3 bg-[#2D2D2D] rounded border border-slate-700/50">
                  <p>
                    <span className="text-pink-400">const</span>{" "}
                    <span className="text-blue-300">data</span> = {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-300">candidate</span>:{" "}
                    <span className="text-orange-300">"Alex Chen"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-300">skills</span>: [
                    <span className="text-orange-300">"React"</span>,{" "}
                    <span className="text-orange-300">"Node.js"</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-300">score</span>:{" "}
                    <span className="text-green-400">null</span>{" "}
                    <span className="text-slate-500">// pending analysis</span>
                  </p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* --- STEP 2: ANALYSIS (Radar UI) --- */}
        <StepCard
          number="2"
          title="Gap Detection"
          description="We scan your profile against the specific job description to identify missing keywords, weak impact verbs, and formatting errors that trigger auto-rejection."
          icon={ScanLine}
          isReversed
          color="purple"
        >
          <div className="rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl p-6 relative overflow-hidden">
            {/* Scan Line Animation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent z-20 opacity-50"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                  2 Critical Gaps
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                ID: 8842-AX
              </div>
            </div>

            <div className="space-y-3">
              {/* Gap 1 */}
              <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-center justify-between group hover:border-red-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Missing Keywords
                    </p>
                    <p className="text-[10px] text-slate-400">
                      TypeScript, AWS, Docker
                    </p>
                  </div>
                </div>
                <button className="text-[10px] bg-red-600 text-white px-3 py-1.5 rounded-md font-bold hover:bg-red-500 transition-colors">
                  FIX
                </button>
              </div>

              {/* Gap 2 */}
              <div className="bg-slate-800/50 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Formatting Check
                    </p>
                    <p className="text-xs text-slate-400">
                      Margins, Fonts, Layout
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  PASS
                </span>
              </div>
            </div>
          </div>
        </StepCard>

        {/* --- STEP 3: RESULT (Holographic Card) --- */}
        <StepCard
          number="3"
          title="Algorithmic Lift"
          description="Export a perfectly optimized resume. Users typically see a 3x increase in callback rates within the first 14 days."
          icon={Zap}
          color="emerald"
        >
          <div className="relative flex justify-center">
            <motion.div
              whileHover={{ y: -5 }}
              className="relative z-10 w-72 bg-slate-800/90 backdrop-blur-xl p-8 rounded-2xl border border-emerald-500/30 shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)] text-center"
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                ATS Match Score
              </div>

              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  98
                </span>
                <span className="text-xl font-bold text-emerald-500">/100</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "98%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                />
              </div>

              {/* Notification Toast */}
              <div className="flex items-center gap-3 text-left bg-[#0B1121] p-3 rounded-lg border border-slate-700/50 shadow-inner">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white">
                    Interview Invite
                  </p>
                  <p className="text-[9px] text-slate-400">
                    Recruiter • Just now
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </StepCard>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-32 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.6)] transition-all"
          >
            Optimize My Resume Now
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
          <p className="text-slate-500 mt-6 text-sm font-medium">
            Join 10,000+ engineers getting hired.
          </p>
        </div>
      </div>
    </section>
  );
}
