import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BirthdayCake from "../components/BirthdayCake";
import PrimaryButton from "../components/PrimaryButton";
import MagicBackground from "../components/MagicBackground";

export default function BirthdayChallengeScene({ onNext }) {
  const [isBlown, setIsBlown] = useState(false);

  const handleCandleBlown = () => {
    setIsBlown(true);
  };

  return (
    <div
      className="min-h-[100svh] min-h-screen w-full px-3 py-4 sm:py-6 flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden select-none"
      style={{
        background: "linear-gradient(160deg, #fff7ed 0%, #fde68a18 40%, #fce7f3 100%)",
      }}
    >
      <MagicBackground theme="cake" />

      {/* Main Content Container — Vertically Centered */}
      <div className="relative z-10 max-w-md w-full mx-auto text-center flex flex-col items-center my-auto py-2">
        {/* 1. Small Birthday Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display font-black text-xl sm:text-2xl text-purple-900 leading-snug px-2 mb-1 sm:mb-1.5"
        >
          Birthday girl, your mission is simple! 🎂
        </motion.h2>

        {/* 2. Short Subtitle addressed to Harshini */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-purple-600 font-script text-lg sm:text-xl px-2 mb-3 sm:mb-5"
        >
          Harshini, make a wish and keep it secret. 🤫
        </motion.p>

        {/* 3. Cake Stand and Cake Illustration with One Candle */}
        <div className="w-full flex justify-center my-1 sm:my-2">
          <BirthdayCake onCandleBlown={handleCandleBlown} isExtinguished={isBlown} />
        </div>

        {/* 4. Dedicated Instruction / Result Area (Right below cake) */}
        <div className="w-full min-h-[5.5rem] flex flex-col items-center justify-center mt-3 sm:mt-4 px-2 pb-12 sm:pb-4">
          <AnimatePresence mode="wait">
            {!isBlown ? (
              /* Instruction / Action Button before blowing */
              <motion.button
                key="instruction"
                type="button"
                onClick={handleCandleBlown}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="text-xs sm:text-sm font-semibold text-purple-700 bg-purple-100/90 hover:bg-purple-200/90 active:bg-purple-300/80 px-4 py-2 rounded-full border border-purple-200 shadow-xs font-fun cursor-pointer flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                aria-label="Tap the candle to blow it out"
              >
                <span>Tap the candle to blow it out! 🕯️✨</span>
              </motion.button>
            ) : (
              /* Success Result Area displayed immediately beside/below cake */
              <motion.div
                key="success-result"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 240 }}
                className="w-full flex flex-col items-center text-center"
              >
                <p className="font-display font-black text-lg sm:text-xl text-purple-900 leading-tight">
                  Wish submitted successfully! ✨
                </p>
                <p className="text-xs sm:text-sm text-pink-600 font-medium mt-0.5 mb-3 font-fun">
                  May all your wishes come true, Harshini. ❤️
                </p>

                {/* Prominent Next Action Button */}
                <div className="w-full flex justify-center px-2">
                  <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
                    <span className="inline-block whitespace-nowrap">Read My Letter to You 💌</span>
                  </PrimaryButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
