import { motion } from "motion/react";

const SCENE_COUNT = 7;

export default function ProgressIndicator({ currentScene }) {
  // Only show from scene 2 up to scene 6 (hide on invitation and minimal exit screen)
  if (currentScene < 1 || currentScene >= 6) return null;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
      role="progressbar"
      aria-label={`Scene ${currentScene + 1} of ${SCENE_COUNT}`}
      aria-valuenow={currentScene + 1}
      aria-valuemin={1}
      aria-valuemax={SCENE_COUNT}
    >
      {Array.from({ length: SCENE_COUNT }, (_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            width: i === currentScene ? 24 : 8,
            opacity: i <= currentScene ? 1 : 0.3,
            backgroundColor:
              i < currentScene
                ? "#a78bfa"
                : i === currentScene
                  ? "#7c3aed"
                  : "#ddd6fe",
          }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full"
          style={{
            backgroundColor: i < currentScene ? "#a78bfa" : i === currentScene ? "#7c3aed" : "#ddd6fe",
          }}
        />
      ))}
    </div>
  );
}
