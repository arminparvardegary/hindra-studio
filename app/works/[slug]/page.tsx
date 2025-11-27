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
  "ford-mustang": {
    title: "Ford Mustang",
    subtitle: "THE ICON OF POWER AND DESIGN",
    description: "A complete digital experience redesign for Ford's legendary muscle car. We created an immersive website that captures the raw power and heritage of the Mustang brand.",
    fullDescription: `Ford approached us with a challenge: create a digital experience that matches the visceral feeling of driving a Mustang. We delivered an immersive website that combines cutting-edge 3D technology with storytelling that honors the Mustang's legendary heritage.

Our team worked closely with Ford's design team to ensure every pixel reflected the brand's commitment to performance and style. The result is a website that doesn't just showcase cars—it makes you feel the rumble of the engine.`,
    tags: ["Automotive", "Web Design", "3D Experience", "Brand Strategy"],
    image: "/images/ford.png",
    stats: { views: "2.4M", engagement: "+180%", duration: "4 months" },
    year: "2024",
    client: "Ford Motor Company",
    services: ["Web Design", "3D Development", "UX Strategy", "Motion Design"],
    challenge: "Create a digital experience that captures the raw emotion and power of the Mustang brand while driving engagement and conversions.",
    solution: "We developed an immersive 3D configurator with cinematic animations, allowing users to explore every detail of the Mustang lineup in an engaging, interactive environment.",
    results: [
      { metric: "2.4M", label: "Page Views" },
      { metric: "+180%", label: "Engagement Rate" },
      { metric: "+45%", label: "Lead Generation" },
      { metric: "4.2min", label: "Avg. Session" },
    ],
    testimonial: {
      quote: "Hindra Studio exceeded our expectations. They truly understood the Mustang brand and delivered an experience that our customers love.",
      author: "James Morrison",
      role: "Digital Marketing Director, Ford",
    },
    gallery: ["/images/ford.png", "/images/ford.png", "/images/ford.png"],
    nextProject: { slug: "kumu-app", title: "Kumu" },
    prevProject: { slug: "van-heusen", title: "Van Heusen" },
  },
  "kumu-app": {
    title: "Kumu",
    subtitle: "SOCIAL LIVE STREAMING PLATFORM",
    description: "Brand identity and mobile app design for Southeast Asia's fastest-growing live streaming platform. Creating connections through authentic content.",
    fullDescription: `Kumu is revolutionizing social entertainment in Southeast Asia. They came to us needing a complete brand refresh and app redesign that would appeal to Gen Z while maintaining their core community values.

We created a vibrant, energetic brand identity that reflects the platform's dynamic nature. The app redesign focused on reducing friction in the streaming experience while adding features that encourage community building and creator monetization.`,
    tags: ["Mobile App", "Brand Identity", "UI/UX", "Product Design"],
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    stats: { users: "10M+", rating: "4.8★", duration: "6 months" },
    year: "2024",
    client: "Kumu Philippines",
    services: ["Brand Identity", "App Design", "UI/UX", "Design System"],
    challenge: "Redesign the app experience to increase user retention and creator engagement while establishing a stronger brand presence in a competitive market.",
    solution: "We created an intuitive, visually striking interface with gamification elements and a comprehensive design system that scales across all touchpoints.",
    results: [
      { metric: "10M+", label: "Active Users" },
      { metric: "4.8★", label: "App Store Rating" },
      { metric: "+67%", label: "Creator Retention" },
      { metric: "+120%", label: "Daily Sessions" },
    ],
    testimonial: {
      quote: "The new design has transformed how our community interacts. User feedback has been overwhelmingly positive.",
      author: "Roland Ros",
      role: "CEO, Kumu",
    },
    gallery: ["/logo-kumu_2025-04-02-191834_xdcl.webp", "/logo-kumu_2025-04-02-191834_xdcl.webp", "/logo-kumu_2025-04-02-191834_xdcl.webp"],
    nextProject: { slug: "carsome", title: "Carsome" },
    prevProject: { slug: "ford-mustang", title: "Ford Mustang" },
  },
  "carsome": {
    title: "Carsome",
    subtitle: "REVOLUTIONIZING CAR OWNERSHIP",
    description: "Complete brand refresh and e-commerce platform for Southeast Asia's largest integrated car marketplace. Simplifying the car buying experience.",
    fullDescription: `Carsome is transforming how Southeast Asia buys and sells cars. As they expanded across the region, they needed a brand that could unify their diverse markets while building trust with consumers.

We developed a comprehensive brand system and e-commerce platform that makes buying a used car as simple and trustworthy as buying new. The design emphasizes transparency, quality assurance, and customer confidence.`,
    tags: ["E-commerce", "Branding", "Web Platform", "UX Research"],
    image: "/logo-carsome.webp",
    stats: { transactions: "$1B+", markets: "5 Countries", duration: "8 months" },
    year: "2023",
    client: "Carsome Group",
    services: ["Brand Strategy", "Web Development", "UX Design", "E-commerce"],
    challenge: "Create a unified brand and digital platform that builds trust in the used car market while scaling across multiple Southeast Asian countries.",
    solution: "We built a transparent, user-friendly e-commerce experience with robust inspection reports, 360° car views, and a seamless purchasing journey.",
    results: [
      { metric: "$1B+", label: "Transaction Value" },
      { metric: "5", label: "Countries" },
      { metric: "+89%", label: "Conversion Rate" },
      { metric: "250K+", label: "Cars Sold" },
    ],
    testimonial: {
      quote: "Hindra helped us build a brand that customers trust. Our platform conversion rates have never been higher.",
      author: "Eric Cheng",
      role: "Co-founder, Carsome",
    },
    gallery: ["/logo-carsome.webp", "/logo-carsome.webp", "/logo-carsome.webp"],
    nextProject: { slug: "van-heusen", title: "Van Heusen" },
    prevProject: { slug: "kumu-app", title: "Kumu" },
  },
  "van-heusen": {
    title: "Van Heusen",
    subtitle: "TIMELESS ELEGANCE REDEFINED",
    description: "Digital campaign and e-commerce experience for the iconic fashion brand. Blending classic sophistication with modern retail innovation.",
    fullDescription: `Van Heusen, a heritage brand with over 100 years of history, needed to connect with a new generation of professionals. We were tasked with creating a digital presence that honors their legacy while appealing to modern sensibilities.

Our campaign focused on the concept of "Modern Classics" - professionals who respect tradition but aren't bound by it. The e-commerce experience we created makes premium fashion accessible and shopping effortless.`,
    tags: ["Fashion", "E-commerce", "Campaign", "Digital Marketing"],
    image: "/logo-vanheusen.webp",
    stats: { sales: "+45%", reach: "15M", duration: "5 months" },
    year: "2023",
    client: "PVH Corp (Van Heusen)",
    services: ["Campaign Design", "E-commerce", "Content Strategy", "Social Media"],
    challenge: "Rejuvenate a heritage brand for younger audiences while maintaining the sophistication and quality that defines Van Heusen.",
    solution: "We created the 'Modern Classics' campaign with a refreshed e-commerce experience that combines editorial content with seamless shopping.",
    results: [
      { metric: "+45%", label: "Online Sales" },
      { metric: "15M", label: "Campaign Reach" },
      { metric: "+200%", label: "Social Engagement" },
      { metric: "32%", label: "New Customers" },
    ],
    testimonial: {
      quote: "The campaign perfectly captured our brand evolution. We've seen remarkable growth in our target demographic.",
      author: "Sarah Chen",
      role: "Brand Director, Van Heusen",
    },
    gallery: ["/logo-vanheusen.webp", "/logo-vanheusen.webp", "/logo-vanheusen.webp"],
    nextProject: { slug: "techflow", title: "TechFlow" },
    prevProject: { slug: "carsome", title: "Carsome" },
  },
  "techflow": {
    title: "TechFlow",
    subtitle: "B2B SAAS BRAND IDENTITY",
    description: "Complete brand identity for a B2B SaaS startup revolutionizing workflow automation.",
    fullDescription: `TechFlow approached us as a fast-growing SaaS startup needing a brand that could compete with enterprise players while maintaining startup agility. We developed a comprehensive brand identity that communicates innovation, reliability, and scalability.

The brand system we created includes a flexible logo, comprehensive guidelines, and a design system that scales across all touchpoints from website to product UI.`,
    tags: ["Branding", "Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/images/ford.png",
    stats: { funding: "$12M", growth: "+300%", duration: "3 months" },
    year: "2024",
    client: "TechFlow Inc.",
    services: ["Brand Strategy", "Logo Design", "Brand Guidelines", "Design System"],
    challenge: "Create a brand identity that positions a startup as an enterprise-ready solution while maintaining approachability.",
    solution: "We developed a modern, scalable brand system with a distinctive logomark and flexible visual language.",
    results: [
      { metric: "$12M", label: "Series A Raised" },
      { metric: "+300%", label: "User Growth" },
      { metric: "85%", label: "Brand Recognition" },
      { metric: "4.9★", label: "G2 Rating" },
    ],
    testimonial: {
      quote: "Our new brand gave us the credibility we needed to close enterprise deals. Hindra understood exactly what we needed.",
      author: "Alex Rivera",
      role: "CEO, TechFlow",
    },
    gallery: ["/images/ford.png", "/images/ford.png", "/images/ford.png"],
    nextProject: { slug: "bloom", title: "Bloom" },
    prevProject: { slug: "van-heusen", title: "Van Heusen" },
  },
  "bloom": {
    title: "Bloom",
    subtitle: "SUSTAINABLE FASHION E-COMMERCE",
    description: "E-commerce website for a sustainable fashion brand committed to ethical production.",
    fullDescription: `Bloom is a fashion brand with sustainability at its core. They needed an e-commerce experience that communicates their values while providing a seamless shopping journey.

We designed and developed a website that tells the story of each product's sustainable journey while making the path to purchase intuitive and enjoyable.`,
    tags: ["E-commerce", "Web Design", "UI/UX", "Development"],
    image: "/logo-vanheusen.webp",
    stats: { conversion: "+65%", traffic: "2x", duration: "4 months" },
    year: "2024",
    client: "Bloom Fashion",
    services: ["Web Design", "E-commerce Development", "UI/UX", "Content Strategy"],
    challenge: "Create an e-commerce experience that tells the sustainability story without compromising on conversion.",
    solution: "We built an immersive shopping experience with integrated storytelling and frictionless checkout.",
    results: [
      { metric: "+65%", label: "Conversion Rate" },
      { metric: "2x", label: "Traffic Growth" },
      { metric: "45s", label: "Avg. Time on Site" },
      { metric: "+120%", label: "Revenue" },
    ],
    testimonial: {
      quote: "The new website perfectly captures our brand values. Our customers love the experience.",
      author: "Emma Johnson",
      role: "Founder, Bloom",
    },
    gallery: ["/logo-vanheusen.webp", "/logo-vanheusen.webp", "/logo-vanheusen.webp"],
    nextProject: { slug: "artisan", title: "Artisan" },
    prevProject: { slug: "techflow", title: "TechFlow" },
  },
  "artisan": {
    title: "Artisan",
    subtitle: "ANIMATED BRAND IDENTITY",
    description: "Animated brand identity for a creative agency that specializes in motion design.",
    fullDescription: `Artisan is a creative agency that lives and breathes motion. Their brand needed to reflect their expertise in animation while standing out in a crowded market.

We created a dynamic brand identity with a logo that transforms, color schemes that shift, and a visual language that's always in motion.`,
    tags: ["Motion Design", "Animation", "Brand Identity", "Video"],
    image: "/logo-kumu_2025-04-02-191834_xdcl.webp",
    stats: { views: "5M+", engagement: "+250%", duration: "4 months" },
    year: "2023",
    client: "Artisan Creative",
    services: ["Motion Design", "Brand Identity", "Animation", "Video Production"],
    challenge: "Create a brand identity that showcases motion expertise while remaining functional in static applications.",
    solution: "We developed an animated logo system with flexible static variations and a motion-first design language.",
    results: [
      { metric: "5M+", label: "Video Views" },
      { metric: "+250%", label: "Engagement" },
      { metric: "3x", label: "Client Inquiries" },
      { metric: "15+", label: "Awards Won" },
    ],
    testimonial: {
      quote: "Hindra created something truly unique. Our brand now moves as beautifully as the work we create.",
      author: "Marcus Chen",
      role: "Creative Director, Artisan",
    },
    gallery: ["/logo-kumu_2025-04-02-191834_xdcl.webp", "/logo-kumu_2025-04-02-191834_xdcl.webp", "/logo-kumu_2025-04-02-191834_xdcl.webp"],
    nextProject: { slug: "greenleaf", title: "GreenLeaf" },
    prevProject: { slug: "bloom", title: "Bloom" },
  },
  "greenleaf": {
    title: "GreenLeaf",
    subtitle: "ECO-FRIENDLY BRAND STRATEGY",
    description: "Brand strategy for an eco-friendly product line focused on sustainable living.",
    fullDescription: `GreenLeaf is on a mission to make sustainable living accessible to everyone. They needed a brand strategy that would resonate with eco-conscious consumers while appealing to mainstream audiences.

We developed a comprehensive brand strategy that positions GreenLeaf as the friendly face of sustainability, making green choices feel natural rather than sacrificial.`,
    tags: ["Brand Strategy", "Research", "Positioning", "Marketing"],
    image: "/logo-carsome.webp",
    stats: { awareness: "+180%", sales: "+95%", duration: "3 months" },
    year: "2023",
    client: "GreenLeaf Products",
    services: ["Brand Strategy", "Market Research", "Positioning", "Launch Strategy"],
    challenge: "Position an eco-friendly brand to appeal to mainstream consumers without alienating the core sustainability audience.",
    solution: "We created a brand strategy focused on 'effortless sustainability' that makes green choices feel natural and aspirational.",
    results: [
      { metric: "+180%", label: "Brand Awareness" },
      { metric: "+95%", label: "Sales Growth" },
      { metric: "72%", label: "Market Penetration" },
      { metric: "#1", label: "Category Leader" },
    ],
    testimonial: {
      quote: "The strategy transformed how we connect with customers. We're now the go-to brand for sustainable living.",
      author: "Lisa Park",
      role: "CMO, GreenLeaf",
    },
    gallery: ["/logo-carsome.webp", "/logo-carsome.webp", "/logo-carsome.webp"],
    nextProject: { slug: "ford-mustang", title: "Ford Mustang" },
    prevProject: { slug: "artisan", title: "Artisan" },
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
              Back to Works
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
            className="object-contain p-12"
          />
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
              <h3 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-3">Client</h3>
              <p className="text-lg text-black">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-black/40 uppercase tracking-wider mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className="text-black">
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
              <span className="text-sm font-medium text-[#DCDFFF] uppercase tracking-wider">The Challenge</span>
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

      {/* Testimonial */}
      <section className="bg-black text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-6xl text-white/20 font-serif mb-8">&ldquo;</div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed mb-8">
              {project.testimonial.quote}
            </p>
            <div>
              <div className="text-lg font-semibold">{project.testimonial.author}</div>
              <div className="text-white/50">{project.testimonial.role}</div>
            </div>
          </motion.div>
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
                className="object-contain p-8"
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
          className="bg-[#DCDFFF] rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-black/60 mb-8 max-w-xl mx-auto">
            Let&apos;s create something amazing together. Get in touch and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
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

