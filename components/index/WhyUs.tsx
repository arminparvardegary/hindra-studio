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


  const slide = (p: number) => p * 200; 

  return (
    <section ref={sectionRef} className="relative min-h-[350vh] bg-white">

      <div className="sticky top-0 h-screen w-full overflow-hidden">

  
        <Image
          src="/Group 1000003103 (1).svg"
          alt="bg"
          fill
          priority
          className="object-cover opacity-20 pointer-events-none select-none"
          style={{ transform: "none" }}
        />

        <div className="absolute inset-0 flex items-center justify-center text-center">

   
          <div
            className="absolute transition-all duration-700"
            style={{
              opacity: step === 0 ? 1 : 0,
              transform:
                step === 0
                  ? "translateY(0px)"
                  : `translateY(-${slide(1)}px)` 
            }}
          >
            <h2 className="text-5xl font-bold text-black">Why Hindra</h2>
            <p className="text-gray-800 mt-2">
              One team for everything. Branding, websites, content.
            </p>
          </div>

          <div
            className="absolute transition-all duration-700"
            style={{
              opacity: step === 1 ? 1 : 0,
              transform:
                step < 1
                  ? `translateY(${slide(1)}px)`      
                  : step === 1
                  ? "translateY(0px)"               
                  : `translateY(${slide(1)}px)`     
            }}
          >
            <h2 className="text-5xl font-bold text-black">What We Do</h2>
            <p className="text-gray-800 mt-2">
              Complete brand packages: identity, social media, sites.
            </p>
          </div>

      
          <div
            className="absolute transition-all duration-700"
            style={{
              opacity: step === 2 ? 1 : 0,
              transform:
                step < 2
                  ? `translateY(-${slide(1)}px)` 
                  : "translateY(0px)"
            }}
          >
            <h2 className="text-5xl font-bold text-black">Who We Are</h2>
            <p className="text-gray-800 mt-2">
              Designers, developers, content creators working as one team.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;
