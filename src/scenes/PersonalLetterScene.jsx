import { motion } from "motion/react";
import { birthday } from "../data/birthday";
import LetterCard from "../components/LetterCard";
import MagicBackground from "../components/MagicBackground";
import FloatingSticker from "../components/FloatingSticker";

export default function PersonalLetterScene({ onNext }) {
  return (
    <div
      className="min-h-[100svh] min-h-screen w-full px-3 pt-6 pb-16 sm:px-8 flex flex-col items-center justify-start relative overflow-y-auto overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #fff7ed 0%, #fdf2f8 50%, #fef3c7 100%)",
      }}
    >
      <MagicBackground theme="letter" />

      <div className="relative z-10 max-w-xl w-full mx-auto">
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
          <h2 className="font-display font-black text-3xl sm:text-4xl text-amber-950 mt-2">
            A Royal Letter for Harshini
          </h2>
          <p className="text-amber-800/80 font-script text-xl mt-1">
            Handwritten with endless memories, laughter & love 🎀
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
