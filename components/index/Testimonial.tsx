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
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;Hindra handled everything - our brand, website, and social media. One team made it so easy.&rdquo;</p>
          <p className="text-sm font-medium text-black">Sarah Chen</p>
          <p className="text-xs text-black/60">Founder, TechFlow</p>
        </div>
      )
    },
    { 
      bg: "bg-[#E9DCC8]",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;From zero followers to 50K in 6 months. Their content strategy is incredible.&rdquo;</p>
          <p className="text-sm font-medium text-black">Michael Torres</p>
          <p className="text-xs text-black/60">CEO, Startup Labs</p>
        </div>
      )
    },
    { 
      bg: "bg-white",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;We launched in 3 weeks with a complete brand package. Best decision we made.&rdquo;</p>
          <p className="text-sm font-medium text-black">Emma Williams</p>
          <p className="text-xs text-black/60">Co-founder, Scale Inc</p>
        </div>
      )
    },
    { 
      bg: "bg-black",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-white/80 mb-3 sm:mb-4">&ldquo;They manage our social daily. Our engagement is up 300%. True partners.&rdquo;</p>
          <p className="text-sm font-medium text-white">David Kim</p>
          <p className="text-xs text-white/60">CMO, Innovate Co</p>
        </div>
      )
    },
    { 
      bg: "bg-[#DCDFFF]",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;No more juggling vendors. One team, one vision, perfect execution every time.&rdquo;</p>
          <p className="text-sm font-medium text-black">Lisa Park</p>
          <p className="text-xs text-black/60">Marketing Director, Motion AI</p>
        </div>
      )
    },
  ];
  

  const infiniteCards = [...cards, ...cards, ...cards, ...cards, ...cards,...cards, ...cards, ...cards, ...cards, ...cards,...cards, ...cards, ...cards, ...cards, ...cards,...cards, ...cards, ...cards, ...cards, ...cards];

  return (
    <div className="w-full py-8 sm:py-12 overflow-hidden">

      <div style={{ transform: "rotate(-6deg)", paddingTop: 'clamp(4rem, 10vw, 10rem)' }}>
        <div
          ref={logoRef}
          className="flex items-center gap-12 sm:gap-16 md:gap-24 will-change-transform"
        >
          {infiniteLogos.map((src, i) => (
            <div key={i} className="w-24 h-10 sm:w-32 sm:h-12 md:w-40 md:h-16 relative select-none flex-shrink-0">
              <Image
                src={src}
                alt="Client logo"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
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
        className="mt-6 sm:mt-10"
        style={{ transform: "rotate(-6deg)", marginBottom: 'clamp(4rem, 10vw, 10rem)' }}
        onMouseEnter={pauseCards}   
        onMouseLeave={resumeCards}  
      >
        <div
          ref={cardRef}
          className="flex gap-4 sm:gap-6 md:gap-10 will-change-transform"
        >
          {infiniteCards.map((card, i) => (
            <div
              key={i}
              className={`min-w-[280px] sm:min-w-[320px] md:min-w-[360px] h-[320px] sm:h-[360px] md:h-[420px] rounded-2xl sm:rounded-3xl ${card.bg} flex items-center justify-center shadow-lg`}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
