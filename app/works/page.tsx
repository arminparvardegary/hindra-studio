"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const categories = ["All", "Branding", "Web Design", "Motion", "E-commerce"];

const projects = [
  {
    id: "ford-mustang",
    title: "Ford Mustang",
    category: "Web Design",
    description: "A complete digital experience redesign for Ford's legendary muscle car",
    image: "/images/ford.png",
    tags: ["Automotive", "3D Experience", "UI/UX"],
    year: "2024",
    featured: true,
  },
  {
    id: "kumu-app",
    title: "Kumu",
    category: "Branding",
    description: "Brand identity and mobile app design for Southeast Asia's fastest-growing platform",
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    tags: ["Mobile App", "Brand Identity", "UI/UX"],
    year: "2024",
    featured: true,
  },
  {
    id: "carsome",
    title: "Carsome",
    category: "E-commerce",
    description: "Complete brand refresh and e-commerce platform for Southeast Asia's largest car marketplace",
    image: "/logo-carsome.webp",
    tags: ["E-commerce", "Branding", "Web Platform"],
    year: "2023",
    featured: true,
  },
  {
    id: "van-heusen",
    title: "Van Heusen",
    category: "E-commerce",
    description: "Digital campaign and e-commerce experience for the iconic fashion brand",
    image: "/logo-vanheusen.webp",
    tags: ["Fashion", "E-commerce", "Campaign"],
    year: "2023",
    featured: true,
  },
  {
    id: "techflow",
    title: "TechFlow",
    category: "Branding",
    description: "Complete brand identity for a B2B SaaS startup",
    image: "/images/ford.png",
    tags: ["Logo", "Brand Guidelines", "Visual Identity"],
    year: "2024",
  },
  {
    id: "bloom",
    title: "Bloom",
    category: "Web Design",
    description: "E-commerce website for a sustainable fashion brand",
    image: "/logo-vanheusen.webp",
    tags: ["UI/UX", "Development", "E-commerce"],
    year: "2024",
  },
  {
    id: "artisan",
    title: "Artisan",
    category: "Motion",
    description: "Animated brand identity for a creative agency",
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    tags: ["Motion Graphics", "Animation", "Video"],
    year: "2023",
  },
  {
    id: "greenleaf",
    title: "GreenLeaf",
    category: "Branding",
    description: "Brand strategy for an eco-friendly product line",
    image: "/logo-carsome.webp",
    tags: ["Brand Strategy", "Research", "Positioning"],
    year: "2023",
  },
];

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="tag mb-6">Our Work</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
              Selected projects we&apos;re proud of
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl">
              A showcase of our best work across branding, web design, motion, and strategy.
              Each project represents a unique challenge and creative solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-[#DCDFFF]/50 text-black hover:bg-[#DCDFFF]"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Link href={`/works/${project.id}`}>
                    <div
                      className={`relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 ${
                        index % 2 === 0 ? "bg-[#DCDFFF]" : "bg-[#E9DCC8]"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* View Project Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={
                            hoveredProject === project.id
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0.8, opacity: 0 }
                          }
                          className="px-6 py-3 bg-white text-black rounded-full font-medium shadow-lg"
                        >
                          View Project
                        </motion.span>
                      </div>

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-black text-white rounded-full text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Year */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-black">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-black group-hover:text-black/70 transition-colors">
                          {project.title}
                        </h2>
                        <span className="text-sm text-black/40">{project.category}</span>
                      </div>
                      <p className="text-black/60 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-black text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Have a project in mind?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 text-lg">
              Let&apos;s talk about how we can help bring your ideas to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Start a project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
