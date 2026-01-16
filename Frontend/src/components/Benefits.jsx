import { motion } from 'framer-motion';
import { TrendingUp, Shield, Eye, Target } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        {
            icon: TrendingUp,
            title: 'Higher ATS Pass Rates',
            description: 'Structured formatting ensures your resume gets through automated screening systems'
        },
        {
            icon: Shield,
            title: 'Fewer Silent Rejections',
            description: 'Know exactly why your resume might be rejected before you submit it'
        },
        {
            icon: Eye,
            title: 'Clear Understanding',
            description: 'Detailed feedback on what works and what doesn\'t in your resume'
        },
        {
            icon: Target,
            title: 'Technical Confidence',
            description: 'Your resume won\'t fail for technical or formatting reasons'
        }
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
                        <span className="text-sm font-medium text-brand-primary">Benefits</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        What You Actually Gain
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Real-world value that translates to better job application outcomes
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <div className="h-full p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-brand-primary transition-all duration-300 hover:shadow-xl">
                                    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Explicit Boundary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative"
                >
                    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Let's Be Clear
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p className="text-lg leading-relaxed">
                                    This does <span className="font-bold text-white">not</span> guarantee a job.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    It guarantees your resume won't be rejected by software.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <p className="text-sm text-gray-400">
                                    Hiring decisions are made by employers, not us. We optimize for the technical barrier — you bring the qualifications.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        Build My ATS-Ready Resume
                    </motion.button>
                    <p className="mt-4 text-sm text-gray-500">
                        No credit card required • Free to start
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Benefits;
