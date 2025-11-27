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

export default function ScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

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
          {[...words, ...words, ...words].map((word, index) => (
            <div key={index} className="flex items-center gap-8 sm:gap-12">
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
          {[...words.reverse(), ...words, ...words].map((word, index) => (
            <div key={index} className="flex items-center gap-8 sm:gap-12">
              <span className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent stroke-text">
                {word}
              </span>
              <span className="text-3xl sm:text-5xl text-black/20">◆</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Add CSS for stroke text */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}
