"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  "Design",
  "Development", 
  "Motion",
  "Strategy",
  "Branding",
  "Innovation",
];

// Create reversed array without mutating original
const wordsReversed = [...words].reverse();

export default function ScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Create stable arrays for rendering
  const row1Words = [...words, ...words, ...words];
  const row2Words = [...wordsReversed, ...wordsReversed, ...wordsReversed];

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 overflow-hidden bg-[#F8F8F8]"
    >
      <motion.div style={{ opacity }}>
        {/* First row - scrolls left */}
        <motion.div 
          style={{ x: x1 }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap mb-6"
        >
          {row1Words.map((word, index) => (
            <div key={`row1-${index}`} className="flex items-center gap-8 sm:gap-12">
              <span className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-black/10">
                {word}
              </span>
              <span className="text-3xl sm:text-5xl text-black/20">✦</span>
            </div>
          ))}
        </motion.div>

        {/* Second row - scrolls right */}
        <motion.div 
          style={{ x: x2 }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap"
        >
          {row2Words.map((word, index) => (
            <div key={`row2-${index}`} className="flex items-center gap-8 sm:gap-12">
              <span 
                className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent"
                style={{ WebkitTextStroke: "2px rgba(0, 0, 0, 0.1)" }}
              >
                {word}
              </span>
              <span className="text-3xl sm:text-5xl text-black/20">◆</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
