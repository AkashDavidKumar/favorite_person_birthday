import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Crown, Lock, Key, Heart } from "lucide-react";

// Custom decorative artwork rising from the box
function AwardArtwork({ awardId }) {
  if (awardId === 1) {
    // Drama Queen: Miniature golden crown, theatrical sparkles, tiny spotlight
    return (
      <div className="relative flex flex-col items-center justify-center">
        {/* Spotlight effect */}
        <div
          className="absolute -top-10 w-24 h-24 rounded-full opacity-40 blur-md pointer-events-none"
          style={{
            background: "radial-gradient(circle, #fde047 0%, #f472b6 60%, transparent 80%)",
          }}
        />
        {/* Sparkles around crown */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 pointer-events-none"
        >
          <span className="absolute -top-1 left-2 text-yellow-400 text-xs">✨</span>
          <span className="absolute top-2 -right-1 text-pink-400 text-xs">💖</span>
          <span className="absolute -bottom-1 right-3 text-yellow-300 text-xs">⭐</span>
        </motion.div>
        {/* Crown with animated shine */}
        <motion.div
          initial={{ scale: 0, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 }}
          className="relative p-3 rounded-2xl shadow-lg border border-amber-200"
          style={{
            background: "linear-gradient(135deg, #fef08a 0%, #facc15 60%, #eab308 100%)",
            boxShadow: "0 8px 24px rgba(234, 179, 8, 0.4)",
          }}
        >
          <Crown size={40} className="text-amber-900 drop-shadow" />
        </motion.div>
        <span className="text-xs font-bold text-pink-600 tracking-wider mt-2 uppercase">
          Movie Star Energy
        </span>
      </div>
    );
  }

  if (awardId === 2) {
    // Secret Keeper: Glowing heart-shaped lock, small key, floating stars
    return (
      <div className="relative flex flex-col items-center justify-center">
        {/* Mysterious glow */}
        <div
          className="absolute -top-8 w-24 h-24 rounded-full opacity-35 blur-md pointer-events-none"
          style={{
            background: "radial-gradient(circle, #c084fc 0%, #818cf8 70%, transparent 85%)",
          }}
        />
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center gap-1.5"
        >
          {/* Heart Lock */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 }}
            className="p-3 rounded-2xl shadow-lg border border-purple-300 relative"
            style={{
              background: "linear-gradient(135deg, #ddd6fe 0%, #a855f7 100%)",
              boxShadow: "0 8px 24px rgba(168, 85, 247, 0.4)",
            }}
          >
            <Lock size={34} className="text-white drop-shadow" />
            <span className="absolute -top-1 -right-1 text-xs">🤫</span>
          </motion.div>
          {/* Small Key */}
          <motion.div
            initial={{ scale: 0, x: -10 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
            className="p-2 rounded-xl bg-amber-100 border border-amber-300 shadow"
          >
            <Key size={20} className="text-amber-600" />
          </motion.div>
        </motion.div>
        <span className="text-xs font-bold text-purple-600 tracking-wider mt-2 uppercase">
          Vault of Confidence
        </span>
      </div>
    );
  }

  // Award 3: Rare Human Being: Radiant crystal heart, golden rays, delicate sparkles
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Radiant golden rays / halo */}
      <motion.div
        animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #fde68a 0%, #34d399 50%, transparent 75%)",
          filter: "blur(12px)",
        }}
      />
      {/* Floating sparkles */}
      <span className="absolute -top-3 -right-2 text-emerald-400 text-xs">✦</span>
      <span className="absolute -top-2 -left-2 text-amber-400 text-xs">💎</span>
      <span className="absolute -bottom-1 -right-1 text-pink-400 text-xs">✨</span>
      {/* Radiant Crystal Heart */}
      <motion.div
        initial={{ scale: 0, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 }}
        className="relative p-3.5 rounded-2xl shadow-lg border border-emerald-200"
        style={{
          background: "linear-gradient(135deg, #a7f3d0 0%, #10b981 60%, #059669 100%)",
          boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
        }}
      >
        <Heart size={36} className="text-white fill-white drop-shadow" />
      </motion.div>
      <span className="text-xs font-bold text-emerald-700 tracking-wider mt-2 uppercase">
        One In A Million
      </span>
    </div>
  );
}

