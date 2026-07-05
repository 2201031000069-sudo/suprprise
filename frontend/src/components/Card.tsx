"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface Props {
  index: number;
  title?: string;
  emoji?: string;
  isRevealed: boolean;
  isAnimating: boolean;
  canOpen: boolean;
  onOpen: () => void;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}

export default function Card({
  index,
  title,
  emoji,
  isRevealed,
  isAnimating,
  canOpen,
  onOpen,
  onAnimationComplete,
  children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (!cardRef.current || !isAnimating || animatingRef.current) return;
    animatingRef.current = true;
    gsap.fromTo(
      cardRef.current,
      { rotationY: 0, scale: 1 },
      {
        rotationY: 180,
        scale: 1.02,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(cardRef.current, { rotationY: 0, scale: 1 });
          animatingRef.current = false;
          onAnimationComplete();
        },
      }
    );
  }, [isAnimating, onAnimationComplete]);

  useEffect(() => {
    if (!contentRef.current || !isRevealed) return;
    gsap.fromTo(
      contentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.3 }
    );
  }, [isRevealed]);

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-2xl p-6 md:p-8 w-full mx-auto gradient-border min-h-[340px]"
      initial={{ opacity: 0, y: 30 }}
      animate={(isRevealed || isAnimating || canOpen) ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={canOpen ? { scale: 1.02 } : {}}
      onClick={() => {
        if (canOpen && !animatingRef.current) onOpen();
      }}
      role="button"
      tabIndex={canOpen ? 0 : -1}
      aria-label={`Open card ${index + 1}: ${title}`}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && canOpen && !animatingRef.current) {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {!isRevealed && !isAnimating ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <motion.span
            className="text-5xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            🎴
          </motion.span>
          <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
            Card {index + 1}
          </p>
          <p className="text-white/30 text-xs">
            Tap to reveal
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4" ref={contentRef}>
          {(title || emoji) && (
            <div className="flex items-center gap-3">
              {emoji && <span className="text-3xl">{emoji}</span>}
              {title && <h3 className="text-xl font-semibold font-poppins text-white">{title}</h3>}
            </div>
          )}
          {isRevealed && <div className="text-white/90">{children}</div>}
        </div>
      )}
    </motion.div>
  );
}
