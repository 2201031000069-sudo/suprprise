"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { postWish } from "../hooks/useApi";

interface Props {
  index: number;
  isRevealed: boolean;
  isAnimating: boolean;
  canOpen: boolean;
  onOpen: () => void;
  onAnimationComplete: () => void;
}

export default function WishCard({
  index,
  isRevealed,
  isAnimating,
  canOpen,
  onOpen,
  onAnimationComplete,
}: Props) {
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);
  const [shooting, setShooting] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!wish.trim() || sending) return;
    setSending(true);
    setShooting(true);
    const result = await postWish(wish.trim());
    setSending(false);
    if (result?.success) {
      setSubmitted(true);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };

  return (
    <Card
      index={index}
      title="Make A Wish"
      emoji="⭐"
      isRevealed={isRevealed}
      isAnimating={isAnimating}
      canOpen={canOpen}
      onOpen={onOpen}
      onAnimationComplete={onAnimationComplete}
    >
      {shooting && (
        <motion.div
          className="absolute top-0 right-0 text-3xl pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: 300, y: -200, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => setShooting(false)}
        >
          ⭐
        </motion.div>
      )}

      <motion.div
        className="flex flex-col gap-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {!submitted ? (
          <>
            <textarea
              ref={inputRef}
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Write your wish..."
              className="w-full min-h-[120px] p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 resize-none focus:outline-none focus:border-purple-400 transition-colors"
              maxLength={500}
              aria-label="Write your wish"
            />
            <motion.button
              className="self-end px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg disabled:opacity-50 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!wish.trim() || sending}
              onClick={handleSubmit}
            >
              {sending ? "Sending..." : "Send Wish ✨"}
            </motion.button>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-3 py-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <motion.span
              className="text-5xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⭐
            </motion.span>
            <p className="text-white/80 text-center">
              Your wish has been sent to the stars ✨
            </p>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm z-50"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            ✨ Your wish has been sent to the stars ✨
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
