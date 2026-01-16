import { motion } from 'framer-motion';
import { AlertCircle, XCircle } from 'lucide-react';

const ProblemStatement = () => {
    const problems = [
        'Non-standard formatting',
        'Keyword mismatch',
        'Tables, icons, columns ATS can\'t parse',
        'Design-heavy templates that break extraction'
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                        <AlertCircle className="w-4 h-4 text-brand-primary" />
                        <span className="text-sm font-medium text-brand-primary">The Problem</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Why Most Resumes Never<br />Reach a Recruiter
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Over <span className="font-bold text-brand-primary">70% of resumes are rejected</span> by Applicant Tracking Systems before human review.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Common Reasons for Rejection:</h3>
                        {problems.map((problem, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-brand-primary transition-colors duration-300"
                            >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-1">
                                    <XCircle className="w-4 h-4 text-brand-primary" />
                                </div>
                                <p className="text-gray-700 font-medium">{problem}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative p-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                            <div className="relative z-10">
                                <div className="text-6xl font-bold text-white mb-4">70%</div>
                                <div className="text-xl text-gray-300 mb-6">Rejection Rate</div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '70%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                        className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full"
                                    />
                                </div>
                                <p className="mt-6 text-gray-300 leading-relaxed">
                                    Most candidates don't fail because they're unqualified. They fail because their resume is unreadable to software.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
