import { motion } from "motion/react";

export default function PrimaryButton({
  onClick,
  children,
  disabled = false,
  className = "",
  variant = "primary",
  type = "button",
  ariaLabel,
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-medium rounded-full px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base leading-normal min-h-[48px] max-w-full text-center transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed box-border";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-300/40 hover:shadow-lg hover:shadow-purple-400/50 active:scale-[0.98] focus-visible:ring-purple-500",
    secondary:
      "bg-white/90 backdrop-blur-sm text-purple-700 border border-purple-200 hover:bg-white hover:border-purple-300 active:scale-[0.98] shadow-sm focus-visible:ring-purple-400",
    ghost:
      "bg-transparent text-purple-700 hover:bg-purple-50/70 focus-visible:ring-purple-400 active:scale-[0.98]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </motion.button>
  );
}
