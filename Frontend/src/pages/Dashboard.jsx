import React, { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
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
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700;800&display=swap');

    :root {
      --font-heading: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
    }

    body {
      font-family: var(--font-body);
      background-color: #FAFAFA;
      color: #0F172A;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 10px; }
  `}</style>
);

/* --------------------------------------------------------------------------------
 * PREMIUM BENTO CARD
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      className={`group relative text-left ${
        large ? "min-h-85 md:col-span-2" : "min-h-80"
      } rounded-4xl bg-[#09090b]
        shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]
        cursor-pointer overflow-hidden flex flex-col justify-between
        transition-all duration-500
        hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]
        focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              ${accentColor}10,
              transparent 80%
            )
          `,
        }}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-4xl ring-1 ring-white/10 group-hover:ring-white/20 transition duration-500" />

      {/* Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 blur-[120px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"
        style={{ backgroundColor: accentColor }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md"
              style={{
                backgroundColor: `${accentColor}08`,
                borderColor: `${accentColor}15`,
              }}
            >
              <Sparkles size={10} style={{ color: accentColor }} />
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                {badge}
              </span>
            </div>
          </div>

          <h3 className="text-3xl font-heading font-bold text-white mb-3 leading-tight">
            {title}
          </h3>

          <p className="text-[15px] font-medium text-slate-400 leading-relaxed max-w-[90%]">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-8 mt-auto">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${accentColor}10`,
                border: `1px solid ${accentColor}20`,
              }}
            >
              <Icon size={20} className="text-white" strokeWidth={2} />
            </div>

            <span className="text-xs font-bold tracking-wider uppercase text-slate-500">
              Open Tool
            </span>
          </div>

          <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-600">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </motion.button>
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

      <div className="min-h-screen relative overflow-x-hidden bg-[#FDFDFD]">
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />

        <div className="max-w-300 mx-auto pt-20 pb-24 px-6 md:px-10 space-y-16">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold">
              Your Workspace
            </h1>

            <p className="text-slate-500 text-xl font-medium pt-2">
              {getGreeting()},{" "}
              <span className="font-bold text-slate-900">
                {user?.firstName || "Creator"}
              </span>
            </p>
          </motion.header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              description="Access your portfolio of targeted resumes."
              icon={UploadCloud}
              badge="Workspace"
              accentColor="#10b981"
              delay={2}
            />

            <BentoCard
              title="ATS Diagnostic Core"
              description="Deep-scan resume analysis for parsing risks."
              icon={ScanSearch}
              badge="Optimization"
              accentColor="#8b5cf6"
              delay={3}
              large
            />
          </section>
        </div>
      </div>
    </>
  );
}
