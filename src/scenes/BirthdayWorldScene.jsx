import { motion } from "motion/react";
import { birthday } from "../data/birthday";
import MagicBackground from "../components/MagicBackground";
import FloatingSticker from "../components/FloatingSticker";
import PrimaryButton from "../components/PrimaryButton";

export default function BirthdayWorldScene({ onNext }) {
  return (
    <div
      className="min-h-[100svh] min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-6 sm:py-10 overflow-hidden select-none"
      style={{
        background: "linear-gradient(160deg, #ede9fe 0%, #fce7f3 45%, #fff7ed 100%)",
      }}
    >
      <MagicBackground theme="universe" />

      {/* Floating Sticker Badges for Playful Scrapbook Feel */}
      <div className="absolute top-6 left-4 sm:left-12 z-20 hidden sm:block">
        <FloatingSticker rotation={-5} color="pink">
          MAIN CHARACTER ENERGY ✨
        </FloatingSticker>
      </div>

      <div className="absolute top-6 right-4 sm:right-12 z-20 hidden sm:block">
        <FloatingSticker rotation={4} color="yellow">
          🚨 BIRTHDAY DETECTED! 💗
        </FloatingSticker>
      </div>

      <div className="absolute bottom-8 left-4 sm:left-14 z-20 hidden sm:block">
        <FloatingSticker rotation={-3} color="lavender">
          100% ICONIC. 0% NORMAL. 😂
        </FloatingSticker>
      </div>

      <div className="absolute bottom-8 right-4 sm:right-14 z-20 hidden sm:block">
        <FloatingSticker rotation={6} color="mint">
          LEVEL 100 BESTIE 👑
        </FloatingSticker>
      </div>

      {/* Main Content — Compact, balanced vertical layout for mobile */}
      <div className="relative z-10 text-center max-w-lg w-full flex flex-col items-center my-auto">
        {/* 1. Small Welcome Heading */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-script text-xl sm:text-2xl text-purple-600 mb-1 leading-snug"
        >
          {birthday.universeWelcome}
        </motion.p>

        {/* Small sparkle divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-2 mb-3"
          aria-hidden="true"
        >
          <span className="text-purple-300 text-xs">✦</span>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
          <span className="text-purple-300 text-xs">✦</span>
        </motion.div>

        {/* 2. Main Birthday Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, type: "spring", stiffness: 180 }}
          className="font-display font-black mb-3 leading-tight tracking-tight"
          style={{
            fontSize: "clamp(1.85rem, 6.5vw, 3.5rem)",
            background: "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #9f1239 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Happy Birthday,
          <br />
          {birthday.friendName}!
        </motion.h1>

        {/* 3. Supporting Birthday Message */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-gray-600 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed"
        >
          {birthday.universeSubtext}
        </motion.p>

        {/* 4. Small Cake Illustration with Orbiting Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-6"
          aria-hidden="true"
        >
          {["🌸", "💫", "🌟", "💜", "✨"].map((emoji, i) => {
            const angle = (i / 5) * 360;
            const rad = (angle * Math.PI) / 180;
            const radius = 46; // compact radius fitting safely on mobile
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <motion.span
                key={i}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: i * 0.25 }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  fontSize: 14,
                }}
              >
                {emoji}
              </motion.span>
            );
          })}
          <span className="text-3xl sm:text-4xl relative z-10 filter drop-shadow">🎂</span>
        </motion.div>

        {/* 5. Primary Button: “Explore Your Universe ✨” */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-full flex justify-center px-4"
        >
          <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
            <span className="inline-block whitespace-nowrap">Explore Your Universe ✨</span>
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
