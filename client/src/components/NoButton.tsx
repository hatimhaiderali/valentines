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

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Button dimensions (approximate if not mounted, but ref helps)
    const btnWidth = buttonRef.current.offsetWidth || 100;
    const btnHeight = buttonRef.current.offsetHeight || 40;

    // Calculate safe area (padding from edges)
    const padding = 50;
    const maxX = viewportWidth - btnWidth - padding;
    const maxY = viewportHeight - btnHeight - padding;
    const minX = padding;
    const minY = padding;

    // Generate new random coordinates
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;
    
    // Calculate vector to move AWAY from center or current position slightly unpredictable
    // Actually, random position is usually chaotic enough and funnier
    
    // Adjust relative to current position to make it absolute on screen
    // Framer motion 'animate' uses transform, so we need relative or absolute positioning logic
    // Using absolute positioning for the container is easier for "running away" around the whole screen
    
    // However, the button is initially in a flow. 
    // Trick: We'll set the button to 'fixed' position once it starts moving? 
    // Or just translate it wildly.
    
    // Let's use simple random translation values that are large enough to jump
    // But constrained to stay on screen.
    // Actually, easier approach: Calculate random position within window bounds
    // relative to the button's initial position is hard.
    
    // Better approach: Random X/Y in viewport, minus offset of container center?
    // Let's just use a large constrained random range relative to start.
    
    const randomX = (Math.random() - 0.5) * 500; 
    const randomY = (Math.random() - 0.5) * 500;

    // Update state
    setPosition({ x: randomX, y: randomY });
    
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
