import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

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
    // Glass effect triggers slightly earlier for smoothness
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Smart Hide
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
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    open: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/50 shadow-sm supports-[backdrop-filter]:bg-white/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Added Ring for Definition */}
          <Link
            to="/"
            className="group flex items-center gap-2 z-50 outline-none"
          >
            <div className="bg-gray-900 text-white p-1.5 rounded-lg shadow-sm ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
              <Sparkles size={18} fill="currentColor" className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
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
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#432DD7] rounded-full"
                >
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-[#432DD7] shadow-sm"
                      style={{ zIndex: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {!active && isHovered && (
                    <motion.div
                      layoutId="hover-pill"
                      className="absolute inset-0 rounded-full bg-gray-100/70"
                      style={{ zIndex: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      active
                        ? "text-white font-semibold"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Senior UI 'Get Started' Button - Enhanced Lighting & Gradient */}
          <div className="hidden md:block">
            <SignedOut>
              <Link to="/sign-up">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-b from-[#4F39F6] to-[#432DD7] text-white text-sm font-semibold shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_4px_12px_0_rgba(67,45,215,0.3)] transition-all duration-300 hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_8px_20px_0_rgba(67,45,215,0.4)] focus:outline-none focus:ring-2 focus:ring-[#432DD7] focus:ring-offset-2"
                >
                  {/* Top Highlight (Inset Shadow) for 3D feel - Crisp White Lip */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
                  <div className="absolute inset-x-4 top-0 h-[1px] bg-white/40 opacity-50 blur-[1px]" />

                  <span className="text-shadow-sm">Get Started</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Added Ring and Better Spacing */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-full left-0 right-0 border-b border-gray-200 bg-white/95 backdrop-blur-xl p-6 shadow-2xl ring-1 ring-black/5 md:hidden z-50 origin-top"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ${
                        active
                          ? "bg-[#432DD7]/10 text-[#432DD7] font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-6 pb-2 mt-2 border-t border-gray-100">
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#432DD7] py-3.5 text-base font-bold text-white shadow-lg shadow-[#432DD7]/20 active:bg-[#3521B5] transition-colors"
                    >
                      Get Started{" "}
                      <ArrowRight size={18} className="opacity-80" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
