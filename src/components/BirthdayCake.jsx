import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import BirthdayCandle from "./BirthdayCandle";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function BirthdayCake({ onCandleBlown, isExtinguished: externalExtinguished }) {
  const prefersReduced = useReducedMotionPreference();
  // Stages: 0: Stand only, 1: Pouring Bottom, 2: Pouring Middle, 3: Pouring Top, 4: Candle Drops & Lights
  const [stage, setStage] = useState(prefersReduced ? 4 : 0);
  const [isLit, setIsLit] = useState(true);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    if (prefersReduced) {
      setStage(4);
      return;
    }

    setStage(0);
    setIsLit(true);
    setIsExtinguished(false);

    // Sequence timing
    // 0.3s: Stand is ready, Batter 1 starts pouring bottom layer
    const t1 = setTimeout(() => setStage(1), 300);
    // 1.5s: Batter 2 starts pouring middle layer
    const t2 = setTimeout(() => setStage(2), 1500);
    // 2.7s: Batter 3 starts pouring top layer
    const t3 = setTimeout(() => setStage(3), 2700);
    // 3.8s: Candle drops in and ignites
    const t4 = setTimeout(() => setStage(4), 3800);

    timersRef.current = [t1, t2, t3, t4];

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [prefersReduced]);

  const handleSkip = () => {
    timersRef.current.forEach(clearTimeout);
    setStage(4);
  };

  const handleExtinguish = () => {
    // If already blown out or not assembled, ignore to avoid re-triggering
    if (!isLit || isExtinguished || externalExtinguished || stage < 4) return;

    setIsLit(false);
    setIsExtinguished(true);

    // Celebration confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#ffffff"],
      scalar: 1.05,
    });

    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.25, y: 0.55 },
        colors: ["#fce7f3", "#ddd6fe", "#fde68a"],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 0.75, y: 0.55 },
        colors: ["#fce7f3", "#ddd6fe", "#fde68a"],
      });
    }, 200);

    if (onCandleBlown) {
      onCandleBlown();
    }
  };

  // Batter stream colors based on current pouring stage
  const pouringStage = stage === 1 ? 1 : stage === 2 ? 2 : stage === 3 ? 3 : 0;

  return (
    <div className="flex flex-col items-center select-none w-full max-w-sm mx-auto">
      {/* Skip button during build animation */}
      {stage < 4 && !prefersReduced && (
        <button
          type="button"
          onClick={handleSkip}
          className="text-[11px] text-purple-500 hover:text-purple-700 underline transition-colors mb-1 cursor-pointer font-fun"
        >
          Skip animation 🎂
        </button>
      )}

      {/* Main Cake Stage Canvas */}
      <div className="relative flex flex-col items-center justify-end w-full h-[230px] sm:h-[245px] pb-1 overflow-visible">

        {/* ─── ANIMATED BATTER SPOUT & STREAM ─── */}
        <AnimatePresence>
          {pouringStage > 0 && (
            <motion.div
              key={`batter-${pouringStage}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute top-0 z-40 flex flex-col items-center pointer-events-none"
            >
              {/* Mixing Bowl / Pouring Spout */}
              <motion.div
                animate={{ rotate: [-6, 6, -6], y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl filter drop-shadow"
              >
                🥣
              </motion.div>

              {/* Liquid Batter Pouring Stream */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: "top center" }}
                className={`w-2.5 rounded-full shadow-inner ${
                  pouringStage === 1
                    ? "h-[125px] bg-gradient-to-b from-amber-300 via-amber-400 to-orange-400"
                    : pouringStage === 2
                    ? "h-[90px] bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400"
                    : "h-[50px] bg-gradient-to-b from-pink-200 via-pink-400 to-pink-500"
                }`}
              />

              {/* Splash Droplets at bottom of stream */}
              <motion.div
                animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="w-4 h-1.5 rounded-full bg-white/80 blur-[0.5px] -mt-1 shadow"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── THE SINGLE CANDLE ─── */}
        <div className="relative z-30 h-16 flex items-end justify-center mb-[-6px]">
          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -45, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 16 }}
                className="flex flex-col items-center"
              >
                <BirthdayCandle
                  isLit={isLit && !externalExtinguished && !isExtinguished}
                  onExtinguish={handleExtinguish}
                  disabled={stage < 4 || isExtinguished || externalExtinguished}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── TOP TIER (Strawberry Cream Sponge) ─── */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 1.25, 0.5, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-20 w-36 sm:w-40 rounded-xl overflow-visible shadow-md"
            >
              <div
                className="h-13 sm:h-14 w-full rounded-xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #fce7f3 0%, #f472b6 50%, #ec4899 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.7)",
                }}
              >
                {/* Cream stripe */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-white/75" />

                {/* Frosting Drips */}
                <svg
                  viewBox="0 0 200 30"
                  className="absolute top-0 left-0 w-full h-5 pointer-events-none fill-white"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L200,0 L200,8 C185,12 175,22 160,22 C145,22 140,6 125,6 C110,6 105,24 90,24 C75,24 70,8 55,8 C40,8 35,20 20,20 C10,20 5,8 0,8 Z" />
                </svg>
              </div>

              {/* Decorative Strawberries */}
              {stage >= 4 && (
                <motion.div
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="absolute -top-3 inset-x-2 flex justify-around items-center pointer-events-none z-30 text-sm"
                >
                  <span>🍓</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                  <span>🍓</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                  <span>🍓</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── MIDDLE TIER (Lavender Vanilla Swirl) ─── */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 1.25, 0.5, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-10 w-48 sm:w-54 -mt-1 rounded-xl overflow-visible shadow-md"
            >
              <div
                className="h-14 sm:h-15 w-full rounded-xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #ede9fe 0%, #c4b5fd 40%, #a78bfa 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.7), 0 4px 10px rgba(167,139,250,0.25)",
                }}
              >
                {/* Vanilla cream stripe */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-amber-50/80" />

                {/* Frosting wave */}
                <svg
                  viewBox="0 0 240 25"
                  className="absolute top-0 left-0 w-full h-5 pointer-events-none fill-purple-100"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L240,0 L240,6 C215,8 205,18 185,18 C165,18 160,5 140,5 C120,5 115,16 95,16 C75,16 70,6 50,6 C30,6 20,15 0,12 Z" />
                </svg>

                {/* Sprinkles */}
                {stage >= 4 && (
                  <div className="absolute inset-0 flex items-center justify-around px-3 pointer-events-none">
                    <span className="w-1.5 h-2 rounded-full bg-pink-400 rotate-45 transform" />
                    <span className="w-1.5 h-2 rounded-full bg-yellow-300 -rotate-12 transform" />
                    <span className="w-1.5 h-2 rounded-full bg-emerald-300 -rotate-45 transform" />
                    <span className="w-1.5 h-2 rounded-full bg-white rotate-45 transform" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── BASE TIER (Golden Butter Sponge) ─── */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 1.25, 0.5, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-0 w-60 sm:w-68 -mt-1 rounded-xl overflow-visible shadow-lg"
            >
              <div
                className="h-15 sm:h-16 w-full rounded-xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #fff7ed 0%, #fed7aa 40%, #fb923c 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.7), 0 6px 16px rgba(251,146,60,0.2)",
                }}
              >
                {/* Jam filling */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-rose-400/80" />

                {/* Frosting wave */}
                <svg
                  viewBox="0 0 280 25"
                  className="absolute top-0 left-0 w-full h-5 pointer-events-none fill-amber-100/90"
                  preserveAspectRatio="none"
                >
                  <path d="M0,0 L280,0 L280,6 C250,8 240,18 215,18 C190,18 185,5 160,5 C135,5 130,16 105,16 C80,16 75,6 50,6 C25,6 15,15 0,12 Z" />
                </svg>

                {/* Harshini icing text */}
                <div className="absolute bottom-1.5 inset-x-0 text-center">
                  <span className="font-script text-white text-sm sm:text-base drop-shadow font-bold">
                    Harshini ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── CAKE STAND & PEDESTAL ─── */}
        <div className="flex flex-col items-center -mt-0.5 w-full">
          {/* Plate Rim */}
          <div
            className="w-68 sm:w-76 h-4 rounded-full shadow-sm"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 70%, #cbd5e1 100%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.9)",
            }}
          />
          {/* Stem & Base */}
          <div
            className="w-16 h-3 -mt-0.5 rounded-b shadow-2xs"
            style={{ background: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)" }}
          />
          <div
            className="w-28 h-2.5 rounded-full shadow-md"
            style={{ background: "linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%)" }}
          />
        </div>

        {/* Shadow */}
        <div
          className="w-64 sm:w-72 h-3 rounded-full -mt-0.5 blur-[4px] opacity-35 pointer-events-none"
          style={{ background: "radial-gradient(circle, #352b48 0%, transparent 70%)" }}
        />
      </div>
    </div>
  );
}
