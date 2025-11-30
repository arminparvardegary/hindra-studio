"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const WhyUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const win = window.innerHeight;
      const newProgress = Math.min(
        Math.max(0, (win - rect.top) / (rect.height + win)),
        1
      );
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const step = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;

  const rotation = step === 2 ? 180 : 0;

  const translateY = step === 2 ? (progress - 0.66) / (1 - 0.66) * 150 : 0;

  return (
    <section ref={sectionRef} className="relative min-h-[350vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        <div className="relative w-full h-full">
          <Image
            src="/Group 1000003103 (1).svg"
            alt="Background decoration"
            fill
            className="object-cover opacity-20"
            priority
          />

          <div 
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              clipPath:
                step === 0
                  ? "inset(0 50% 0 50%)"
                  : "inset(0 0 0 0)",
              transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src="/Group 1000003103 (1).svg"
              alt="Main visual"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div
              className={`absolute transition-all duration-700 ${
                step === 0
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-5xl font-bold text-black">Why Hindra</h2>
              <p className="text-gray-800 mt-2">
              We solve problems through design. Every project starts with deep understanding<br/> of your goals, audience, and what makes you unique.              </p>
            </div>

            <div
              className={`absolute transition-all duration-700 ${
                step === 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-5xl font-bold text-black">What We Do</h2>
              <p className="text-gray-800 mt-2">
              From brand strategy to web development, from motion design to product launches.<br/> Everything in-house. No outsourcing, no communication gaps.              </p>
            </div>

            <div
              className={`absolute transition-all duration-700 ${
                step === 2
                  ? "opacity-100 translate-y-52"
                  : "opacity-0 translate-y-64"
              }`}
            >
              <h2 className="text-5xl font-bold text-black">Who We Are</h2>
              <p className="text-gray-800 mt-2">
              Strategists, designers, and developers who believe great design is invisible.<br/> Obsessed with craft, driven by curiosity, committed to results.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
