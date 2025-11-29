"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Project = {
  src: string;
  alt: string;
  href: string;
  title: string;
  category: string;
  year: string;
  variant?: "standard" | "wide";
  priority?: boolean;
  color: string;
};

const projects: Project[] = [
  {
    src: "/images/ford.png",
    alt: "Luxe Motors brand identity",
    href: "/works/ford-mustang",
    title: "Luxe Motors",
    category: "Brand Identity & Motion",
    year: "2024",
    color: "bg-[#DCDFFF]",
  },
  {
    src: "/images/ford.png",
    alt: "Kumu social app design",
    href: "/works/kumu",
    title: "Kumu Social",
    category: "UI/UX Design",
    year: "2024",
    color: "bg-[#E9DCC8]",
  },
  {
    src: "/images/ford.png",
    alt: "Carsome platform redesign",
    href: "/works/carsome",
    title: "Carsome",
    category: "Web Development",
    year: "2023",
    variant: "wide",
    priority: true,
    color: "bg-[#F0F0F0]",
  },
];

function Card({ src, alt, href, title, category, year, variant = "standard", priority, color }: Project) {
  const ratioClass =
    variant === "wide"
      ? "aspect-[32/9] sm:aspect-[28/9] lg:aspect-[32/9]"
      : "aspect-[16/9]";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={href}
        aria-label={title}
        className={`group block relative rounded-[20px] overflow-hidden ${color} focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20`}
      >
        <div className={ratioClass}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes={
              variant === "wide"
                ? "(min-width:1280px) 1120px, (min-width:1024px) 90vw, 100vw"
                : "(min-width:1280px) 560px, (min-width:1024px) 45vw, (min-width:640px) 90vw, 100vw"
            }
            priority={priority}
          />

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="w-full p-6 sm:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">{category}</p>
                  <h3 className="text-white text-xl sm:text-2xl font-semibold">
                    {title}
                  </h3>
                </div>
                <span className="text-white/70 text-sm">{year}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/5 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <span className="text-black/80 font-medium">{title}</span>
            <span className="text-black/50 text-sm">{category}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorksSection() {
  return (
    <section aria-labelledby="works-title" className="w-full py-16 sm:py-20 lg:py-28 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Portfolio</p>
            <h2 id="works-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
              Selected Works
            </h2>
          </div>

          <Link
            href="/works"
            className="group inline-flex items-center gap-2 text-base font-medium text-black hover:text-gray-600 transition-colors"
          >
            View All Projects
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.slice(0, 2).map((project) => (
            <Card key={project.href} {...project} />
          ))}

          <div className="md:col-span-2">
            <Card {...projects[2]} />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 pt-12">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-black">120+</p>
            <p className="text-gray-500 mt-2">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-black">50+</p>
            <p className="text-gray-500 mt-2">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-black">8+</p>
            <p className="text-gray-500 mt-2">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-black">15</p>
            <p className="text-gray-500 mt-2">Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  );
}
