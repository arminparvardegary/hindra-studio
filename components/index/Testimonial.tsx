"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Testimonial() {
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardAnimation = useRef<number | null>(null);
  const cardXRef = useRef(0);
  const cardPausedRef = useRef(false);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    let x = 0;
    let frame: number;

    const tick = () => {
      x -= 2;
      el.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const tick = () => {
      if (!cardPausedRef.current) {
        cardXRef.current -= 1;
        el.style.transform = `translateX(${cardXRef.current}px)`;
      }
      cardAnimation.current = requestAnimationFrame(tick);
    };

    cardAnimation.current = requestAnimationFrame(tick);

    return () => {
      if (cardAnimation.current) cancelAnimationFrame(cardAnimation.current);
    };
  }, []);

  const pauseCards = () => {
    cardPausedRef.current = true;
    if (cardAnimation.current) cancelAnimationFrame(cardAnimation.current);
  };

  const resumeCards = () => {
    if (!cardPausedRef.current) return;
    cardPausedRef.current = false;
    cardAnimation.current = requestAnimationFrame(function tick() {
      if (!cardPausedRef.current) {
        cardXRef.current -= 1;
        cardRef.current!.style.transform = `translateX(${cardXRef.current}px)`;
      }
      cardAnimation.current = requestAnimationFrame(tick);
    });
  };

  const logos = [
    "/logo-carsome.webp",
    "/logo-kumu_2025-04-02-191834_xdcl.webp",
    "/logo-vanheusen.webp",
    "/logo-carsome.webp",
    "/logo-kumu_2025-04-02-191834_xdcl.webp",
    "/logo-vanheusen.webp",
  ];

  const infiniteLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos,...logos, ...logos, ...logos, ...logos, ...logos];

  const cards = [
    { 
      bg: "bg-[#DCDFFF]",
      content: (
        <div className="p-6">
          <p className="text-lg text-black/80 mb-4">&ldquo;Hindra transformed our brand completely. The attention to detail was exceptional.&rdquo;</p>
          <p className="text-sm font-medium text-black">Sarah Chen</p>
          <p className="text-xs text-black/60">CEO, TechFlow</p>
        </div>
      )
    },
    { 
      bg: "bg-[#E9DCC8]",
      content: (
        <div className="p-6">
          <p className="text-lg text-black/80 mb-4">&ldquo;Our conversion rate increased by 150% after the redesign. Highly recommended.&rdquo;</p>
          <p className="text-sm font-medium text-black">Michael Torres</p>
          <p className="text-xs text-black/60">Founder, Startup Labs</p>
        </div>
      )
    },
    { 
      bg: "bg-white",
      content: (
        <div className="p-6">
          <p className="text-lg text-black/80 mb-4">&ldquo;From concept to execution, they exceeded every expectation. True partners.&rdquo;</p>
          <p className="text-sm font-medium text-black">Emma Williams</p>
          <p className="text-xs text-black/60">Marketing Director, Scale Inc</p>
        </div>
      )
    },
    { 
      bg: "bg-black",
      content: (
        <div className="p-6">
          <p className="text-lg text-white/80 mb-4">&ldquo;The motion design work was incredible. Our videos now outperform benchmarks by 3x.&rdquo;</p>
          <p className="text-sm font-medium text-white">David Kim</p>
          <p className="text-xs text-white/60">CTO, Innovate Co</p>
        </div>
      )
    },
    { 
      bg: "bg-[#DCDFFF]",
      content: (
        <div className="p-6">
          <p className="text-lg text-black/80 mb-4">&ldquo;Working with Hindra was a game-changer. On time, within budget, beyond expectations.&rdquo;</p>
          <p className="text-sm font-medium text-black">Lisa Park</p>
          <p className="text-xs text-black/60">Product Lead, Motion AI</p>
        </div>
      )
    },
  ];
  

  const infiniteCards = [...cards, ...cards, ...cards, ...cards, ...cards,...cards, ...cards, ...cards, ...cards, ...cards,...cards, ...cards, ...cards, ...cards, ...cards,...cards, ...cards, ...cards, ...cards, ...cards];

  return (
    <div className="w-full py-12 overflow-hidden">

      <div  style={{ transform: "rotate(-6deg)", paddingTop:'10rem' }}>
        <div
          ref={logoRef}
          className="flex items-center gap-24 will-change-transform"
        >
          {infiniteLogos.map((src, i) => (
            <div key={i} className="w-40 h-16 relative select-none flex-shrink-0">
              <Image
                src={src}
                alt="Client logo"
                fill
                sizes="160px"
                className="object-contain"
                style={{
                  filter: "grayscale(100%) brightness(120%)",
                  opacity: 0.4,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-10"
        style={{ transform: "rotate(-6deg)", marginBottom:'10rem' }}
        onMouseEnter={pauseCards}   
        onMouseLeave={resumeCards}  
      >
        <div
          ref={cardRef}
          className="flex gap-10 will-change-transform"
        >
          {infiniteCards.map((card, i) => (
            <div
              key={i}
              className={`min-w-[360px] h-[420px] rounded-3xl ${card.bg} flex items-center justify-center shadow-lg`}
            >    {card.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
