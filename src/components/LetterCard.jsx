import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import PrimaryButton from "./PrimaryButton";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function LetterCard({
  opening,
  paragraphs,
  onContinue,
}) {
  const prefersReduced = useReducedMotionPreference();
  // State: "rolled" -> "unrolling" -> "unrolled"
  const [scrollState, setScrollState] = useState(prefersReduced ? "unrolled" : "rolled");
  const [revealedCount, setRevealedCount] = useState(prefersReduced ? 999 : 0);
  const [showSignature, setShowSignature] = useState(prefersReduced);
  const [showProceedButton, setShowProceedButton] = useState(prefersReduced);

  const allContent = [opening, ...paragraphs];
  const totalItems = allContent.length;
  const bottomMarkerRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) {
      setScrollState("unrolled");
      setRevealedCount(totalItems);
      setShowSignature(true);
      setShowProceedButton(true);
      return;
    }

    const timers = [];

    // 1. Start unrolling after brief initial appearance
    timers.push(
      setTimeout(() => {
        setScrollState("unrolling");
      }, 400)
    );

    // 2. Finish scroll unroll physically after 1.2s
    timers.push(
      setTimeout(() => {
        setScrollState("unrolled");
      }, 1600)
    );

    // 3. Progressively reveal paragraphs at comfortable pace (~1.2s each)
    allContent.forEach((_, index) => {
      const delay = 1600 + index * 1200;
      timers.push(
        setTimeout(() => {
          setRevealedCount((prev) => Math.max(prev, index + 1));
        }, delay)
      );
    });

    // 4. Reveal signature
    const signatureDelay = 1600 + totalItems * 1200 + 400;
    timers.push(
      setTimeout(() => {
        setShowSignature(true);
      }, signatureDelay)
    );

    // 5. Reveal final button: "Proceed to Farewell ✨"
    const buttonDelay = signatureDelay + 700;
    timers.push(
      setTimeout(() => {
        setShowProceedButton(true);
      }, buttonDelay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [prefersReduced, totalItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const isRolled = scrollState === "rolled";
  const isUnrollingOrUnrolled = scrollState === "unrolling" || scrollState === "unrolled";

  return (
    <div className="relative max-w-xl mx-auto w-full px-2 sm:px-4 py-2 select-none">

      {/* ─── TOP DOWEL ROD (Wood & Gold Finials) ─── */}
      <motion.div
        initial={prefersReduced ? { y: 0 } : { y: 14 }}
        animate={isUnrollingOrUnrolled ? { y: 0 } : { y: 14 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 flex items-center justify-between mx-auto w-[96%] sm:w-[98%] -mb-2.5 drop-shadow-md"
      >
        {/* Left Finial Knob */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border border-amber-500/70 shrink-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
        {/* Main Dowel Spindle */}
        <div
          className="flex-1 h-5 sm:h-5.5 rounded-full shadow-inner border-y border-amber-700/60 -mx-1"
          style={{
            background: "linear-gradient(180deg, #b45309 0%, #78350f 40%, #92400e 70%, #d97706 100%)",
          }}
        />
        {/* Right Finial Knob */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border border-amber-500/70 shrink-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
      </motion.div>

      {/* ─── CONTINUOUS PARCHMENT BODY UNROLLING ─── */}
      <motion.div
        initial={prefersReduced ? { height: "auto", opacity: 1 } : { height: 28, opacity: 0.95 }}
        animate={
          isUnrollingOrUnrolled
            ? { height: "auto", opacity: 1 }
            : { height: 28, opacity: 0.95 }
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 rounded-md overflow-hidden shadow-2xl"
      >
        {/* Royal Parchment Paper Styling */}
        <div
          className="relative px-4 py-6 sm:px-8 sm:py-8 text-amber-950 border-x-2 sm:border-x-3 border-amber-300/80"
          style={{
            background: "linear-gradient(180deg, #fefae0 0%, #fbf3d5 40%, #faecd0 80%, #f7e6c4 100%)",
            boxShadow: "inset 0 0 35px rgba(180, 83, 9, 0.12), 0 15px 40px -10px rgba(74, 30, 8, 0.22)",
          }}
        >
          {/* Ornamental Inner Border Frame */}
          <div className="absolute inset-2 sm:inset-3 border border-amber-700/20 rounded pointer-events-none" />
          <div className="absolute inset-2.5 sm:inset-4 border border-dashed border-amber-600/15 rounded pointer-events-none" />

          {/* Royal Seal Stamp */}
          <div className="flex flex-col items-center mb-5 relative">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl relative border-2 border-red-800"
              style={{
                background: "radial-gradient(circle at 40% 35%, #ef4444 0%, #b91c1c 55%, #7f1d1d 100%)",
                boxShadow: "0 4px 14px rgba(185, 28, 28, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
              }}
            >
              <span className="text-xl drop-shadow">👑</span>
            </div>

            <p className="mt-3 font-display font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-800/80">
              Royal Birthday Decree
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-1" />
          </div>

          {/* Progressively Revealed Letter Content */}
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed relative z-10 font-serif">
            {allContent.map((text, i) => {
              const isRevealed = i < revealedCount;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
                  animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={isRevealed ? "block" : "hidden"}
                >
                  {i === 0 ? (
                    <h3 className="font-display font-black text-lg sm:text-xl text-amber-900 leading-snug text-center mb-4">
                      {text}
                    </h3>
                  ) : (
                    <p className="text-amber-950/90 leading-relaxed text-left font-normal">
                      {text}
                    </p>
                  )}
                </motion.div>
              );
            })}

            {/* ─── SENDER SIGNATURE: Akash ❤️ ─── */}
            <AnimatePresence>
              {showSignature && (
                <motion.div
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pt-4 mt-5 border-t border-amber-600/25 flex flex-col items-end"
                >
                  <p className="text-xs text-amber-800 italic mb-0.5 font-serif">
                    With lots of love and friendship,
                  </p>
                  <p className="font-script text-2xl sm:text-3xl text-amber-900 font-bold tracking-wide">
                    Akash ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── FINAL BUTTON: "Proceed to Farewell ✨" ─── */}
          {/* Strictly appears only after letter and signature finish revealing */}
          <AnimatePresence>
            {showProceedButton && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-6 pt-4 border-t border-amber-600/20 flex justify-center relative z-10 px-2"
              >
                <PrimaryButton onClick={onContinue} className="w-full sm:w-auto">
                  <span className="inline-block whitespace-nowrap">
                    Proceed to Farewell ✨
                  </span>
                </PrimaryButton>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomMarkerRef} />
        </div>
      </motion.div>

      {/* ─── BOTTOM DOWEL ROD (Wood & Gold Finials) ─── */}
      <motion.div
        initial={prefersReduced ? { y: 0 } : { y: -14 }}
        animate={isUnrollingOrUnrolled ? { y: 0 } : { y: -14 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 flex items-center justify-between mx-auto w-[96%] sm:w-[98%] -mt-2.5 drop-shadow-md"
      >
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border border-amber-500/70 shrink-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
        <div
          className="flex-1 h-5 sm:h-5.5 rounded-full shadow-inner border-y border-amber-700/60 -mx-1"
          style={{
            background: "linear-gradient(180deg, #b45309 0%, #78350f 40%, #92400e 70%, #d97706 100%)",
          }}
        />
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border border-amber-500/70 shrink-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
      </motion.div>

      {/* Rolled State Tap Hint (if user arrives before auto-unroll) */}
      {isRolled && !prefersReduced && (
        <div className="text-center mt-3">
          <span className="text-xs font-semibold text-amber-800/80 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
            Unrolling decree... 📜✨
          </span>
        </div>
      )}
    </div>
  );
}
