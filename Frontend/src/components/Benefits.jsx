import { useState, useEffect } from "react";

const TrendingUp = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ShieldCheck = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const Eye = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Zap = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const Check = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Trophy = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const AlertTriangle = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const XCircle = ({ size = 24, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const MousePointer = ({ size = 24, strokeWidth = 1.5, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="white"
    strokeWidth={strokeWidth}
    className={className}
  >
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
  </svg>
);

const Binary = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <rect x="14" y="14" width="4" height="6" rx="2" />
    <rect x="6" y="4" width="4" height="6" rx="2" />
    <path d="M6 20h4" />
    <path d="M14 10h4" />
    <path d="M6 14h2v6" />
    <path d="M14 4h2v6" />
  </svg>
);

const tabs = [
  {
    id: 0,
    label: "Step 01",
    title: "Semantic Ranking",
    subtitle: "Beat the Parser",
    description:
      "ATS algorithms score resumes based on 'Semantic Weight'. We restructure your data hierarchy so the scoring engine ranks you as a Top 1% relevance match.",
    icon: TrendingUp,
  },
  {
    id: 1,
    label: "Step 02",
    title: "Syntax Validation",
    subtitle: "Zero-Error Compilation",
    description:
      "A single broken table or floating layer can cause instant auto-rejection. Our pre-flight compiler sanitizes your resume into 100% clean, machine-readable code.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    label: "Step 03",
    title: "Visual Velocity",
    subtitle: "The 6-Second Scan",
    description:
      "Once you pass the bot, you have 6 seconds to impress the human. Our 'F-Pattern' layouts are heat-mapped to guide the recruiter's eye immediately to your highest-value achievements.",
    icon: Eye,
  },
];

const colors = [
  {
    accent: "from-[#432DD7] to-[#5b46df]",
    bg: "bg-[#432DD7]",
    text: "text-[#432DD7]",
    light: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    accent: "from-rose-500 to-rose-600",
    bg: "bg-rose-500",
    text: "text-rose-600",
    light: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    accent: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    light: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export default function Benefits() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const duration = 8000;
    const intervalTime = 50;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += (intervalTime / duration) * 100;
      
      if (currentProgress >= 100) {
        currentProgress = 0;
        setProgress(0);
        
        setActiveTab((current) => {
          const nextTab = (current + 1) % 3;
          setAnimationKey((k) => k + 1);
          return nextTab;
        });
      } else {
        setProgress(currentProgress);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setProgress(0);
    setAnimationKey((k) => k + 1);
  };

  const currentColor = colors[activeTab];

  return (
    <section
      className="relative py-28 lg:py-36 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
      style={{
        fontFamily:
          'Plus Jakarta Sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes scan-vertical { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        @keyframes float-smooth { 
          0%, 100% { transform: translate(0, 0) rotate(0deg); } 
          25% { transform: translate(15px, -15px) rotate(1deg); }
          50% { transform: translate(30px, 0px) rotate(-1deg); }
          75% { transform: translate(15px, 15px) rotate(0.5deg); }
        }
        @keyframes pulse-glow { 
          0%, 100% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.4); } 
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.8); } 
        }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-scale { 
          from { opacity: 0; transform: scale(0.95) translateY(10px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        @keyframes pulse-scale { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.3); opacity: 0.5; } }
        @keyframes slide-up-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-in { 
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes rank-move-up {
          0% { transform: translateY(80px) scale(0.9); opacity: 0; }
          50% { transform: translateY(-10px) scale(1.02); opacity: 0.8; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes rank-move-down {
          0% { transform: translateY(-60px) scale(1); opacity: 1; }
          100% { transform: translateY(20px) scale(0.95); opacity: 0.4; }
        }
        @keyframes progress-fill {
          0% { width: 30%; transform: scaleY(0.8); }
          50% { transform: scaleY(1.1); }
          100% { width: 98%; transform: scaleY(1); }
        }
        @keyframes status-flip-up {
          0% { transform: translateY(0) scale(1) rotateX(0deg); opacity: 1; }
          100% { transform: translateY(-20px) scale(0.8) rotateX(-90deg); opacity: 0; }
        }
        @keyframes status-flip-down {
          0% { transform: translateY(20px) scale(0.8) rotateX(90deg); opacity: 0; }
          100% { transform: translateY(0) scale(1) rotateX(0deg); opacity: 1; }
        }
        @keyframes bg-color-red-to-green {
          0% { 
            background-color: rgba(244, 63, 94, 0.1); 
            border-color: rgba(244, 63, 94, 0.2);
            transform: scale(1);
          }
          50% { 
            background-color: rgba(251, 191, 36, 0.1); 
            border-color: rgba(251, 191, 36, 0.2);
            transform: scale(1.02);
          }
          100% { 
            background-color: rgba(16, 185, 129, 0.1); 
            border-color: rgba(16, 185, 129, 0.3);
            transform: scale(1);
          }
        }
        @keyframes heatmap-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; filter: blur(60px); }
          50% { transform: scale(1.4) rotate(5deg); opacity: 0.8; filter: blur(50px); }
        }
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 0px rgba(99,102,241,0);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.3);
            transform: scale(1.02);
          }
        }
        @keyframes typing {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes particle-float {
          0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg) scale(0); opacity: 0; }
        }
        @keyframes scan-beam {
          0% { top: 10%; opacity: 0; transform: scaleX(0.5); }
          10% { opacity: 1; transform: scaleX(1); }
          90% { opacity: 1; transform: scaleX(1); }
          100% { top: 90%; opacity: 0; transform: scaleX(0.5); }
        }
        @keyframes micro-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes subtle-glow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(67, 45, 215, 0)); }
          50% { filter: drop-shadow(0 0 8px rgba(67, 45, 215, 0.3)); }
        }
        
        .animate-shimmer { animation: shimmer 2.5s ease-in-out infinite; }
        .animate-gradient { animation: gradient-shift 8s ease infinite; background-size: 200% auto; }
        .animate-scan { animation: scan-beam 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-float { animation: float-smooth 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-fade-in { animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-fade-scale { animation: fade-in-scale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-pulse-scale { animation: pulse-scale 4s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-rank-up { animation: rank-move-up 2.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-rank-down { animation: rank-move-down 2.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-progress-fill { animation: progress-fill 3.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards; }
        .animate-flip-up { animation: status-flip-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-flip-down { animation: status-flip-down 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-bg-fix { animation: bg-color-red-to-green 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-heatmap { animation: heatmap-pulse 5s ease-in-out infinite; }
        .animate-glow { animation: glow-pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-typing { animation: typing 2s steps(20) forwards; }
        .animate-cursor { animation: cursor-blink 1s infinite; }
        .animate-particle { animation: particle-float 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-micro-bounce { animation: micro-bounce 2s ease-in-out infinite; }
        .animate-subtle-glow { animation: subtle-glow 3s ease-in-out infinite; }
        
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1200 { animation-delay: 1.2s; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>

      {/* Background */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-rose-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-24 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 text-slate-700 text-[10px] font-semibold uppercase tracking-[0.15em] mb-7 shadow-sm">
            <Zap size={13} className="text-[#432DD7]" />
            <span>Core Architecture</span>
          </div>

          <h2
            className="text-[2.75rem] lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-5"
            style={{ letterSpacing: "-0.02em" }}
          >
            Optimized for machines. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#432DD7] to-[#705df2] animate-gradient">
              Designed for humans.
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            We reverse-engineered the hiring process to give you an unfair
            structural advantage. Stop guessing and start competing with data.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
          {/* Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              const Icon = tab.icon;
              const color = colors[index];

              return (
                <div
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={`group relative p-7 rounded-3xl cursor-pointer transition-all duration-700 border backdrop-blur-sm ${
                    isActive
                      ? "bg-white/95 border-slate-200/90 shadow-2xl shadow-slate-900/8 scale-[1.02] ring-1 ring-slate-200/50"
                      : "bg-white/60 border-slate-100/60 hover:bg-white/80 hover:border-slate-200/80 hover:shadow-xl hover:scale-[1.01] hover:ring-1 hover:ring-slate-200/30"
                  } focus:outline-none focus:ring-2 focus:ring-[#432DD7]/20 focus:ring-offset-2`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTabClick(index);
                    }
                  }}
                >
                  {/* Enhanced Progress Bar */}
                  <div className="absolute left-0 top-7 bottom-7 w-1.5 bg-slate-100/80 rounded-r-full overflow-hidden">
                    {isActive && (
                      <div
                        className={`w-full bg-gradient-to-b ${color.accent} transition-all duration-200 ease-out shadow-sm`}
                        style={{ height: `${progress}%` }}
                      />
                    )}
                  </div>

                  {/* Subtle hover glow */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? 'opacity-20' : ''}`} 
                       style={{ background: `radial-gradient(circle at 50% 50%, ${color.accent.includes('432DD7') ? 'rgba(67, 45, 215, 0.05)' : color.accent.includes('rose') ? 'rgba(244, 63, 94, 0.05)' : 'rgba(16, 185, 129, 0.05)'}, transparent 70%)` }} />

                  <div className="flex items-start gap-6 pl-6 relative z-10">
                    {/* Enhanced Icon */}
                    <div
                      className={`mt-1 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-xl ${
                        isActive
                          ? `bg-gradient-to-br ${color.accent} text-white shadow-xl scale-110 rotate-3 animate-subtle-glow`
                          : "bg-gradient-to-br from-slate-100/90 to-slate-200/90 text-slate-500 group-hover:from-slate-200/90 group-hover:to-slate-300/90 group-hover:text-slate-700 group-hover:scale-105 group-hover:rotate-1"
                      }`}
                    >
                      <Icon size={26} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-micro-bounce' : ''} />
                    </div>

                    {/* Enhanced Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                            isActive ? color.text : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          {tab.label}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider animate-fade-in bg-slate-100/80 px-2 py-1 rounded-full">
                            • {tab.subtitle}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-[1.5rem] font-bold mb-4 transition-all duration-300 leading-tight ${
                          isActive
                            ? "text-slate-900"
                            : "text-slate-600 group-hover:text-slate-800"
                        }`}
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {tab.title}
                      </h3>
                      {isActive && (
                        <p className="text-[1rem] text-slate-600 leading-relaxed font-normal animate-fade-in pr-4">
                          {tab.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Visual Stage - Larger */}
          <div className="lg:col-span-7 h-[680px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/60 to-white/95 rounded-[3rem] border border-slate-200/80 shadow-2xl shadow-slate-900/12 flex items-center justify-center p-8 overflow-hidden backdrop-blur-md">
              {/* Enhanced Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #432DD7 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  backgroundPosition: "0 0, 14px 14px",
                }}
              />
              
              {/* Subtle corner accents */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl" />
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-xl" />

              {/* Visual 1: ATS Ranking - Enhanced & Larger */}
              {activeTab === 0 && (
                <div
                  className="relative w-full max-w-lg animate-fade-scale"
                  key={`v1-${animationKey}`}
                >
                  <div className="absolute -top-10 -right-10 z-20 bg-gradient-to-br from-[#432DD7] via-[#5b46df] to-[#7c3aed] text-white text-[12px] font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-500/40 flex items-center gap-3 animate-bounce-in border border-indigo-400/40 backdrop-blur-sm">
                    <Trophy size={16} strokeWidth={2.5} className="animate-micro-bounce" /> 
                    <span className="tracking-wide">Top 1% Match</span>
                    <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-pulse" />
                  </div>

                  <div className="bg-[#0F172A] rounded-3xl shadow-2xl shadow-slate-900/25 border border-slate-700/60 overflow-hidden backdrop-blur-sm scale-110">
                    <div className="px-8 py-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-900/60 to-slate-800/60 flex justify-between items-center">
                      <span className="text-[12px] font-bold text-slate-300 uppercase tracking-[0.12em] flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                        ATS Live Ranking
                      </span>
                      <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-600/80 animate-pulse" />
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-600/80 animate-pulse delay-300" />
                      </div>
                    </div>
                    
                    {/* Enhanced floating particles */}
                    <div className="absolute top-6 right-12 w-3 h-3 bg-indigo-400/60 rounded-full animate-particle delay-500" />
                    <div className="absolute top-20 right-16 w-2 h-2 bg-emerald-400/60 rounded-full animate-particle delay-1000" />
                    <div className="absolute top-12 right-24 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-particle delay-1500" />
                    
                    <div className="p-8 relative">
                      {/* Rank 1 - Enhanced & Larger */}
                      <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-500/40 rounded-3xl relative overflow-hidden animate-rank-up shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent animate-shimmer" />
                        <div className="text-3xl font-bold text-[#6366f1] relative z-10 bg-indigo-500/10 rounded-2xl w-16 h-16 flex items-center justify-center">
                          #1
                        </div>
                        <div className="flex-1 relative z-10">
                          <div className="h-4 w-full bg-slate-800 rounded-full mb-3 relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] rounded-full shadow-[0_0_30px_rgba(99,102,241,0.8)] animate-progress-fill"
                              style={{ width: "30%" }}
                            />
                            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="h-2.5 w-20 bg-slate-700 rounded-full animate-pulse" />
                            <span className="text-[12px] font-bold text-emerald-400 animate-bounce-in delay-2000 bg-emerald-500/15 px-3 py-2 rounded-full border border-emerald-500/30">
                              +425pts
                            </span>
                          </div>
                        </div>
                        <span className="text-base font-bold text-white relative z-10 bg-indigo-600/30 px-4 py-2 rounded-xl border border-indigo-500/40">
                          You
                        </span>
                      </div>

                      {/* Rank 2 - Enhanced */}
                      <div className="flex items-center gap-6 p-4 opacity-50 grayscale absolute top-8 left-8 right-8 animate-rank-down bg-slate-800/20 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-500 bg-slate-700/30 rounded-xl w-12 h-12 flex items-center justify-center">
                          #2
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-2/3 bg-slate-800 rounded-full mb-2" />
                          <div className="h-2 w-12 bg-slate-700 rounded-full" />
                        </div>
                        <span className="text-sm font-bold text-slate-600">
                          Candidate B
                        </span>
                      </div>

                      {/* Rank 3 - Enhanced */}
                      <div className="flex items-center gap-6 p-4 opacity-30 grayscale mt-8 bg-slate-800/10 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-600 bg-slate-700/20 rounded-xl w-12 h-12 flex items-center justify-center">
                          #3
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-1/2 bg-slate-800 rounded-full mb-2" />
                          <div className="h-2 w-10 bg-slate-700 rounded-full" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          Candidate C
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual 2: Parser Protection - Enhanced & Larger */}
              {activeTab === 1 && (
                <div
                  className="relative w-full max-w-lg animate-fade-scale"
                  key={`v2-${animationKey}`}
                >
                  <div className="bg-[#0F172A] rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-slate-800 scale-110">
                    {/* Enhanced scanning beam */}
                    <div
                      className="absolute left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan"
                      style={{
                        top: 0,
                        boxShadow: "0 0 50px 8px rgba(16,185,129,0.7), 0 0 100px 15px rgba(16,185,129,0.4)",
                      }}
                    />
                    
                    {/* Enhanced particle effects */}
                    <div className="absolute top-8 left-12 w-2 h-2 bg-emerald-400/80 rounded-full animate-particle" />
                    <div className="absolute top-16 right-10 w-2.5 h-2.5 bg-green-400/60 rounded-full animate-particle delay-700" />
                    <div className="absolute bottom-24 left-16 w-1.5 h-1.5 bg-teal-400/70 rounded-full animate-particle delay-1400" />

                    <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-gradient-to-r from-[#1e293b] to-[#0f172a] -mx-8 -mt-8 mb-8">
                      <div className="flex items-center gap-3">
                        <Binary size={18} className="text-emerald-400 animate-pulse" />
                        <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Syntax Validator
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 animate-pulse" />
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/50 animate-pulse delay-300" />
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse delay-500" />
                      </div>
                    </div>

                    <div className="space-y-6 font-mono text-[13px]">
                      {/* Fix 1 - Enhanced & Larger */}
                      <div
                        className="flex items-center justify-between p-5 rounded-xl border animate-bg-fix delay-500 relative overflow-hidden"
                        style={{
                          backgroundColor: "rgba(244, 63, 94, 0.1)",
                          borderColor: "rgba(244, 63, 94, 0.2)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-shimmer" />
                        <span className="text-slate-300 relative z-10 text-[14px] font-semibold">
                          Floating_Text_Box
                        </span>
                        <div className="relative h-6 w-28 overflow-hidden">
                          <div className="absolute text-rose-400 font-bold flex items-center gap-2 animate-flip-up delay-500">
                            <XCircle size={14} className="animate-pulse" /> ERROR
                          </div>
                          <div
                            className="absolute text-emerald-400 font-bold flex items-center gap-2 opacity-0 animate-flip-down delay-500"
                            style={{ top: "24px" }}
                          >
                            <Check size={14} className="animate-bounce" /> FIXED
                          </div>
                        </div>
                      </div>

                      {/* Fix 2 - Enhanced & Larger */}
                      <div
                        className="flex items-center justify-between p-5 rounded-xl border animate-bg-fix delay-1200 relative overflow-hidden"
                        style={{
                          backgroundColor: "rgba(244, 63, 94, 0.1)",
                          borderColor: "rgba(244, 63, 94, 0.2)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-shimmer delay-300" />
                        <span className="text-slate-300 relative z-10 text-[14px] font-semibold">Table_Structure</span>
                        <div className="relative h-6 w-28 overflow-hidden">
                          <div className="absolute text-rose-400 font-bold flex items-center gap-2 animate-flip-up delay-1200">
                            <AlertTriangle size={14} className="animate-pulse" /> WARN
                          </div>
                          <div
                            className="absolute text-emerald-400 font-bold flex items-center gap-2 opacity-0 animate-flip-down delay-1200"
                            style={{ top: "24px" }}
                          >
                            <Check size={14} className="animate-bounce" /> CLEAN
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#020617] via-[#0a0f1a] to-[#020617] p-4 text-center border-t border-slate-800">
                      <span className="text-[12px] text-emerald-500 font-bold tracking-widest animate-pulse bg-emerald-500/15 px-4 py-2 rounded-full border border-emerald-500/30">
                        SYSTEM SECURE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual 3: Eye Tracking - Enhanced & Larger */}
              {activeTab === 2 && (
                <div
                  className="relative w-full max-w-lg animate-fade-scale"
                  key={`v3-${animationKey}`}
                >
                  <div className="bg-[#0F172A] rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-700/50 p-10 relative overflow-hidden scale-110">
                    {/* Enhanced Animated Heatmap Blobs - Larger */}
                    <div
                      className="absolute top-16 left-14 w-40 h-40 bg-gradient-to-r from-rose-500/50 to-pink-500/50 rounded-full blur-[80px] animate-heatmap"
                      style={{ mixBlendMode: "screen" }}
                    />
                    <div
                      className="absolute bottom-20 right-16 w-36 h-36 bg-gradient-to-r from-amber-500/50 to-orange-500/50 rounded-full blur-[70px] animate-heatmap delay-1000"
                      style={{ mixBlendMode: "screen" }}
                    />
                    <div
                      className="absolute top-24 right-12 w-28 h-28 bg-gradient-to-r from-blue-500/40 to-indigo-500/40 rounded-full blur-[60px] animate-heatmap delay-1500"
                      style={{ mixBlendMode: "screen" }}
                    />
                    
                    {/* Enhanced floating particles */}
                    <div className="absolute top-12 left-20 w-2 h-2 bg-rose-400/80 rounded-full animate-particle" />
                    <div className="absolute top-28 right-24 w-2.5 h-2.5 bg-amber-400/70 rounded-full animate-particle delay-800" />
                    <div className="absolute bottom-28 left-24 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-particle delay-1600" />

                    {/* Enhanced Resume Skeleton - Larger */}
                    <div className="space-y-8 relative z-10">
                      <div className="flex gap-6 border-b border-slate-800 pb-6">
                        <div className="w-18 h-18 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full animate-pulse shadow-lg" />
                        <div className="space-y-3 flex-1">
                          <div className="h-5 w-44 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg animate-pulse" />
                          <div className="h-4 w-32 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse delay-200" />
                        </div>
                      </div>

                      {/* Enhanced Key Achievements with Glow - Larger */}
                      <div className="pt-3">
                        <div
                          className="h-7 w-44 border rounded-xl mb-5 flex items-center px-4 animate-glow relative overflow-hidden"
                          style={{
                            backgroundColor: "rgba(99, 102, 241, 0.15)",
                            borderColor: "rgba(99, 102, 241, 0.4)",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent animate-shimmer" />
                          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider relative z-10">
                            Key Achievements
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div className="h-3.5 w-full bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse" />
                          <div className="h-3.5 w-5/6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse delay-300" />
                          <div className="h-3.5 w-4/5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg animate-pulse delay-500" />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Moving Eye Cursor - Larger */}
                    <div
                      className="absolute z-30 animate-float"
                      style={{
                        top: "25%",
                        left: "30%",
                        filter: "drop-shadow(0 0 25px rgba(255,255,255,0.8)) drop-shadow(0 0 50px rgba(244,63,94,0.6))",
                      }}
                    >
                      <MousePointer
                        size={44}
                        className="fill-white text-rose-500 animate-pulse"
                      />
                      {/* Enhanced cursor trail effect */}
                      <div className="absolute -top-2 -left-2 w-12 h-12 bg-rose-500/25 rounded-full animate-ping" />
                      <div className="absolute -top-1 -left-1 w-10 h-10 bg-rose-500/15 rounded-full animate-ping delay-500" />
                    </div>

                    {/* Enhanced Label - Larger */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-950/95 to-slate-900/95 backdrop-blur-md text-white text-[12px] font-bold px-6 py-3 rounded-2xl shadow-2xl border border-white/25 flex items-center gap-3 whitespace-nowrap z-20 animate-bounce-in">
                      <Eye
                        size={16}
                        className="text-emerald-400 animate-pulse"
                        strokeWidth={2.5}
                      />
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-semibold">
                        Heatmap Active
                      </span>
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
