import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Heart } from "lucide-react";
import { birthday } from "../data/birthday";
import GlitterBackground from "../components/GlitterBackground";
import PrimaryButton from "../components/PrimaryButton";

export default function BirthdayFinaleScene({ onRestart }) {
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleExitClick = () => {
    setHasCompleted(true);
  };

  return (
    <div
      className="min-h-[100svh] min-h-screen w-full flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden px-4 py-6 sm:py-12 select-none"
      style={{
        background: "linear-gradient(165deg, #181427 0%, #231b38 50%, #120e20 100%)",
      }}
    >
      <GlitterBackground variant="dark" count={16} />

      {/* Gentle center glow */}
      <div
        className="pointer-events-none absolute w-[420px] h-[420px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-lg w-full mx-auto my-auto py-4">
        <AnimatePresence mode="wait">
          {!hasCompleted ? (
            /* ─── COMPACT, ELEGANT FAREWELL CARD ─── */
            <motion.div
              key="farewell-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center p-5 sm:p-9 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.045)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Small decorative heading */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-amber-300 text-xs">✦</span>
                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-purple-300/90">
                  {birthday.farewellPreHeading || "A LITTLE NOTE BEFORE YOU GO ✨"}
                </p>
                <span className="text-amber-300 text-xs">✦</span>
              </div>

              {/* Main message */}
              <h2 className="font-display font-bold text-lg sm:text-2xl text-white mb-2.5 sm:mb-3 leading-snug max-w-md">
                {birthday.farewellMainMessage}
              </h2>

              {/* Supporting message */}
              <p className="text-purple-200/85 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 max-w-sm">
                {birthday.farewellSupportingMessage}
              </p>

              {/* Closing line */}
              <p className="text-pink-300 font-medium text-xs sm:text-sm leading-relaxed mb-4 max-w-sm">
                {birthday.farewellFinalLine}
              </p>

              {/* Small footer */}
              <p className="text-[11px] text-purple-300/50 italic mb-6">
                {birthday.farewellClosing}
              </p>

              {/* Single elegant primary button: “Exit Experience ✨” */}
              <PrimaryButton onClick={handleExitClick} className="w-full sm:w-auto">
                <span className="inline-block whitespace-nowrap">Exit Experience ✨</span>
              </PrimaryButton>
            </motion.div>
          ) : (
            /* ─── TASTEFUL COMPLETION STATE ─── */
            <motion.div
              key="completed-card"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 220 }}
              className="flex flex-col items-center p-6 sm:p-10 rounded-3xl text-center"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Heart size={36} className="text-pink-400 fill-pink-400 mb-4 animate-pulse" />

              <h3 className="font-display font-bold text-lg sm:text-2xl text-white mb-2 leading-snug">
                {birthday.farewellCompleteMessage || "Surprise complete. Keep this little memory close. 💖"}
              </h3>

              <p className="text-purple-200/70 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                Thank you for taking this walk down memory lane. Wishing you the happiest birthday always.
              </p>

              {/* Discreet way to start the experience again if needed */}
              <div className="pt-3 border-t border-white/10 w-full flex justify-center">
                <button
                  type="button"
                  onClick={onRestart}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-purple-300/70 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
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
