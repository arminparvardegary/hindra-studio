"use client";

import React from "react";
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
  fallbackImage?: string;
};

function Card({ src, alt, href, title, subtitle, priority, external, fallbackImage }: CardProps) {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [imgError, setImgError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleImageError = () => {
    if (!imgError && fallbackImage) {
      setImgSrc(fallbackImage);
      setImgError(true);
    }
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const LinkComponent = external ? 'a' : Link;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <LinkComponent
      href={href}
      aria-label={`Visit ${title} - ${alt}`}
      className="group block relative rounded-lg overflow-hidden bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      {...linkProps}
    >
      <div className="aspect-[4/3] sm:aspect-[16/10] bg-neutral-50 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 animate-pulse" />
        )}
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          priority={priority}
          onError={handleImageError}
          onLoad={handleImageLoad}
          unoptimized={imgSrc.startsWith('http')}
        />
      </div>

      {/* Minimal caption below image */}
      <div className="p-3 sm:p-4 bg-white border-t border-neutral-100">
        <h3 className="text-sm sm:text-base font-semibold text-black mb-0.5 sm:mb-1 group-hover:text-black/70 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-1">{subtitle}</p>
        )}
        <span className="text-[10px] text-neutral-400 mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Visit Live
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      </div>
    </LinkComponent>
  );
}

// Portfolio projects data - Using actual homepage OG images
const projects = [
  {
    id: 'scriptra',
    title: 'Scriptra',
    subtitle: 'AI-Powered Content Creation Platform',
    image: 'https://scriptra.space/og-image.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    href: 'https://scriptra.space',
    external: true,
  },
  {
    id: 'rush-photos',
    title: 'Rush Photos',
    subtitle: 'Professional Product Photography (from $25/angle)',
    image: 'https://rush.photos/og-image.jpg',
    fallbackImage: '/images/rush-photos-hero.jpg',
    href: 'https://rush.photos',
    external: true,
  },
  {
    id: 'rush-video',
    title: 'Rush Video',
    subtitle: 'Product Videos (2 to 5 day delivery)',
    image: 'https://rush.video/og-image.jpg',
    fallbackImage: '/images/rush-video-hero.jpg',
    href: 'https://rush.video',
    external: true,
  },
  {
    id: 'rush-boxes',
    title: 'Rush Boxes',
    subtitle: 'Custom Packaging Solutions',
    image: 'https://rushboxes.com/og-image.jpg',
    fallbackImage: '/images/portfolio/rush-boxes-hero.png',
    href: 'https://rushboxes.com',
    external: true,
  },
];

export default function WorksSection() {
  return (
    <section aria-labelledby="works-title" className="w-full py-8 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5 sm:mb-8 lg:mb-10 flex items-center justify-between gap-3">
          <div>
            <h2 id="works-title" className="text-xl sm:text-2xl lg:text-4xl font-semibold tracking-tight text-black">
              Our Products
            </h2>
            <p className="text-neutral-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
              Products we&apos;ve built and launched
            </p>
          </div>

          <Link
            href="/works"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 hover:text-black whitespace-nowrap"
          >
            <span className="hidden sm:inline">All Works</span>
            <span className="sm:hidden">View All</span>
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid - Responsive minimal layout */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              src={project.image}
              alt={project.title}
              href={project.href}
              title={project.title}
              subtitle={project.subtitle}
              priority={index === 0}
              external={project.external}
              fallbackImage={project.fallbackImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
