"use client";

import { useEffect, useRef, useState } from "react";

const cardContent = [
  {
    number: "01",
    title: "Strategy First",
    description: "Every great design starts with understanding the why behind the project",
  },
  {
    number: "02",
    title: "Pixel Perfect",
    description: "Obsessive attention to every detail ensures quality that stands out",
  },
  {
    number: "03",
    title: "Fast Delivery",
    description: "Quality work, delivered on time, every time without compromise",
  },
  {
    number: "04",
    title: "Always On",
    description: "Dedicated support and communication throughout every project",
  },
  {
    number: "05",
    title: "Results Driven",
    description: "Design that moves the needle and delivers measurable outcomes",
  },
];

export default function LongScrollingText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [smooth1, setSmooth1] = useState(0);
  const [smooth2, setSmooth2] = useState(0);
  const [smooth3, setSmooth3] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const startOffset = 0.12;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      let raw = (winH - rect.top) / (rect.height + winH);
      raw = Math.min(1, Math.max(0, raw));

      if (raw < startOffset) {
        setProgress(0);
      } else {
        setProgress((raw - startOffset) / (1 - startOffset));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setSmooth1((p) => lerp(p, progress, 0.04));
      setSmooth2((p) => lerp(p, progress, 0.035));
      setSmooth3((p) => lerp(p, progress, 0.045));
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [progress]);

  const wave = Math.sin(progress * Math.PI);
  const floatWave = (phase: number, power = 18) =>
    Math.sin(progress * Math.PI * 2 + phase) * power;

  const card1X = smooth1 * 40;
  const card2X = smooth2 * -40;
  const card3X = smooth3 * 40;

  const card1Y = floatWave(0, 22) + wave * 25;
  const card2Y = floatWave(1.3, 26) + wave * 27;
  const card3Y = floatWave(2.1, 20) + wave * 24;

  const rotate1 = wave * 50 - 20;
  const rotate2 = wave * -60 + 25;
  const rotate3 = wave * 45 - 15;

  const scaleX = 1;
  const translateX = 150 - progress * 620;
  const translateY = progress * sectionHeight;

  return (
    <section
      ref={sectionRef}
      className="h-[300vh] bg-gradient-to-b from-[#faf9f5] to-white relative overflow-hidden"
      aria-label="Our approach section"
    >
      {/* First text line */}
      <div
        className="absolute font-bold text-black origin-left select-none pointer-events-none"
        style={{
          transform: `translate(${translateX}%, ${translateY}px) scaleX(${scaleX})`,
          fontSize: "clamp(6rem, 15vw, 14rem)",
          whiteSpace: "nowrap",
        }}
        aria-hidden="true"
      >
        craft that converts
      </div>

      {/* Second text line */}
      <div
        className="absolute font-bold text-black/10 origin-left select-none pointer-events-none"
        style={{
          transform: `translate(${translateX + 190}%, ${translateY}px) scaleX(${scaleX})`,
          fontSize: "clamp(6rem, 15vw, 14rem)",
          whiteSpace: "nowrap",
        }}
        aria-hidden="true"
      >
        craft that converts
      </div>

      {/* Floating Cards */}
      <article className="absolute hidden lg:block" style={{ top: "20%", left: "20%" }}>
        <div
          className="bg-white p-8 rounded-2xl shadow-2xl w-[320px] border border-gray-100"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`,
          }}
        >
          <span className="text-sm font-mono text-gray-400 mb-4 block">{cardContent[0].number}</span>
          <p className="text-xl font-semibold text-black mb-2">
            {cardContent[0].title}
          </p>
          <p className="text-gray-500 text-sm">{cardContent[0].description}</p>
        </div>
      </article>

      <article className="absolute hidden lg:block" style={{ top: "35%", right: "15%" }}>
        <div
          className="bg-[#DCDFFF] p-8 rounded-2xl shadow-2xl w-[320px]"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`,
          }}
        >
          <span className="text-sm font-mono text-black/40 mb-4 block">{cardContent[1].number}</span>
          <p className="text-xl font-semibold text-black mb-2">
            {cardContent[1].title}
          </p>
          <p className="text-gray-700 text-sm">{cardContent[1].description}</p>
        </div>
      </article>

      <article className="absolute hidden lg:block" style={{ top: "50%", left: "35%" }}>
        <div
          className="bg-[#E9DCC8] p-8 rounded-2xl shadow-2xl w-[320px]"
          style={{
            transform: `translate(${card3X}px, ${card3Y}px) rotate(${rotate3}deg)`,
          }}
        >
          <span className="text-sm font-mono text-black/40 mb-4 block">{cardContent[2].number}</span>
          <p className="text-xl font-semibold text-black mb-2">
            {cardContent[2].title}
          </p>
          <p className="text-gray-700 text-sm">{cardContent[2].description}</p>
        </div>
      </article>

      <article className="absolute hidden lg:block" style={{ top: "65%", right: "20%" }}>
        <div
          className="bg-white p-8 rounded-2xl shadow-2xl w-[320px] border border-gray-100"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`,
          }}
        >
          <span className="text-sm font-mono text-gray-400 mb-4 block">{cardContent[3].number}</span>
          <p className="text-xl font-semibold text-black mb-2">
            {cardContent[3].title}
          </p>
          <p className="text-gray-500 text-sm">{cardContent[3].description}</p>
        </div>
      </article>

      <article className="absolute hidden lg:block" style={{ top: "78%", left: "25%" }}>
        <div
          className="bg-black p-8 rounded-2xl shadow-2xl w-[320px]"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`,
          }}
        >
          <span className="text-sm font-mono text-white/40 mb-4 block">{cardContent[4].number}</span>
          <p className="text-xl font-semibold text-white mb-2">
            {cardContent[4].title}
          </p>
          <p className="text-gray-400 text-sm">{cardContent[4].description}</p>
        </div>
      </article>
    </section>
  );
}
