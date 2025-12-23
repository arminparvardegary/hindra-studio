"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const projects: Project[] = [
  {
    id: "scriptra",
    title: "Scriptra",
    description: "AI-powered content creation platform for social media",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop",
    href: "/works/scriptra",
  },
  {
    id: "rush-video",
    title: "Rush Video",
    description: "AI product videos with 2 to 5 day delivery",
    image: "/images/rush-video-hero.jpg",
    href: "/works/rush-video",
  },
  {
    id: "rush-boxes",
    title: "Rush Boxes",
    description: "Custom packaging solutions for businesses",
    image: "/images/portfolio/rush-boxes-hero.png",
    href: "/works/rush-boxes",
  },
  {
    id: "rush-photos",
    title: "Rush Photos",
    description: "Professional product photography from $25 per angle",
    image: "/images/rush-photos-hero.jpg",
    href: "/works/rush-photos",
  },
];

export default function ShowCase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeProject = projects[activeIndex];

  return (
    <section className="w-full bg-white px-4 sm:px-12 lg:px-24 xl:px-48 py-12 sm:py-20">
      <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden bg-black rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center shadow-2xl">
        {/* Background Images with AnimatePresence */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-cover"
              priority
            />
            {/* Subtle Overlays */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="container-custom relative z-10 flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-white/60 text-xs sm:text-base font-bold tracking-[0.3em] uppercase mb-4">
              Featured Work
            </h2>
            <p className="text-white text-xl sm:text-3xl lg:text-4xl font-light tracking-tight opacity-90 max-w-2xl mx-auto">
              Products and platforms we&apos;ve built from the ground up
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h3 className="text-white text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter mb-6">
                {activeProject.title}
              </h3>
              <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mb-8 sm:mb-10 leading-relaxed font-light">
                {activeProject.description}
              </p>
              <Link
                href={activeProject.href}
                className="group/btn relative px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Explore Project</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <style jsx>{`
                  .group\/btn:hover span {
                    color: white;
                  }
                `}</style>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3 sm:gap-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group relative p-2"
              aria-label={`Go to project ${index + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ease-out ${activeIndex === index ? "w-8 sm:w-12 bg-white" : "w-4 sm:w-6 bg-white/20 group-hover:bg-white/40"
                  }`}
              />
              {/* Countdown line for active item */}
              {activeIndex === index && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute top-2 left-2 h-1 bg-white/80 rounded-full"
                  style={{ originX: 0 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Side Numbers */}
        <div className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-20">
          <span className="text-white/20 text-4xl lg:text-6xl font-bold tracking-tighter rotate-180 [writing-mode:vertical-lr]">
            0{activeIndex + 1}
          </span>
        </div>
      </div>
    </section>
  );
}
