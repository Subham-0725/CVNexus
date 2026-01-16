import { motion } from 'framer-motion';
import { Upload, Search, Download } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: Upload,
            title: 'Create or Upload',
            description: 'Build a resume from scratch or upload an existing PDF / DOCX',
            color: 'from-purple-600 to-blue-600'
        },
        {
            number: '02',
            icon: Search,
            title: 'ATS Analysis',
            description: 'Resume is parsed structurally. Keywords, sections, and risks evaluated with detailed explanations',
            color: 'from-blue-600 to-purple-600'
        },
        {
            number: '03',
            icon: Download,
            title: 'Improve & Export',
            description: 'Apply fixes, download ATS-optimized resume, and apply with confidence',
            color: 'from-purple-600 to-blue-600'
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-6">
                        <span className="text-sm font-medium text-purple-600">Process</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Remove uncertainty and reduce friction with our simple 3-step process.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 transform -translate-y-1/2 z-0"></div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-600 transition-all duration-300 hover:shadow-2xl group">
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <span className="text-white font-bold text-sm">{step.number}</span>
                                            </div>
                                        </div>

                                        {/* Icon */}
                                        <div className="mt-8 mb-6 flex justify-center">
                                            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 group-hover:scale-110 transition-all duration-300">
                                                <Icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-center leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Arrow for mobile */}
                                    {index < steps.length - 1 && (
                                        <div className="md:hidden flex justify-center my-6">
                                            <div className="w-0.5 h-8 bg-gradient-to-b from-purple-600 to-blue-600"></div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        Start Building Your Resume
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
