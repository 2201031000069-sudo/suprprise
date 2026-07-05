"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "../components/LandingPage";
import QuoteCard from "../components/QuoteCard";
import AnimationCard from "../components/AnimationCard";
import ChocolateCard from "../components/ChocolateCard";
import WishCard from "../components/WishCard";
import ProgressBar from "../components/ProgressBar";
import MusicToggle from "../components/MusicToggle";
import { useCardProgress } from "../hooks/useCardProgress";
import { useSequentialReveal } from "../hooks/useSequentialReveal";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { openedCount, markOpened, isOpened, reset, totalCards } = useCardProgress();
  const { animatingCard, revealedCards, canOpen, openCard, onAnimationComplete, allRevealed } =
    useSequentialReveal(totalCards, openedCount, markOpened);

  const hasProgress = openedCount > 0;

  const goToCard = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, totalCards - 1)));
  }, [totalCards]);

  const handleAnimationComplete = useCallback(
    (index: number) => {
      onAnimationComplete(index);
      if (index < totalCards - 1) {
        setTimeout(() => goToCard(index + 1), 10000);
      }
    },
    [onAnimationComplete, goToCard, totalCards]
  );

  const cards = [
    { component: QuoteCard, index: 0 },
    { component: AnimationCard, index: 1 },
    { component: ChocolateCard, index: 2 },
    { component: WishCard, index: 3 },
  ];

  return (
    <>
      <MusicToggle />
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} hasProgress={hasProgress} />
      ) : (
        <div className="relative h-dvh flex flex-col items-center overflow-hidden">
          <div className="flex flex-col items-center gap-2 pt-8 pb-4">
            <h1 className="text-2xl font-poppins font-semibold bg-gradient-to-r from-pink-300 via-purple-300 to-orange-200 bg-clip-text text-transparent">
              Good Morning ☀️
            </h1>
            <ProgressBar current={revealedCards.length} total={totalCards} activeIndex={activeIndex} />
          </div>

          <div className="relative flex-1 w-full flex items-center overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="w-full max-w-md mx-auto"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {cards
                  .filter((c) => c.index === activeIndex)
                  .map(({ component: CardComponent, index: i }) => (
                    <CardComponent
                      key={i}
                      index={i}
                      isRevealed={revealedCards.includes(i) || isOpened(i)}
                      isAnimating={animatingCard === i}
                      canOpen={canOpen(i)}
                      onOpen={() => openCard(i)}
                      onAnimationComplete={() => handleAnimationComplete(i)}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>

            {activeIndex > 0 && (
              <button
                onClick={() => goToCard(activeIndex - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10 cursor-pointer"
                aria-label="Previous card"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {activeIndex < totalCards - 1 && (
              <button
                onClick={() => goToCard(activeIndex + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10 cursor-pointer"
                aria-label="Next card"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex gap-2 pb-6">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 w-6"
                    : i < revealedCards.length
                    ? "bg-purple-400/60"
                    : "bg-white/20"
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
