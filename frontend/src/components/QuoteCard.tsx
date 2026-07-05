"use client";

import { motion } from "framer-motion";
import Card from "./Card";

interface Props {
  index: number;
  isRevealed: boolean;
  isAnimating: boolean;
  canOpen: boolean;
  onOpen: () => void;
  onAnimationComplete: () => void;
}

const quote = "Good morning beeru 😁 tu bou juthu bole che pela kye rate vaat karis pan kari j nai 😡 have hu tara thi gusse chu tare mane manavu padse 🥺 mane call kar j aje bou late thay jase suvama toh mane uthi n call kr j";

export default function QuoteCard({
  index,
  isRevealed,
  isAnimating,
  canOpen,
  onOpen,
  onAnimationComplete,
}: Props) {
  return (
    <Card
      index={index}
      isRevealed={isRevealed}
      isAnimating={isAnimating}
      canOpen={canOpen}
      onOpen={onOpen}
      onAnimationComplete={onAnimationComplete}
    >
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
          &ldquo;{quote}&rdquo;
        </p>
      </motion.div>
    </Card>
  );
}
