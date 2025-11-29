"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: "🎨",
    title: "Brand Identity",
    description: "Logo, visual systems, and guidelines that define your presence",
    items: ["Logo Design", "Color Systems", "Typography", "Brand Guidelines"],
  },
  {
    icon: "💻",
    title: "Web Development",
    description: "Fast, beautiful websites that convert visitors into customers",
    items: ["React/Next.js", "E-commerce", "CMS Integration", "Performance"],
  },
  {
    icon: "🎬",
    title: "Motion Design",
    description: "Videos and animations that capture attention and tell stories",
    items: ["Explainer Videos", "Social Content", "UI Animation", "3D Motion"],
  },
  {
    icon: "📱",
    title: "Product Design",
    description: "User interfaces that are intuitive, beautiful, and effective",
    items: ["UI/UX Design", "Prototyping", "User Research", "Design Systems"],
  },
];

export default function Built() {
  return (
    <section className="w-full py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Services</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Everything You Need
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            From concept to launch, we provide end-to-end creative services that help brands stand out and succeed.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 sm:p-10 rounded-3xl ${
                index === 0 ? "bg-[#DCDFFF]" :
                index === 1 ? "bg-[#E9DCC8]" :
                index === 2 ? "bg-black text-white" :
                "bg-[#F5F5F5]"
              }`}
            >
              <span className="text-4xl mb-6 block">{service.icon}</span>
              <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${index === 2 ? "text-white" : "text-black"}`}>
                {service.title}
              </h3>
              <p className={`text-base mb-6 ${index === 2 ? "text-gray-400" : "text-gray-600"}`}>
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      index === 2 
                        ? "bg-white/10 text-white/80" 
                        : "bg-black/5 text-black/70"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black to-gray-900 p-10 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#DCDFFF] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E9DCC8] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Start?
            </h3>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
              Let's discuss your project and see how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Start a Project
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center justify-center px-8 py-4 text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
