import { motion, AnimatePresence } from "motion/react";

// Shared page-level wrapper that handles scene enter/exit transitions
export default function SceneLayout({ children, sceneKey, className = "" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className={`min-h-screen w-full relative overflow-hidden ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
