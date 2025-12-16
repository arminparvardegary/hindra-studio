"use client";

import { useRef, use } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  tags: string[];
  image: string;
  website: string;
  stats: Record<string, string>;
  year: string;
  client: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  gallery: string[];
  nextProject: { slug: string; title: string };
  prevProject: { slug: string; title: string };
}

const projects: Record<string, Project> = {
  "scriptra": {
    title: "Scriptra",
    subtitle: "AI-POWERED CONTENT CREATION PLATFORM",
    description: "The ultimate AI tool for creators, marketers, and brands to generate high-converting hooks, captions, and viral content.",
    fullDescription: `Scriptra is our flagship SaaS product, an AI-powered content creation platform designed for modern creators and marketers.

The platform leverages advanced AI models to help users generate viral hooks, engaging captions, and high-converting content for social media platforms including TikTok, Instagram, YouTube, and Twitter.

Key features include:
• AI Hook Generator: Create attention-grabbing opening lines
• Caption Generator: Write engaging posts in seconds
• Viral Research: Analyze trending content patterns
• Multi-platform Support: Optimized for all major platforms
• Content Calendar: Plan and schedule your content
• Analytics Dashboard: Track performance metrics`,
    tags: ["AI Platform", "SaaS", "Next.js", "TypeScript", "OpenAI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop",
    website: "https://scriptra.space",
    stats: { users: "Growing", platform: "Web App", ai: "GPT-4" },
    year: "2024",
    client: "Hindra Studio Product",
    services: ["Product Design", "Full-Stack Development", "AI Integration", "UX/UI Design"],
    challenge: "Create an intuitive AI-powered platform that helps creators generate viral content without requiring technical expertise or writing skills.",
    solution: "We built Scriptra with a focus on simplicity and power. The platform uses advanced AI to analyze successful content patterns and generate optimized hooks and captions tailored to each user's niche and platform.",
    results: [
      { metric: "10x", label: "Faster Content" },
      { metric: "AI", label: "Powered" },
      { metric: "24/7", label: "Available" },
      { metric: "∞", label: "Generations" },
    ],
    testimonial: {
      quote: "Scriptra has completely transformed how we create content. What used to take hours now takes minutes.",
      author: "Content Creator",
      role: "Scriptra User",
    },
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1684163760006-2f24e5e2d5d1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=800&h=800&fit=crop",
    ],
    nextProject: { slug: "rush-photos", title: "Rush Photos" },
    prevProject: { slug: "rush-boxes", title: "Rush Boxes" },
  },
  "rush-photos": {
    title: "Rush Photos",
    subtitle: "PROFESSIONAL PRODUCT PHOTOGRAPHY SERVICE",
    description: "Professional product photography from $25/angle with 3 to 5 day delivery and unlimited revisions.",
    fullDescription: `Rush Photos is revolutionizing product photography with an innovative platform that combines professional photography expertise with cutting-edge technology.

We built a sleek, conversion-focused website featuring:
• Interactive before/after sliders
• Dynamic portfolio galleries
• Streamlined ordering system
• Four distinct photography styles

Photography Styles:
• E-commerce: Clean white background shots
• Lifestyle: Styled scenes with props
• Ghost Mannequin: Clothing photography
• 360° Spin: Interactive product views

Pricing starts at just $25/angle with 3-5 day delivery and unlimited revisions on select packages.`,
    tags: ["Product Photography", "E-commerce", "Web Design", "Portfolio"],
    image: "/images/rush-photos-hero.jpg",
    website: "https://rush.photos",
    stats: { styles: "4 Styles", pricing: "From $25", delivery: "3 to 5 Days" },
    year: "2024",
    client: "Rush Photos",
    services: ["Web Design", "UX/UI Design", "Interactive Elements", "E-commerce Integration"],
    challenge: "Design a professional photography service website that clearly communicates four different photography styles while maintaining a simple, friction-free ordering experience.",
    solution: "We built an elegant, interactive website with engaging before/after comparison sliders, clear service packages, transparent pricing, and a streamlined project initiation flow.",
    results: [
      { metric: "4", label: "Photo Styles" },
      { metric: "$25", label: "Starting Price" },
      { metric: "3 to 5", label: "Days Delivery" },
      { metric: "100%", label: "Satisfaction" },
    ],
    testimonial: {
      quote: "The interactive sliders and clean design have significantly increased our conversion rates. Exactly what we needed.",
      author: "Rush Photos Team",
      role: "Professional Photography Service",
    },
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop",
    ],
    nextProject: { slug: "rush-video", title: "Rush Video" },
    prevProject: { slug: "scriptra", title: "Scriptra" },
  },
  "rush-video": {
    title: "Rush Video",
    subtitle: "AI-POWERED PRODUCT VIDEOS THAT SELL",
    description: "Professional AI-powered product video service creating cinematic videos that convert browsers into buyers.",
    fullDescription: `Rush Video is pioneering the future of product video creation with AI-powered cinematography.

We designed and developed a modern, conversion-optimized website that clearly demonstrates the AI-powered video creation process:

Video Packages:
• Product Video Package: Essential product videos
• Complete Video Package: Full video suite with multiple angles

Camera Styles:
• Dolly In: Cinematic approach shots
• Orbit: 360° rotating views
• Top Down: Flat lay presentations
• Spinning: Product rotation videos

Features:
• 2-5 day delivery
• Unlimited revisions
• Commercial rights included
• Multiple format exports`,
    tags: ["AI Video", "Product Videos", "Web Platform", "SaaS"],
    image: "/images/rush-video-hero.jpg",
    website: "https://rush.video",
    stats: { styles: "4 Camera Styles", delivery: "2 to 5 Days", formats: "Multiple" },
    year: "2024",
    client: "Rush Videos",
    services: ["Web Design", "UI/UX Design", "Brand Strategy", "Video Integration"],
    challenge: "Create a website for an innovative AI-powered video service that clearly communicates the value proposition while building trust in a new technology.",
    solution: "We built a clean, modern website with prominent video examples, clear package options, professional color grading showcases, and a straightforward onboarding process.",
    results: [
      { metric: "4", label: "Camera Styles" },
      { metric: "2 to 5", label: "Days Delivery" },
      { metric: "100%", label: "Satisfaction" },
      { metric: "∞", label: "Revisions" },
    ],
    testimonial: {
      quote: "The website perfectly captures our vision of making professional product videos accessible to everyone.",
      author: "Rush Video Team",
      role: "AI-Powered Video Platform",
    },
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&h=800&fit=crop",
    ],
    nextProject: { slug: "rush-boxes", title: "Rush Boxes" },
    prevProject: { slug: "rush-photos", title: "Rush Photos" },
  },
  "rush-boxes": {
    title: "Rush Boxes",
    subtitle: "CUSTOM PACKAGING SOLUTIONS",
    description: "Custom packaging solutions for brands — Mailer boxes, gift boxes, product boxes with instant quotes and fast delivery.",
    fullDescription: `Rush Boxes is a custom packaging solution serving brands and businesses with high-quality, customizable boxes.

The platform offers a wide range of packaging options:

Box Types:
• Mailer Boxes: Sturdy, self-locking packaging
• Shipper Boxes: Durable shipping solutions
• Folded Boxes: Easy assembly, maximum protection
• Corrugated Boxes: Heavy-duty protection
• Cardboard Boxes: Versatile packaging solution
• Gift Boxes: Perfect for special occasions
• Custom Boxes: Tailored to your needs
• Setup Boxes: Ready-to-use packaging

Features:
• Instant online quotes
• Custom sizes available
• Full-color printing
• Design templates provided
• Fast turnaround
• Competitive pricing

Located in Hawthorne, NJ with additional presence in NYC, Rush Boxes has been serving brands since 1985.`,
    tags: ["Custom Packaging", "E-commerce", "B2B", "Manufacturing"],
    image: "/images/portfolio/rush-boxes-hero.png",
    website: "https://rushboxes.com",
    stats: { types: "8+ Box Types", experience: "Since 1985", location: "NJ & NYC" },
    year: "2024",
    client: "Rush Boxes",
    services: ["Web Design", "E-commerce", "Product Configurator", "Quote System"],
    challenge: "Build an e-commerce platform for custom packaging that allows customers to easily configure, visualize, and order custom boxes with instant pricing.",
    solution: "We created a user-friendly platform with an intuitive box configurator, instant quote system, design template downloads, and streamlined checkout process.",
    results: [
      { metric: "8+", label: "Box Types" },
      { metric: "1985", label: "Founded" },
      { metric: "Fast", label: "Turnaround" },
      { metric: "Custom", label: "Sizes" },
    ],
    testimonial: {
      quote: "Rush Boxes has been our packaging partner for years. Quality products, great service, and competitive prices.",
      author: "E-commerce Brand Owner",
      role: "Rush Boxes Customer",
    },
    gallery: [
      "/images/portfolio/rush-boxes-hero.png",
      "/images/portfolio/rush-boxes-1.png",
      "/images/portfolio/rush-boxes-2.png",
    ],
    nextProject: { slug: "scriptra", title: "Scriptra" },
    prevProject: { slug: "rush-video", title: "Rush Video" },
  },
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#F8F8F8] to-white"
        />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-black/50 hover:text-black mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-6"
            >
              <span className="px-4 py-2 bg-black text-white text-sm rounded-full">
                {project.year}
              </span>
              <span className="text-black/50">{project.client}</span>
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 text-black text-sm rounded-full transition-colors"
              >
                Visit Live
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-4"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl text-black/40 font-medium tracking-wide mb-8"
            >
              {project.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-black/5 rounded-full text-sm text-black/70"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-black/40 uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 rounded-full bg-black/40"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="container-custom -mt-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          {/* Overlay with website link */}
          <a
            href={project.website}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors group"
          >
            <span className="px-6 py-3 bg-white rounded-full font-medium text-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              Visit {project.title}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section className="container-custom py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">Overview</h2>
            <p className="text-lg text-black/60 leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-3">Website</h3>
              <a href={project.website} target="_blank" rel="noreferrer" className="text-lg text-black hover:underline">
                {project.website.replace('https://', '')}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className="text-black text-sm bg-black/5 px-3 py-1 rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-3">Year</h3>
              <p className="text-lg text-black">{project.year}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="bg-[#F8F8F8] py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white"
            >
              <span className="text-sm font-medium text-[#6366f1] uppercase tracking-wider">The Challenge</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mt-4 mb-4">What we faced</h3>
              <p className="text-black/60 leading-relaxed">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-black text-white"
            >
              <span className="text-sm font-medium text-[#E9DCC8] uppercase tracking-wider">The Solution</span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-4 mb-4">How we solved it</h3>
              <p className="text-white/70 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tag mb-4">Impact</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-black">The Results</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {project.results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-[#F8F8F8]"
            >
              <div className="text-4xl sm:text-5xl font-bold text-black mb-2">
                {result.metric}
              </div>
              <div className="text-sm text-black/50">{result.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black">Gallery</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F8F8]"
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-black/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2">
            <Link
              href={`/works/${project.prevProject.slug}`}
              className="group p-8 md:p-12 border-r border-black/10 hover:bg-[#F8F8F8] transition-colors"
            >
              <span className="text-sm text-black/40">Previous Project</span>
              <div className="flex items-center gap-4 mt-2">
                <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-2xl font-bold text-black">{project.prevProject.title}</span>
              </div>
            </Link>

            <Link
              href={`/works/${project.nextProject.slug}`}
              className="group p-8 md:p-12 hover:bg-[#F8F8F8] transition-colors text-right"
            >
              <span className="text-sm text-black/40">Next Project</span>
              <div className="flex items-center justify-end gap-4 mt-2">
                <span className="text-2xl font-bold text-black">{project.nextProject.title}</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Want to build something amazing?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Let&apos;s create your next product together. Get in touch and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Start a project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
