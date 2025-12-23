"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Testimonial data with separate hex color gradients
const testimonials = [
  {
    quote: "Scriptra has 10x'd our content output. What took hours now takes minutes.",
    company: "Scriptra",
    role: "Content Creator",
    logo: "/images/portfolio/scriptra-hero.png",
    gradientFrom: "#FEF3C7",
    gradientTo: "#FDE68A",
  },
  {
    quote: "Rush Photos delivered exactly what we needed: professional shots at an unbeatable price.",
    company: "Rush Photos",
    role: "E-commerce Brand",
    logo: "/images/rush-photos-hero.jpg",
    gradientFrom: "#FCE7F3",
    gradientTo: "#FBCFE8",
  },
  {
    quote: "The AI-powered videos from Rush Video converted 3x better than our old product photos.",
    company: "Rush Video",
    role: "Amazon Seller",
    logo: "/images/rush-video-hero.jpg",
    gradientFrom: "#E0E7FF",
    gradientTo: "#C7D2FE",
  },
  {
    quote: "Rush Boxes custom packaging elevated our brand. Quality boxes, great prices.",
    company: "Rush Boxes",
    role: "Product Brand Owner",
    logo: "/images/portfolio/rush-boxes-hero.png",
    gradientFrom: "#FFEDD5",
    gradientTo: "#FED7AA",
  },
  {
    quote: "Hindra builds products that actually work. We use Scriptra daily for our content.",
    company: "Hindra Studio",
    role: "Marketing Agency",
    logo: null,
    gradientFrom: "#F3E8FF",
    gradientTo: "#E9D5FF",
  },
];

const productLogos = [
  { name: "Scriptra", url: "https://scriptra.space" },
  { name: "Rush Photos", url: "https://rush.photos" },
  { name: "Rush Video", url: "https://rush.video" },
  { name: "Rush Boxes", url: "https://rushboxes.com" },
];

export default function Testimonial() {
  const infiniteLogos = [...productLogos, ...productLogos, ...productLogos, ...productLogos];
  const infiniteCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="w-full py-24 sm:py-32 overflow-hidden bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          <div className="w-full lg:w-[40%] flex flex-col gap-10 lg:sticky lg:top-32">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl font-bold text-black leading-tight tracking-tight">
                Trusted by
                <br />
                the best.
              </h2>
              <p className="text-black/50 text-xl leading-relaxed max-w-md">
                We build products that empower creators and brands to push their boundaries.
              </p>
            </div>
          </div>

          {/* Right: Vertical Scrolling Cards */}
          <div className="w-full lg:w-[60%] h-[600px] md:h-[800px] relative overflow-hidden group">
            {/* Fade Gradients */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-scroll-vertical group-hover:[animation-play-state:paused]">
              {infiniteCards.map((testimonial, i) => (
                <div
                  key={i}
                  className="w-full h-[450px] sm:h-[500px] rounded-[2.5rem] p-10 flex flex-col justify-between shadow-2xl shadow-black/[0.03] border border-black/5 flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.gradientFrom} 0%, ${testimonial.gradientTo} 100%)`
                  }}
                >
                  <p className="text-2xl md:text-3xl font-medium text-black/80 leading-snug">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-black">{testimonial.company}</p>
                      <p className="text-sm font-medium text-black/40">{testimonial.role}</p>
                    </div>
                    {testimonial.logo && (
                      <div className="w-16 h-16 rounded-3xl bg-white/50 backdrop-blur-sm shadow-inner overflow-hidden flex items-center justify-center p-3 border border-white/50">
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full grayscale opacity-80"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
