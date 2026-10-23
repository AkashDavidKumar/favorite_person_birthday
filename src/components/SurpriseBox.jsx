import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Crown, Lock, Key, Heart } from "lucide-react";

// Custom decorative artwork rising from the box
export function AwardArtwork({ awardId }) {
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

export default function SurpriseBox({ award, index, isOpened, onClick }) {
  // Select icon for opened state
  const renderOpenIcon = () => {
    if (award.id === 1) {
      return <Crown size={30} className="text-amber-900 drop-shadow" />;
    }
    if (award.id === 2) {
      return <Lock size={28} className="text-white drop-shadow" />;
    }
    return <Heart size={28} className="text-white fill-white drop-shadow" />;
  };

  return (
    <motion.button
      type="button"
      onClick={() => onClick(award)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="flex-1 max-w-[102px] min-[380px]:max-w-[114px] sm:max-w-[130px] flex flex-col items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl select-none"
      aria-label={`Gift Box ${index + 1}: ${isOpened ? award.title : "Unopened Surprise"}`}
    >
      {/* Gift Box Container */}
      <div
        className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-lg transition-all duration-300 border-2"
        style={{
          background: isOpened
            ? `linear-gradient(145deg, #ffffff 0%, ${award.boxColor} 70%, #ede9fe 100%)`
            : `linear-gradient(145deg, #ffffff 0%, ${award.boxColor} 100%)`,
          borderColor: isOpened ? award.accentColor : `${award.ribbonColor}88`,
          boxShadow: isOpened
            ? `0 10px 24px -6px ${award.accentColor}44`
            : `0 8px 20px -6px ${award.accentColor}33`,
        }}
      >
        {!isOpened ? (
          /* ================= UNOPENED WRAPPED GIFT ================= */
          <>
            {/* Subtle inner shimmer */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${award.ribbonColor}aa, transparent 70%)`,
              }}
            />

            {/* Vertical Ribbon */}
            <div
              className="absolute inset-x-0 top-0 bottom-0 w-4 sm:w-5 mx-auto shadow-sm"
              style={{
                background: `linear-gradient(180deg, ${award.ribbonColor}, ${award.accentColor})`,
              }}
            />

            {/* Horizontal Ribbon */}
            <div
              className="absolute inset-y-0 left-0 right-0 h-4 sm:h-5 my-auto shadow-sm"
              style={{
                background: `linear-gradient(90deg, ${award.ribbonColor}, ${award.accentColor})`,
              }}
            />

            {/* 3D Wrapped Bow Centerpiece */}
            <div
              className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-md border-2"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${award.boxColor} 100%)`,
                borderColor: award.accentColor,
              }}
            >
              🎁
            </div>

            {/* Tap pulse hint */}
            <div className="absolute bottom-1 inset-x-0 text-center z-10 pointer-events-none">
              <span className="text-[9px] font-bold tracking-wider text-purple-700/80 uppercase font-fun">
                TAP ME
              </span>
            </div>
          </>
        ) : (
          /* ================= ALREADY OPENED STATE ================= */
          <div className="flex flex-col items-center justify-center p-2 text-center w-full h-full relative">
            {/* Open Box Lid tilted slightly */}
            <div
              className="absolute -top-1 right-1 text-[11px] font-black px-1.5 py-0.5 rounded-full bg-white/90 shadow border"
              style={{ color: award.accentColor, borderColor: `${award.accentColor}44` }}
            >
              OPEN
            </div>

            {/* Award Icon inside */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="p-2 sm:p-2.5 rounded-xl shadow border mb-1 flex items-center justify-center"
              style={{
                background:
                  award.id === 1
                    ? "linear-gradient(135deg, #fef08a 0%, #facc15 100%)"
                    : award.id === 2
                    ? "linear-gradient(135deg, #ddd6fe 0%, #a855f7 100%)"
                    : "linear-gradient(135deg, #a7f3d0 0%, #10b981 100%)",
                borderColor:
                  award.id === 1 ? "#f59e0b" : award.id === 2 ? "#9333ea" : "#059669",
              }}
            >
              {renderOpenIcon()}
            </motion.div>

            {/* Short label */}
            <span
              className="text-[10px] font-bold line-clamp-1 leading-tight font-fun"
              style={{ color: award.accentColor }}
            >
              {award.emoji} View
            </span>
          </div>
        )}
      </div>

      {/* Label under the box */}
      <div className="mt-2 text-center">
        <span
          className="text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-xs"
          style={{
            backgroundColor: isOpened ? `${award.accentColor}18` : "#ffffffbb",
            color: isOpened ? award.accentColor : "#6b7280",
            border: `1px solid ${isOpened ? award.accentColor + "44" : "#e5e7eb"}`,
          }}
        >
          {award.ribbonLabel}
        </span>
      </div>
    </motion.button>
  );
}
