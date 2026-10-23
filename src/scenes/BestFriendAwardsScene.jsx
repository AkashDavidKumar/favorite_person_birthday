import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { X } from "lucide-react";
import { awards } from "../data/awards";
import SurpriseBox, { AwardArtwork } from "../components/SurpriseBox";
import PrimaryButton from "../components/PrimaryButton";
import MagicBackground from "../components/MagicBackground";

export default function BestFriendAwardsScene({ onNext }) {
  // Track opened gifts by id (e.g. Set(1, 2))
  const [openedIds, setOpenedIds] = useState(new Set());
  // Active award in modal overlay (or null)
  const [selectedAward, setSelectedAward] = useState(null);

  const handleGiftClick = (award) => {
    const isFirstTime = !openedIds.has(award.id);

    // Add to opened set
    setOpenedIds((prev) => new Set([...prev, award.id]));
    setSelectedAward(award);

    // Vibration API (silent fallback if not supported or blocked)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate([40, 60, 100]);
      } catch (e) {
        // Silently ignore
      }
    }

    // Trigger celebration confetti
    if (isFirstTime) {
      if (award.burstType === "hearts") {
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.5 },
          colors: ["#ec4899", "#f472b6", "#fda4af", "#ff69b4", "#ffffff"],
          scalar: 1.1,
        });
      } else if (award.burstType === "stars") {
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.5 },
          colors: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#fde047", "#ffffff"],
          scalar: 1.0,
        });
      } else {
        confetti({
          particleCount: 90,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#fde047"],
          scalar: 1.05,
        });
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedAward(null);
  };

  const openedCount = openedIds.size;

  return (
    <div
      className="min-h-[100svh] min-h-screen w-full px-3 py-6 sm:py-12 relative overflow-x-hidden flex flex-col justify-between"
      style={{
        background: "linear-gradient(160deg, #ede9fe 0%, #fce7f3 60%, #fff7ed 100%)",
      }}
    >
      <MagicBackground theme="awards" />

      <div className="relative z-10 max-w-xl mx-auto w-full my-auto flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <span className="text-3xl sm:text-4xl" aria-hidden="true">
            🏆
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-purple-900 mt-1">
            Best Friend Awards
          </h2>
          <p className="text-purple-600 font-script text-lg sm:text-xl mt-0.5">
            Special Honours for Harshini 🎀
          </p>
          <p className="text-gray-500 mt-1 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto leading-relaxed">
            Tap each wrapped box to unlock your official awards!
          </p>
        </motion.div>

        {/* ─── 3 GIFT BOXES IN A SINGLE HORIZONTAL ROW (Mobile & Desktop) ─── */}
        <div className="w-full flex flex-row items-center justify-center gap-2.5 sm:gap-5 my-4 px-1 max-w-[360px] sm:max-w-[440px]">
          {awards.map((award, i) => (
            <SurpriseBox
              key={award.id}
              award={award}
              index={i}
              isOpened={openedIds.has(award.id)}
              onClick={handleGiftClick}
            />
          ))}
        </div>

        {/* Status Tracker */}
        <div className="my-3 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100/90 text-purple-700 border border-purple-200">
            {openedCount === 3
              ? "All 3 awards revealed! 👑✨"
              : `${openedCount} of 3 gifts opened ✨ (tap to reveal)`}
          </span>
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full flex justify-center pt-3 pb-2 px-4"
        >
          <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
            <span className="inline-block whitespace-nowrap">Next: The Cake Challenge 🎂</span>
          </PrimaryButton>
        </motion.div>
      </div>

      {/* ─── CENTRED AWARD OPENING MODAL OVERLAY ─── */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-purple-950/50 backdrop-blur-sm select-none"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative w-full max-w-[340px] sm:max-w-md rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden border-2"
              style={{
                background: `linear-gradient(165deg, #ffffff 0%, ${selectedAward.boxColor} 65%, #fff7ed 100%)`,
                borderColor: `${selectedAward.accentColor}66`,
                boxShadow: `0 20px 50px -10px ${selectedAward.accentColor}55`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close "✕" Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-gray-200"
                aria-label="Close award modal"
              >
                <X size={18} />
              </button>

              {/* Ribbon Label Pill */}
              <div className="inline-block px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-4 shadow-2xs"
                style={{
                  backgroundColor: `${selectedAward.accentColor}18`,
                  color: selectedAward.accentColor,
                }}
              >
                {selectedAward.ribbonLabel}
              </div>

              {/* Custom Themed Artwork (Crown / Heart-Lock / Gem) */}
              <div className="my-2 flex justify-center">
                <AwardArtwork awardId={selectedAward.id} />
              </div>

              {/* Award Title */}
              <h3
                className="font-display font-black text-xl sm:text-2xl mt-4 mb-2 tracking-wide leading-tight"
                style={{ color: selectedAward.accentColor }}
              >
                {selectedAward.title}
              </h3>

              {/* Tagline */}
              <p className="text-xs font-semibold text-purple-500 mb-3 font-fun">
                {selectedAward.tagline}
              </p>

              {/* Heartfelt Message */}
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed px-2 mb-6">
                {selectedAward.message}
              </p>

              {/* Back to Gifts Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 hover:shadow-lg cursor-pointer flex items-center gap-1.5 font-fun min-h-[44px]"
                  style={{
                    background: `linear-gradient(135deg, ${selectedAward.accentColor}, #7c3aed)`,
                  }}
                >
                  <span>Back to Gifts</span>
                  <span>🎁</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
