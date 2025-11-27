"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "branding",
    title: "BRAND IDENTITY",
    subtitle: "Complete Visual Systems",
    description: "Logo design, brand guidelines, visual identity systems that make your brand unforgettable.",
    images: [
      { src: "/logo-carsome.webp", alt: "Brand 1" },
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", alt: "Brand 2" },
      { src: "/logo-vanheusen.webp", alt: "Brand 3" },
    ],
    color: "#DCDFFF",
  },
  {
    id: "web",
    title: "WEB DESIGN",
    subtitle: "Fast & Beautiful Websites",
    description: "Modern, responsive websites that convert visitors into customers with stunning design.",
    images: [
      { src: "/images/ford.png", alt: "Web 1" },
      { src: "/logo-carsome.webp", alt: "Web 2" },
      { src: "/logo-vanheusen.webp", alt: "Web 3" },
    ],
    color: "#E9DCC8",
  },
  {
    id: "motion",
    title: "MOTION DESIGN",
    subtitle: "Captivating Animations",
    description: "Bring your brand to life with stunning animations and video content people love.",
    images: [
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", alt: "Motion 1" },
      { src: "/images/ford.png", alt: "Motion 2" },
      { src: "/logo-carsome.webp", alt: "Motion 3" },
    ],
    color: "#DCDFFF",
  },
  {
    id: "uiux",
    title: "UI/UX DESIGN",
    subtitle: "User-Centered Design",
    description: "Intuitive interfaces and seamless experiences that delight your users.",
    images: [
      { src: "/logo-vanheusen.webp", alt: "UI 1" },
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", alt: "UI 2" },
      { src: "/images/ford.png", alt: "UI 3" },
    ],
    color: "#E9DCC8",
  },
  {
    id: "development",
    title: "DEVELOPMENT",
    subtitle: "Scalable Solutions",
    description: "Full-stack development with modern technologies for fast, secure applications.",
    images: [
      { src: "/images/ford.png", alt: "Dev 1" },
      { src: "/logo-carsome.webp", alt: "Dev 2" },
      { src: "/logo-vanheusen.webp", alt: "Dev 3" },
    ],
    color: "#DCDFFF",
  },
  {
    id: "strategy",
    title: "STRATEGY",
    subtitle: "Data-Driven Insights",
    description: "Research and strategy that positions your brand for success in the market.",
    images: [
      { src: "/logo-carsome.webp", alt: "Strategy 1" },
      { src: "/logo-kumu_2025-04-02-191834_xdcl.webp", alt: "Strategy 2" },
      { src: "/logo-vanheusen.webp", alt: "Strategy 3" },
    ],
    color: "#E9DCC8",
  },
];

export default function ServicesPicker() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentService = services.find((s) => s.id === activeService);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-black text-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="text-white/40">Take your pick</span>
            <br />
            <span className="text-white">from the following</span>
            <br />
            <span className="text-[#DCDFFF]">services!</span>
          </h2>
        </motion.div>

        {/* Interactive Grid */}
        <div ref={containerRef} className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Services List */}
          <div className="space-y-2">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  activeService === service.id
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3
                        className={`text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                          activeService === service.id
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: activeService === service.id ? "60px" : "0px",
                        }}
                        className="h-0.5 bg-[#DCDFFF]"
                      />
                    </div>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        activeService === service.id
                          ? "text-white/70"
                          : "text-white/40"
                      }`}
                    >
                      {service.subtitle}
                    </p>
                  </div>

                  <motion.svg
                    className="w-6 h-6 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{
                      x: activeService === service.id ? 5 : 0,
                      opacity: activeService === service.id ? 1 : 0.4,
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="relative min-h-[400px] lg:min-h-[600px]">
            <AnimatePresence mode="wait">
              {currentService ? (
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ backgroundColor: currentService.color }}
                >
                  <div className="h-full p-8 flex flex-col">
                    {/* Images Grid */}
                    <div className="flex-1 grid grid-cols-3 gap-4 mb-6">
                      {currentService.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onMouseEnter={() => setHoveredImage(idx)}
                          className={`relative rounded-2xl overflow-hidden bg-white/20 cursor-pointer transition-all duration-300 ${
                            hoveredImage === idx
                              ? "ring-4 ring-black/20 scale-105"
                              : ""
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain p-4"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-black/70 text-lg mb-6">
                        {currentService.description}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
                      >
                        Get Started
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
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-3xl bg-white/5 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      👆
                    </motion.div>
                    <p className="text-white/40 text-lg">
                      Hover over a service to preview
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-lg font-medium text-white/60 hover:text-white transition-colors group"
          >
            <span>Ready to start your project?</span>
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s talk
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
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

