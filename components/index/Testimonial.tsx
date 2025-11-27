"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO at TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "Hindra transformed our brand identity completely. Their attention to detail and creative vision exceeded all expectations.",
    rating: 5,
    bg: "bg-[#DCDFFF]",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder at Startify",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "Working with Hindra was a game-changer. They don't just design, they craft experiences that resonate with our audience.",
    rating: 5,
    bg: "bg-[#E9DCC8]",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Marketing Director at Bloom",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "The team at Hindra understood our vision from day one. They delivered a brand that perfectly captures our essence.",
    rating: 5,
    bg: "bg-[#DCDFFF]",
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO at NexGen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Exceptional work! Hindra's minimalist approach brought clarity to our complex product. Highly recommended.",
    rating: 5,
    bg: "bg-[#E9DCC8]",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Creative Director at Artisan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    content: "From concept to execution, Hindra delivered excellence. Our new identity has received countless compliments.",
    rating: 5,
    bg: "bg-[#DCDFFF]",
  },
];

const logos = [
  { name: "Carsome", src: "/logo-carsome.webp" },
  { name: "Kumu", src: "/logo-kumu_2025-04-02-191834_xdcl.webp" },
  { name: "Van Heusen", src: "/logo-vanheusen.webp" },
];

export default function Testimonial() {
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const cardXRef = useRef(0);
  const logoXRef = useRef(0);

  // Logo animation
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    let frame: number;
    const tick = () => {
      logoXRef.current -= 1;
      el.style.transform = `translateX(${logoXRef.current}px)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Card animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let frame: number;
    const tick = () => {
      if (!isPaused) {
        cardXRef.current -= 0.5;
        el.style.transform = `translateX(${cardXRef.current}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const infiniteLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos];
  const infiniteCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 sm:py-28 overflow-hidden bg-white">
      {/* Section header */}
      <div className="container-custom mb-16 text-center">
        <span className="tag mb-4">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4">
          Loved by teams worldwide
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-black/60">
          Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
        </p>
      </div>

      {/* Logo marquee */}
      <div className="mb-16" style={{ transform: "rotate(-3deg)" }}>
        <div className="py-6 bg-black">
          <div ref={logoRef} className="flex items-center gap-20 will-change-transform">
            {infiniteLogos.map((logo, i) => (
              <Image
                key={i}
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto select-none brightness-0 invert opacity-60"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial cards */}
      <div
        className="mt-8"
        style={{ transform: "rotate(-3deg)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={cardRef} className="flex gap-6 will-change-transform">
          {infiniteCards.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className={`shrink-0 w-[380px] p-8 rounded-3xl ${testimonial.bg} transition-all duration-300 hover:shadow-lg`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-black fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-black/80 text-lg leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-sm text-black/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: "Happy Clients" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "250+", label: "Projects Delivered" },
            { value: "15", label: "Team Members" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl sm:text-5xl font-bold text-black mb-2">{stat.value}</p>
              <p className="text-black/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
