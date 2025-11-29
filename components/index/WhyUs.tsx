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

  return (
    <section ref={sectionRef} className="relative min-h-[350vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        <div className="relative w-full h-full">
          <img
            src="/Group 1000003103 (1).svg"
            className="absolute inset-0 w-full h-full  opacity-20"
            alt="background"
          />

          <img
            src="/Group 1000003103 (1).svg"
            className="absolute inset-0 w-[100%] h-[100%]  transition-all duration-1000 ease-out"
            style={{
              clipPath:
                step === 0
                  ? "inset(0 50% 0 50%)"
                  : "inset(0 0 0 0)",
              transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
              transformOrigin: "center center",
            }}
            alt="main"
          />

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div
              className={`absolute transition-all duration-700 ${
                step === 0
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-5xl font-bold text-black">Why Us</h2>
              <p className="text-gray-800 mt-2">
              Because we don't just design, we pursue innovation. We create projects that get noticed,<br/> felt, and remembered.              </p>
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
              From brand identity and design to motion and web coding, we build everything in-house. We<br/> help brands deliver seamless and creative experiences.              </p>
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
              We're a creative studio focused on branding, product design, and web development. With<br/> a minimalist approach, we create simple, precise, and impactful experiences.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
