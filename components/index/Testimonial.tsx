"use client";
import { useEffect, useRef } from "react";

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

  // Products we've built
  const productLogos = [
    { name: "Scriptra", url: "https://scriptra.space" },
    { name: "Rush Photos", url: "https://rush.photos" },
    { name: "Rush Video", url: "https://rush.video" },
    { name: "Rush Boxes", url: "https://rushboxes.com" },
  ];

  const infiniteLogos = [...productLogos, ...productLogos, ...productLogos, ...productLogos, ...productLogos, ...productLogos, ...productLogos, ...productLogos, ...productLogos, ...productLogos];

  const cards = [
    { 
      bg: "bg-[#6366f1]",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-white/90 mb-3 sm:mb-4">&ldquo;Scriptra has 10x&apos;d our content output. What took hours now takes minutes.&rdquo;</p>
          <p className="text-sm font-medium text-white">Content Creator</p>
          <p className="text-xs text-white/60">Scriptra User</p>
        </div>
      )
    },
    { 
      bg: "bg-[#E9DCC8]",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;Rush Photos delivered exactly what we needed: professional shots at an unbeatable price.&rdquo;</p>
          <p className="text-sm font-medium text-black">E-commerce Brand</p>
          <p className="text-xs text-black/60">Rush Photos Customer</p>
        </div>
      )
    },
    { 
      bg: "bg-white",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;The AI-powered videos from Rush Video converted 3x better than our old product photos.&rdquo;</p>
          <p className="text-sm font-medium text-black">Amazon Seller</p>
          <p className="text-xs text-black/60">Rush Video Customer</p>
        </div>
      )
    },
    { 
      bg: "bg-black",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-white/80 mb-3 sm:mb-4">&ldquo;Rush Boxes custom packaging elevated our brand. Quality boxes, great prices.&rdquo;</p>
          <p className="text-sm font-medium text-white">Product Brand Owner</p>
          <p className="text-xs text-white/60">Rush Boxes Customer</p>
        </div>
      )
    },
    { 
      bg: "bg-[#DCDFFF]",
      content: (
        <div className="p-4 sm:p-6">
          <p className="text-base sm:text-lg text-black/80 mb-3 sm:mb-4">&ldquo;Hindra builds products that actually work. We use Scriptra daily for our content.&rdquo;</p>
          <p className="text-sm font-medium text-black">Marketing Agency</p>
          <p className="text-xs text-black/60">Hindra Products User</p>
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
          {infiniteLogos.map((product, i) => (
            <a
              key={i}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 select-none px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-black/40 hover:text-black/60 transition-colors whitespace-nowrap">
                {product.name}
              </span>
            </a>
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
