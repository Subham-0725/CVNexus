import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

import TemplateGrid from "../components/templates/TemplateGrid";
import { templates } from "../data/templates";

export default function Templates() {
  const navigate = useNavigate();
  const { isSignedIn, getToken } = useAuth();

  const handleSelectTemplate = async (templateSlug) => {
    console.log("CLICKED TEMPLATE:", templateSlug);

    if (!isSignedIn) {
      console.error("User not signed in");
      return;
    }

    try {
      const token = await getToken();

      console.log("CLERK TOKEN RECEIVED");

      const response = await axios.post(
        "http://localhost:5000/api/v1/resumes",
        { templateSlug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("RESUME CREATED:", response.data);

      const resumeId = response.data._id;
      navigate(`/builder/${resumeId}`);
    } catch (error) {
      console.error("Failed to create resume:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(#E2E8F0 1px, transparent 1px),
              linear-gradient(to right, #E2E8F0 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F8FAFC_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-900 text-[11px] font-bold tracking-widest uppercase">
              <Sparkles size={12} className="text-indigo-500" />
              <span>CVNexus Library</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Start with a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600">
                strong foundation
              </span>
            </h1>

            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Choose a template. We’ll handle structure and formatting — you
              focus on content.
            </p>
          </motion.div>
        </div>

        {/* Templates Grid */}
        <TemplateGrid templates={templates} onSelect={handleSelectTemplate} />
      </div>
    </div>
  );
}
