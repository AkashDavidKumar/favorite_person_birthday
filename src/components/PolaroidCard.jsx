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

  return (
    <motion.button
      type="button"
      onClick={() => onClick(index)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.04,
        zIndex: 10,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="bg-white p-3 pb-5 rounded-md cursor-pointer relative group text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 w-full max-w-[270px] sm:max-w-[260px] mx-auto box-border"
      style={{
        boxShadow: "0 8px 20px -4px rgba(53, 43, 72, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.05)",
        background: "linear-gradient(180deg, #ffffff 0%, #fffdfa 100%)",
        transform: `rotate(${rotation}deg)`,
      }}
      aria-label={`Open photo memory: ${memory.caption}`}
    >
      {/* 1. The Photograph Frame */}
      <div className="w-full aspect-square overflow-hidden bg-purple-50/60 rounded-[3px] relative shadow-inner">
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

      {/* 2. The Caption (strictly no date line) */}
      <div className="pt-3 px-1 min-h-[2.75rem] flex items-center">
        <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug line-clamp-2 w-full">
          {memory.caption}
        </p>
      </div>
    </motion.button>
  );
}
