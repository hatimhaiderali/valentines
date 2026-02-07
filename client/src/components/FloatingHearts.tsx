import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Generates random hearts in the background
export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; scale: number; duration: number }[]>([]);

  useEffect(() => {
    // Create initial batch of hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      scale: 0.5 + Math.random() * 0.5,
      duration: 10 + Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-primary/20"
          initial={{ x: `${heart.x}vw`, y: "110vh", rotate: 0 }}
          animate={{ 
            y: "-10vh",
            x: `${heart.x + (Math.random() * 10 - 5)}vw`, // slight horizontal drift
            rotate: 360 
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          style={{ 
            fontSize: `${heart.scale * 3}rem`,
            filter: "blur(1px)"
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