export default function SurpriseBox({ award, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpeningAnim) return;

    setIsOpeningAnim(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpeningAnim(false);

      // Distinctive celebration confetti per award
      if (award.burstType === "hearts") {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.62 },
          colors: ["#ec4899", "#f472b6", "#fda4af", "#ff69b4", "#ffffff"],
          scalar: 1.1,
        });
      } else if (award.burstType === "stars") {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.62 },
          colors: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#fde047", "#ffffff"],
          scalar: 1.0,
        });
      } else {
        confetti({
          particleCount: 85,
          spread: 90,
          origin: { y: 0.62 },
          colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#fde047"],
          scalar: 1.05,
        });
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex flex-col items-center w-64 sm:w-72"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ================= CLOSED GIFT BOX ================= */
          <motion.div
            key="box-closed"
            animate={
              isOpeningAnim
                ? {
                    x: [-3, 3, -4, 4, -2, 2, 0],
                    y: [-4, -8, -12, -8, 0],
                    rotate: [-2, 2, -2, 2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.button
              type="button"
              onClick={handleOpen}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-3xl"
              aria-label={`Gift Box ${index + 1} - Tap to reveal award`}
            >
              {/* Box container */}
              <div
                className="w-48 h-48 sm:w-52 sm:h-52 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl transition-all duration-300"
                style={{
                  background: `linear-gradient(145deg, #ffffff 0%, ${award.boxColor} 100%)`,
                  border: `2px solid ${award.ribbonColor}55`,
                  boxShadow: `0 12px 30px -8px ${award.accentColor}33, 0 4px 12px rgba(0,0,0,0.06)`,
                }}
              >
                {/* Subtle internal shimmer / glow */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${award.ribbonColor}88, transparent 70%)`,
                  }}
                />

                {/* Vertical Ribbon */}
                <div
                  className="absolute inset-x-0 top-0 bottom-0 w-8 mx-auto shadow-sm"
                  style={{
                    background: `linear-gradient(180deg, ${award.ribbonColor}, ${award.accentColor})`,
                  }}
                />

                {/* Horizontal Ribbon */}
                <div
                  className="absolute inset-y-0 left-0 right-0 h-8 my-auto shadow-sm"
                  style={{
                    background: `linear-gradient(90deg, ${award.ribbonColor}, ${award.accentColor})`,
                  }}
                />

                {/* Bow Centerpiece */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, #ffffff 0%, ${award.boxColor} 100%)`,
                    border: `3px solid ${award.accentColor}`,
                  }}
                >
                  🎁
                </motion.div>

                {/* Mystery hint badge */}
                <div className="absolute bottom-3 inset-x-0 text-center z-10">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm font-fun"
                    style={{
                      backgroundColor: "#ffffffea",
                      color: award.accentColor,
                      border: `1px solid ${award.accentColor}33`,
                    }}
                  >
                    Tap to reveal ✨
                  </span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* ================= OPENED REVEAL CARD (HANDMADE CERTIFICATE LOOK) ================= */
          <motion.div
            key="box-open"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="w-full flex flex-col items-center"
          >
            {/* Opened box frame displaying custom artwork with certificate feel */}
            <div
              className="w-48 h-48 sm:w-52 sm:h-52 rounded-3xl flex flex-col items-center justify-center p-4 shadow-2xl text-center relative overflow-hidden border-2 border-dashed"
              style={{
                background: `linear-gradient(150deg, #ffffff 0%, ${award.boxColor} 60%, #fff7ed 100%)`,
                borderColor: `${award.accentColor}88`,
                boxShadow: `0 14px 34px -8px ${award.accentColor}44`,
              }}
            >
              {/* Cute Washi Tape at top */}
              <div className="washi-tape-yellow w-16 -top-2 left-1/2 -translate-x-1/2 absolute z-10" />

              {/* Internal burst particles */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${award.ribbonColor}, transparent 80%)`,
                }}
              />

              {/* Custom theme illustration */}
              <AwardArtwork awardId={award.id} />

              {/* Small ribbon badge & certificate sticker */}
              <div className="mt-3 flex items-center gap-1.5 z-10">
                <span
                  className="text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${award.accentColor}18`,
                    color: award.accentColor,
                  }}
                >
                  {award.ribbonLabel}
                </span>
                {award.sticker && (
                  <span className="text-[10px] font-black bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full border border-pink-200 shadow-sm font-fun">
                    {award.sticker}
                  </span>
                )}
              </div>
            </div>

            {/* Award Title and Description ONLY RENDERED AFTER OPENING */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-4 sm:mt-5 text-center px-2 max-w-full w-full"
            >
              <h3
                className="font-bold text-base sm:text-lg tracking-wide mb-1.5"
                style={{ color: award.accentColor }}
              >
                {award.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-xs">
                {award.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
