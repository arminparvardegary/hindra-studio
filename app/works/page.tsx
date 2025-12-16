"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const categories = ["All", "SaaS", "E-commerce", "Web Platform", "Video"];

const projects = [
  {
    id: "scriptra",
    title: "Scriptra",
    category: "SaaS",
    description: "AI-powered content creation platform for generating viral hooks, captions, and social media content",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=900&fit=crop",
    tags: ["AI Platform", "SaaS", "Content Creation", "Next.js"],
    year: "2024",
    featured: true,
    color: "#6366f1",
    website: "https://scriptra.space",
  },
  {
    id: "rush-photos",
    title: "Rush Photos",
    category: "E-commerce",
    description: "Professional product photography service from $25/angle with 3 to 5 day delivery and unlimited revisions",
    image: "/images/rush-photos-hero.jpg",
    tags: ["Product Photography", "E-commerce", "From $25/angle"],
    year: "2024",
    featured: true,
    color: "#DCDFFF",
    website: "https://rush.photos",
  },
  {
    id: "rush-video",
    title: "Rush Video",
    category: "Video",
    description: "AI-powered product videos that convert with 2 to 5 day delivery and unlimited revisions",
    image: "/images/rush-video-hero.jpg",
    tags: ["AI Video", "Product Videos", "2 to 5 days"],
    year: "2024",
    featured: true,
    color: "#E9DCC8",
    website: "https://rush.video",
  },
  {
    id: "rush-boxes",
    title: "Rush Boxes",
    category: "E-commerce",
    description: "Custom packaging solutions including mailer boxes, gift boxes, and product boxes with instant quotes",
    image: "/images/portfolio/rush-boxes-hero.png",
    tags: ["Custom Packaging", "E-commerce", "B2B"],
    year: "2024",
    featured: true,
    color: "#f59e0b",
    website: "https://rushboxes.com",
  },
];

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container-custom py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="tag-soft mb-6 inline-block"
            >
              Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-black mb-8 leading-[1.1]"
            >
              Products we&apos;ve
              <br />
              <span className="text-gradient">built & launched</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl sm:text-2xl text-black/60 leading-relaxed max-w-2xl"
            >
              From AI-powered content tools to product photography services and custom packaging.
              Real products serving real customers worldwide.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#DCDFFF] rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#E9DCC8] rounded-full blur-3xl opacity-40" />
      </section>

      {/* Featured Projects Marquee */}
      <section className="py-12 bg-black overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...featuredProjects, ...featuredProjects, ...featuredProjects].map((project, i) => (
              <Link
                key={`${project.id}-${i}`}
                href={`/works/${project.id}`}
                className="inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-4xl sm:text-5xl font-bold">{project.title}</span>
                <span className="text-2xl">*</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-black/5">
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
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-black text-white scale-105"
                    : "bg-[#F8F8F8] text-black hover:bg-[#DCDFFF]"
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
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Link href={`/works/${project.id}`}>
                    <div
                      className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6"
                      style={{ backgroundColor: project.color }}
                    >
                      {/* Image container */}
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                      </div>

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="flex flex-col items-center"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredProject === project.id ? 0 : 20,
                            opacity: hoveredProject === project.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">View Project</span>
                        </motion.div>
                      </motion.div>

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Year badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-black">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Project info */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl sm:text-3xl font-bold text-black group-hover:text-black/70 transition-colors">
                          {project.title}
                        </h2>
                        <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                        <span className="text-sm text-black/40">{project.category}</span>
                      </div>
                      <p className="text-black/60 mb-4 text-lg">{project.description}</p>
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

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                <svg className="w-10 h-10 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">No projects found</h3>
              <p className="text-black/50">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4", label: "Live Products" },
              { value: "500+", label: "Happy Customers" },
              { value: "24/7", label: "AI-Powered" },
              { value: "2017", label: "Founded" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-black/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-black text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DCDFFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#E9DCC8]/10 rounded-full blur-3xl" />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Have a project in mind?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 max-w-xl mx-auto mb-10 text-xl"
            >
              Let&apos;s talk about how we can help bring your ideas to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-medium text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-100"
              >
                Start a project
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
