import { motion } from 'framer-motion';
import { FileText, CheckCircle, Sparkles } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: FileText,
            title: 'ATS-Friendly Resume Builder',
            description: 'Clean, structured resume creation with ATS-safe formatting by default.',
            points: [
                'No tables, no icons, no parsing traps',
                'Professional templates',
                'Real-time preview'
            ]
        },
        {
            icon: CheckCircle,
            title: 'ATS Checker',
            description: 'Upload PDF or DOCX and see how ATS systems parse your resume.',
            points: [
                'Keyword alignment analysis',
                'Formatting issue detection',
                'Section detection accuracy'
            ]
        },
        {
            icon: Sparkles,
            title: 'AI Feedback',
            description: 'Actionable suggestions, not generic advice. AI assists — rules decide.',
            points: [
                'Clarity gap highlights',
                'Redundancy detection',
                'Impact optimization'
            ]
        }
    ];

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                        <span className="text-sm font-medium text-brand-primary">Features</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Clear, Practical Solutions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        No feature dumping. Just the tools you need to build an ATS-proof resume.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative"
                            >
                                <div className="relative h-full p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-brand-primary transition-all duration-300 hover:shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/50 to-brand-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <ul className="space-y-3">
                                            {feature.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5">
                                                        <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                                                    </div>
                                                    <span className="text-sm text-gray-700">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
