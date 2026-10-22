import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

const PARTICLES = [
  { emoji: "✨", size: 18 },
  { emoji: "⭐", size: 14 },
  { emoji: "💫", size: 20 },
  { emoji: "🌸", size: 16 },
  { emoji: "✨", size: 12 },
  { emoji: "💜", size: 15 },
  { emoji: "🌟", size: 22 },
  { emoji: "🩷", size: 14 },
  { emoji: "✨", size: 10 },
  { emoji: "⭐", size: 18 },
  { emoji: "💫", size: 12 },
  { emoji: "🌸", size: 20 },
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingParticles({ count = 12, className = "" }) {
  const prefersReduced = useReducedMotionPreference();
  if (prefersReduced) return null;

  const items = PARTICLES.slice(0, Math.min(count, PARTICLES.length));

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((p, i) => {
        const x = randomBetween(5, 95);
        const y = randomBetween(5, 90);
        const duration = randomBetween(4, 9);
        const delay = randomBetween(0, 4);
        const yMove = randomBetween(10, 20);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, 1, 1, 0],
              y: [0, -yMove, -yMove * 1.5, -yMove * 2],
              rotate: [0, randomBetween(-15, 15), 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: randomBetween(1, 3),
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              fontSize: p.size,
              userSelect: "none",
            }}
          >
            {p.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
