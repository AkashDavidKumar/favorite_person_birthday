import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PrimaryButton from "./PrimaryButton";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function LetterCard({
  opening,
  paragraphs = [],
  signature = "With lots of love and friendship,",
  senderName = "Akash",
  onContinue,
}) {
  const prefersReduced = useReducedMotionPreference();
  const contentRef = useRef(null);

  // States: "rolled" -> "unrolling" -> "unrolled"
  const [scrollState, setScrollState] = useState(prefersReduced ? "unrolled" : "rolled");
  const [measuredHeight, setMeasuredHeight] = useState(650);
  const [revealedCount, setRevealedCount] = useState(prefersReduced ? 999 : 0);
  const [showSignature, setShowSignature] = useState(prefersReduced);
  const [showProceedButton, setShowProceedButton] = useState(prefersReduced);

  const allContent = [opening, ...paragraphs];
  const timersRef = useRef([]);

  // Continuously measure natural height of the complete letter content
  useEffect(() => {
    if (!contentRef.current) return;

    const measure = () => {
      if (contentRef.current) {
        const h = contentRef.current.scrollHeight || contentRef.current.offsetHeight;
        if (h > 100) {
          setMeasuredHeight(h);
        }
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current);

    return () => ro.disconnect();
  }, [allContent.length]);

  const handleInstantReveal = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    setScrollState("unrolled");
    setRevealedCount(999);
    setShowSignature(true);
    setShowProceedButton(true);
  }, []);

  // Orchestrated physical unrolling animation
  useEffect(() => {
    if (prefersReduced) {
      setScrollState("unrolled");
      setRevealedCount(999);
      setShowSignature(true);
      setShowProceedButton(true);
      return;
    }

    timersRef.current.forEach(clearTimeout);
    const timers = [];

    // Stage 1: Brief rolled presentation (0ms - 450ms)
    // Stage 2: Physical Unrolling Begins at 450ms (Duration: 1800ms, finishes at 2250ms)
    timers.push(
      setTimeout(() => {
        setScrollState("unrolling");
      }, 450)
    );

    // Stage 3: Physical Unroll Finishes at 2250ms -> Locks to stable "unrolled" state
    timers.push(
      setTimeout(() => {
        setScrollState("unrolled");
      }, 2250)
    );

    // Stage 4: Synchronized sequential message revelation (matching parchment expansion)
    // - Item 0: Opening heading ("Happy Birthday to one of my favourite people!")
    timers.push(
      setTimeout(() => {
        setRevealedCount(1);
      }, 950)
    );

    // - Successive paragraphs as the bottom roller glides down the page
    paragraphs.forEach((_, idx) => {
      const delay = 1450 + idx * 420;
      timers.push(
        setTimeout(() => {
          setRevealedCount((prev) => Math.max(prev, idx + 2));
        }, delay)
      );
    });

    // - Akash ❤️ Signature
    const signatureDelay = Math.max(2350, 1450 + paragraphs.length * 420 + 200);
    timers.push(
      setTimeout(() => {
        setShowSignature(true);
      }, signatureDelay)
    );

    // - Final "Proceed to Farewell ✨" Button
    const buttonDelay = signatureDelay + 450;
    timers.push(
      setTimeout(() => {
        setShowProceedButton(true);
      }, buttonDelay)
    );

    timersRef.current = timers;

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [prefersReduced, paragraphs.length]);

  const isRolled = scrollState === "rolled";
  const isUnrolling = scrollState === "unrolling";
  const isUnrolled = scrollState === "unrolled";

  return (
    <div
      className="relative max-w-xl mx-auto w-full px-2 sm:px-4 py-2 select-none"
      onClick={isUnrolling ? handleInstantReveal : undefined}
    >
      {/* ─── ROLLED STATE ROYAL RIBBON SEAL ─── */}
      <AnimatePresence>
        {isRolled && !prefersReduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex items-center justify-center"
          >
            <div
              className="px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-amber-300 text-amber-50 font-display font-black text-xs tracking-wider uppercase"
              style={{
                background: "radial-gradient(circle at 40% 30%, #b91c1c 0%, #7f1d1d 70%, #450a0a 100%)",
                boxShadow: "0 8px 24px rgba(127, 29, 29, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.4)",
              }}
            >
              <span>🎀</span>
              <span>Royal Birthday Decree</span>
              <span>✨</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── TOP DOWEL ROD (Wood Spindle & Gold Finials) ─── */}
      <motion.div
        initial={prefersReduced ? { rotateX: 0, y: 0 } : { rotateX: 0, y: 0 }}
        animate={
          isUnrolling
            ? { rotateX: [-20, 15, -5, 0], y: 0 }
            : { rotateX: 0, y: 0 }
        }
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex items-center justify-between mx-auto w-[96%] sm:w-[98%] -mb-2.5 drop-shadow-md"
        style={{ perspective: 800 }}
      >
        {/* Left Golden Finial */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border-2 border-amber-400/80 shrink-0 relative"
          style={{
            background: "radial-gradient(circle at 35% 30%, #fffbeb 0%, #fef08a 25%, #d97706 65%, #78350f 100%)",
            boxShadow: "0 3px 8px rgba(120, 53, 15, 0.35)",
          }}
        >
          <div className="absolute inset-1 rounded-full border border-amber-300/40 pointer-events-none" />
        </div>

        {/* Left Golden Collar Ring */}
        <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 rounded-xs shadow-xs shrink-0 -mr-0.5 z-10" />

        {/* Main Wooden Dowel Spindle */}
        <div
          className="flex-1 h-5 sm:h-5.5 rounded-full shadow-inner border-y border-amber-900/60 -mx-1 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #92400e 0%, #78350f 30%, #451a03 55%, #78350f 80%, #b45309 100%)",
          }}
        >
          {/* Subtle wood sheen reflection */}
          <div className="absolute inset-x-0 top-0.5 h-1 bg-white/20 rounded-full" />
          <div className="absolute inset-x-0 bottom-0.5 h-1 bg-black/25 rounded-full" />
        </div>

        {/* Right Golden Collar Ring */}
        <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 bg-gradient-to-r from-amber-500 via-amber-100 to-amber-300 rounded-xs shadow-xs shrink-0 -ml-0.5 z-10" />

        {/* Right Golden Finial */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border-2 border-amber-400/80 shrink-0 relative"
          style={{
            background: "radial-gradient(circle at 35% 30%, #fffbeb 0%, #fef08a 25%, #d97706 65%, #78350f 100%)",
            boxShadow: "0 3px 8px rgba(120, 53, 15, 0.35)",
          }}
        >
          <div className="absolute inset-1 rounded-full border border-amber-300/40 pointer-events-none" />
        </div>
      </motion.div>

      {/* ─── CONTINUOUS PARCHMENT BODY UNROLLING ─── */}
      <motion.div
        initial={prefersReduced ? { height: "auto" } : { height: 0 }}
        animate={{
          height: isRolled ? 0 : isUnrolling ? measuredHeight : "auto",
        }}
        transition={{
          duration: prefersReduced ? 0.01 : 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "top center",
          perspective: 1000,
        }}
        className="relative z-20 rounded-xs overflow-hidden shadow-2xl"
      >
        {/* Subtle physical paper roll perspective motion */}
        <motion.div
          animate={
            isUnrolling
              ? { rotateX: [3, -1.5, 0] }
              : { rotateX: 0 }
          }
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Royal Parchment Paper Texture & Shading */}
          <div
            ref={contentRef}
            className="relative px-4 py-6 sm:px-8 sm:py-8 text-amber-950 border-x-2 sm:border-x-3 border-amber-400/80"
            style={{
              background: "linear-gradient(180deg, #fefae0 0%, #fbf3d5 35%, #faecd0 70%, #f7e6c4 100%)",
              boxShadow: "inset 0 0 40px rgba(180, 83, 9, 0.14), 0 20px 45px -10px rgba(74, 30, 8, 0.28)",
            }}
          >
            {/* Top curl shadow under top dowel */}
            <div
              className="absolute top-0 inset-x-0 h-7 pointer-events-none z-10"
              style={{
                background: "linear-gradient(180deg, rgba(120, 53, 15, 0.28) 0%, rgba(120, 53, 15, 0.08) 55%, transparent 100%)",
              }}
            />

            {/* Bottom paper curl shadow right above bottom dowel (glides with roller) */}
            <div
              className="absolute bottom-0 inset-x-0 pointer-events-none z-10 transition-all duration-700"
              style={{
                height: isUnrolling ? "40px" : "24px",
                background: isUnrolling
                  ? "linear-gradient(0deg, rgba(120, 53, 15, 0.45) 0%, rgba(120, 53, 15, 0.18) 50%, transparent 100%)"
                  : "linear-gradient(0deg, rgba(120, 53, 15, 0.2) 0%, transparent 100%)",
              }}
            />

            {/* Ornamental Inner Border Frame */}
            <div className="absolute inset-2 sm:inset-3 border border-amber-700/25 rounded-xs pointer-events-none" />
            <div className="absolute inset-2.5 sm:inset-4 border border-dashed border-amber-600/20 rounded-xs pointer-events-none" />

            {/* Royal Wax Seal & Decree Heading */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={
                isRolled
                  ? { opacity: 0, y: 10 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.2, ease: "easeOut" }}
              className="flex flex-col items-center mb-5 relative"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl relative border-2 border-red-900"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #ef4444 0%, #b91c1c 55%, #7f1d1d 100%)",
                  boxShadow: "0 4px 14px rgba(185, 28, 28, 0.45), inset 0 2px 4px rgba(255,255,255,0.4)",
                }}
              >
                <span className="text-xl drop-shadow">👑</span>
              </div>

              <p className="mt-3 font-display font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-800/80">
                Royal Birthday Decree
              </p>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-1" />
            </motion.div>

            {/* Progressively Revealed Letter Content */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed relative z-10 font-serif">
              {allContent.map((text, i) => {
                const isRevealed = i < revealedCount;

                return (
                  <motion.div
                    key={i}
                    initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 12 }
                    }
                    transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
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
              <motion.div
                initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={
                  showSignature
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pt-4 mt-5 border-t border-amber-600/25 flex flex-col items-end"
              >
                <p className="text-xs text-amber-800 italic mb-0.5 font-serif">
                  {signature}
                </p>
                <p className="font-script text-2xl sm:text-3xl text-amber-900 font-bold tracking-wide">
                  {senderName} 💖
                </p>
              </motion.div>
            </div>

            {/* ─── FINAL BUTTON: "Proceed to Farewell ✨" ─── */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={
                showProceedButton
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 pt-4 border-t border-amber-600/20 flex justify-center relative z-10 px-2"
            >
              <PrimaryButton onClick={onContinue} className="w-full sm:w-auto">
                <span className="inline-block whitespace-nowrap">
                  Proceed to Farewell ✨
                </span>
              </PrimaryButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── BOTTOM DOWEL ROD (Wood Spindle & Gold Finials) ─── */}
      <motion.div
        initial={prefersReduced ? { rotateX: 0, y: 0 } : { rotateX: 0, y: 0 }}
        animate={
          isUnrolling
            ? { rotateX: [0, 360, 720], y: 0 }
            : { rotateX: 0, y: 0 }
        }
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 flex items-center justify-between mx-auto w-[96%] sm:w-[98%] -mt-2.5 drop-shadow-lg"
        style={{ perspective: 800 }}
      >
        {/* Left Golden Finial */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border-2 border-amber-400/80 shrink-0 relative"
          style={{
            background: "radial-gradient(circle at 35% 30%, #fffbeb 0%, #fef08a 25%, #d97706 65%, #78350f 100%)",
            boxShadow: "0 3px 8px rgba(120, 53, 15, 0.35)",
          }}
        >
          <div className="absolute inset-1 rounded-full border border-amber-300/40 pointer-events-none" />
        </div>

        {/* Left Golden Collar Ring */}
        <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 rounded-xs shadow-xs shrink-0 -mr-0.5 z-10" />

        {/* Main Wooden Dowel Spindle */}
        <div
          className="flex-1 h-5 sm:h-5.5 rounded-full shadow-inner border-y border-amber-900/60 -mx-1 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #92400e 0%, #78350f 30%, #451a03 55%, #78350f 80%, #b45309 100%)",
          }}
        >
          <div className="absolute inset-x-0 top-0.5 h-1 bg-white/20 rounded-full" />
          <div className="absolute inset-x-0 bottom-0.5 h-1 bg-black/25 rounded-full" />
        </div>

        {/* Right Golden Collar Ring */}
        <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 bg-gradient-to-r from-amber-500 via-amber-100 to-amber-300 rounded-xs shadow-xs shrink-0 -ml-0.5 z-10" />

        {/* Right Golden Finial */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg border-2 border-amber-400/80 shrink-0 relative"
          style={{
            background: "radial-gradient(circle at 35% 30%, #fffbeb 0%, #fef08a 25%, #d97706 65%, #78350f 100%)",
            boxShadow: "0 3px 8px rgba(120, 53, 15, 0.35)",
          }}
        >
          <div className="absolute inset-1 rounded-full border border-amber-300/40 pointer-events-none" />
        </div>
      </motion.div>

      {/* Interactive Unroll Hint during unrolling or if rolled */}
      {isUnrolling && !prefersReduced && (
        <div className="text-center mt-2.5">
          <button
            type="button"
            onClick={handleInstantReveal}
            className="text-[11px] font-semibold text-amber-800/70 hover:text-amber-900 underline transition-colors cursor-pointer font-fun"
          >
            Skip unrolling 📜✨
          </button>
        </div>
      )}
    </div>
  );
}
