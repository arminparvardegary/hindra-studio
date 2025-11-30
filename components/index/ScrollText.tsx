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
  

  const scaleX = 1;
  const translateX = 150 - progress * 620;
  const translateY = progress * sectionHeight;

  return (
    <div
      ref={sectionRef}
      className="h-[300vh] bg-[#faf9f5] relative overflow-hidden"
    >
      <div
        className="absolute font-bold text-[#111] origin-left"
        style={{
          transform: `translate(${translateX}%, ${translateY}px) scaleX(${scaleX})`,
          fontSize: "14rem",
          whiteSpace: "nowrap",
        }}
      >
        craft that converts
      </div>

      <div
  className="absolute font-bold text-[#111] origin-left"
  style={{
    transform: `translate(${translateX + 190}%, ${translateY}px) scaleX(${scaleX})`,
    fontSize: "14rem",
    whiteSpace: "nowrap",
  }}
>
  craft that converts
</div>

      <div className="absolute" style={{ top: "20%", left: "28%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`
          }}
        >
          <p className="text-[1.2rem] text-[#202020] leading-tight">
            Strategy first,<br /> design second
          </p>
          <div className="text-[2rem] font-light mt-2">01</div>
        </div>
      </div>

     
      <div className="absolute" style={{ top: "33%", right: "18%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`
          }}
        >
          <p className="text-[1.2rem] text-[#202020] leading-tight">
            Pixel perfect<br /> execution
          </p>
          <div className="text-[2rem] font-light mt-2">02</div>
        </div>
      </div>


      <div className="absolute" style={{ top: "48%", left: "42%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card3X}px, ${card3Y}px) rotate(${rotate3}deg)`
          }}
        >
          <p className="text-[1.2rem] text-[#202020] leading-tight">
            Results that<br /> move the<br /> needle
          </p>
          <div className="text-[2rem] font-light mt-2">03</div>
        </div>
      </div>
      
      <div className="absolute" style={{ top: "65%", right: "18%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`
          }}
        >
          <p className="text-[1.2rem] text-[#202020] leading-tight">
            On time,<br /> every time
          </p>
          <div className="text-[2rem] font-light mt-2">04</div>
        </div>
      </div>

      <div className="absolute" style={{ top: "75%", left: "28%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`
          }}
        >
          <p className="text-[1.2rem] text-[#202020] leading-tight">
            Dedicated<br /> partnership
          </p>
          <div className="text-[2rem] font-light mt-2">05</div>
        </div>
      </div>

 
    </div>
  );
}
