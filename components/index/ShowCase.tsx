"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "scriptra",
    title: "Scriptra",
    description: "AI-powered content creation platform for social media",
    image: "/images/portfolio/scriptra-hero.png",
    href: "https://scriptra.space",
    tags: ["AI", "SaaS", "Content"],
  },
  {
    id: "rush-video",
    title: "Rush Video",
    description: "AI product videos with 2 to 5 day delivery",
    image: "/images/portfolio/rush-video-hero.jpg",
    href: "https://rush.video",
    tags: ["Video", "AI", "E-Commerce"],
  },
  {
    id: "rush-boxes",
    title: "Rush Boxes",
    description: "Custom packaging solutions for businesses",
    image: "/images/portfolio/rush-boxes-hero.png",
    href: "https://rushboxes.com",
    tags: ["Packaging", "B2B"],
  },
  {
    id: "rush-photos",
    title: "Rush Photos",
    description: "Professional product photography from $25 per angle",
    image: "/images/portfolio/rush-boxes-clean.png",
    href: "https://rush.photos",
    tags: ["Photography", "E-Commerce"],
  },
];

export default function ShowCase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
            Featured Work
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Products and platforms we&apos;ve built from the ground up
          </p>
        </div>

        {/* Main Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-neutral-900 rounded-2xl overflow-hidden">
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Project Selector */}
            <div className="flex flex-wrap gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveIndex(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeIndex === index
                      ? "bg-black text-white"
                      : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                {activeProject.title}
              </h3>
              <p className="text-neutral-600 text-lg">
                {activeProject.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={activeProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors mt-4"
              >
                Visit {activeProject.title}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-10">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-black"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
