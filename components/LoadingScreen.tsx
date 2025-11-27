"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast loading simulation
    const duration = 1500; // 1.5 seconds total
    const interval = 50; // update every 50ms
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Image
              src="/icons/Logo.svg"
              alt="Hindra"
              width={60}
              height={60}
              className="invert"
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#DCDFFF] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <motion.div
              className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-[#DCDFFF]/20 blur-[100px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
