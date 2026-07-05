"use client";

import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
  hasProgress: boolean;
}

export default function LandingPage({ onStart, hasProgress }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-7xl mb-6 animate-float"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        ☀️
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl font-bold font-poppins mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-200 bg-clip-text text-transparent"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Good Morning
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-white/60 mb-12 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        You have 4 surprise cards waiting for you
      </motion.p>

      <motion.button
        className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold shadow-lg hover:shadow-pink-500/30 transition-shadow cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {hasProgress ? "Continue" : "Open Your Cards"}
      </motion.button>
    </motion.div>
  );
}
