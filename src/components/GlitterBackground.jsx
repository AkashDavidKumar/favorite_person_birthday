import { useMemo } from "react";
import { motion } from "motion/react";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

function seeded(seed, min, max) {
  const x = Math.sin(seed + 1) * 10000;
  const r = x - Math.floor(x);
  return min + r * (max - min);
}

/**
 * Reusable ambient glitter background — purely decorative, pointer-events: none.
 * variant: "blush" | "celestial" | "pastel" | "golden" | "warm" | "parchment" | "dark"
 */
export default function GlitterBackground({ variant = "blush", count = 18 }) {
  const prefersReduced = useReducedMotionPreference();

  const CONFIGS = {
    blush: {
      particles: ["✦", "✧", "·", "✦", "✧", "·", "✦"],
      colors: ["#e879f9cc", "#c084fccc", "#f9a8d4cc", "#a78bfacc", "#fce7f3cc"],
      opacityRange: [0.25, 0.7],
      sizeRange: [8, 16],
    },
    celestial: {
      particles: ["★", "✦", "·", "✧", "⊹", "✦", "★"],
      colors: ["#e0e7ffcc", "#c4b5fdcc", "#ddd6fecc", "#a5b4fccc"],
      opacityRange: [0.2, 0.75],
      sizeRange: [6, 18],
    },
    pastel: {
      particles: ["✦", "✧", "·", "✦", "✧"],
      colors: ["#f9a8d4cc", "#c4b5fdcc", "#a78bfacc", "#fde68acc"],
      opacityRange: [0.15, 0.5],
      sizeRange: [6, 13],
    },
    golden: {
      particles: ["✦", "★", "✧", "⋆", "✦"],
      colors: ["#fde68acc", "#fbbf24cc", "#f9a8d4cc", "#fcd34dcc"],
      opacityRange: [0.25, 0.65],
      sizeRange: [8, 18],
    },
    warm: {
      particles: ["✦", "·", "✧", "⋆", "✦"],
      colors: ["#fde68acc", "#fbbf24aa", "#fca5a5aa", "#f9a8d4aa"],
      opacityRange: [0.2, 0.6],
      sizeRange: [6, 14],
    },
    parchment: {
      particles: ["✦", "✧", "⋆", "·"],
      colors: ["#d97706aa", "#b45309aa", "#fbbf2488", "#fde68a99"],
      opacityRange: [0.15, 0.4],
      sizeRange: [6, 12],
    },
    dark: {
      particles: ["★", "✦", "·", "⊹", "✧"],
      colors: ["#e0e7ffcc", "#ddd6fecc", "#c4b5fdcc", "#f9a8d4aa"],
      opacityRange: [0.2, 0.7],
      sizeRange: [6, 16],
    },
  };

  const cfg = CONFIGS[variant] || CONFIGS.blush;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = seeded(i * 13, 2, 98);
      const y = seeded(i * 17 + 5, 2, 95);
      const size = seeded(i * 7, cfg.sizeRange[0], cfg.sizeRange[1]);
      const opacity = seeded(i * 11, cfg.opacityRange[0], cfg.opacityRange[1]);
      const duration = seeded(i * 3, 3, 8);
      const delay = seeded(i * 5, 0, 5);
      const color = cfg.colors[i % cfg.colors.length];
      const char = cfg.particles[i % cfg.particles.length];
      return { x, y, size, opacity, duration, delay, color, char };
    });
  }, [count, variant]); // eslint-disable-line react-hooks/exhaustive-deps

  if (prefersReduced) {
    // Static dots only
    return (
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        {particles.slice(0, 8).map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: p.size,
              color: p.color,
              opacity: p.opacity * 0.5,
            }}
          >
            {p.char}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            scale: [0.8, 1.3, 0.8],
            y: [0, -8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: p.color,
            userSelect: "none",
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
}
