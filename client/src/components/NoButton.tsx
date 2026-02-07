import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface NoButtonProps {
  onInteraction: () => void;
}

export function NoButton({ onInteraction }: NoButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const phrases = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Don't do this!",
    "Have a heart!",
    "Why??",
    "Last chance!",
    "Pretty please?",
    "💔",
  ];

  const moveButton = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const padding = 40;

    const minX = padding;
    const maxX = vw - rect.width - padding;
    const minY = padding;
    const maxY = vh - rect.height - padding;

    // Pick random target position on screen
    let targetX = Math.random() * (maxX - minX) + minX;
    let targetY = Math.random() * (maxY - minY) + minY;

    // Prevent tiny moves (feels better)
    const dx = targetX - rect.left;
    const dy = targetY - rect.top;
    if (Math.sqrt(dx * dx + dy * dy) < 100) {
      targetX = rect.left + (dx >= 0 ? 180 : -180) + (Math.random() * 80 - 40);
      targetY = rect.top + (dy >= 0 ? 180 : -180) + (Math.random() * 80 - 40);

      // Clamp again
      targetX = Math.max(minX, Math.min(maxX, targetX));
      targetY = Math.max(minY, Math.min(maxY, targetY));
    }

    // This is the key fix: calculate delta from current visual position
    const deltaX = targetX - rect.left;
    const deltaY = targetY - rect.top;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setPhraseIndex((prev) => (prev + 1) % phrases.length);
    onInteraction();
  };

  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onHoverStart={moveButton}
      onClick={moveButton}
      className="inline-block relative z-50"
    >
      <Button
        ref={buttonRef}
        variant="secondary"
        className="text-xl px-8 py-6 rounded-full font-bold shadow-lg hover:bg-destructive/20 transition-colors duration-200"
      >
        {phrases[phraseIndex]}
      </Button>
    </motion.div>
  );
}