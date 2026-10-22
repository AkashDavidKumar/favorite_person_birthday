import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { memories } from "../data/memories";
import PolaroidCard from "../components/PolaroidCard";
import PhotoLightbox from "../components/PhotoLightbox";
import PrimaryButton from "../components/PrimaryButton";
import GlitterBackground from "../components/GlitterBackground";

// Controlled gentle rotations that look natural and won't clip on small screens
const ROTATIONS = [-1.5, 1.5, -1, 1.5, -1.5, 1, -1, 1];

export default function MemoryMuseumScene({ onNext }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + memories.length) % memories.length
    );
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % memories.length
    );
  }, []);

  return (
    <>
      <div
        className="min-h-[100svh] min-h-screen w-full relative px-4 py-8 sm:py-16 overflow-x-hidden flex flex-col justify-between"
        style={{
          background: "linear-gradient(180deg, #fff7ed 0%, #fce7f3 50%, #ede9fe 100%)",
        }}
      >
        <GlitterBackground variant="pastel" count={16} />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8"
          >
            <span className="text-3xl sm:text-4xl" aria-hidden="true">
              🖼️
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-purple-900 mt-1">
              The Friendship Museum
            </h2>
            <p className="text-purple-600 font-script text-lg sm:text-xl mt-0.5">
              For Harshini — our favourite smiles & moments
            </p>
            <p className="text-gray-500 mt-1.5 text-xs sm:text-sm max-w-sm sm:max-w-md mx-auto leading-relaxed">
              A carefully curated collection of the happiest days, family warmth, and endless memories.
            </p>
          </motion.div>

          {/* Gallery Grid: 1 col on mobile, 2 col on tablet, 3-4 col on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 justify-items-center mb-10 sm:mb-14 px-2">
            {memories.map((memory, i) => (
              <PolaroidCard
                key={memory.id}
                memory={memory}
                index={i}
                rotation={ROTATIONS[i % ROTATIONS.length]}
                onClick={openLightbox}
              />
            ))}
          </div>

          {/* Gallery Continue Button with ample space and non-breaking emoji */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full flex justify-center pb-6 sm:pb-8 px-4"
          >
            <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
              <span className="inline-block whitespace-nowrap">Next: The Awards Ceremony 🏆</span>
            </PrimaryButton>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        memories={memories}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </>
  );
}
