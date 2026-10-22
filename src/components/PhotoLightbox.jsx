import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function PhotoLightbox({ memories, activeIndex, onClose, onPrev, onNext }) {
  const isOpen = activeIndex !== null && activeIndex >= 0;
  const memory = isOpen ? memories[activeIndex] : null;
  const [imgError, setImgError] = useState(false);

  // Reset error state when memory changes
  useEffect(() => {
    setImgError(false);
  }, [activeIndex]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lightbox-open");
    } else {
      document.body.classList.remove("lightbox-open");
    }
    return () => document.body.classList.remove("lightbox-open");
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const imageSrc = resolveImagePath(memory.image);
  const hasImage = imageSrc && !imgError;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${memory.caption}`}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Lightbox Content Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full flex flex-col max-h-[92svh] max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button with safe margins */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close photo"
            >
              <X size={18} />
            </button>

            {/* Image container */}
            <div className="relative bg-black flex-1 min-h-[240px] max-h-[55vh] flex items-center justify-center overflow-hidden">
              {hasImage ? (
                <img
                  src={imageSrc}
                  alt={memory.alt || memory.caption}
                  className="w-full h-full object-contain max-h-[55vh]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full h-full min-h-[260px] flex flex-col items-center justify-center gap-3 p-4"
                  style={{
                    background: `linear-gradient(135deg, ${memory.color || "#ede9fe"} 0%, #fce7f3 100%)`,
                  }}
                >
                  <span className="text-5xl opacity-50">📷</span>
                  <p className="text-purple-600 font-medium text-sm text-center">
                    Harshini's Memory
                  </p>
                </div>
              )}

              {/* Prev / Next controls */}
              {memories.length > 1 && (
                <>
                  <button
                    onClick={onPrev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2.5 sm:p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={onNext}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2.5 sm:p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Caption & details — strictly no date line */}
            <div className="p-4 sm:p-5 bg-white border-t border-purple-50">
              <p className="text-gray-900 font-semibold text-sm sm:text-base leading-snug">
                {memory.caption}
              </p>
              {memory.description && (
                <p className="text-gray-600 text-xs sm:text-sm mt-1.5 italic">
                  "{memory.description}"
                </p>
              )}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 text-[11px] sm:text-xs text-gray-400">
                <span>Harshini's Memory Collection</span>
                <span>
                  {activeIndex + 1} of {memories.length}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
