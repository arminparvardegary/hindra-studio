"use client";
import { useEffect, useRef } from "react";

export default function Testimonial() {
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardAnimation = useRef<number | null>(null);
  let cardX = 0;
  let cardPaused = false;

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
      if (!cardPaused) {
        cardX -= 1;
        el.style.transform = `translateX(${cardX}px)`;
      }
      cardAnimation.current = requestAnimationFrame(tick);
    };

    cardAnimation.current = requestAnimationFrame(tick);

    return () => {
      if (cardAnimation.current) cancelAnimationFrame(cardAnimation.current);
    };
  }, []);

  const pauseCards = () => {
    cardPaused = true;
    if (cardAnimation.current) cancelAnimationFrame(cardAnimation.current);
  };

  const resumeCards = () => {
    if (!cardPaused) return;
    cardPaused = false;
    cardAnimation.current = requestAnimationFrame(function tick() {
      if (!cardPaused) {
        cardX -= 1;
        cardRef.current!.style.transform = `translateX(${cardX}px)`;
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
      bg: "bg-yellow-400",
      content: (
        <div className="text-3xl font-bold"></div>
      )
    },
    { 
      bg: "bg-blue-500",
      content: (
        <div className="text-3xl font-bold"></div>
      )
    },
    { 
      bg: "bg-orange-500",
      content: (
        <div className="flex flex-col gap-2 items-center">
        </div>
      )
    },
    { 
      bg: "bg-gray-700",
      content: (
        <p className="text-white text-xl"></p>
      )
    },
    { 
      bg: "bg-rose-300",
      content: (
        <div className="text-black text-2xl"></div>
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
            <img
              key={i}
              src={src}
              className="w-40 select-none"
              style={{
                filter: "grayscale(100%) brightness(120%)",
                opacity: 0.4,
              }}
            />
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
              className={`min-w-[360px] h-[420px] rounded-3xl ${card.bg} flex items-center justify-center`}
            >    {card.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
