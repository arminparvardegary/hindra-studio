"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
    description: "A complete digital experience redesign for Ford&apos;s legendary muscle car",
    image: "/images/ford.png",
    tags: ["Automotive", "3D Experience", "UI/UX"],
    year: "2024",
    featured: true,
    color: "#DCDFFF",
  },
  {
    id: "kumu-app",
    title: "Kumu",
    category: "Branding",
    description: "Brand identity and mobile app design for Southeast Asia&apos;s fastest-growing platform",
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    tags: ["Mobile App", "Brand Identity", "UI/UX"],
    year: "2024",
    featured: true,
    color: "#E9DCC8",
  },
  {
    id: "carsome",
    title: "Carsome",
    category: "E-commerce",
    description: "Complete brand refresh and e-commerce platform for Southeast Asia&apos;s largest car marketplace",
    image: "/logo-carsome.webp",
    tags: ["E-commerce", "Branding", "Web Platform"],
    year: "2023",
    featured: true,
    color: "#DCDFFF",
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
    color: "#E9DCC8",
  },
  {
    id: "techflow",
    title: "TechFlow",
    category: "Branding",
    description: "Complete brand identity for a B2B SaaS startup",
    image: "/images/ford.png",
    tags: ["Logo", "Brand Guidelines", "Visual Identity"],
    year: "2024",
    color: "#DCDFFF",
  },
  {
    id: "bloom",
    title: "Bloom",
    category: "Web Design",
    description: "E-commerce website for a sustainable fashion brand",
    image: "/logo-vanheusen.webp",
    tags: ["UI/UX", "Development", "E-commerce"],
    year: "2024",
    color: "#E9DCC8",
  },
  {
    id: "artisan",
    title: "Artisan",
    category: "Motion",
    description: "Animated brand identity for a creative agency",
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    tags: ["Motion Graphics", "Animation", "Video"],
    year: "2023",
    color: "#DCDFFF",
  },
  {
    id: "greenleaf",
    title: "GreenLeaf",
    category: "Branding",
    description: "Brand strategy for an eco-friendly product line",
    image: "/logo-carsome.webp",
    tags: ["Brand Strategy", "Research", "Positioning"],
    year: "2023",
    color: "#E9DCC8",
  },
];

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#DCDFFF]/30 to-white"
        />

        <div className="container-custom relative z-10 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="tag-soft mb-8 inline-block"
            >
              Our Portfolio
            </motion.span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black mb-8 leading-[1.1]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                Selected work
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-black/30"
              >
                we are proud of
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl text-black/60 leading-relaxed max-w-2xl"
            >
              A showcase of our best work across branding, web design, motion, and strategy.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
        >
          {[
            { value: "120+", label: "Projects" },
            { value: "50+", label: "Clients" },
            { value: "15", label: "Awards" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-right"
            >
              <p className="text-4xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-black/40 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects - Large Cards */}
      <section className="py-16 sm:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="tag mb-2">Featured</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-black">Spotlight Projects</h2>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Link href={`/works/${project.id}`}>
                  <div
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6"
                    style={{ backgroundColor: project.color }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

                    {/* View button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="px-8 py-4 bg-white text-black rounded-full font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        View Case Study
                      </span>
                    </motion.div>

                    {/* Featured badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-medium uppercase tracking-wider">
                        Featured
                      </span>
                    </div>

                    {/* Year */}
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-black">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl sm:text-3xl font-bold text-black group-hover:text-black/70 transition-colors">
                        {project.title}
                      </h3>
                      <span className="px-3 py-1 bg-black/5 rounded-full text-sm text-black/60">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-black/60 text-lg mb-4">{project.description}</p>
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
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[#F8F8F8] sticky top-0 z-40">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-black text-white shadow-lg"
                      : "bg-white text-black hover:bg-black/5"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <span className="ml-2 text-white/60">
                      ({filteredProjects.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-black/50 text-sm">
              Showing {filteredProjects.length} projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Link href={`/works/${project.id}`}>
                    <div
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5"
                      style={{ backgroundColor: project.color }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                      {/* Arrow icon */}
                      <motion.div
                        className="absolute bottom-4 right-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                          scale: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </motion.div>

                      {/* Year badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-black">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-black group-hover:text-black/70 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm text-black/40">{project.category}</span>
                      </div>
                      <p className="text-black/50 text-sm line-clamp-2">{project.description}</p>
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
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Have a project in mind?
              </h2>
              <p className="text-white/60 text-xl mb-8 max-w-lg">
                Let&apos;s talk about how we can help bring your ideas to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all hover:gap-5"
              >
                Start a project
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: "24h", label: "Response Time" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "120+", label: "Projects Delivered" },
                { value: "8+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-white/5">
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
