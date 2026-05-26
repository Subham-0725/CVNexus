import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Parsing Document Structure...",
  "Extracting Semantic Skills...",
  "Running Keyword Ontology...",
  "Synthesizing Insights...",
];

export default function ProcessingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[500px] space-y-10 w-full max-w-2xl mx-auto bg-white border border-zinc-100 rounded-[2rem] shadow-sm">
      <div className="relative w-28 h-36 border border-zinc-200 bg-zinc-50 rounded-xl overflow-hidden flex flex-col items-center justify-center shadow-inner">
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          className="absolute left-0 w-full h-[2px] bg-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.6)] z-10"
        />
        <div className="w-16 h-1.5 bg-zinc-200 rounded-full mb-8" />
        <div className="w-20 h-1.5 bg-zinc-200 rounded-full mb-3" />
        <div className="w-14 h-1.5 bg-zinc-200 rounded-full mb-3" />
        <div className="w-18 h-1.5 bg-zinc-200 rounded-full" />
      </div>

      <div className="h-8 overflow-hidden relative w-full text-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-medium tracking-wide text-zinc-600 absolute w-full"
          >
            {steps[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
