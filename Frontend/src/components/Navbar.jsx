import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  // 1. Smart Scroll Logic
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Check if scrolled down enough to add glass effect
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Smart Hide: Hide if scrolling down > 150px, show if scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const menuVariants = {
    closed: {
      opacity: 0,
      scaleY: 0.95,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    open: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      // 2. Animate the header hiding/showing
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 3. Interactive Logo */}
          <Link to="/" className="group flex items-center gap-1 z-50">
            {/* Icon spins on hover */}
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: "backInOut" }}
              className="bg-gray-900 text-white p-1 rounded-md"
            >
              <Sparkles size={16} fill="currentColor" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter text-gray-900">
              CV<span className="text-[#432DD7]">Nexus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              const isHovered = hoveredPath === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none"
                >
                  {/* Active Pill */}
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-[#432DD7]"
                      style={{ zIndex: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover Pill */}
                  {!active && isHovered && (
                    <motion.div
                      layoutId="hover-pill"
                      className="absolute inset-0 rounded-full bg-gray-100/80"
                      style={{ zIndex: 0 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.3,
                      }}
                    />
                  )}

                  {/* Text */}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* 4. Shimmer Button CTA */}
          <div className="hidden md:block">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-full bg-[#432DD7] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                {/* Shimmer Effect overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />
                <span className="relative z-20">Get Started</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors z-50"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim the background content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-full left-0 right-0 border-t border-gray-200 bg-white p-4 shadow-xl md:hidden z-50 origin-top"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                        active
                          ? "bg-[#432DD7]/5 text-[#432DD7]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-2">
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <button className="w-full rounded-lg bg-[#432DD7] py-3 text-base font-semibold text-white shadow-sm active:scale-[0.98] transition-transform">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tailwind Config for Shimmer needs this CSS in your global styles or tailwind.config.js:
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
      */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.header>
  );
}
