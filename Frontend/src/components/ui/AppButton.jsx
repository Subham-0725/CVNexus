import React from "react";

export default function AppButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  variant = "gradient", // Changed default to the flashy one
  size = "md",
  type = "button",
  className = "",
  icon: Icon, // Added optional icon support
  ...props
}) {
  // 1. Made the base incredibly snappy. Added 'group' for internal animations, and 'overflow-hidden' for shine effects.
  const baseStyles =
    "group relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden";

  // 2. Pumped up the padding and border radius slightly for a more modern, plush feel.
  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-2.5 text-sm rounded-xl",
    lg: "px-8 py-3.5 text-base rounded-2xl",
  };

  // 3. The fun part. Radically distinct, eye-catching variants.
  const variants = {
    gradient:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 focus:ring-indigo-500",
    neon: "bg-neutral-950 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:bg-cyan-400 hover:text-neutral-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 focus:ring-cyan-400",
    solid:
      "bg-black text-white shadow-lg hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-0.5 ring-1 ring-white/10 focus:ring-neutral-900",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 hover:shadow-xl hover:-translate-y-0.5 focus:ring-white", // Best used on dark or image backgrounds
  };

  const Spinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Dynamic Shine Effect on Hover (Visible mainly on gradient/solid variants) */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full" />

      {/* Content wrapper to stay above the shine effect */}
      <span
        className={`relative z-10 flex items-center justify-center ${isLoading ? "opacity-90" : ""}`}
      >
        {isLoading && <Spinner />}
        {!isLoading && Icon && <Icon className="mr-2 h-4 w-4" />}
        {children}
      </span>
    </button>
  );
}