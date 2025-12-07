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
      className="h-[150vh] bg-[#faf9f5] relative overflow-hidden"
    >
      <div
        className="absolute font-bold text-[#111] origin-left"
        style={{
          transform: `translate(${translateX}%, ${translateY - 250}px) scaleX(${scaleX})`,
          fontSize: "14rem",
          whiteSpace: "nowrap",
        }}
      >
        craft that converts
      </div>

      <div
  className="absolute font-bold text-[#111] origin-left"
  style={{
    transform: `translate(${translateX + 190}%, ${translateY - 200}px) scaleX(${scaleX})`,
    fontSize: "14rem",
    whiteSpace: "nowrap",
  }}
>
  craft that converts
</div>

      <div className="absolute" style={{ top: "10%", left: "28%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`
          }}
        >
      <h3 className="text-2xl font-bold text-black mt-4 mb-5">
    Brand Identity & Positioning
  </h3>


  <p className="text-sm text-black mb-10 leading-relaxed">
    We shape a clear, consistent brand that actually supports your sales and growth.
  </p>


  <ul className="list-disc list-inside  text-sm text-gray-800 space-y-2 mt-2">
    <li>Visual identity, logo, and brand kit</li>
    <li>Messaging and positioning for your ideal clients</li>
    <li>Guidelines your team can actually use</li>
  </ul>
        </div>
      </div>

     
      <div className="absolute" style={{ top: "35%", right: "18%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`
          }}
        >
          <h3 className="text-2xl font-bold text-black mt-4 mb-5">
          Conversion-Focused Websites  </h3>

  
  <p className="text-sm text-black mb-10 leading-relaxed">
  We design and build fast, modern websites that turn visitors into leads and clients.  </p>

  
  <ul className="list-disc pl-4 list-outside text-sm text-gray-800 space-y-2 mt-2">
    <li>UX/UI design for desktop and mobile</li>
    <li>Landing pages, service pages, and funnels</li>
    <li>Built on modern, maintainable stacks (Webflow / Next.js)</li>
  </ul>
        </div>
      </div>


      <div className="absolute" style={{ top: "60%", left: "30%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card3X}px, ${card3Y}px) rotate(${rotate3}deg)`
          }}
        >
          <h3 className="text-2xl font-bold text-black mt-4 mb-5">
          Automation & Systems
  </h3>

 
  <p className="text-sm text-black mb-10 leading-relaxed">
  We connect your tools and automate repetitive work so your team can focus on real work.
  </p>

 
  <ul className="list-disc list-inside  text-sm text-gray-800 space-y-2 mt-2">
    <li>CRM, email, and form integrations</li>
    <li>Automated lead capture and follow-ups</li>
    <li>Internal workflows with tools like n8n, Zapier, Make</li>
  </ul>
        </div>
      </div>
      {/* 
      <div className="absolute" style={{ top: "65%", right: "18%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card2X}px, ${card2Y}px) rotate(${rotate2}deg)`
          }}
        >
                 <h3 className="text-2xl font-bold text-black mt-4 mb-5">
          Automation & Systems
  </h3>

 
  <p className="text-sm text-black mb-10 leading-relaxed">
  We connect your tools and automate repetitive work so your team can focus on real work.
  </p>


  <ul className="list-disc list-inside  text-sm text-gray-800 space-y-2 mt-2">
    <li>CRM, email, and form integrations</li>
    <li>Automated lead capture and follow-ups</li>
    <li>Internal workflows with tools like n8n, Zapier, Make</li>
  </ul>
        </div>
      </div>

      <div className="absolute" style={{ top: "75%", left: "28%" }}>
        <div
          className="bg-[#f3f2ec] p-6 rounded-xl shadow-2xl w-[400px] h-[300px]"
          style={{
            transform: `translate(${card1X}px, ${card1Y}px) rotate(${rotate1}deg)`
          }}
        >
          <h3 className="text-2xl font-bold text-black mt-4 mb-5">
          Automation & Systems
  </h3>


  <p className="text-sm text-black mb-10 leading-relaxed">
  We connect your tools and automate repetitive work so your team can focus on real work.
  </p>

 
  <ul className="list-disc list-inside  text-sm text-gray-800 space-y-2 mt-2">
    <li>CRM, email, and form integrations</li>
    <li>Automated lead capture and follow-ups</li>
    <li>Internal workflows with tools like n8n, Zapier, Make</li>
  </ul>
        </div>
      </div>*/}

 
    </div>
  );
}
