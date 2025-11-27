"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "Hindra Studio transformed our brand identity completely. Their attention to detail and creative vision exceeded our expectations.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    quote: "Working with them was a game-changer. Our new website increased conversions by 150% in just three months.",
    author: "Michael Torres",
    role: "Founder, Bloom",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    quote: "The motion design work they delivered was absolutely stunning. Our brand videos now actually get watched till the end.",
    author: "Emily Watson",
    role: "Marketing Director, Artisan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const logos = [
  { name: "Carsome", src: "/logo-carsome.webp" },
  { name: "Kumu", src: "/logo-kumu_2025-04-02-191834_xdcl.webp" },
  { name: "Van Heusen", src: "/logo-vanheusen.webp" },
  { name: "Ford", src: "/images/ford.png" },
];

export default function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#DCDFFF]/30 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container-custom relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag mb-4">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4">
            What clients say
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say 
            about working with us.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#F8F8F8] rounded-3xl p-8 sm:p-12 lg:p-16">
            {/* Quote icon */}
            <div className="absolute top-8 left-8 text-6xl text-black/10 font-serif">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl text-black leading-relaxed mb-8">
                  {testimonials[activeIndex].quote}
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 ring-4 ring-white">
                    <Image
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-lg font-semibold text-black">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-sm text-black/50">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex 
                        ? "w-8 bg-black" 
                        : "bg-black/20 hover:bg-black/40"
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="mt-20">
          <p className="text-center text-sm text-black/40 uppercase tracking-widest mb-8">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative h-10 w-28 grayscale hover:grayscale-0 transition-all"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
