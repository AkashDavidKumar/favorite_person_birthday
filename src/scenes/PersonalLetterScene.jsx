import { motion } from "motion/react";
import { birthday } from "../data/birthday";
import LetterCard from "../components/LetterCard";
import GlitterBackground from "../components/GlitterBackground";

export default function PersonalLetterScene({ onNext }) {
  return (
    <div
      className="min-h-[100svh] min-h-screen w-full px-3 pt-8 pb-20 sm:px-8 flex flex-col items-center justify-start relative overflow-y-auto overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #fff7ed 0%, #fdf2f8 50%, #fef3c7 100%)",
      }}
    >
      <GlitterBackground variant="parchment" count={18} />

      {/* Warm ambient parchment glow */}
      <div
        className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-96 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #fde68a, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        {/* Header Intro with clear breathing room */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span className="text-4xl" aria-hidden="true">
            📜
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-amber-950 mt-2">
            A Royal Letter for Harshini
          </h2>
          <p className="text-amber-800/80 font-script text-xl mt-1">
            Delivered with endless love & laughter
          </p>
        </motion.div>

        {/* The Royal Scroll */}
        <LetterCard
          opening={birthday.letterOpening}
          paragraphs={birthday.letterParagraphs}
          signature={birthday.letterSignature}
          senderName={birthday.senderName}
          onContinue={onNext}
        />
      </div>
    </div>
  );
}
