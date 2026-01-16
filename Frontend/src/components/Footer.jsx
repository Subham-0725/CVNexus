import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, ArrowUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
    const [hoveredSocial, setHoveredSocial] = useState(null);

    const footerSections = [
        {
            title: 'Product',
            links: [
                { name: 'Features', href: '/features' },
                { name: 'How It Works', href: '/how-it-works' },
                { name: 'Pricing', href: '/pricing' }
            ]
        },
        {
            title: 'Company',
            links: [
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Blog', href: '/blog' }
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' }
            ]
        }
    ];

    const socialLinks = [
        { icon: Twitter, href: '#', label: 'Twitter', color: 'from-blue-400 to-cyan-400' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-400' },
        { icon: Github, href: '#', label: 'GitHub', color: 'from-purple-600 to-pink-600' },
        { icon: Mail, href: '#', label: 'Email', color: 'from-violet-600 to-purple-600' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-gradient-to-b from-white via-indigo-50/30 to-violet-100/50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link to="/" className="inline-block mb-4 group">
                                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-brand-primary" />
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-primary">
                                        CVNexus
                                    </h3>
                                </motion.div>
                                <p className="text-sm text-brand-primary font-medium">Smart Resume Builder</p>
                            </Link>
                            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
                                Build ATS-optimized resumes that pass automated screening systems. Professional, structured, and ready for modern hiring.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            onHoverStart={() => setHoveredSocial(index)}
                                            onHoverEnd={() => setHoveredSocial(null)}
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group overflow-hidden"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-10 group-hover:opacity-100 transition-opacity duration-300`} />
                                            <Icon className={`w-5 h-5 relative z-10 transition-colors duration-300 ${hoveredSocial === index ? 'text-white' : 'text-gray-700'
                                                }`} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li key={linkIndex} whileHover={{ x: 3 }}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-600 hover:text-brand-primary transition-colors duration-200 text-sm inline-block"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Divider with gradient */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gradient-to-r from-transparent via-indigo-200/50 to-transparent" />
                    </div>
                    <div className="relative flex justify-center">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <ArrowUp className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-brand-primary/20"
                >
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                        <span className="font-semibold text-brand-primary">Important:</span> CVNexus optimizes resumes for ATS systems.
                        Hiring decisions are made by employers, not us.
                    </p>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} CVNexus. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link to="/privacy" className="hover:text-brand-primary transition-colors duration-200">
                            Privacy
                        </Link>
                        <Link to="/terms" className="hover:text-brand-primary transition-colors duration-200">
                            Terms
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient line */}
            <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />
        </footer>
    );
};

export default Footer;
