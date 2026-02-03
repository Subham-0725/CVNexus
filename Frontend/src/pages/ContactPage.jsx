import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MessageSquare } from "lucide-react";

const teamMembers = [
    {
        name: "Subham Satyajit",
        role: "Full Stack Developer",
        color: "from-blue-500 to-indigo-600",
        initials: "SS"
    },
    {
        name: "Ritesh Dash",
        role: "Frontend Specialist",
        color: "from-purple-500 to-pink-600",
        initials: "RD"
    },
    {
        name: "Omkar Rout",
        role: "Backend Architect",
        color: "from-emerald-500 to-teal-600",
        initials: "OR"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-jakarta">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-900"
                    >
                        Get in <span className="text-[#432DD7]">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg max-w-2xl mx-auto"
                    >
                        Have questions about CVNexus? Our team is here to help you build the perfect resume.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-3 gap-8"
                >
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden text-center"
                        >
                            {/* Abstract Header Background */}
                            <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${member.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                                    {member.initials}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">{member.role}</p>

                                {/* Social Actions */}
                                <div className="flex items-center gap-3 w-full justify-center">
                                    <button className="p-3 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                        <Github size={18} />
                                    </button>
                                    <button className="p-3 rounded-full bg-slate-50 text-slate-500 hover:bg-[#0077b5]/10 hover:text-[#0077b5] transition-colors">
                                        <Linkedin size={18} />
                                    </button>
                                    <button className="p-3 rounded-full bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                        <Mail size={18} />
                                    </button>
                                </div>

                                <button className="mt-8 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                    <MessageSquare size={16} />
                                    Send Message
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Support Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 bg-[#0F172A] rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Need technical support?</h2>
                        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                            If you're experiencing issues with the resume builder or ATS scanner, please check our documentation or reach out directly.
                        </p>
                        <a href="mailto:support@cvnexus.com" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                            <Mail size={18} /> Contact Support
                        </a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
