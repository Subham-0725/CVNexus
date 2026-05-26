import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { AnimatePresence, motion } from "framer-motion";
import AtsForm from "../components/ats/AtsForm";
import ProcessingState from "../components/ats/ProcessingState";
import ResultView from "../components/ats/ResultView";
import { API_BASE } from "../lib/api/config";

export default function AtsChecker() {
  const { getToken } = useAuth();
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    jobDescription: "",
    role: "",
    company: "",
  });
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!file) {
      setError("Resume is required");
      return;
    }

    try {
      setStep("processing");
      setError(null);

      const token = await getToken();
      if (!token) {
        throw new Error("You must be signed in to run an ATS check.");
      }

      const data = new FormData();
      data.append("resume", file);
      data.append("jobDescription", formData.jobDescription);
      data.append("role", formData.role);
      data.append("company", formData.company);

      const res = await fetch(`${API_BASE}/api/v1/ats/analyze`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }

      setResult(json);
      setStep("result");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setStep("error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA] text-zinc-900 font-sans relative flex flex-col items-center pt-12 pb-20 px-6">
      <div className="w-full max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AtsForm
                formData={formData}
                setFormData={setFormData}
                setFile={setFile}
                onSubmit={handleSubmit}
                file={file}
              />
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessingState />
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ResultView result={result} onReset={() => setStep("form")} />
            </motion.div>
          )}

          {step === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 bg-red-50 border border-red-100 rounded-2xl text-center space-y-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-red-600">
                Analysis Failed
              </h2>
              <p className="text-red-500">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep("form");
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-sm"
              >
                Retry Analysis
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
