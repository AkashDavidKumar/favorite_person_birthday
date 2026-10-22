import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { birthday } from "../data/birthday";
import BirthdayCake from "../components/BirthdayCake";
import PrimaryButton from "../components/PrimaryButton";
import GlitterBackground from "../components/GlitterBackground";

export default function BirthdayChallengeScene({ onNext }) {
  const [challengeComplete, setChallengeComplete] = useState(false);

  return (
    <div
      className="min-h-screen w-full px-4 py-16 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #fff7ed 0%, #fde68a18 40%, #fce7f3 100%)",
      }}
    >
      <GlitterBackground variant="warm" count={18} />

      {/* Warm ambient radial glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #fbbf24, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-4xl mb-1 inline-block" aria-hidden="true">🎂</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-purple-900 mb-2">
            {birthday.challengeTitle}
          </h2>
          <p className="text-purple-600 font-script text-xl sm:text-2xl mb-1">
            For Harshini 🌟
          </p>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            {birthday.challengeSubtext}
          </p>
        </motion.div>

        {/* Cake Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6 w-full"
        >
          <BirthdayCake onAllExtinguished={() => setChallengeComplete(true)} />
        </motion.div>

        {/* Challenge complete banner */}
        <AnimatePresence>
          {challengeComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 p-6 rounded-3xl mx-auto max-w-sm shadow-xl"
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                border: "2px solid #86efac88",
                boxShadow: "0 10px 30px rgba(134,239,172,0.25)",
              }}
            >
              <p className="text-3xl mb-2" aria-hidden="true">
                ✨💖✨
              </p>
              <p className="font-bold text-emerald-800 text-lg">
                {birthday.challengeCompletedTitle}
              </p>
              <p className="text-emerald-600 text-sm mt-1 font-medium">
                {birthday.challengeCompletedSubtext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button — revealed after completion */}
        <AnimatePresence>
          {challengeComplete && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
                <span className="inline-block whitespace-nowrap">Read My Letter to You 💌</span>
              </PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
