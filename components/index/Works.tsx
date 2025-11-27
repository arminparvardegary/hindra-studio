"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "project-1",
    title: "Brand Identity",
    subtitle: "TechFlow",
    description: "Complete visual identity for a SaaS startup",
    image: "/images/ford.png",
    tags: ["Branding", "Strategy"],
    color: "#DCDFFF",
  },
  {
    id: "project-2",
    title: "Web Development",
    subtitle: "Bloom",
    description: "E-commerce website for sustainable fashion",
    image: "/images/ford.png",
    tags: ["Development", "UI/UX"],
    color: "#E9DCC8",
  },
  {
    id: "project-3",
    title: "Motion Design",
    subtitle: "Artisan",
    description: "Animated brand identity for creative agency",
    image: "/images/ford.png",
    tags: ["Motion", "Animation"],
    color: "#DCDFFF",
  },
];

function ProjectCard({ 
  project, 
  index 
}: { 
  project: typeof projects[0]; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, opacity, rotateX }}
      className="sticky top-32"
    >
      <Link href={`/works/${project.id}`} className="block group">
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{ backgroundColor: project.color }}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Content */}
            <div className="flex flex-col justify-center order-2 md:order-1">
              <span className="text-sm font-medium text-black/50 mb-2">
                0{index + 1}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
                {project.title}
              </h3>
              <p className="text-xl text-black/70 mb-4">
                {project.subtitle}
              </p>
              <p className="text-black/60 mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-black/10 rounded-full text-sm text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 text-black font-medium group-hover:gap-4 transition-all">
                View Project
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 md:order-2">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={containerRef} className="relative py-20 sm:py-28">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16 sticky top-20"
        >
          <span className="tag mb-4">Portfolio</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4">
            Our Works
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Selected projects we&apos;re proud of. Each represents a unique 
            challenge and creative solution.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-3 text-lg font-medium text-black hover:gap-5 transition-all"
          >
            View all projects
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
