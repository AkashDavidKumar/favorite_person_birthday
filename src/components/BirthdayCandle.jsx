import { motion, AnimatePresence } from "motion/react";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export function BirthdayCandle({ isLit, onExtinguish, disabled = false }) {
  const prefersReduced = useReducedMotionPreference();

  return (
    <motion.button
      type="button"
      onClick={isLit && !disabled ? onExtinguish : undefined}
      disabled={disabled || !isLit}
      whileHover={isLit && !disabled ? { scale: 1.1 } : {}}
      whileTap={isLit && !disabled ? { scale: 0.95 } : {}}
      className="flex flex-col items-center justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-xl p-1 cursor-pointer disabled:cursor-default select-none relative z-20"
      aria-label={isLit ? "Blow out Harshini's birthday candle and make a wish!" : "Candle is extinguished"}
      title={isLit ? "Click to extinguish and make a wish! 🕯️" : "Wish made! ✨"}
    >
      {/* Flame Container */}
      <div className="relative flex items-center justify-center w-8 h-10 mb-0.5">
        <AnimatePresence mode="wait">
          {isLit ? (
            <motion.div
              key="flame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Outer Golden Glow */}
              <motion.div
                animate={
                  prefersReduced
                    ? {}
                    : {
                        scale: [1, 1.25, 1],
                        opacity: [0.6, 0.9, 0.6],
                      }
                }
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-12 h-14 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(254, 240, 138, 0.7) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 75%)",
                  filter: "blur(4px)",
                }}
              />

              {/* Main Flame Shape */}
              <motion.div
                animate={
                  prefersReduced
                    ? {}
                    : {
                        scaleX: [1, 0.9, 1.1, 0.95, 1],
                        scaleY: [1, 1.15, 0.92, 1.08, 1],
                        rotate: [-2, 2, -1, 3, -2],
                      }
                }
                transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-5 h-8"
                style={{
                  borderRadius: "50% 50% 35% 35% / 60% 60% 40% 40%",
                  background: "linear-gradient(180deg, #ffffff 0%, #fef08a 25%, #f59e0b 70%, #ea580c 100%)",
                  boxShadow: "0 0 14px #f59e0b, 0 0 25px rgba(251, 191, 36, 0.8)",
                }}
              >
                {/* Inner White-hot Core */}
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full"
                  style={{
                    background: "#ffffff",
                    boxShadow: "0 0 6px #ffffff",
                  }}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* Wisp of smoke rising when extinguished */
            <motion.div
              key="smoke"
              initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
              animate={{
                opacity: [0.8, 0.5, 0],
                y: [-5, -28, -50],
                x: [0, 4, -4, 6],
                scale: [0.6, 1.2, 1.8],
              }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute pointer-events-none flex flex-col items-center"
            >
              <div className="w-2.5 h-6 rounded-full bg-gray-300/60 blur-[1px]" />
              <span className="text-[10px] text-gray-400 mt-1 font-script">puff</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wick */}
      <div className="w-1 h-2 bg-gray-700 rounded-t-sm" />

      {/* Candle Body - Pastel Swirled Spiral Candle */}
      <div
        className="w-5 h-16 rounded-t-sm rounded-b-md relative overflow-hidden shadow-md"
        style={{
          background: "repeating-linear-gradient(45deg, #f472b6, #f472b6 6px, #ffffff 6px, #ffffff 12px, #c084fc 12px, #c084fc 18px)",
          boxShadow: isLit ? "0 4px 14px rgba(244, 114, 182, 0.6)" : "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {/* Soft highlight sheen along left edge */}
        <div className="absolute top-0 bottom-0 left-0.5 w-1 bg-white/40 rounded-l-sm" />
      </div>

      {/* Wax Drop at base */}
      <div className="w-7 h-1.5 bg-pink-300/80 rounded-full -mt-0.5" />
    </motion.button>
  );
}
export default BirthdayCandle;
