import React, { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Plus,
  UploadCloud,
  ScanSearch,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/* --------------------------------------------------------------------------------
 * GLOBAL STYLES
 * ------------------------------------------------------------------------------*/
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    :root {
      --font-display: 'Plus Jakarta Sans', sans-serif;
    }

    body {
      font-family: var(--font-display);
      background-color: #F9FAFB;
      color: #0F172A;
      -webkit-font-smoothing: antialiased;
    }

    /* Mesh Gradients */
    .mesh-purple {
      background: radial-gradient(at 0% 0%, #2e1065 0%, transparent 50%),
                  radial-gradient(at 100% 100%, #1e1b4b 0%, transparent 50%),
                  #0f172a;
    }
    .mesh-green {
      background: radial-gradient(at 0% 0%, #064e3b 0%, transparent 50%),
                  radial-gradient(at 100% 100%, #022c22 0%, transparent 50%),
                  #020617;
    }
    .mesh-blue {
      background: radial-gradient(at 0% 0%, #1e3a8a 0%, transparent 50%),
                  radial-gradient(at 100% 100%, #172554 0%, transparent 50%),
                  #020617;
    }

    .card-glow:hover {
      box-shadow: 0 0 40px -10px rgba(79, 70, 229, 0.3);
    }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 10px; }
  `}</style>
);

/* --------------------------------------------------------------------------------
 * MESH CARD (Formerly BentoCard)
 * ------------------------------------------------------------------------------*/
const BentoCard = ({
  title,
  description,
  icon: Icon,
  badge,
  accentColor,
  delay,
  large = false,
  onClick,
}) => {
  // Map accent colors to specific mesh styles and text colors to match the UI reference
  const getTheme = () => {
    if (large)
      return {
        mesh: "mesh-blue",
        badgeText: "text-blue-300",
        descText: "text-blue-100/70",
        glow: "bg-blue-600/10",
      };
    if (accentColor === "#6366f1")
      return {
        mesh: "mesh-purple",
        badgeText: "text-indigo-300",
        descText: "text-indigo-100/70",
        glow: "bg-[#4F46E5]/20",
      };
    return {
      mesh: "mesh-green",
      badgeText: "text-emerald-300",
      descText: "text-emerald-100/70",
      glow: "bg-emerald-500/10",
    };
  };

  const theme = getTheme();

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className={`${theme.mesh} relative overflow-hidden rounded-[2rem] p-10 
        ${large ? "md:col-span-2 md:p-14" : "min-h-[400px] flex flex-col justify-between"} 
        group cursor-pointer transition-all duration-500 hover:-translate-y-2 card-glow border border-white/5`}
    >
      {/* Background Glow Blob */}
      <div
        className={`absolute pointer-events-none ${large ? "bottom-0 right-0 w-[500px] h-[300px]" : "top-0 right-0 w-64 h-64"} ${theme.glow} blur-[100px] rounded-full`}
      ></div>

      {/* Content Container */}
      <div
        className={`relative z-10 ${large ? "flex flex-col md:flex-row md:items-center justify-between gap-12" : ""}`}
      >
        {/* Text Section */}
        <div className={large ? "max-w-2xl" : ""}>
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest ${theme.badgeText} mb-8`}
          >
            <Sparkles size={14} />
            {badge}
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-white mb-4 tracking-tight ${large ? "text-4xl md:text-5xl mb-6" : "text-4xl"}`}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            className={`${theme.descText} ${large ? "text-xl mb-8" : "text-lg max-w-sm"} leading-relaxed`}
          >
            {description}
          </p>

          {/* Extra UI tags for the Large Card (Optimization) to match reference */}
          {large && (
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                <span className="text-sm text-white/80 font-medium">
                  Keywords Analysis
                </span>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                <span className="text-sm text-white/80 font-medium">
                  Structural Audit
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button Section */}
        <div
          className={`flex items-center ${large ? "flex-shrink-0" : "justify-between mt-auto pt-8"}`}
        >
          <button
            className={`
            flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all group-hover:scale-105
            ${
              large
                ? "w-full md:w-auto px-10 py-5 bg-white text-blue-950 hover:bg-blue-50 font-bold shadow-xl shadow-blue-900/20 active:scale-95 gap-4"
                : "bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white border border-white/10"
            }
          `}
          >
            <Icon size={large ? 24 : 18} />
            <span>{large ? "RUN DIAGNOSTIC" : "OPEN TOOL"}</span>
          </button>

          {!large && (
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white group-hover:bg-white group-hover:text-indigo-900 transition-all">
              <ArrowUpRight size={20} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------------------------------------
 * MAIN DASHBOARD
 * ------------------------------------------------------------------------------*/
export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        await axios.get("http://localhost:5000/api/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("User sync failed:", err);
      }
    };

    syncUser();
  }, [getToken]);

  const getGreeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  };

  return (
    <>
      <GlobalStyles />

      <div className="min-h-screen relative overflow-x-hidden bg-[#F9FAFB]">
        {/* UPDATED: Changed pt-32 to pt-10 to decrease top margin */}
        <div className="max-w-7xl mx-auto pt-10 pb-24 px-6 md:px-10 space-y-16">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4 text-slate-900">
              Your Workspace
            </h1>

            <p className="text-xl text-slate-500 pt-2">
              {getGreeting()},{" "}
              <span className="font-bold text-slate-900">
                {user?.firstName || "Creator"}
              </span>
              . Ready to land your next role?
            </p>
          </motion.header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BentoCard
              title="Intelligent Builder"
              description="Start from scratch with our new V2 Engine. Clean, ATS-optimized structure designed for 99% parsing success."
              icon={Plus}
              badge="Primary Tool"
              accentColor="#6366f1"
              delay={1}
              onClick={() => navigate("/templates")}
            />

            <BentoCard
              title="Document Library"
              description="Access your portfolio of targeted resumes. Management made simple with real-time status tracking."
              icon={UploadCloud}
              badge="Workspace"
              accentColor="#10b981"
              delay={2}
              onClick={() => navigate("/documents")}
            />

            <BentoCard
              title="ATS Diagnostic Core"
              description="Deep-scan resume analysis..."
              icon={ScanSearch}
              badge="Optimization"
              accentColor="#8b5cf6"
              delay={3}
              large
              onClick={() => navigate("/ats-checker")}
            />
          </section>
        </div>
      </div>
    </>
  );
}
