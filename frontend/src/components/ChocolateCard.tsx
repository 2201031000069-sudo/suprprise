"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Card from "./Card";

interface Props {
  index: number;
  isRevealed: boolean;
  isAnimating: boolean;
  canOpen: boolean;
  onOpen: () => void;
  onAnimationComplete: () => void;
}

const name = "TABS Dark Chocolate 🤤";
const compliment = "Yeh chocolate sirf tumhare liye, agr chocolate ke name se pata na chale toh ak baar search kar lena 🤣";

export default function ChocolateCard({
  index,
  isRevealed,
  isAnimating,
  canOpen,
  onOpen,
  onAnimationComplete,
}: Props) {
  const confettiFired = useRef(false);

  useEffect(() => {
    if (isRevealed && !confettiFired.current) {
      confettiFired.current = true;
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#f9a8d4", "#c084fc", "#fdba74"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#f9a8d4", "#c084fc", "#fdba74"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isRevealed]);

  return (
    <Card
      index={index}
      title="This Chocolate 4 U"
      emoji="🍫"
      isRevealed={isRevealed}
      isAnimating={isAnimating}
      canOpen={canOpen}
      onOpen={onOpen}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-4 py-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
      >
        <motion.span
          className="text-6xl"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🍫
        </motion.span>
        <h4 className="text-xl font-semibold text-pink-200">{name}</h4>
        <p className="text-white/80 text-center italic">{compliment}</p>
      </motion.div>
    </Card>
  );
}
