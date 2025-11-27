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

  const card1X = smooth1 * 40;
  const card2X = smooth2 * -40;
  const card3X = smooth3 * 40;

  const card1Y = floatWave(0, 22) + wave * 25;
  const card2Y = floatWave(1.3, 26) + wave * 27;
  const card3Y = floatWave(2.1, 20) + wave * 24;

  const rotate1 = wave * 50 - 20;
  const rotate2 = wave * -60 + 25;
  const rotate3 = wave * 45 - 15;

  const translateX = 150 - progress * 620;
  const translateY = progress * sectionHeight;

  const cards = [
    {
      title: "Ship more",
      subtitle: "stress less",
      icon: "⚡",
      position: { top: "20%", left: "28%" },
      transform: { x: card1X, y: card1Y, rotate: rotate1 },
      bg: "bg-[#DCDFFF]",
    },
    {
      title: "Clear brands",
      subtitle: "that grow",
      icon: "✦",
      position: { top: "33%", right: "18%" },
      transform: { x: card2X, y: card2Y, rotate: rotate2 },
      bg: "bg-[#E9DCC8]",
    },
    {
      title: "Fast websites",
      subtitle: "that convert",
      icon: "◈",
      position: { top: "48%", left: "42%" },
      transform: { x: card3X, y: card3Y, rotate: rotate3 },
      bg: "bg-[#DCDFFF]",
    },
    {
      title: "Videos people",
      subtitle: "want to watch",
      icon: "▶",
      position: { top: "65%", right: "18%" },
      transform: { x: card2X, y: card2Y, rotate: rotate2 },
      bg: "bg-[#E9DCC8]",
    },
    {
      title: "Smart use",
      subtitle: "of AI",
      icon: "◎",
      position: { top: "75%", left: "28%" },
      transform: { x: card1X, y: card1Y, rotate: rotate1 },
      bg: "bg-[#DCDFFF]",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="h-[300vh] bg-white relative overflow-hidden"
    >
      {/* Scrolling text */}
      <div
        className="absolute font-bold text-black origin-left"
        style={{
          transform: `translate(${translateX}%, ${translateY}px)`,
          fontSize: "14rem",
          whiteSpace: "nowrap",
        }}
      >
        the winning edge
      </div>

      <div
        className="absolute font-bold text-black origin-left"
        style={{
          transform: `translate(${translateX + 190}%, ${translateY}px)`,
          fontSize: "14rem",
          whiteSpace: "nowrap",
        }}
      >
        the winning edge
      </div>

      {/* Floating cards */}
      {cards.map((card, index) => (
        <div
          key={index}
          className="absolute"
          style={card.position as React.CSSProperties}
        >
          <div
            className={`${card.bg} p-6 rounded-3xl shadow-xl w-[340px] h-[260px] flex flex-col justify-between`}
            style={{
              transform: `translate(${card.transform.x}px, ${card.transform.y}px) rotate(${card.transform.rotate}deg)`,
            }}
          >
            <div>
              <p className="text-2xl text-black leading-tight font-semibold">
                {card.title}
                <br />
                <span className="text-black/60">{card.subtitle}</span>
              </p>
            </div>
            <div className="text-4xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
