import { UserButton, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { FileText, ScanLine, Sparkles, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Dashboard() {
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      try {
        const token = await getToken();

        if (!token) return;

        await fetch("http://localhost:5000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Failed to sync user with backend:", error);
      }
    };

    syncUserWithBackend();
  }, [getToken]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="mt-2 text-slate-500 text-sm font-medium">
              Manage your resumes and ATS optimizations
            </p>
          </div>

          <UserButton afterSignOutUrl="/" />
        </motion.div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <DashboardCard
            icon={FileText}
            title="Create Resume"
            description="Build an ATS-friendly resume from scratch using structured layouts."
            cta="Start Building"
          />

          {/* Card 2 */}
          <DashboardCard
            icon={ScanLine}
            title="Check ATS Score"
            description="Upload your resume and see how it performs against ATS rules."
            cta="Analyze Resume"
          />

          {/* Card 3 */}
          <DashboardCard
            icon={Sparkles}
            title="AI Improvements"
            description="Enhance bullet points with quantified, high-impact suggestions."
            cta="Optimize Content"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable Card – matches Landing page tone & spacing */
/* ------------------------------------------------------------------ */

function DashboardCard({ icon: Icon, title, description, cta }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 mb-6 group-hover:text-[#432DD7] transition-colors">
        <Icon size={22} />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        {description}
      </p>

      <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#432DD7] hover:text-[#3521B5] transition-colors">
        {cta}
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}
