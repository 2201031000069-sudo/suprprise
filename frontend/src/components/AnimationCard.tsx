"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Card from "./Card";

interface Props {
  index: number;
  isRevealed: boolean;
  isAnimating: boolean;
  canOpen: boolean;
  onOpen: () => void;
  onAnimationComplete: () => void;
}

export default function AnimationCard({
  index,
  isRevealed,
  isAnimating,
  canOpen,
  onOpen,
  onAnimationComplete,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animDone, setAnimDone] = useState(false);
  const [key, setKey] = useState(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isRevealed || !pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    tlRef.current = gsap.timeline({
      onComplete: () => setAnimDone(true),
    });

    tlRef.current
      .to(path, {
        strokeDashoffset: 0,
        duration: 4,
        ease: "power2.inOut",
      })
      .to(
        path,
        {
          attr: { fill: "url(#heartFade)" },
          duration: 2,
          ease: "power1.inOut",
        },
        "-=1"
      )
      .to(
        containerRef.current,
        {
          boxShadow: "0 0 40px rgba(249, 168, 212, 0.6)",
          duration: 1.5,
          ease: "power1.out",
        },
        "-=1.5"
      );
  }, [isRevealed, key]);

  const replay = () => {
    setAnimDone(false);
    setKey((k) => k + 1);
    if (pathRef.current) {
      pathRef.current.style.fill = "none";
    }
    if (containerRef.current) {
      containerRef.current.style.boxShadow = "none";
    }
  };

  return (
    <Card
      index={index}
      title="BFF Heart"
      emoji="💛"
      isRevealed={isRevealed}
      isAnimating={isAnimating}
      canOpen={canOpen}
      onOpen={onOpen}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div
          ref={containerRef}
          className="w-48 h-48 rounded-2xl flex items-center justify-center transition-shadow duration-700"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-40 h-40"
            key={key}
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#fdba74" />
              </linearGradient>
              <linearGradient id="heartFade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fdba74" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M50 88 C20 60, 0 40, 0 24 C0 10, 14 2, 28 10 C38 16, 50 30, 50 30 C50 30, 62 16, 72 10 C86 2, 100 10, 100 24 C100 40, 80 60, 50 88Z"
              fill="none"
              stroke="url(#heartGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-white/50 text-sm text-center max-w-xs leading-relaxed">
          {animDone ? "A heart just for you ❤️" : "Creating your heart..."}
        </p>
        {animDone && (
          <button
            onClick={replay}
            className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors cursor-pointer"
          >
            Watch Again
          </button>
        )}
      </motion.div>
    </Card>
  );
}
