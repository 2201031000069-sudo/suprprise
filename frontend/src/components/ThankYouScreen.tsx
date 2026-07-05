"use client";

import { motion } from "framer-motion";

interface Props {
  onReset: () => void;
}

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
  size: 4 + Math.random() * 8,
}));

export default function ThankYouScreen({ onReset }: Props) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
        >
          <span className="text-2xl" style={{ fontSize: s.size + 4 }}>
            ✦
          </span>
        </motion.div>
      ))}

      <motion.div
        className="text-7xl mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        🌟
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold font-poppins text-center bg-gradient-to-r from-pink-200 via-purple-200 to-orange-200 bg-clip-text text-transparent"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        You&apos;ve opened all your cards!
      </motion.h2>

      <motion.p
        className="text-white/60 text-lg mt-4 mb-10 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Have a beautiful day. See you tomorrow morning ☀️
      </motion.p>

      <motion.button
        className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Start Over
      </motion.button>
    </motion.div>
  );
}
