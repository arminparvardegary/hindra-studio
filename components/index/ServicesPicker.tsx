"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "branding",
    title: "BRAND IDENTITY",
    subtitle: "Complete Visual Systems",
    description: "Logo design, brand guidelines, visual identity systems that make your brand unforgettable.",
    images: [
      { src: "/logo-carsome.webp", label: "Logo Design" },
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", label: "Brand Guidelines" },
      { src: "/logo-vanheusen.webp", label: "Visual Identity" },
    ],
  },
  {
    id: "web",
    title: "WEB DESIGN",
    subtitle: "Fast & Beautiful Websites",
    description: "Modern, responsive websites that convert visitors into customers.",
    images: [
      { src: "/images/ford.png", label: "Corporate Site" },
      { src: "/logo-carsome.webp", label: "E-commerce" },
      { src: "/logo-vanheusen.webp", label: "Landing Page" },
    ],
  },
  {
    id: "motion",
    title: "MOTION DESIGN",
    subtitle: "Captivating Animations",
    description: "Bring your brand to life with stunning animations and video content.",
    images: [
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", label: "2D Animation" },
      { src: "/images/ford.png", label: "3D Motion" },
      { src: "/logo-carsome.webp", label: "Video Production" },
    ],
  },
  {
    id: "uiux",
    title: "UI/UX DESIGN",
    subtitle: "User-Centered Design",
    description: "Intuitive interfaces and seamless experiences that delight users.",
    images: [
      { src: "/logo-vanheusen.webp", label: "App Design" },
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", label: "Dashboard" },
      { src: "/images/ford.png", label: "Prototyping" },
    ],
  },
  {
    id: "development",
    title: "DEVELOPMENT",
    subtitle: "Scalable Solutions",
    description: "Full-stack development with modern technologies.",
    images: [
      { src: "/images/ford.png", label: "React/Next.js" },
      { src: "/logo-carsome.webp", label: "Backend" },
      { src: "/logo-vanheusen.webp", label: "API Integration" },
    ],
  },
  {
    id: "strategy",
    title: "STRATEGY",
    subtitle: "Data-Driven Insights",
    description: "Research and strategy that positions your brand for success.",
    images: [
      { src: "/logo-carsome.webp", label: "Market Research" },
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", label: "Brand Strategy" },
      { src: "/logo-vanheusen.webp", label: "Positioning" },
    ],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  const colors = ["#DCDFFF", "#E9DCC8", "#DCDFFF", "#E9DCC8", "#DCDFFF", "#E9DCC8"];

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x, scale }}
      className="mb-8"
    >
      <div 
        className="rounded-3xl p-8 lg:p-10"
        style={{ backgroundColor: colors[index % colors.length] }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
              {service.title}
            </h3>
            <p className="text-black/60">{service.subtitle}</p>
          </div>
          <span className="text-sm font-medium text-black/40">0{index + 1}</span>
        </div>

        {/* Description */}
        <p className="text-black/70 text-lg mb-8 max-w-lg">
          {service.description}
        </p>

        {/* Images Grid */}
        <div className="grid grid-cols-3 gap-4">
          {service.images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/50 mb-3 group-hover:shadow-lg transition-shadow">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-black/60 text-center">{img.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors group"
          >
            Get Started
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  return (
    <section ref={containerRef} className="relative bg-black">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side - Sticky */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-20 lg:py-0">
            <motion.div style={{ y: leftY }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/60 text-sm mb-6"
              >
                Our Services
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="text-white/40">Take your pick</span>
                <br />
                <span className="text-white">from the following</span>
                <br />
                <span className="text-[#DCDFFF]">services!</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-lg mt-6 max-w-md"
              >
                Scroll down to explore our full range of creative services. 
                Each one tailored to help your brand succeed.
              </motion.p>

              {/* Progress indicator */}
              <div className="mt-10 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#DCDFFF] rounded-full"
                      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                    />
                  </div>
                  <span className="text-white/40 text-sm">
                    {services.length} services
                  </span>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="mt-8 flex gap-2 flex-wrap">
                {services.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    className="w-3 h-3 rounded-full bg-white/20"
                    whileInView={{ backgroundColor: "rgba(220, 223, 255, 1)" }}
                    viewport={{ once: true, margin: "-50%" }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Scrolling Cards */}
          <div className="py-20 lg:py-32">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Need something custom?
              </h3>
              <p className="text-white/50 mb-6">
                We love unique challenges. Let&apos;s discuss your project.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Start a conversation
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
        </div>
      </div>
    </section>
  );
}
