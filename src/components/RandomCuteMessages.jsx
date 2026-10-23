import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

export const CUTE_MESSAGES = [
  "psst... she's the favourite today 💗",
  "birthday magic loading... ✨",
  "friendship level: legendary 🏆",
  "more memories, please 🥹",
  "officially too cute for this world 🎀",
  "100% iconic. 0% normal. 😂",
  "warning: extreme drama queen ahead 🚨👑",
  "bff status: permanently locked in 🔒💖",
  "certified main character 🌟",
  "queen of bad jokes & good vibes 😂",
];

export default function RandomCuteMessages() {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReduced) return;

    let index = 0;
    // Trigger initial message after 4.5s
    const initialTimer = setTimeout(() => {
      setCurrentMessage(CUTE_MESSAGES[0]);
      setVisible(true);
    }, 4500);

    // Periodically show cute messages
    const interval = setInterval(() => {
      index = (index + 1) % CUTE_MESSAGES.length;
      setCurrentMessage(CUTE_MESSAGES[index]);
      setVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [prefersReduced]);

  if (prefersReduced || !visible || !currentMessage) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 pointer-events-auto max-w-[calc(100vw-32px)] sm:max-w-xs">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 border-2 border-pink-200/90 shadow-lg shadow-purple-200/50 backdrop-blur-md"
          >
            <span className="text-pink-500 animate-pulse text-sm">✨</span>
            <p className="font-fun text-xs text-purple-900 font-semibold tracking-wide flex-1 select-none">
              {currentMessage}
            </p>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="text-gray-400 hover:text-purple-600 p-0.5 rounded-full transition-colors cursor-pointer"
              aria-label="Dismiss note"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
