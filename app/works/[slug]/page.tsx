"use client";

import { useRef } from "react";
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
  process: { title: string; description: string }[];
  palette: string[];
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
    process: [
      { title: "Discovery", description: "Analyzed the content creation landscape and identified pain points for creators." },
      { title: "AI Integration", description: "Fine-tuned GPT-4 models specifically for viral hook generation." },
      { title: "UX Design", description: "Created a distraction-free interface optimized for rapid ideation." },
      { title: "Launch", description: "Released to a beta group of 500+ creators for feedback and iteration." },
    ],
    palette: ["#6366f1", "#4f46e5", "#1e1b4b", "#ffffff"],
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
    process: [
      { title: "Briefing", description: "Client submits product details and desired style references." },
      { title: "Logistics", description: "Products are shipped to our studio with tracking integration." },
      { title: "Shooting", description: "Professional photographers capture products in our state-of-the-art studio." },
      { title: "Editing", description: "High-end retouching and color correction for a polished look." },
    ],
    palette: ["#DCDFFF", "#1a1a1a", "#ffffff", "#808080"],
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
    process: [
      { title: "Concept", description: "AI generates video concepts based on product features." },
      { title: "Generation", description: "High-fidelity video scenes are generated using custom models." },
      { title: "Editing", description: "Automated stitching and transition application." },
      { title: "Delivery", description: "Final render delivered in multiple aspect ratios." },
    ],
    palette: ["#E9DCC8", "#000000", "#FFB522", "#ffffff"],
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
    process: [
      { title: "Strategy", description: "Identified the need for transparent, instant packaging quotes." },
      { title: "Design", description: "Created a visual box configurator for real-time preview." },
      { title: "Development", description: "Built a complex pricing engine handling dimensions and materials." },
      { title: "Optimization", description: "Streamlined the checkout flow for B2B bulk orders." },
    ],
    palette: ["#f59e0b", "#FFFBEB", "#1f2937", "#ffffff"],
    nextProject: { slug: "scriptra", title: "Scriptra" },
    prevProject: { slug: "rush-video", title: "Rush Video" },
  },
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section - Enhanced */}
      <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#FAFAFA] to-white">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[#DCDFFF]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-[#E9DCC8]/20 rounded-full blur-3xl" />
        </motion.div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-12 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              <span className="text-black/60 font-medium">{project.year}</span>
              <span className="text-black/20">•</span>
              <span className="text-black/40 font-medium">{project.client}</span>
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-black/5 hover:bg-black hover:text-white text-black text-sm font-medium rounded-full transition-all group"
              >
                Visit Live
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-black mb-6 tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl text-black/50 font-light tracking-wide mb-10"
            >
              {project.subtitle}
            </motion.p>


          </motion.div>
        </div>
      </section>

      {/* Hero Image - Enhanced */}
      <section className="container-custom -mt-32 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Quick Stats - New Section */}
      <section className="container-custom mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(project.stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-[#FAFAFA] border border-black/5"
            >
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2">
                {value}
              </div>
              <div className="text-sm text-black/50 uppercase tracking-wider font-medium">{key}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Overview - Enhanced */}
      <section className="container-custom mb-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8">Project Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-black/70 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <div className="flex flex-wrap gap-4">
                {project.services.map((service) => (
                  <span key={service} className="text-black/60 font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-black hover:text-black/60 transition-colors font-medium underline underline-offset-4"
              >
                {project.website.replace('https://', '')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution - Enhanced */}
      <section className="py-32 bg-black text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">The Challenge</h3>
              <p className="text-xl text-white/70 leading-relaxed">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">Our Solution</h3>
              <p className="text-xl text-white/70 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process - Enhanced */}
      <section className="container-custom py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-black">Our Process</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {project.process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-black to-black/80 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
                <p className="text-black/60 leading-relaxed text-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Color Palette - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-[#FAFAFA] to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-black mb-6">Color Palette</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Carefully selected colors that define the brand identity and visual language
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {project.palette.map((color, index) => (
              <motion.div
                key={color}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div
                  className="w-48 h-48 rounded-3xl shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl border-4 border-white"
                  style={{ backgroundColor: color }}
                />
                <div className="mt-6 text-center">
                  <p className="text-lg font-bold text-black mb-1">{color}</p>
                  <p className="text-sm text-black/40 uppercase tracking-wider">
                    {color === '#ffffff' || color === '#FFFFFF' ? 'White' :
                      color === '#000000' ? 'Black' :
                        'Brand Color'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Enhanced */}
      <section className="container-custom py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-black">Gallery</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAFAFA] group cursor-pointer"
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[3deg]"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="container-custom py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-black">The Results</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {project.results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-10 rounded-3xl bg-gradient-to-br from-[#FAFAFA] to-white border border-black/5"
            >
              <div className="text-5xl sm:text-6xl font-bold text-black mb-4">
                {result.metric}
              </div>
              <div className="text-sm text-black/50 uppercase tracking-wider font-medium">{result.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Navigation */}
      <section className="border-t border-black/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2">
            <Link
              href={`/works/${project.prevProject.slug}`}
              className="group p-12 md:p-16 border-r border-black/10 hover:bg-[#FAFAFA] transition-all"
            >
              <span className="text-xs text-black/40 uppercase tracking-wider font-semibold block mb-4">Previous</span>
              <div className="flex items-center gap-4">
                <svg className="w-8 h-8 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-3xl font-bold text-black">{project.prevProject.title}</span>
              </div>
            </Link>

            <Link
              href={`/works/${project.nextProject.slug}`}
              className="group p-12 md:p-16 hover:bg-[#FAFAFA] transition-all text-right"
            >
              <span className="text-xs text-black/40 uppercase tracking-wider font-semibold block mb-4">Next</span>
              <div className="flex items-center justify-end gap-4">
                <span className="text-3xl font-bold text-black">{project.nextProject.title}</span>
                <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="container-custom py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3rem] p-16 md:p-24 text-center text-white overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
          }}
        >
          {/* Animated Background Orbs */}
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #DCDFFF 0%, transparent 70%)' }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #E9DCC8 0%, transparent 70%)' }}
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 tracking-tight">
                Let's Create
                <br />
                <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  Something Amazing
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to bring your vision to life? Let's collaborate and build your next breakthrough product together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="group/btn inline-flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 active:translate-y-0"
              >
                <span>Start Your Project</span>
                <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
