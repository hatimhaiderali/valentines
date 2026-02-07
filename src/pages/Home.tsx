import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";
import { NoButton } from "@/components/NoButton";

// Lottie URL
const heartAnimationUrl = "https://assets9.lottiefiles.com/packages/lf20_ot5gqdfc.json";

export default function Home() {
  const [_, setLocation] = useLocation();
  const [heartData, setHeartData] = useState<any>(null);
  const [noInteractionCount, setNoInteractionCount] = useState(0);

  useEffect(() => {
    fetch(heartAnimationUrl)
      .then(res => res.json())
      .then(data => setHeartData(data))
      .catch(err => console.error("Lottie load failed", err));
  }, []);

  const handleYes = () => {
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
    });

    // Navigate after short delay to let confetti play
    setTimeout(() => {
      setLocation("/success");
    }, 800);
  };

  const handleNoInteraction = () => {
    setNoInteractionCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-300 via-fuchsia-200 to-pink-400">
      {/* Romantic candy-colored background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-5 w-80 h-80 bg-pink-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-5 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-rose-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <FloatingHearts />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-lg"
      >
        <Card className="backdrop-blur-sm bg-white/90 border-4 border-primary/20 p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center relative overflow-visible">
          
          {/* Decorative Header Animation */}
          <div className="w-40 h-40 mx-auto -mt-20 mb-4">
            {heartData && <Lottie animationData={heartData} loop={true} />}
          </div>

          <h1 className="text-5xl md:text-6xl text-primary mb-8 font-display leading-tight drop-shadow-sm">
            Will you be my Valentine?
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 font-hand px-4">
            I promise chocolates, bad jokes, and lots of love! 🌹
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-[120px]">
            {/* YES Button */}
            <motion.div
              animate={{ scale: 1 + noInteractionCount * 0.15 }}
              whileHover={{ scale: 1.1 + noInteractionCount * 0.15 }}
              whileTap={{ scale: 0.95 + noInteractionCount * 0.15 }}
            >
              <Button 
                onClick={handleYes}
                className="text-2xl px-10 py-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 transition-all font-display"
              >
                YES! ❤️
              </Button>
            </motion.div>

            {/* NO Button (The Runner) */}
            <NoButton onInteraction={handleNoInteraction} />
          </div>
        </Card>
      </motion.div>

      {/* Footer text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 text-primary/40 font-hand text-sm"
      >
        Made with ❤️ for you
      </motion.p>
    </div>
  );
}