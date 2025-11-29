"use client";
import React, { useRef, useEffect, useState } from "react";

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

  const content = [
    {
      title: "Why Hindra?",
      description: "We don't just design—we solve problems. Every project starts with deep understanding of your goals, your audience, and what makes you unique. The result? Work that doesn't just look good, but performs.",
      stats: [
        { value: "98%", label: "Client Satisfaction" },
        { value: "2x", label: "Average ROI" },
      ]
    },
    {
      title: "What We Do",
      description: "From brand strategy to web development, from motion design to product launches—we handle it all in-house. No outsourcing, no communication gaps. Just a seamless creative process that delivers results.",
      stats: [
        { value: "360°", label: "Full Service" },
        { value: "24/7", label: "Support" },
      ]
    },
    {
      title: "Who We Are",
      description: "A team of strategists, designers, and developers who believe great design is invisible—it just works. We're obsessed with craft, driven by curiosity, and committed to pushing boundaries.",
      stats: [
        { value: "15+", label: "Team Members" },
        { value: "8+", label: "Years Together" },
      ]
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[350vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* Background pattern */}
          <img
            src="/Group 1000003103 (1).svg"
            className="absolute inset-0 w-full h-full opacity-10"
            alt="background pattern"
          />

          {/* Animated pattern */}
          <img
            src="/Group 1000003103 (1).svg"
            className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out"
            style={{
              clipPath: step === 0 ? "inset(0 50% 0 50%)" : "inset(0 0 0 0)",
              transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
              transformOrigin: "center center",
              opacity: 0.3,
            }}
            alt="animated pattern"
          />

          {/* Content container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {content.map((item, index) => (
                <div
                  key={index}
                  className={`absolute left-1/2 -translate-x-1/2 w-full max-w-3xl text-center transition-all duration-700 ${
                    step === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    top: index === 2 ? "60%" : "50%",
                    transform: `translateX(-50%) translateY(${step === index ? (index === 2 ? "0" : "-50%") : "20px"})`,
                  }}
                >
                  <span className="inline-block px-4 py-1.5 bg-[#DCDFFF] text-black text-sm font-medium rounded-full mb-6">
                    0{index + 1}
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
                    {item.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-center gap-12">
                    {item.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-black">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === i ? "bg-black scale-150" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
