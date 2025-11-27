"use client";

import Image from "next/image";
import Link from "next/link";

type CardProps = {
  src: string;
  alt: string;
  href: string;
  title: string;
  variant?: "standard" | "wide";
  priority?: boolean;
};

function Card({ src, alt, href, title, variant = "standard", priority }: CardProps) {
  const ratioClass =
    variant === "wide"
      ? "aspect-[32/9] sm:aspect-[28/9] lg:aspect-[32/9]"
      : "aspect-[16/9]";

  return (
    <Link
      href={href}
      aria-label={title}
      className="group block rounded-2xl overflow-hidden bg-[#DCDFFF] ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
    >
      <div className={`relative ${ratioClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            variant === "wide"
              ? "(min-width:1280px) 1120px, (min-width:1024px) 90vw, 100vw"
              : "(min-width:1280px) 560px, (min-width:1024px) 45vw, (min-width:640px) 90vw, 100vw"
          }
          priority={priority}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover caption */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-6 py-3 bg-white text-black rounded-full font-medium text-sm">
            View Project
          </span>
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white text-lg sm:text-xl font-semibold">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function WorksSection() {
  const IMG = "/images/ford.png";

  return (
    <section aria-labelledby="works-title" className="w-full py-16 sm:py-20 lg:py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 flex items-baseline justify-between gap-4">
          <div>
            <span className="tag mb-3">Portfolio</span>
            <h2 id="works-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
              Our Works
            </h2>
          </div>

          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-sm sm:text-base text-black/60 hover:text-black transition-colors"
          >
            View all
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            src={IMG}
            alt="Ford project preview"
            href="/works/ford-1"
            title="Ford Project — Concept 1"
          />
          <Card
            src={IMG}
            alt="Ford project preview"
            href="/works/ford-2"
            title="Ford Project — Concept 2"
          />

          <div className="md:col-span-2">
            <Card
              src={IMG}
              alt="Ford project wide hero"
              href="/works/ford-hero"
              title="Ford Project — Hero"
              variant="wide"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
