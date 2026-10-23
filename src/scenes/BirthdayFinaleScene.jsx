import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import MagicBackground from "../components/MagicBackground";
import PrimaryButton from "../components/PrimaryButton";

export default function BirthdayFinaleScene({ onRestart }) {
  const [hasExited, setHasExited] = useState(false);

  const handleExitClick = () => {
    // Celebration confetti
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#c084fc", "#fde047", "#ffffff", "#6ee7b7"],
    });

    // Try closing tab (browser may block if not opened via window.open)
    try {
      window.close();
    } catch (e) {
      // Ignored
    }

    // Always show warm completion state
    setHasExited(true);
  };

  return (
    <div
      className="min-h-[100svh] min-h-screen w-full flex flex-col items-center justify-center relative px-3 py-4 sm:py-6 overflow-hidden select-none"
      style={{
        background: "linear-gradient(165deg, #120e20 0%, #1e1832 50%, #0d0a17 100%)",
      }}
    >
      <MagicBackground theme="farewell" count={18} />

      {/* Gentle center glow */}
      <div
        className="pointer-events-none absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, #ec4899 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[420px] mx-auto my-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!hasExited ? (
            /* ─── SINGLE-SCREEN VIEWPORT-FITTING FAREWELL CARD ─── */
            <motion.div
              key="farewell-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center p-4 sm:p-6 rounded-3xl text-center border"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* Preheading */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-amber-300 text-[10px]">✦</span>
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-purple-300">
                  A LITTLE NOTE BEFORE YOU GO ✨
                </p>
                <span className="text-amber-300 text-[10px]">✦</span>
              </div>

              {/* Main Greeting / Message */}
              <h2 className="font-display font-black text-base sm:text-lg text-white mb-2 leading-snug">
                Harshini, the surprise may end here, but I hope the happiness stays with you long after you close this page. 💖
              </h2>

              {/* Supporting Note */}
              <p className="text-purple-200/85 text-xs sm:text-[13px] leading-relaxed mb-2 max-w-sm">
                Keep smiling, follow your dreams, and never stop being the wonderful person you are. May this year bring you beautiful memories, countless reasons to laugh, and people who make you feel loved.
              </p>

              {/* Closing Line */}
              <p className="text-pink-300 font-medium text-xs sm:text-[13px] leading-relaxed mb-2.5 max-w-sm">
                Thank you for being you. Here's to more laughter, more memories, and many more birthdays to celebrate. ❤️
              </p>

              {/* Little Note & Signature */}
              <div className="pt-2 border-t border-white/10 w-full mb-4">
                <p className="text-[11px] text-purple-300/60 italic mb-0.5">
                  Your little birthday surprise has come to an end.
                </p>
                <p className="font-display font-bold text-xs sm:text-sm text-pink-400">
                  Made with love by Akash. ❤️
                </p>
              </div>

              {/* Prominent Exit Button */}
              <div className="w-full flex justify-center">
                <PrimaryButton onClick={handleExitClick} className="w-full sm:w-auto">
                  <span className="inline-block whitespace-nowrap">Exit Experience ✨</span>
                </PrimaryButton>
              </div>
            </motion.div>
          ) : (
            /* ─── COMPLETION OVERLAY STATE ─── */
            <motion.div
              key="completed-card"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 240 }}
              className="w-full flex flex-col items-center p-6 sm:p-8 rounded-3xl text-center border"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                borderColor: "rgba(255, 255, 255, 0.14)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7)",
              }}
            >
              <Heart size={36} className="text-pink-400 fill-pink-400 mb-3 animate-pulse" />

              <h3 className="font-display font-black text-lg sm:text-xl text-white mb-2 leading-snug">
                Surprise complete. Keep this little memory close. 💖
              </h3>

              <p className="text-purple-200/80 text-xs sm:text-sm max-w-xs mb-5 leading-relaxed">
                Thank you for taking this walk down memory lane. Wishing you the happiest birthday always, Harshini! 🎂✨
              </p>

              {/* Way to restart if desired */}
              <div className="pt-3 border-t border-white/10 w-full flex justify-center">
                <button
                  type="button"
                  onClick={onRestart}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-purple-300 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/10 font-fun min-h-[44px]"
                >
                  <RotateCcw size={14} />
                  <span>Start over from the beginning</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
