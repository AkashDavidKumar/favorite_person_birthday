import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function FloatingSticker({
  children,
  emoji = "✨",
  rotation = 0,
  variant = "pink",
  interactive = true,
  className = "",
  size = "md",
}) {
  const prefersReduced = useReducedMotionPreference();

  const variantStyles = {
    pink: "bg-white text-pink-700 border-pink-200/90 shadow-pink-200/40",
    yellow: "bg-amber-50 text-amber-900 border-amber-200/90 shadow-amber-200/40",
    lavender: "bg-purple-50 text-purple-800 border-purple-200/90 shadow-purple-200/40",
    mint: "bg-emerald-50 text-emerald-800 border-emerald-200/90 shadow-emerald-200/40",
    blue: "bg-sky-50 text-sky-800 border-sky-200/90 shadow-sky-200/40",
    dark: "bg-purple-950/80 text-purple-200 border-purple-700/60 shadow-purple-900/50 backdrop-blur-md",
  };

  const sizeStyles = {
    sm: "text-[10px] sm:text-xs py-1 px-2.5 gap-1",
    md: "text-xs sm:text-sm py-1.5 px-3.5 gap-1.5",
    lg: "text-sm sm:text-base py-2 px-4 gap-2 font-semibold",
  };

  const handleClick = (e) => {
    if (!interactive || prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x, y },
      colors: ["#f472b6", "#c084fc", "#fde047", "#ffffff"],
      scalar: 0.7,
      ticks: 120,
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={
        prefersReduced
          ? {}
          : {
              scale: 1.08,
              rotate: rotation > 0 ? rotation + 4 : rotation - 4,
              transition: { duration: 0.15 },
            }
      }
      whileTap={prefersReduced ? {} : { scale: 0.94 }}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      className={`inline-flex items-center font-fun rounded-full border-2 shadow-md select-none transition-all duration-200 ${
        interactive ? "cursor-pointer" : "pointer-events-none"
      } ${variantStyles[variant] || variantStyles.pink} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {emoji && <span className="text-sm sm:text-base shrink-0">{emoji}</span>}
      <span className="font-semibold tracking-wide whitespace-nowrap">{children}</span>
    </motion.div>
  );
}
