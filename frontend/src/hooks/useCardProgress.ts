"use client";

import { useState, useCallback } from "react";

export function useCardProgress() {
  const [openedCount, setOpenedCount] = useState(0);

  const markOpened = useCallback((cardIndex: number) => {
    setOpenedCount((prev) => Math.max(prev, cardIndex + 1));
  }, []);

  const isOpened = useCallback(
    (cardIndex: number) => cardIndex < openedCount,
    [openedCount]
  );

  const reset = useCallback(() => {
    setOpenedCount(0);
  }, []);

  return { openedCount, markOpened, isOpened, reset, totalCards: 4 };
}
