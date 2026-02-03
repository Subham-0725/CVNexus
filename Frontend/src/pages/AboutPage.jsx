import { motion } from "framer-motion";
import { Target, Users, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20 font-jakarta overflow-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-bold uppercase tracking-widest mb-6">
                        <Target size={12} />
                        <span>Our Mission</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Empowering Careers with <span className="text-[#432DD7]">Intelligent Design.</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        CVNexus bridges the gap between talent and opportunity by decoding ATS algorithms and providing design-first tools for job seekers.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-12"
                >
                    {/* Section 1: What is it? */}
                    <motion.div variants={fadeInUp} className="group relative bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap size={200} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Zap size={18} />
                            </span>
                            What is CVNexus?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
                            <p>
                                CVNexus is an <strong>intelligent web-based resume builder</strong> designed to create ATS-optimized resumes using structured data and modern templates. It allows users to generate, improve, and analyze resumes with AI-assisted content recommendations.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <span>Evaluates resumes against ATS-friendly rules for compatibility.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <span>Provides actionable improvement feedback and compatibility scores.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <span>Exports finalized resumes in PDF or DOCX formats seamlessly.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 2: Who is it for? */}
                    <motion.div variants={fadeInUp} className="group relative bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden text-white">
                        {/* Abstract Grid Background */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                                <Users size={18} />
                            </span>
                            Who is it for?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 relative z-10">
                            {[
                                { title: "Students & Grads", desc: "Start your career with a professional edge." },
                                { title: "Job Seekers", desc: "Applying through online portals and ATS filters." },
                                { title: "Professionals", desc: "Wanting structured feedback without high costs." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl hover:bg-slate-800 transition-colors">
                                    <h3 className="font-bold text-lg mb-2 text-indigo-300">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-slate-400 text-sm relative z-10 max-w-2xl bg-slate-800/50 p-4 rounded-xl border-l-[3px] border-indigo-500">
                            Created for those who struggle to create ATS-friendly resumes and want to ensure their application actually reaches a human recruiter.
                        </p>
                    </motion.div>

                    {/* Section 3: The Goal */}
                    <motion.div variants={fadeInUp} className="group relative bg-gradient-to-br from-indigo-50 to-white rounded-3xl border border-indigo-100 p-8 md:p-12 shadow-sm text-center md:text-left flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Objective</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                The goal of CVNexus is to help users create clean, <strong>ATS-optimized resumes</strong> that pass automated screening systems. We aim to identify structural, content, and keyword-related issues before you hit "Apply".
                            </p>
                            <Link to="/features">
                                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#432DD7] text-white font-semibold hover:bg-[#3521B5] transition-colors shadow-lg shadow-indigo-200">
                                    Explore Features <ArrowRight size={18} />
                                </button>
                            </Link>
                        </div>
                        <div className="w-full md:w-auto flex-shrink-0">
                            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(67,45,215,0.15)] relative">
                                <ShieldCheck size={100} className="text-[#432DD7]" strokeWidth={1} />
                                <div className="absolute inset-0 border border-dashed border-indigo-200 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
