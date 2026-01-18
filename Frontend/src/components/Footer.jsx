import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  Globe,
  Shield,
  ArrowRight,
  Zap,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Configuration ---
const footerLinks = {
  Product: [
    { name: "Features", href: "/features", badge: "New" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Enterprise", href: "/enterprise" },
  ],
  Resources: [
    { name: "Resume Templates", href: "/templates" },
    { name: "Career Blog", href: "/blog" },
    { name: "ATS Checker", href: "/services/ats-score" },
    { name: "Success Stories", href: "/stories" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers", badge: "Hiring" },
    { name: "Contact", href: "/contact" },
    { name: "Press Kit", href: "/press" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    icon: Twitter,
    href: "#",
    label: "Twitter",
    color: "hover:text-sky-400",
    bg: "hover:bg-sky-400/10",
    border: "hover:border-sky-400/20",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
    color: "hover:text-blue-500",
    bg: "hover:bg-blue-500/10",
    border: "hover:border-blue-500/20",
  },
  {
    icon: Github,
    href: "#",
    label: "GitHub",
    color: "hover:text-purple-400",
    bg: "hover:bg-purple-400/10",
    border: "hover:border-purple-400/20",
  },
  {
    icon: Mail,
    href: "#",
    label: "Email",
    color: "hover:text-emerald-400",
    bg: "hover:bg-emerald-400/10",
    border: "hover:border-emerald-400/20",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020617] border-t border-slate-800 pt-0 pb-10 overflow-hidden font-jakarta text-slate-400">
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/05 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* --- Top Slice: Integrated CTA --- */}
        <div className="relative -mt-px pt-20 pb-16 border-b border-slate-800/60">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Zap size={12} fill="currentColor" />
                <span>Start Building Today</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Ready to beat the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#432DD7] to-indigo-400">
                  algorithm?
                </span>
              </h3>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Join 50,000+ professionals who stopped guessing and started
                getting hired.
              </p>
            </div>

            <div className="bg-slate-900/50 p-2 rounded-2xl border border-slate-800 flex items-center">
              <input
                type="email"
                placeholder="Enter your email to start..."
                className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:outline-none focus:ring-0 placeholder:text-slate-600 text-base"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#432DD7] hover:bg-[#3521B5] text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Navigation & Brand --- */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#432DD7] to-[#7c3aed] flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 border border-white/10">
                  <Sparkles size={24} fill="currentColor" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight block leading-none mb-1">
                    CV<span className="text-[#432DD7]">Nexus</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    AI Resume Architect
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              The only resume builder engineered with the same parsing
              technology used by Fortune 500 hiring systems.
            </p>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-300 ${social.color} ${social.bg} ${social.border}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-6">
                <h4 className="text-white font-bold text-xs tracking-widest uppercase border-l-2 border-[#432DD7] pl-3 h-4 flex items-center">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-all duration-200 flex items-center gap-2 group w-fit"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-[#432DD7] transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.name}
                        </span>
                        {link.badge && (
                          <span className="text-[9px] font-bold bg-[#432DD7] text-white px-1.5 py-0.5 rounded ml-1">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom Bar: Utility --- */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <span className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} CVNexus Inc.
            </span>

            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <Shield size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400">
                  SOC2 Compliant
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <Globe size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold text-slate-400">
                  GDPR Ready
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* System Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 group cursor-default hover:border-emerald-500/30 transition-colors">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                All Systems Normal
              </span>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, backgroundColor: "#1e293b" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider hover:text-white hover:border-slate-700 transition-all group"
            >
              Back to Top
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-0.5 transition-transform text-[#432DD7]"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
