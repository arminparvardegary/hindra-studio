"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Hindra transformed our brand completely. The attention to detail and strategic thinking was exactly what we needed to stand out in a crowded market.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bg: "bg-[#DCDFFF]",
  },
  {
    quote: "Working with Hindra was a game-changer. They delivered beyond our expectations, on time and within budget. Our conversion rate increased by 150%.",
    author: "Michael Torres",
    role: "Founder, Startup Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bg: "bg-[#E9DCC8]",
  },
  {
    quote: "The team's creativity and professionalism are unmatched. Our website conversions increased by 200% after the redesign. Highly recommended.",
    author: "Emma Williams",
    role: "Marketing Director, Scale Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    bg: "bg-white",
  },
  {
    quote: "From concept to execution, Hindra exceeded every expectation. They're not just designers, they're strategic partners who understand business.",
    author: "David Kim",
    role: "CTO, Innovate Co",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    bg: "bg-black",
    textColor: "text-white",
  },
  {
    quote: "The motion design work was incredible. Our product videos now consistently outperform industry benchmarks by 3x.",
    author: "Lisa Park",
    role: "Product Lead, Motion AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    bg: "bg-[#DCDFFF]",
  },
];

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
      x -= 1.5;
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
        cardX -= 0.8;
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
        cardX -= 0.8;
        cardRef.current!.style.transform = `translateX(${cardX}px)`;
      }
      cardAnimation.current = requestAnimationFrame(tick);
    });
  };

  const logos = [
    "/logo-carsome.webp",
    "/logo-kumu_2025-04-02-191834_xdcl.webp",
    "/logo-vanheusen.webp",
  ];

  const infiniteLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos];
  const infiniteCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 overflow-hidden bg-[#FAFAFA]" aria-labelledby="testimonials-heading">
      {/* Section Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Testimonials</p>
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
          Trusted by Industry Leaders
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about working with Hindra.
        </p>
      </header>

      {/* Logo Marquee */}
      <div style={{ transform: "rotate(-4deg)", marginBottom: "3rem" }} aria-hidden="true">
        <div
          ref={logoRef}
          className="flex items-center gap-20 will-change-transform py-8"
        >
          {infiniteLogos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-32 sm:w-40 select-none"
              style={{
                filter: "grayscale(100%) brightness(110%)",
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Testimonial Cards */}
      <div
        className="mt-8"
        style={{ transform: "rotate(-4deg)" }}
        onMouseEnter={pauseCards}
        onMouseLeave={resumeCards}
      >
        <div
          ref={cardRef}
          className="flex gap-8 will-change-transform py-4"
          role="list"
          aria-label="Client testimonials"
        >
          {infiniteCards.map((card, i) => (
            <blockquote
              key={i}
              className={`min-w-[380px] sm:min-w-[420px] p-8 rounded-3xl ${card.bg} ${card.textColor || "text-black"} flex flex-col justify-between shadow-lg`}
              style={{ height: "320px" }}
              role="listitem"
            >
              <div>
                <svg className={`w-10 h-10 mb-4 ${card.textColor ? "text-white/30" : "text-black/20"}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
                <p className={`text-lg leading-relaxed ${card.textColor ? "text-white/90" : "text-black/80"}`}>
                  "{card.quote}"
                </p>
              </div>
              <footer className="flex items-center gap-4 mt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50">
                  <Image
                    src={card.avatar}
                    alt={`${card.author} profile photo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <cite className={`font-semibold not-italic ${card.textColor || "text-black"}`}>{card.author}</cite>
                  <p className={`text-sm ${card.textColor ? "text-white/60" : "text-gray-500"}`}>{card.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
