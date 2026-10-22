import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import BirthdayCandle from "./BirthdayCandle";

export default function BirthdayCake({ onAllExtinguished }) {
  // Assembly Stages: 0: start, 1: Stand & Base, 2: Middle Layer, 3: Top Layer & Drips, 4: Decorations & Candle
  const [stage, setStage] = useState(0);
  const [isLit, setIsLit] = useState(true);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const timersRef = useRef([]);

  // Auto-run cake assembly animation sequence
  useEffect(() => {
    // Reset state on mount
    setStage(0);
    setIsLit(true);
    setIsExtinguished(false);

    const t1 = setTimeout(() => setStage(1), 300);   // Stage A: Stand + Base layer
    const t2 = setTimeout(() => setStage(2), 1100);  // Stage B: Middle layer
    const t3 = setTimeout(() => setStage(3), 1900);  // Stage C: Top layer + dripping frosting
    const t4 = setTimeout(() => setStage(4), 2700);  // Stage D: Strawberries, sprinkles, candle

    timersRef.current = [t1, t2, t3, t4];

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleSkipAnimation = () => {
    timersRef.current.forEach(clearTimeout);
    setStage(4);
  };

  const handleExtinguish = () => {
    if (!isLit || stage < 4) return;
    setIsLit(false);
    setIsExtinguished(true);

    // Tasteful celebratory confetti burst
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#ffffff"],
      scalar: 1.05,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.6 },
        colors: ["#fce7f3", "#ddd6fe", "#fde68a"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.6 },
        colors: ["#fce7f3", "#ddd6fe", "#fde68a"],
      });
    }, 250);

    if (onAllExtinguished) {
      setTimeout(onAllExtinguished, 600);
    }
  };

  const handleRelight = () => {
    setIsLit(true);
    setIsExtinguished(false);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Skip button during build animation */}
      {stage < 4 && (
        <button
          type="button"
          onClick={handleSkipAnimation}
          className="text-xs text-purple-400 hover:text-purple-600 mb-4 underline transition-colors"
        >
          Skip animation 🎂
        </button>
      )}

      {/* Main Cake Stage Canvas with responsive scaling for narrow screens */}
      <div className="w-full flex justify-center overflow-visible">
        <div className="relative flex flex-col items-center justify-end w-[290px] min-[380px]:w-80 sm:w-96 min-h-[340px] sm:min-h-[380px] pb-4 transform scale-[0.85] min-[360px]:scale-[0.92] min-[400px]:scale-100 origin-bottom transition-transform">

        {/* ─── STAGE D: THE SINGLE CANDLE ─── */}
        <div className="relative z-30 h-24 flex items-end justify-center mb-[-12px]">
          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 15 }}
                className="flex flex-col items-center"
              >
                <BirthdayCandle
                  isLit={isLit}
                  onExtinguish={handleExtinguish}
                  disabled={stage < 4}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── STAGE C: TOP TIER (Cream & Strawberry Pour) ─── */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0, y: -25 }}
              animate={{ scaleY: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-20 w-44 sm:w-48 rounded-2xl overflow-visible shadow-md"
            >
              {/* Top tier cake body */}
              <div
                className="h-20 w-full rounded-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #fce7f3 0%, #f472b6 45%, #ec4899 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.6)",
                }}
              >
                {/* Visible cream filling stripe inside sponge */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2.5 bg-white/70 shadow-sm" />

                {/* Organic Pouring Frosting Drips SVG */}
                <svg
                  viewBox="0 0 200 40"
                  className="absolute top-0 left-0 w-full h-8 pointer-events-none fill-white"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L200,0 L200,12 C185,14 175,28 160,28 C145,28 140,8 125,8 C110,8 105,32 90,32 C75,32 70,12 55,12 C40,12 35,26 20,26 C10,26 5,10 0,10 Z" />
                </svg>

                {/* Cake highlights */}
                <div className="absolute top-1 left-3 right-3 h-1.5 bg-white/40 rounded-full blur-[0.5px]" />
              </div>

              {/* Decorative Strawberries and Piped Cream along top rim */}
              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="absolute -top-3.5 inset-x-2 flex justify-around items-center pointer-events-none z-30"
                >
                  <span className="text-xl filter drop-shadow">🍓</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-md border border-pink-100" />
                  <span className="text-xl filter drop-shadow">🍓</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-md border border-pink-100" />
                  <span className="text-xl filter drop-shadow">🍓</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── STAGE B: MIDDLE TIER (Lavender Vanilla Swirl) ─── */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0, y: -20 }}
              animate={{ scaleY: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-10 w-56 sm:w-64 -mt-2 rounded-2xl overflow-visible shadow-lg"
            >
              <div
                className="h-22 w-full rounded-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #ede9fe 0%, #c4b5fd 40%, #a78bfa 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.7), 0 4px 12px rgba(167,139,250,0.3)",
                }}
              >
                {/* Vanilla Cream Filling Layer */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-amber-50/80 shadow-sm" />

                {/* Poured Lavender Frosting Wave */}
                <svg
                  viewBox="0 0 240 30"
                  className="absolute top-0 left-0 w-full h-7 pointer-events-none fill-purple-100"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L240,0 L240,8 C215,10 205,24 185,24 C165,24 160,6 140,6 C120,6 115,22 95,22 C75,22 70,8 50,8 C30,8 20,20 0,16 Z" />
                </svg>

                {/* Decorative Sprinkles */}
                {stage >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-around px-4 pointer-events-none"
                  >
                    <span className="w-1.5 h-3 rounded-full bg-pink-400 rotate-45 transform" />
                    <span className="w-1.5 h-3 rounded-full bg-yellow-300 -rotate-12 transform" />
                    <span className="w-1.5 h-3 rounded-full bg-white rotate-45 transform" />
                    <span className="w-1.5 h-3 rounded-full bg-emerald-300 -rotate-45 transform" />
                    <span className="w-1.5 h-3 rounded-full bg-yellow-300 rotate-12 transform" />
                  </motion.div>
                )}
              </div>

              {/* Piped Cream Rosettes around middle border */}
              {stage >= 4 && (
                <div className="absolute -top-2 inset-x-2 flex justify-between pointer-events-none z-20">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-sm border border-purple-100"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── STAGE A: BASE TIER (Golden Butter Sponge) ─── */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0, y: 15 }}
              animate={{ scaleY: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-0 w-68 sm:w-76 -mt-2 rounded-2xl overflow-visible shadow-xl"
            >
              <div
                className="h-24 w-full rounded-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #fff7ed 0%, #fed7aa 40%, #fb923c 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.7), 0 8px 20px rgba(251,146,60,0.25)",
                }}
              >
                {/* Strawberry Jam Ribbon inside */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3.5 bg-rose-400/80 shadow-sm" />

                {/* Base Frosting Wave */}
                <svg
                  viewBox="0 0 280 30"
                  className="absolute top-0 left-0 w-full h-7 pointer-events-none fill-amber-100/90"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L280,0 L280,8 C250,10 240,24 215,24 C190,24 185,6 160,6 C135,6 130,22 105,22 C80,22 75,8 50,8 C25,8 15,20 0,16 Z" />
                </svg>

                {/* "Harshini" icing lettering or sparkles */}
                <div className="absolute bottom-2.5 inset-x-0 text-center">
                  <span className="font-script text-white text-lg drop-shadow font-semibold">
                    Happy Birthday Harshini ❤️
                  </span>
                </div>
              </div>

              {/* Bottom Rosettes */}
              {stage >= 4 && (
                <div className="absolute -top-2 inset-x-3 flex justify-between pointer-events-none z-20">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-white shadow-sm border border-amber-100"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── STAGE A: CAKE STAND & PEDESTAL ─── */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center -mt-1 w-full"
            >
              {/* Stand Plate Rim */}
              <div
                className="w-76 sm:w-84 h-5 rounded-full shadow-md"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 70%, #cbd5e1 100%)",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.9)",
                }}
              />
              {/* Stand Stem / Foot */}
              <div
                className="w-20 h-4 -mt-1 rounded-b-md shadow-sm"
                style={{
                  background: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)",
                }}
              />
              <div
                className="w-32 h-3 rounded-full shadow-lg"
                style={{
                  background: "linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Soft cast shadow on table */}
        <div
          className="w-72 sm:w-80 h-4 rounded-full -mt-1 blur-[6px] opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #352b48 0%, transparent 70%)" }}
        />
        </div>
      </div>

      {/* Status Instruction / Relight button */}
      <div className="mt-4 text-center min-h-[3rem]">
        {stage < 4 ? (
          <p className="text-purple-500 font-script text-xl animate-pulse">
            Baking Harshini's birthday cake... 🍰✨
          </p>
        ) : isLit ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <p className="text-purple-700 font-semibold text-base sm:text-lg">
              Make a wish and tap the candle! 🕯️✨
            </p>
            <span className="text-xs text-purple-400 mt-0.5">
              (Click the candle flame to blow it out)
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-emerald-600 font-bold text-base">
              Candle blown out! May all your wishes come true! 💖
            </span>
            <button
              type="button"
              onClick={handleRelight}
              className="text-xs text-purple-400 hover:text-purple-700 underline transition-colors cursor-pointer"
            >
              Relight candle 🕯️
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
