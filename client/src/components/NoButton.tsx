import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NoButtonProps {
  onInteraction: () => void;
}

export function NoButton({ onInteraction }: NoButtonProps) {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Phrases that appear on the button as it runs away
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
    "💔"
  ];
  
  const [phraseIndex, setPhraseIndex] = useState(0);

  const moveButton = () => {
    if (!buttonRef.current) return;

    // Get current button position and dimensions
    const rect = buttonRef.current.getBoundingClientRect();
    const btnWidth = rect.width;
    const btnHeight = rect.height;

    // Viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Safe padding from viewport edges
    const padding = 20;

    // Calculate the range of movement to keep the button within the viewport
    // The motion.div is positioned relative to its initial position.
    // We need to find the initial center position to calculate bounds correctly.
    // However, a simpler way is to just use the current position and calculate a jump 
    // that doesn't exceed the viewport.
    
    // Let's use absolute positioning relative to the viewport for the "jump"
    // and translate it back to the relative motion coordinates.
    
    const maxX = vw - btnWidth - padding;
    const maxY = vh - btnHeight - padding;
    const minX = padding;
    const minY = padding;

    // Target absolute position in viewport
    const targetAbsX = Math.random() * (maxX - minX) + minX;
    const targetAbsY = Math.random() * (maxY - minY) + minY;

    // Calculate relative movement from the initial position
    // We can reset the motion div to be fixed or use a container ref.
    // Simpler: The button's initial position + translation = current position.
    // Translation = current position - initial position.
    
    // For this specific design, let's just use a very wide random range 
    // but subtract the button's own offset if we want to be precise.
    // Actually, setting state to random values between -window.innerWidth/2 and window.innerWidth/2
    // is roughly what was there. 
    
    // Let's fix it by using a better bounding box calculation.
    // Since the button is centered, its (0,0) is approximately (vw/2, vh/2).
    
    const centerX = vw / 2;
    const centerY = vh / 2;
    
    const relativeX = targetAbsX - centerX + (btnWidth / 2);
    const relativeY = targetAbsY - centerY + (btnHeight / 2);

    setPosition({ x: relativeX, y: relativeY });
    
    // Cycle phrases
    setPhraseIndex((prev) => (prev + 1) % phrases.length);
    
    // Notify parent
    onInteraction();
  };

  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
