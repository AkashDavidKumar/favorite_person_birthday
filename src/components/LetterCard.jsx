import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import PrimaryButton from "./PrimaryButton";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function LetterCard({
  opening,
  paragraphs,
  signature,
  senderName,
  onContinue,
}) {
  const prefersReduced = useReducedMotionPreference();
  const [unrolled, setUnrolled] = useState(prefersReduced);
  const [revealedCount, setRevealedCount] = useState(prefersReduced ? 999 : 0);
  const [showSignature, setShowSignature] = useState(prefersReduced);
  const [showProceedButton, setShowProceedButton] = useState(prefersReduced);

  const allContent = [opening, ...paragraphs];
  const totalItems = allContent.length;

  const userHasScrolledUpRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const latestItemRef = useRef(null);

  // Detect if user manually scrolls upward to avoid forcing viewport down
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll < lastScrollYRef.current - 35) {
        // User scrolled upward by more than 35px
        userHasScrolledUpRef.current = true;
      }
      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic paragraph-by-paragraph reveal sequence
  useEffect(() => {
    if (prefersReduced) {
      setUnrolled(true);
      setRevealedCount(totalItems);
      setShowSignature(true);
      setShowProceedButton(true);
      return;
    }

    const timers = [];

    // 1. Unroll the royal scroll
    timers.push(
      setTimeout(() => {
        setUnrolled(true);
      }, 350)
    );

    // 2. Reveal each item sequentially at a comfortable reading pace (~1.5s per paragraph)
    allContent.forEach((_, index) => {
      const delay = 800 + index * 1500;
      timers.push(
        setTimeout(() => {
          setRevealedCount((prev) => Math.max(prev, index + 1));
        }, delay)
      );
    });

    // 3. Reveal signature after final paragraph
    const signatureDelay = 800 + totalItems * 1500 + 400;
    timers.push(
      setTimeout(() => {
        setShowSignature(true);
      }, signatureDelay)
    );

    // 4. Reveal "Proceed to Farewell 💖" button only after signature finishes appearing
    const buttonDelay = signatureDelay + 800;
    timers.push(
      setTimeout(() => {
        setShowProceedButton(true);
      }, buttonDelay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [prefersReduced, totalItems]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll newly revealed paragraph into view if user hasn't scrolled up
  useEffect(() => {
    if (!prefersReduced && revealedCount > 1 && !userHasScrolledUpRef.current) {
      latestItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [revealedCount, prefersReduced]);

  return (
    <div className="relative max-w-2xl mx-auto w-full px-2 sm:px-4 py-4">

      {/* ─── TOP DOWEL ROD (Wood & Gold Finials) ─── */}
      <div className="relative z-30 flex items-center justify-between mx-auto w-[96%] sm:w-[98%] -mb-3 drop-shadow-md">
        {/* Left Finial Knob */}
        <div
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow-lg border border-amber-500/60"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
        {/* Main Dowel Spindle */}
        <div
          className="flex-1 h-5 sm:h-6 rounded-full shadow-inner border-y border-amber-700/50 -mx-1"
          style={{
            background: "linear-gradient(180deg, #b45309 0%, #78350f 40%, #92400e 70%, #d97706 100%)",
          }}
        />
        {/* Right Finial Knob */}
        <div
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow-lg border border-amber-500/60"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
      </div>

      {/* ─── UNROLLING PARCHMENT BODY ─── */}
      <motion.div
        initial={{ scaleY: prefersReduced ? 1 : 0.15, opacity: prefersReduced ? 1 : 0.6 }}
        animate={unrolled ? { scaleY: 1, opacity: 1 } : { scaleY: 0.15, opacity: 0.6 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top center" }}
        className="relative z-20 rounded-md overflow-hidden shadow-2xl"
      >
        {/* Royal Parchment Paper Styling */}
        <div
          className="relative px-4 py-6 sm:px-10 sm:py-10 text-amber-950 border-x-2 sm:border-x-4 border-amber-200/80"
          style={{
            background: "linear-gradient(180deg, #fefae0 0%, #fbf3d5 40%, #faecd0 80%, #f7e6c4 100%)",
            boxShadow: "inset 0 0 45px rgba(180, 83, 9, 0.12), 0 20px 50px -10px rgba(74, 30, 8, 0.22)",
          }}
        >
          {/* Ornamental Inner Border Frame */}
          <div className="absolute inset-2 sm:inset-4 border border-amber-700/25 rounded pointer-events-none" />
          <div className="absolute inset-2.5 sm:inset-5 border border-dashed border-amber-600/20 rounded pointer-events-none" />

          {/* Royal Seal & Header Crest */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 relative">
            {/* Wax Seal Stamp */}
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xl relative border-2 border-red-800"
              style={{
                background: "radial-gradient(circle at 40% 35%, #ef4444 0%, #b91c1c 55%, #7f1d1d 100%)",
                boxShadow: "0 6px 18px rgba(185, 28, 28, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
              }}
            >
              <span className="text-2xl drop-shadow">👑</span>
              {/* Ribbon tails hanging from wax seal */}
              <div className="absolute -bottom-3 -left-1 w-2.5 h-4 bg-red-700 -rotate-12 shadow" />
              <div className="absolute -bottom-3 -right-1 w-2.5 h-4 bg-red-700 rotate-12 shadow" />
            </div>

            <p className="mt-5 font-display font-semibold text-[11px] sm:text-xs tracking-[0.25em] uppercase text-amber-800/80">
              Royal Birthday Decree
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-1" />
          </div>

          {/* Letter Content — Sequentially revealed */}
          <div className="space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed relative z-10 font-serif">
            {allContent.map((text, i) => {
              const isRevealed = i < revealedCount;
              const isCurrent = i === revealedCount - 1;

              return (
                <motion.div
                  key={i}
                  ref={isCurrent ? latestItemRef : null}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                  animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={isRevealed ? "block" : "hidden"}
                >
                  {i === 0 ? (
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-amber-900 leading-snug text-center mb-5 sm:mb-6">
                      {text}
                    </h3>
                  ) : (
                    <p className="text-amber-950/90 leading-relaxed indent-4 text-justify font-normal">
                      {text}
                    </p>
                  )}
                </motion.div>
              );
            })}

            {/* ─── SENDER SIGNATURE (Appears at very end after all paragraphs) ─── */}
            <AnimatePresence>
              {showSignature && (
                <motion.div
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="pt-6 sm:pt-8 mt-6 border-t border-amber-600/30 flex flex-col items-end"
                >
                  <p className="text-xs sm:text-sm text-amber-800 italic mb-1 font-serif">
                    {signature}
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-amber-900 font-bold tracking-wide">
                    {senderName}
                  </p>
                  <div className="w-32 h-0.5 bg-gradient-to-l from-amber-700 via-amber-400 to-transparent mt-1 mr-1" />
                  <span className="text-xl mt-1 text-red-600">❤️</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── FINAL PRIMARY BUTTON: "Proceed to Farewell 💖" ─── */}
          {/* Strictly hidden until entire letter and signature finish revealing */}
          <AnimatePresence>
            {showProceedButton && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-6 sm:mt-8 pt-5 pb-2 border-t border-amber-600/20 flex justify-center relative z-10 px-2"
              >
                <PrimaryButton onClick={onContinue} className="w-full sm:w-auto max-w-[280px] sm:max-w-[320px]">
                  <span className="inline-block whitespace-nowrap text-xs sm:text-base">
                    Proceed to Farewell 💖
                  </span>
                </PrimaryButton>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      {/* ─── BOTTOM DOWEL ROD (Wood & Gold Finials) ─── */}
      <div className="relative z-30 flex items-center justify-between mx-auto w-[96%] sm:w-[98%] -mt-3 drop-shadow-md">
        <div
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow-lg border border-amber-500/60"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
        <div
          className="flex-1 h-5 sm:h-6 rounded-full shadow-inner border-y border-amber-700/50 -mx-1"
          style={{
            background: "linear-gradient(180deg, #b45309 0%, #78350f 40%, #92400e 70%, #d97706 100%)",
          }}
        />
        <div
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow-lg border border-amber-500/60"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fef08a 0%, #d97706 65%, #78350f 100%)",
          }}
        />
      </div>

    </div>
  );
}
