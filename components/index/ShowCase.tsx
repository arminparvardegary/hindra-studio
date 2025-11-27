"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "ford-mustang",
    title: "Ford Mustang",
    subtitle: "THE ICON OF POWER AND DESIGN",
    description: "A complete digital experience redesign for Ford's legendary muscle car. We created an immersive website that captures the raw power and heritage of the Mustang brand.",
    tags: ["Automotive", "Web Design", "3D Experience"],
    image: "/images/ford.png",
    stats: { views: "2.4M", engagement: "+180%" },
    year: "2024",
  },
  {
    id: "kumu-app",
    title: "Kumu",
    subtitle: "SOCIAL LIVE STREAMING PLATFORM",
    description: "Brand identity and mobile app design for Southeast Asia's fastest-growing live streaming platform. Creating connections through authentic content.",
    tags: ["Mobile App", "Brand Identity", "UI/UX"],
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    stats: { users: "10M+", rating: "4.8★" },
    year: "2024",
  },
  {
    id: "carsome",
    title: "Carsome",
    subtitle: "REVOLUTIONIZING CAR OWNERSHIP",
    description: "Complete brand refresh and e-commerce platform for Southeast Asia's largest integrated car marketplace. Simplifying the car buying experience.",
    tags: ["E-commerce", "Branding", "Web Platform"],
    image: "/logo-carsome.webp",
    stats: { transactions: "$1B+", markets: "5 Countries" },
    year: "2023",
  },
  {
    id: "van-heusen",
    title: "Van Heusen",
    subtitle: "TIMELESS ELEGANCE REDEFINED",
    description: "Digital campaign and e-commerce experience for the iconic fashion brand. Blending classic sophistication with modern retail innovation.",
    tags: ["Fashion", "E-commerce", "Campaign"],
    image: "/logo-vanheusen.webp",
    stats: { sales: "+45%", reach: "15M" },
    year: "2023",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);

  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, y, rotateX }}
      className="perspective-1000"
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}>
        {/* Image Side */}
        <motion.div
          className={`relative ${isEven ? "" : "lg:order-2"}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
            {/* Mockup Frame */}
            <div className="absolute inset-4 rounded-2xl overflow-hidden bg-white shadow-inner">
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div
              className="absolute top-6 right-6 px-4 py-2 bg-black text-white text-sm font-medium rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {project.year}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-[#DCDFFF] -z-10"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#E9DCC8] -z-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Content Side */}
        <div className={`space-y-6 ${isEven ? "" : "lg:order-1"}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium text-black/40 tracking-widest">
              PROJECT 0{index + 1}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-[#DCDFFF] font-semibold tracking-wide"
            style={{ WebkitTextStroke: "1px #000", color: "transparent" }}
          >
            {project.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-black/60 text-lg leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-black/5 rounded-full text-sm text-black/70 hover:bg-black/10 transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 pt-4"
          >
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key}>
                <div className="text-2xl sm:text-3xl font-bold text-black">{value}</div>
                <div className="text-sm text-black/50 capitalize">{key}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href={`/works/${project.id}`}
              className="inline-flex items-center gap-3 text-black font-medium group mt-4"
            >
              <span className="relative">
                View Case Study
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
          </div>
    </motion.div>
  );
}

export default function ShowCase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-32"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="tag mb-4">Featured Work</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
            Selected Projects
          </h2>
          <p className="text-lg sm:text-xl text-black/60 max-w-2xl mx-auto">
            A curated selection of our finest work. Each project represents a unique 
            challenge and our creative approach to solving it.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32 sm:space-y-40 lg:space-y-52">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 sm:mt-28"
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors group"
          >
            View all projects
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{ x: 5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
