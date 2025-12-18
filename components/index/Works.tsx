"use client";

import Image from "next/image";
import Link from "next/link";

type CardProps = {
  src: string;
  alt: string;
  href: string;
  title: string;
  subtitle?: string;
  external?: boolean;
};

function Card({ src, alt, href, title, subtitle, external }: CardProps) {
  const LinkComponent = external ? 'a' : Link;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <LinkComponent
      href={href}
      aria-label={title}
      className="group block relative overflow-hidden bg-neutral-950 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      {...linkProps}
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3 className="text-white text-lg sm:text-xl font-semibold tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/70 text-sm mt-1.5">{subtitle}</p>
          )}
          {external && (
            <span className="inline-flex items-center gap-1.5 text-white/50 text-xs mt-3 group-hover:text-white/70 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Live
            </span>
          )}
        </div>
      </div>
    </LinkComponent>
  );
}

const projects = [
  {
    id: 'scriptra',
    title: 'Scriptra',
    subtitle: 'AI Content Creation Platform',
    image: '/images/portfolio/scriptra-hero.png',
    href: 'https://scriptra.space',
    external: true,
  },
  {
    id: 'rush-video',
    title: 'Rush Video',
    subtitle: 'AI Product Videos',
    image: '/images/portfolio/rush-video-hero.jpg',
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
  {
    id: 'rush-photos',
    title: 'Rush Photos',
    subtitle: 'Professional Product Photography',
    image: '/images/portfolio/rush-boxes-clean.png',
    href: 'https://rush.photos',
    external: true,
  },
];

export default function WorksSection() {
  return (
    <section aria-labelledby="works-title" className="w-full py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 id="works-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
              Our Products
            </h2>
            <p className="text-neutral-500 mt-2">
              Built and launched by Hindra Studio
            </p>
          </div>

          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
          >
            View All
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid - Clean 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              src={project.image}
              alt={project.title}
              href={project.href}
              title={project.title}
              subtitle={project.subtitle}
              external={project.external}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
