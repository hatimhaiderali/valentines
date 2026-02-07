import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/card";
import { FloatingHearts } from "@/components/FloatingHearts";

// Cute bear/love animation
const bearAnimationUrl = "https://assets10.lottiefiles.com/packages/lf20_u4yrau.json";

export default function Success() {
  const [animationData, setAnimationData] = useState<any>(null);
  const [showLoveDeclaration, setShowLoveDeclaration] = useState(false);
  const [fillScreen, setFillScreen] = useState(false);

  useEffect(() => {
    // Fetch the animation JSON
    fetch(bearAnimationUrl)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie", err));

    // Play romantic, playful and cheery celebrating music
    const audio = new Audio("https://www.bensound.com/bensound-music/bensound-ukulele.mp3");
    audio.volume = 0.5;
    audio.loop = true;
    audio.play().catch(err => console.error("Failed to play audio", err));

    // Trigger more confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
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
        <Card className="bg-white/80 backdrop-blur-md border-4 border-primary/20 p-4 md:p-8 rounded-[2rem] shadow-2xl shadow-primary/10 relative">
          <motion.h1
            className="text-3xl md:text-5xl text-primary font-display mb-1 text-center"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            YAYYY! ❤️
          </motion.h1>

          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto -mt-12 md:-mt-16 mb-1 relative z-20">
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>

          <motion.div
            className="text-4xl md:text-6xl text-center mb-3"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            🎉
          </motion.div>

          <p className="text-base md:text-2xl font-body text-foreground mb-4 leading-relaxed">
            I knew you'd say yes, Sabika! <br />
            You've made me the happiest person in the world!
          </p>

          <p className="text-sm md:text-base text-muted-foreground font-hand italic mb-6">
            You are my today 🌅, my tomorrow 🌙, and my forever ♾️. Thankyou for being my wife 💍, my love ❤️, My bestfriend 👯. 🌹
            I love you endlessly.
          </p>

          <motion.button
            onClick={() => setShowLoveDeclaration(true)}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl md:text-7xl cursor-pointer filter hover:drop-shadow-lg transition-all inline-block"
          >
            💌
          </motion.button>
          <p className="text-muted-foreground text-xs mt-3">Click the letter to read more</p>
        </Card>
      </motion.div>

      {/* Letter Modal Overlay */}
      {showLoveDeclaration && !fillScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowLoveDeclaration(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-md border-4 border-primary/30 p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <p className="text-4xl mb-2">💌</p>
              <h2 className="text-3xl font-display text-primary mb-4">My Dearest Sabika</h2>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-foreground leading-relaxed font-hand mb-8 text-justify"
            >
              Happy Valentine’s Day to my forever favorite person. You are my best friend, my safe place, and the love that makes every ordinary day feel special. Your laugh still melts me, your kindness still amazes me, and loving you is the easiest and best thing I’ve ever done. Thank you for being you, for choosing us every day, and for filling my life with so much love. I’m endlessly grateful for you today and always❤️
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 justify-center flex-wrap"
            >
              <motion.button
                onClick={() => setFillScreen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-primary/90 transition-all"
              >
                I Love You Too! 💕
              </motion.button>
              <motion.button
                onClick={() => setShowLoveDeclaration(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-400 transition-all"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Full Screen I Love You Overlay */}
      {fillScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gradient-to-br from-pink-300 via-red-200 to-rose-300 flex items-center justify-center overflow-hidden z-50"
        >
          {/* Large centered I LOVE YOU */}
          <div className="text-center relative">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-8xl md:text-9xl font-bold text-white drop-shadow-2xl mb-8 leading-tight"
            >
              I LOVE<br />YOU
            </motion.h1>

            {/* Floating I LOVE YOU texts */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity
                }}
                className="absolute text-3xl md:text-5xl font-bold text-white/80 drop-shadow-lg"
              >
                ❤️ I LOVE YOU ❤️
              </motion.div>
            ))}
          </div>

          {/* Click to close */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setFillScreen(false)}
            className="absolute bottom-8 text-white text-lg cursor-pointer hover:underline font-semibold"
          >
            Click anywhere to go back
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
