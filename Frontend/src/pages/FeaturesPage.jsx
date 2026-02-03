import Features from "../components/Features";
import { motion } from "framer-motion";

export default function FeaturesPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-16" // pt-16 to account for fixed navbar height
        >
            <Features />
        </motion.div>
    );
}
