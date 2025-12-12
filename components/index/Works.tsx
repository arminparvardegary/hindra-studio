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
      className="group block relative rounded-[10px] overflow-hidden bg-neutral-100 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
    >
      <div className={ratioClass}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes={
            variant === "wide"
              ? "(min-width:1280px) 1120px, (min-width:1024px) 90vw, 100vw"
              : "(min-width:1280px) 560px, (min-width:1024px) 45vw, (min-width:640px) 90vw, 100vw"
          }
          priority={priority}
        />

        {/* Hover caption */}
        <div className="pointer-events-none absolute inset-0 flex items-end rounded-[10px] bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5">
            <div className="translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <h3 className="text-white text-base sm:text-lg font-medium tracking-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WorksSection() {
  const RUSH_PHOTOS_IMG = "/images/rush-photos-hero.jpg";
  const RUSH_VIDEO_IMG = "/images/rush-video-hero.jpg";
  const FORD_IMG = "/images/ford.png";

  return (
    <section aria-labelledby="works-title" className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 flex items-baseline justify-between gap-4">
          <h2 id="works-title" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-black">
            Works
          </h2>

          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-sm sm:text-base text-neutral-600 hover:text-black"
          >
            More Works
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card
            src={RUSH_PHOTOS_IMG}
            alt="Rush Photos — professional product photography"
            href="/works/rush-photos"
            title="Rush Photos — Product Photography (from $25/angle)"
          />
          <Card
            src={RUSH_VIDEO_IMG}
            alt="Rush Video — AI-powered product videos"
            href="/works/rush-video"
            title="Rush Video — Product Videos (2–5 day delivery)"
          />

          <div className="md:col-span-2">
            <Card
              src={FORD_IMG}
              alt="Ford Mustang digital experience"
              href="/works/ford-mustang"
              title="Ford Mustang — Digital Experience"
              variant="wide"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
