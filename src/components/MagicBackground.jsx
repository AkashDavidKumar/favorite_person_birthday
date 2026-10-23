import { motion } from "motion/react";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

// Seeded pseudo-random generator
function pseudoRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const THEME_ELEMENTS = {
  // Scene 1: Secret Invitation
  invitation: [
    { type: "emoji", val: "💌" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "💖" },
    { type: "emoji", val: "🌸" },
    { type: "emoji", val: "💫" },
    { type: "star", color: "#f472b6" },
    { type: "star", color: "#c084fc" },
  ],
  // Scene 2: Birthday Universe
  universe: [
    { type: "emoji", val: "🎀" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "⭐" },
    { type: "emoji", val: "🦋" },
    { type: "emoji", val: "🧁" },
    { type: "emoji", val: "🌈" },
    { type: "star", color: "#f472b6" },
    { type: "star", color: "#60a5fa" },
  ],
  // Scene 3: Friendship Museum (Scrapbook)
  museum: [
    { type: "emoji", val: "📸" },
    { type: "emoji", val: "📌" },
    { type: "emoji", val: "💕" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "🌸" },
    { type: "star", color: "#ec4899" },
    { type: "star", color: "#a855f7" },
  ],
  // Scene 4: Best Friend Awards
  awards: [
    { type: "emoji", val: "👑" },
    { type: "emoji", val: "🌟" },
    { type: "emoji", val: "🏆" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "💛" },
    { type: "star", color: "#facc15" },
    { type: "star", color: "#fb923c" },
  ],
  // Scene 5: Birthday Cake Challenge
  cake: [
    { type: "emoji", val: "🍒" },
    { type: "emoji", val: "🍬" },
    { type: "emoji", val: "🍓" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "🎉" },
    { type: "star", color: "#f472b6" },
    { type: "star", color: "#fde047" },
  ],
  // Scene 6: Royal Birthday Letter
  letter: [
    { type: "emoji", val: "👑" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "🌸" },
    { type: "emoji", val: "💌" },
    { type: "star", color: "#d97706" },
    { type: "star", color: "#f59e0b" },
  ],
  // Scene 7: Final Farewell
  farewell: [
    { type: "emoji", val: "🌙" },
    { type: "emoji", val: "💗" },
    { type: "emoji", val: "✨" },
    { type: "emoji", val: "⭐" },
    { type: "star", color: "#c084fc" },
    { type: "star", color: "#f472b6" },
  ],
};

export default function MagicBackground({ theme = "universe", count = 22 }) {
  const prefersReduced = useReducedMotionPreference();
  const elements = THEME_ELEMENTS[theme] || THEME_ELEMENTS.universe;

  const items = Array.from({ length: count }, (_, i) => {
    const r1 = pseudoRandom(i * 13 + 7);
    const r2 = pseudoRandom(i * 29 + 11);
    const r3 = pseudoRandom(i * 47 + 19);
    const r4 = pseudoRandom(i * 71 + 3);

    const elem = elements[i % elements.length];

    return {
      id: i,
      x: r1 * 92 + 4, // 4% to 96%
      y: r2 * 90 + 5, // 5% to 95%
      size: elem.type === "emoji" ? r3 * 10 + 14 : r3 * 8 + 8,
      delay: r4 * 3,
      duration: r4 * 3 + 4,
      rotation: (r1 - 0.5) * 30,
      elem,
    };
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={
            prefersReduced
              ? { opacity: 0.6 }
              : {
                  opacity: [0.2, 0.85, 0.2],
                  y: [0, -14, 0],
                  scale: [0.9, 1.15, 0.9],
                  rotate: [item.rotation, item.rotation + 15, item.rotation],
                }
          }
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          }}
        >
          {item.elem.type === "emoji" ? (
            <span
              style={{
                fontSize: item.size,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))",
              }}
            >
              {item.elem.val}
            </span>
          ) : (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.elem.color}
              className="drop-shadow-sm opacity-80"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
