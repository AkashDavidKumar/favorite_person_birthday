import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { birthday } from "../data/birthday";
import MagicBackground from "../components/MagicBackground";
import FloatingSticker from "../components/FloatingSticker";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export default function InvitationScene({ onNext }) {
  // phase: "closed" | "opening" | "opened"
  const [phase, setPhase] = useState("closed");
  const triggeredRef = useRef(false);
  const prefersReduced = useReducedMotionPreference();

  const handleOpen = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setPhase("opening");

    // Flap opens, then card emerges
    setTimeout(() => {
      setPhase("opened");

      // Tasteful playful sparkle celebration when the card is fully revealed
      if (!prefersReduced) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.55 },
          colors: ["#f472b6", "#a78bfa", "#fde047", "#ffffff", "#c084fc", "#6ee7b7"],
          scalar: 0.9,
        });
      }
    }, 600);

    // Keep the greeting readable long enough to be appreciated, then smoothly transition
    setTimeout(() => {
      onNext();
    }, 3800);
  };

  const isOpened = phase === "opened";
  const isOpeningOrOpened = phase === "opening" || phase === "opened";

  return (
    <div
      className="min-h-[100svh] min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 sm:py-12 relative overflow-hidden select-none"
      style={{
        background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 50%, #f5e8fc 100%)",
      }}
    >
      <MagicBackground theme="invitation" />

      {/* Scrapbook doodle stickers top corners */}
      <div className="absolute top-4 left-4 z-20 hidden sm:block">
        <FloatingSticker rotation={-6} color="pink" className="text-xs">
          TOP SECRET 🤫
        </FloatingSticker>
      </div>
      <div className="absolute top-4 right-4 z-20 hidden sm:block">
        <FloatingSticker rotation={5} color="yellow" className="text-xs">
          VIP ACCESS ONLY 🎀
        </FloatingSticker>
      </div>

      {/* ─── 1 & 2. UPPER INVITATION HEADING & SUBTEXT ─── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full pt-2 sm:pt-4">
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-script text-2xl sm:text-3xl text-purple-600 mb-2 leading-relaxed"
        >
          {birthday.inviteTeaser}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-gray-500 text-xs sm:text-sm max-w-xs sm:max-w-md leading-normal"
        >
          {birthday.inviteSubtext}
        </motion.p>
      </div>

      {/* ─── 3 & 4. DEDICATED ENVELOPE & EMERGING CARD STAGE ─── */}
      {/* Container with ample dedicated height so the card NEVER overlaps the heading above */}
      <div className="relative z-10 w-full flex items-center justify-center my-auto py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 16 }}
          className="relative flex flex-col items-center cursor-pointer group"
          onClick={handleOpen}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
          role="button"
          tabIndex={0}
          aria-label="Open Harshini's birthday surprise envelope"
          style={{ width: "min(290px, 88vw)" }}
        >

          {/* ─── 4. BIRTHDAY CARD (Slides upward from inside envelope) ─── */}
          {/* Using a full-width flex wrapper with top alignment to prevent horizontal transform collision */}
          <div
            className="absolute left-0 right-0 flex justify-center pointer-events-none"
            style={{
              top: 0,
              zIndex: isOpened ? 25 : 5, // Behind front pocket until flap opens, then lifts cleanly
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={
                isOpened
                  ? { y: -115, opacity: 1 }
                  : { y: 20, opacity: 0 }
              }
              transition={
                prefersReduced
                  ? { duration: 0.1 }
                  : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
              className="w-[250px] sm:w-[260px] rounded-2xl p-5 text-center shadow-2xl border-2 border-pink-100 relative"
              style={{
                background: "linear-gradient(170deg, #ffffff 0%, #fff7fb 60%, #fdf2f8 100%)",
                boxShadow: "0 14px 35px -8px rgba(168, 85, 247, 0.3), 0 4px 12px rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Cute Washi Tape Strip at top */}
              <div className="washi-tape-pink w-16 -top-2.5 left-1/2 -translate-x-1/2 absolute" />

              {/* Header Icon */}
              <div className="text-3xl mb-1.5" aria-hidden="true">
                🎂💖
              </div>

              {/* Greeting */}
              <h2 className="font-display font-black text-xl sm:text-2xl text-purple-900 leading-tight">
                Happy Birthday,
                <br />
                <span className="text-pink-600 font-extrabold">{birthday.friendName}!</span>
              </h2>

              <div className="inline-block px-2.5 py-0.5 mt-2 rounded-full bg-pink-100 text-pink-700 text-[11px] font-bold border border-pink-200 font-fun">
                ✨ Best Friend Edition ✨
              </div>
            </motion.div>
          </div>

          {/* ─── 3. THE ENVELOPE (Layered Paper Construction) ─── */}
          <div
            className="relative rounded-2xl overflow-visible shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            style={{
              width: "min(290px, 88vw)",
              height: 185,
              perspective: "1000px",
            }}
          >
            {/* Layer 1: Envelope Body Backing (inside lining) */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(150deg, #c4b5fd 0%, #a78bfa 100%)",
                boxShadow: "0 10px 30px -5px rgba(139, 92, 246, 0.35)",
              }}
            >
              {/* Subtle inner pattern/color */}
              <div className="w-full h-full opacity-30 bg-purple-200" />
            </div>

            {/* Layer 2: Front Pocket Side Triangle (Left) */}
            <div
              className="absolute top-0 bottom-0 left-0 overflow-hidden"
              style={{ width: "min(145px, 44vw)", zIndex: 12 }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "93px solid #9f7aea",
                  borderRight: "min(145px, 44vw) solid transparent",
                  borderBottom: "92px solid #9f7aea",
                }}
              />
            </div>

            {/* Layer 2: Front Pocket Side Triangle (Right) */}
            <div
              className="absolute top-0 bottom-0 right-0 overflow-hidden flex justify-end"
              style={{ width: "min(145px, 44vw)", zIndex: 12 }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "93px solid #9f7aea",
                  borderLeft: "min(145px, 44vw) solid transparent",
                  borderBottom: "92px solid #9f7aea",
                }}
              />
            </div>

            {/* Layer 3: Front Pocket Bottom V-Flap */}
            <div
              className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-2xl"
              style={{ height: 105, zIndex: 14 }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "min(145px, 44vw) solid transparent",
                  borderRight: "min(145px, 44vw) solid transparent",
                  borderBottom: "105px solid #8b5cf6",
                  margin: "0 auto",
                  filter: "drop-shadow(0 -3px 6px rgba(0,0,0,0.06))",
                }}
              />
            </div>

            {/* Layer 4: Top Flap (Rotates 180deg open with 3D perspective) */}
            <motion.div
              initial={false}
              animate={
                isOpeningOrOpened
                  ? { rotateX: -180 }
                  : { rotateX: 0 }
              }
              transition={
                prefersReduced
                  ? { duration: 0.1 }
                  : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 98,
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                zIndex: isOpeningOrOpened ? 4 : 20, // Low zIndex once open so card shines on top
              }}
            >
              {/* Top Flap Triangular Surface */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "min(145px, 44vw) solid transparent",
                  borderRight: "min(145px, 44vw) solid transparent",
                  borderTop: "98px solid #7c3aed",
                  margin: "0 auto",
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12))",
                }}
              />

              {/* Wax Seal (Center of flap, only shown while closed) */}
              <AnimatePresence>
                {!isOpeningOrOpened && (
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, #a855f7, #6d28d9)",
                      border: "2px solid #c084fc",
                      boxShadow: "0 4px 14px rgba(109, 40, 217, 0.6)",
                      zIndex: 30,
                    }}
                  >
                    <span className="text-sm">💌</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Subtle "Tap to open" text inside envelope pocket when closed */}
            <AnimatePresence>
              {!isOpeningOrOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-3 inset-x-0 text-center pointer-events-none"
                  style={{ zIndex: 16 }}
                >
                  <span className="text-xs font-semibold text-white/90 bg-purple-900/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    Tap to open ✨
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ─── 5. BOTTOM AREA (Clean, balanced negative space — NO persistent loading text) ─── */}
      <div className="h-6 sm:h-8 flex items-center justify-center pointer-events-none" />
    </div>
  );
}
