"use client";

import Image from "next/image";
import Link from "next/link";

type CardProps = {
  src: string;
  alt: string;
  href: string;
  title: string;
  subtitle?: string;
  variant?: "standard" | "wide";
  priority?: boolean;
  external?: boolean;
};

function Card({ src, alt, href, title, subtitle, variant = "standard", priority, external }: CardProps) {
  const ratioClass =
    variant === "wide"
      ? "aspect-[32/9] sm:aspect-[28/9] lg:aspect-[32/9]"
      : "aspect-[16/9]";

  const LinkComponent = external ? 'a' : Link;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <LinkComponent
      href={href}
      aria-label={title}
      className="group block relative rounded-[10px] overflow-hidden bg-neutral-100 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      {...linkProps}
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
              {subtitle && (
                <p className="text-white/80 text-sm mt-1">{subtitle}</p>
              )}
              {external && (
                <span className="inline-flex items-center gap-1 text-white/60 text-xs mt-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Live
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </LinkComponent>
  );
}

// Portfolio projects data
const projects = [
  {
    id: 'scriptra',
    title: 'Scriptra',
    subtitle: 'AI-Powered Content Creation Platform',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    href: 'https://scriptra.space',
    external: true,
  },
  {
    id: 'rush-photos',
    title: 'Rush Photos',
    subtitle: 'Professional Product Photography (from $25/angle)',
    image: '/images/rush-photos-hero.jpg',
    href: 'https://rush.photos',
    external: true,
  },
  {
    id: 'rush-video',
    title: 'Rush Video',
    subtitle: 'Product Videos (2 to 5 day delivery)',
    image: '/images/rush-video-hero.jpg',
    href: 'https://rush.video',
    external: true,
  },
  {
    id: 'rush-boxes',
    title: 'Rush Boxes',
    subtitle: 'Custom Packaging Solutions',
    image: '/images/portfolio/rush-boxes-hero.png',
    href: 'https://rushboxes.com',
    external: true,
  },
];

export default function WorksSection() {
  return (
    <section aria-labelledby="works-title" className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 flex items-baseline justify-between gap-4">
          <div>
            <h2 id="works-title" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-black">
              Our Products
            </h2>
            <p className="text-neutral-600 mt-2 text-sm sm:text-base">
              Products we&apos;ve built and launched
            </p>
          </div>

          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-sm sm:text-base text-neutral-600 hover:text-black"
          >
            All Works
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Scriptra - Featured (wide) */}
          <div className="md:col-span-2">
            <Card
              src={projects[0].image}
              alt={projects[0].title}
              href={projects[0].href}
              title={projects[0].title}
              subtitle={projects[0].subtitle}
              variant="wide"
              priority
              external={projects[0].external}
            />
          </div>

          {/* Rush Photos */}
          <Card
            src={projects[1].image}
            alt={projects[1].title}
            href={projects[1].href}
            title={projects[1].title}
            subtitle={projects[1].subtitle}
            external={projects[1].external}
          />

          {/* Rush Video */}
          <Card
            src={projects[2].image}
            alt={projects[2].title}
            href={projects[2].href}
            title={projects[2].title}
            subtitle={projects[2].subtitle}
            external={projects[2].external}
          />

          {/* Rush Boxes - Full width */}
          <div className="md:col-span-2">
            <Card
              src={projects[3].image}
              alt={projects[3].title}
              href={projects[3].href}
              title={projects[3].title}
              subtitle={projects[3].subtitle}
              variant="wide"
              external={projects[3].external}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
