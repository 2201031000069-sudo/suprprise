"use client";

import { useState, useCallback } from "react";

export function useSequentialReveal(totalCards: number, openedCount: number, markOpened: (i: number) => void) {
  const [animatingCard, setAnimatingCard] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const canOpen = useCallback(
    (cardIndex: number) => {
      if (animatingCard !== null) return false;
      if (revealedCards.includes(cardIndex)) return false;
      if (cardIndex > openedCount) return false;
      return true;
    },
    [animatingCard, revealedCards, openedCount]
  );

  const openCard = useCallback(
    (cardIndex: number) => {
      if (!canOpen(cardIndex)) return;
      setAnimatingCard(cardIndex);
    },
    [canOpen]
  );

  const onAnimationComplete = useCallback(
    (cardIndex: number) => {
      markOpened(cardIndex);
      setRevealedCards((prev) => [...prev, cardIndex]);
      setAnimatingCard(null);
    },
    [markOpened]
  );

  const allRevealed = revealedCards.length >= totalCards;

  return { animatingCard, revealedCards, canOpen, openCard, onAnimationComplete, allRevealed };
}
