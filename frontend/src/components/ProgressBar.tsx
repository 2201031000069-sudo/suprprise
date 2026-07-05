"use client";

import { motion } from "framer-motion";

interface Props {
  current: number;
  total: number;
  activeIndex: number;
}

export default function ProgressBar({ current, total, activeIndex }: Props) {
  return (
    <div className="flex items-center gap-3 justify-center" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i < current ? "bg-gradient-to-r from-pink-400 to-purple-500" : "bg-white/20"
          }`}
          animate={
            i === activeIndex
              ? { scale: [1, 1.4, 1] }
              : i < current
              ? { scale: 1 }
              : {}
          }
          transition={{ duration: 0.3 }}
        />
      ))}
      <span className="text-white/40 text-xs ml-2">
        {current}/{total}
      </span>
    </div>
  );
}
