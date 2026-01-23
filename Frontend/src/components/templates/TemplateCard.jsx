import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react";

export default function TemplateCard({ template, onSelect }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false); // New State

  const handleSelection = (e) => {
    e.stopPropagation();
    setIsNavigating(true);
    setTimeout(() => {
      onSelect(template.id);
    }, 500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <button
        onClick={handleSelection}
        disabled={isNavigating}
        className={`
          relative w-full h-full text-left flex flex-col
          bg-white rounded-2xl
          shadow-[0_2px_10px_rgba(0,0,0,0.03)]
          border border-slate-200
          transition-all duration-500 ease-out
          overflow-hidden
          focus:outline-none focus:ring-4 focus:ring-indigo-500/10
          ${
            isNavigating
              ? "scale-[0.98] border-indigo-500 ring-4 ring-indigo-500/10"
              : "hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:border-indigo-500/40 hover:-translate-y-2"
          }
        `}
      >
        {/* --- IMAGE CONTAINER --- */}
        <div className="relative w-full aspect-[1/1.414] bg-slate-50 overflow-hidden border-b border-slate-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-100 animate-pulse" />
          )}

          <div
            className={`
            relative w-full h-full transform transition-transform duration-700 ease-out
            ${!isNavigating && "group-hover:scale-105"}
          `}
          >
            <img
              src={template.preview}
              alt={template.name}
              onLoad={() => setImageLoaded(true)}
              className={`
                w-full h-full object-cover object-top
                transition-opacity duration-500
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              loading="lazy"
            />
          </div>

          {/* GRADIENT OVERLAYS */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/[0.02] to-transparent" />
            <div
              className={`
               absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900/80 to-transparent 
               transition-opacity duration-500 ease-out
               ${
                 isNavigating
                   ? "opacity-100"
                   : "opacity-0 group-hover:opacity-100"
               }
            `}
            />
          </div>

          {/* FLOATING BUTTON */}
          <div
            className={`
            absolute bottom-6 left-0 right-0 flex justify-center 
            transition-all duration-300 ease-out
            ${
              isNavigating
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-75"
            }
          `}
          >
            <span
              // Track hover on the BUTTON itself
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className={`
              inline-flex items-center gap-2 px-6 py-3 
              rounded-full font-bold text-sm tracking-wide shadow-xl shadow-black/20
              transition-all duration-300
              ${
                isNavigating || isButtonHovered
                  ? "bg-indigo-600 text-white scale-105"
                  : "bg-white text-slate-900 group-hover:scale-100 scale-95"
              }
            `}
            >
              <AnimatePresence mode="wait">
                {isNavigating ? (
                  // STATE: CLICKED
                  <motion.div
                    key="clicking"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>Opening</span>
                    <MousePointer2
                      size={16}
                      className="fill-white stroke-white animate-bounce"
                    />
                  </motion.div>
                ) : isButtonHovered ? (
                  // STATE: HOVERING BUTTON (POINTER ICON)
                  <motion.div
                    key="hovering"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2"
                  >
                    <span>Use Template</span>
                    {/* The pointer replaces the arrow here */}
                    <MousePointer2
                      size={16}
                      className="fill-white stroke-white"
                    />
                  </motion.div>
                ) : (
                  // STATE: DEFAULT (ARROW ICON)
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center gap-2"
                  >
                    <span>Use Template</span>
                    <ArrowRight size={14} className="text-indigo-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>

        {/* CONTENT FOOTER */}
        <div className="p-5 flex flex-col flex-grow bg-white z-10">
          <div className="flex justify-between items-start gap-3 mb-2">
            <h3
              className={`
              text-lg font-bold transition-colors duration-300
              ${
                isNavigating
                  ? "text-indigo-600"
                  : "text-slate-900 group-hover:text-indigo-600"
              }
            `}
            >
              {template.name}
            </h3>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>
      </button>
    </motion.div>
  );
}
