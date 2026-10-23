import { motion } from "motion/react";
import { awards } from "../data/awards";
import SurpriseBox from "../components/SurpriseBox";
import PrimaryButton from "../components/PrimaryButton";
import MagicBackground from "../components/MagicBackground";
import FloatingSticker from "../components/FloatingSticker";

export default function BestFriendAwardsScene({ onNext }) {
  return (
    <div
      className="min-h-[100svh] min-h-screen w-full px-4 py-8 sm:py-16 relative overflow-x-hidden flex flex-col justify-between"
      style={{
        background: "linear-gradient(160deg, #ede9fe 0%, #fce7f3 60%, #fff7ed 100%)",
      }}
    >
      <MagicBackground theme="awards" />

      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto">
        {/* Scrapbook Jury Badges */}
        <div className="flex justify-center gap-2 mb-3">
          <FloatingSticker rotation={-3} color="yellow" className="text-xs">
            100% UNBIASED JURY ⚖️
          </FloatingSticker>
          <FloatingSticker rotation={4} color="pink" className="text-xs">
            HARSHINI CLEAN SWEEP 🥇
          </FloatingSticker>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span className="text-3xl sm:text-4xl" aria-hidden="true">
            🏆
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-purple-900 mt-1">
            Best Friend Awards
          </h2>
          <p className="text-purple-600 font-script text-lg sm:text-xl mt-0.5">
            The Official & Prestigious Honors for Harshini 🎀
          </p>
          <p className="text-gray-500 mt-1.5 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto leading-relaxed">
            Unwrap each box to reveal her prestigious certificates! No other nominations were considered. 😂
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="h-px max-w-xs mx-auto mb-8 sm:mb-12"
          style={{
            background: "linear-gradient(90deg, transparent, #c4b5fd, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Award boxes */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8 sm:mb-12 px-2">
          {awards.map((award, i) => (
            <SurpriseBox key={award.id} award={award} index={i} />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full flex justify-center pb-4 px-4"
        >
          <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
            <span className="inline-block whitespace-nowrap">Next: The Cake Challenge 🎂</span>
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
