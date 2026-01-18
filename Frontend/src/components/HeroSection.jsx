import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

// --- Configuration ---
const POPULAR_TAGS = [
  "Product Manager",
  "Software Engineer",
  "Data Scientist",
  "Marketing Specialist",
  "Sales Executive",
];

// --- Sub-Components ---

const SearchInput = ({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
}) => (
  <div className="flex items-center gap-4 w-full group cursor-text">
    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within:bg-[#432DD7]/10 group-focus-within:text-[#432DD7] transition-colors shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 group-focus-within:text-[#432DD7] transition-colors">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full text-sm text-slate-900 placeholder:text-slate-300 outline-none bg-transparent font-semibold"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  </div>
);

const TagButton = ({ tag }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
    whileTap={{ scale: 0.95 }}
    className="px-4 py-2 bg-slate-50/80 hover:shadow-md text-slate-600 text-xs font-semibold rounded-full transition-all border border-slate-100 hover:border-[#432DD7]/20 hover:text-[#432DD7]"
  >
    {tag}
  </motion.button>
);

const FloatingBadge = ({
  icon: Icon,
  title,
  subtitle,
  className,
  animationDelay = 0,
  yOffset = -10,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: [0, yOffset, 0],
    }}
    transition={{
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: animationDelay,
      },
      opacity: { duration: 0.5, delay: 0.5 },
    }}
    className={`absolute z-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 border border-white/50 max-w-[220px] ${className}`}
  >
    {Icon ? (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#432DD7] to-[#5b46df] flex items-center justify-center text-white shadow-lg shadow-[#432DD7]/20">
        <Icon size={20} />
      </div>
    ) : (
      <div className="flex -space-x-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-200 shadow-sm"
          />
        ))}
      </div>
    )}
    <div>
      <p className="text-sm font-bold text-slate-900 leading-tight">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
  </motion.div>
);

export default function HeroSection() {
  const [isFocused, setIsFocused] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section
      // pt-16 (64px) = Exact height of Navbar.
      // There is now 0px of "extra" whitespace.
      className="relative w-full min-h-[90vh] bg-white overflow-hidden pt-6 pb-12 lg:pt-6 lg:pb-12"
    >
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 w-[55%] h-[100%] z-0 hidden lg:block pointer-events-none">
        <svg
          viewBox="0 0 600 800"
          className="w-full h-full text-[#432DD7] fill-current opacity-[0.98]"
          preserveAspectRatio="none"
        >
          <path d="M50,0 C200,0 300,150 400,300 C550,500 450,700 700,900 V0 Z" />
        </svg>
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT COLUMN: Content --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Headline */}
            <h1 className="text-5xl lg:text-[5rem] font-bold leading-[1.1] text-slate-900 mb-8 tracking-tight">
              Your Resume Is Failing <br />
              the ATS. <span className="text-[#432DD7]">Not You.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-slate-500 font-medium mb-12 max-w-lg leading-relaxed">
              <span className="text-slate-900 font-bold">
                Over 75% of resumes
              </span>{" "}
              never reach a recruiter. We optimize yours to pass ATS screening —
              instantly.
            </p>

            {/* --- SEARCH BAR --- */}
            <div
              className={`bg-white p-3 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 ${
                isFocused
                  ? "ring-4 ring-[#432DD7]/10 shadow-[0_20px_50px_rgba(67,45,215,0.15)] scale-[1.01]"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Input 1 */}
                <div className="flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                  <SearchInput
                    icon={Briefcase}
                    label="Target Role"
                    placeholder="e.g. Frontend Developer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

                {/* Input 2 */}
                <div className="flex-1 px-4 py-3">
                  <SearchInput
                    icon={MapPin}
                    label="Job Location"
                    placeholder="e.g. Remote / New York"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

                {/* Button */}
                <div className="p-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto h-14 px-10 rounded-2xl bg-[#432DD7] hover:bg-[#3521B5] text-white font-bold text-sm shadow-xl shadow-[#432DD7]/20 flex items-center justify-center gap-2 transition-all"
                  >
                    Check ATS Score
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* --- TAGS --- */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                Popular ATS Checks:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <TagButton key={tag} tag={tag} />
              ))}
            </div>

            {/* --- SOCIAL PROOF --- */}
            <div className="mt-16 pt-8 border-t border-slate-100/80">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                Optimized for ATS used by
              </div>
              <div className="flex gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 items-center">
                <div
                  className="h-5 w-24 bg-slate-900/80 mask-logo"
                  style={{
                    maskImage:
                      "url(https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                  }}
                />
                <div
                  className="h-5 w-20 bg-slate-900/80 mask-logo"
                  style={{
                    maskImage:
                      "url(https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                  }}
                />
                <div
                  className="h-6 w-24 bg-slate-900/80 mask-logo"
                  style={{
                    maskImage:
                      "url(https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: Visuals --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:flex items-center justify-center h-full pl-12"
          >
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full animate-pulse" />

              <div
                className="absolute inset-0 bg-white/20 backdrop-blur-md p-4 rounded-[80px] border border-white/40 shadow-2xl z-10"
                style={{ transform: "rotate(45deg)" }}
              >
                <div className="w-full h-full bg-slate-100 rounded-[65px] overflow-hidden relative shadow-[inset_0_2px_20px_rgba(0,0,0,0.1)]">
                  <div
                    className="w-[145%] h-[145%] absolute top-1/2 left-1/2"
                    style={{
                      transform: "translate(-50%, -50%) rotate(-45deg)",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                      alt="Happy Professional"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#432DD7]/20 to-transparent mix-blend-overlay pointer-events-none" />
                </div>
              </div>

              <FloatingBadge
                icon={CheckCircle2}
                title="Interview Ready"
                subtitle="Score: 95/100"
                className="-top-8 -right-8"
                animationDelay={0}
                yOffset={-12}
              />

              <FloatingBadge
                title="10k+ Users"
                subtitle="Hired this month"
                className="bottom-12 -left-12"
                animationDelay={1.5}
                yOffset={12}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
