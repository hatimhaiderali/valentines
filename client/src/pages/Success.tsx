import { useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/card";
import { FloatingHearts } from "@/components/FloatingHearts";

// Cute bear/love animation
const bearAnimationUrl = "https://assets10.lottiefiles.com/packages/lf20_u4yrau.json";

export default function Success() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Fetch the animation JSON
    fetch(bearAnimationUrl)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie", err));

    // Trigger more confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  // Simple state to load animation, avoiding nextjs/ssr issues in generic environments (though this is Vite)
  // We imported useState but didn't declare it in the import above, let's fix that.
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-100 to-red-50">
      <FloatingHearts />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="z-10 w-full max-w-2xl text-center"
      >
        <Card className="bg-white/80 backdrop-blur-md border-4 border-primary/20 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/10">
          <motion.h1 
            className="text-4xl md:text-6xl text-primary font-display mb-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            YAYYY! ❤️
          </motion.h1>
          
          <div className="w-64 h-64 mx-auto mb-8">
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>

          <p className="text-xl md:text-3xl font-body text-foreground mb-6 leading-relaxed">
            I knew you'd say yes! <br/>
            You've made me the happiest person in the world!
          </p>

          <p className="text-lg text-muted-foreground font-hand italic">
            Get ready for the best Valentine's Day ever! 🌹
          </p>
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {/* Gallery of cute gifs */}
            <img 
              src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" 
              alt="Cute cat love" 
              className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-pink-200"
            />
            <img 
              src="https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif" 
              alt="Heart animation" 
              className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-pink-200"
            />
             <img 
              src="https://media.giphy.com/media/MeIucAjPKoA120R7sN/giphy.gif" 
              alt="Love bear" 
              className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-pink-200"
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// Helper for the missing import in the main component
import { useState } from "react";
