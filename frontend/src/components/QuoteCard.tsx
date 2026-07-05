"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { useApi } from "../hooks/useApi";

interface QuoteData {
  quote: string;
}

interface Props {
  index: number;
  isRevealed: boolean;
  isAnimating: boolean;
  canOpen: boolean;
  onOpen: () => void;
  onAnimationComplete: () => void;
}

export default function QuoteCard({
  index,
  isRevealed,
  isAnimating,
  canOpen,
  onOpen,
  onAnimationComplete,
}: Props) {
  const { data, execute } = useApi<QuoteData>("/api/v1/quotes/random");

  useEffect(() => {
    if (isRevealed && !data) {
      execute();
    }
  }, [isRevealed, data, execute]);

  return (
    <Card
      index={index}
      // title="Morning Quote"
      // emoji="🌸"
      isRevealed={isRevealed}
      isAnimating={isAnimating}
      canOpen={canOpen}
      onOpen={onOpen}
      onAnimationComplete={onAnimationComplete}
    >
      {data ? (
        <motion.div
          className="flex flex-col items-center gap-4 py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🫶
          </motion.span>
          <p className="text-lg md:text-xl text-center italic text-white/90 leading-relaxed font-medium">
            &ldquo;{data.quote}&rdquo;
          </p>
        </motion.div>
      ) : (
        <div className="py-8 text-center text-white/50">Loading your quote...</div>
      )}
    </Card>
  );
}
