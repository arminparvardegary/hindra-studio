"use client";

import { useEffect, useRef, useState } from "react";

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
    const animate = () => {
      setSmooth1((p) => lerp(p, progress, 0.04));
      setSmooth2((p) => lerp(p, progress, 0.035));
      setSmooth3((p) => lerp(p, progress, 0.045));
      requestAnimationFrame(animate);
    };
    animate();
  }, [progress]);

  const wave = Math.sin(progress * Math.PI);

  const floatWave = (phase: number, power = 18) =>
    Math.sin(progress * Math.PI * 2 + phase) * power;

  // Responsive card movement (smaller on mobile)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const movementScale = isMobile ? 0.5 : 1;

  const card1X = smooth1 * 40 * movementScale;
  const card2X = smooth2 * -40 * movementScale;
  const card3X = smooth3 * 40 * movementScale;

  const card1Y = floatWave(0, 22 * movementScale) + wave * 25 * movementScale;
  const card2Y = floatWave(1.3, 26 * movementScale) + wave * 27 * movementScale;
  const card3Y = floatWave(2.1, 20 * movementScale) + wave * 24 * movementScale;

  const rotate1 = (wave * 50 - 20) * movementScale;
  const rotate2 = (wave * -60 + 25) * movementScale;
  const rotate3 = (wave * 45 - 15) * movementScale;

  const scaleX = 1;
  const translateX = 150 - progress * 620;
  const translateY = progress * sectionHeight;

  return (
    <div
      ref={sectionRef}
      className="min-h-[100vh] sm:min-h-[120vh] md:min-h-[150vh] bg-[#faf9f5] relative overflow-hidden"
    >
      {/* Scrolling text - z-index 1 (behind cards) */}
      <div
        className="absolute font-bold text-[#111] origin-left z-[1]"
        style={{
          transform: `translate(${translateX}%, ${translateY - 200}px) scaleX(${scaleX})`,
          fontSize: "clamp(2.5rem, 10vw, 14rem)",
          whiteSpace: "nowrap",
        }}
      >
        craft that converts
      </div>

      <div
        className="absolute font-bold text-[#111] origin-left z-[1]"
        style={{
          transform: `translate(${translateX + 190}%, ${translateY - 150}px) scaleX(${scaleX})`,
          fontSize: "clamp(2.5rem, 10vw, 14rem)",
          whiteSpace: "nowrap",
        }}
      >
        craft that converts
      </div>

      {/* Floating cards - z-index 10 (above text) - visible on all screen sizes */}
      {/* Card 1 */}
      <div
        className="absolute z-10"
        style={{
          top: "8%",
          left: "4%",
          right: "auto",
        }}
      >
        <div
          className="bg-[#f3f2ec] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl w-[85vw] sm:w-[320px] md:w-[320px] lg:w-[400px]"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`
          }}
        >
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black mb-2 sm:mb-3 md:mb-5">
            Brand Identity & Positioning
          </h3>
          <p className="text-xs sm:text-sm text-black/80 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
            We shape a clear, consistent brand that actually supports your sales and growth.
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800 space-y-1 sm:space-y-2">
            <li>Visual identity, logo, and brand kit</li>
            <li>Messaging and positioning for your ideal clients</li>
            <li className="hidden sm:list-item">Guidelines your team can actually use</li>
          </ul>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="absolute z-10"
        style={{
          top: "35%",
          right: "4%",
          left: "auto",
        }}
      >
        <div
          className="bg-[#f3f2ec] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl w-[85vw] sm:w-[320px] md:w-[320px] lg:w-[400px]"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`
          }}
        >
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black mb-2 sm:mb-3 md:mb-5">
            Conversion-Focused Websites
          </h3>
          <p className="text-xs sm:text-sm text-black/80 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
            We design and build fast, modern websites that turn visitors into leads and clients.
          </p>
          <ul className="list-disc pl-4 list-outside text-xs sm:text-sm text-gray-800 space-y-1 sm:space-y-2">
            <li>UX/UI design for desktop and mobile</li>
            <li>Landing pages, service pages, and funnels</li>
            <li className="hidden sm:list-item">Built on modern, maintainable stacks</li>
          </ul>
        </div>
      </div>

      {/* Card 3 */}
      <div
        className="absolute z-10"
        style={{
          top: "62%",
          left: "4%",
          right: "auto",
        }}
      >
        <div
          className="bg-[#f3f2ec] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl w-[85vw] sm:w-[320px] md:w-[320px] lg:w-[400px]"
          style={{
            transform: `translate(${card3X}px, ${card3Y}px) rotate(${rotate3}deg)`
          }}
        >
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black mb-2 sm:mb-3 md:mb-5">
            Automation & Systems
          </h3>
          <p className="text-xs sm:text-sm text-black/80 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
            We connect your tools and automate repetitive work so your team can focus on real work.
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800 space-y-1 sm:space-y-2">
            <li>CRM, email, and form integrations</li>
            <li>Automated lead capture and follow-ups</li>
            <li className="hidden sm:list-item">Internal workflows with n8n, Zapier, Make</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

