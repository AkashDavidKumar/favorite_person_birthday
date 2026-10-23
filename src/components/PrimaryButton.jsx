import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function PrimaryButton({
  onClick,
  children,
  disabled = false,
  className = "",
  variant = "primary",
  type = "button",
  ariaLabel,
  enableSparkle = true,
}) {
  const prefersReduced = useReducedMotionPreference();

  const base =
    "relative inline-flex items-center justify-center gap-2 font-fun font-semibold rounded-full px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base leading-normal min-h-[48px] max-w-full text-center transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed box-border";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 text-white shadow-md shadow-pink-300/40 hover:shadow-lg hover:shadow-pink-400/50 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:ring-purple-500 border border-white/30",
    secondary:
      "bg-white/95 backdrop-blur-sm text-purple-800 border-2 border-purple-200 hover:bg-white hover:border-pink-300 active:scale-[0.97] shadow-sm focus-visible:ring-purple-400",
    ghost:
      "bg-transparent text-purple-700 hover:bg-purple-50/70 focus-visible:ring-purple-400 active:scale-[0.97]",
  };

  const handleClick = (e) => {
    if (disabled) return;

    if (enableSparkle && !prefersReduced) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 22,
        spread: 50,
        origin: { x, y },
        colors: ["#f472b6", "#a855f7", "#fde047", "#ffffff", "#38bdf8"],
        scalar: 0.8,
        ticks: 140,
      });
    }

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </motion.button>
  );
}
