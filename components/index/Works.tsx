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

function Card({ src, alt, href, title, subtitle, priority, external }: CardProps) {
  const LinkComponent = external ? 'a' : Link;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <LinkComponent
      href={href}
      aria-label={title}
      className="group block relative rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      {...linkProps}
    >
      <div className="aspect-[4/3] sm:aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          priority={priority}
        />
      </div>

      {/* Minimal caption below image */}
      <div className="p-3 sm:p-4 bg-white">
        <h3 className="text-sm sm:text-base font-semibold text-black mb-0.5 sm:mb-1 group-hover:text-black/70 transition-colors">
                {title}
              </h3>
              {subtitle && (
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-1">{subtitle}</p>
              )}
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
