"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const reasons = [
  {
    title: "Fast Turnaround",
    description: "We deliver high-quality work on tight deadlines without compromising quality.",
    icon: "⚡",
  },
  {
    title: "Clear Communication",
    description: "Regular updates and transparent processes keep you in the loop at all times.",
    icon: "💬",
  },
  {
    title: "Result-Driven",
    description: "Every design decision is made with your business goals in mind.",
    icon: "🎯",
  },
  {
    title: "Full Ownership",
    description: "All deliverables are 100% yours. No hidden fees, no licensing traps.",
    icon: "✓",
  },
];

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-black text-white overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full border border-white/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#DCDFFF]/10 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container-custom relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm text-white/70 mb-6"
            >
              Why Choose Us
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              We don&apos;t just design.
              <br />
              <span className="text-white/50">We solve problems.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/60 mb-8 max-w-lg"
            >
              We combine creativity with strategy to deliver solutions that not 
              only look great but drive real business results.
            </motion.p>

            {/* Reasons grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <motion.span 
                    className="text-3xl mb-4 block"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {reason.icon}
                  </motion.span>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/50">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#DCDFFF]/20 to-[#E9DCC8]/20">
              {/* Floating cards */}
              <motion.div
                className="absolute top-8 left-8 p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="text-4xl font-bold text-white">250+</div>
                <div className="text-sm text-white/60">Projects Completed</div>
              </motion.div>

              <motion.div
                className="absolute bottom-8 right-8 p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-sm text-white/60">Happy Clients</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-3xl bg-[#DCDFFF]/20 backdrop-blur-sm"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="text-6xl font-bold text-white">5.0</div>
                <div className="flex gap-1 mt-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <div className="text-sm text-white/60 mt-2 text-center">Average Rating</div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full border-2 border-white/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-12 h-12 rounded-full border-2 border-white/20"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
