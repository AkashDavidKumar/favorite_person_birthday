import { useState } from "react";
import { motion } from "motion/react";

const resolveImagePath = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  if (path.startsWith("images/")) {
    return `/${path}`;
  }
  return `/images/images/${path}`;
};

export default function PolaroidCard({
  memory,
  index,
  rotation = 0,
  onClick,
}) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = resolveImagePath(memory.image);
  const hasImage = imageSrc && !imgError;

  const washiClass = memory.tapeType || "washi-tape-pink";

  return (
    <motion.button
      type="button"
      onClick={() => onClick(index)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="bg-white p-3 pb-4 rounded-xl cursor-pointer relative group text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 w-full max-w-[255px] sm:max-w-[260px] mx-auto box-border border border-pink-100/80"
      style={{
        boxShadow: "0 10px 25px -4px rgba(79, 70, 229, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)",
        background: "linear-gradient(180deg, #ffffff 0%, #fffdfa 100%)",
        transform: `rotate(${rotation}deg)`,
      }}
      aria-label={`Open photo memory: ${memory.caption}`}
    >
      {/* Scrapbook Washi Tape Strip across the top */}
      <div className={`${washiClass} w-20 -top-2.5 left-1/2 -translate-x-1/2 absolute z-10`} />

      {/* Scrapbook Corner Sticker if available */}
      {memory.sticker && (
        <div
          className="absolute bottom-1.5 right-1.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-md border border-white/80 pointer-events-none transform rotate-2"
          style={{
            background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)",
            color: "#831843",
          }}
        >
          {memory.sticker}
        </div>
      )}

      {/* 1. The Photograph Frame */}
      <div className="w-full aspect-square overflow-hidden bg-purple-50/60 rounded-lg relative shadow-inner mt-1">
        {hasImage ? (
          <img
            src={imageSrc}
            alt={memory.alt || memory.caption}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${memory.color || "#ede9fe"} 0%, #fce7f3 100%)`,
            }}
          >
            <span className="text-3xl opacity-50">📷</span>
            <p className="text-xs text-purple-600 font-medium text-center px-3">
              Harshini's Memory
            </p>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-purple-950/0 group-hover:bg-purple-950/20 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-purple-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            View Photo ✨
          </span>
        </div>
      </div>

      {/* 2. The Caption (strictly no date line, cute friend scrapbook font) */}
      <div className="pt-3 px-1 min-h-[2.5rem] flex flex-col justify-center">
        <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug line-clamp-2 w-full font-fun">
          {memory.caption}
        </p>
      </div>
    </motion.button>
  );
}
