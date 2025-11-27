"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Discovery",
    description: "We dive deep into your business, market, and audience to uncover insights that drive strategy.",
    step: "01",
  },
  {
    title: "Strategy",
    description: "We craft a clear roadmap that aligns your brand with your business goals.",
    step: "02",
  },
  {
    title: "Design",
    description: "We create beautiful, functional designs that resonate with your audience.",
    step: "03",
  },
  {
    title: "Development",
    description: "We build fast, scalable solutions using the latest technologies.",
    step: "04",
  },
  {
    title: "Launch",
    description: "We help you launch with confidence and provide ongoing support.",
    step: "05",
  },
];

export default function Built() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-[#F8F8F8] overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#DCDFFF]/40 blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#E9DCC8]/40 blur-[120px]" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span variants={itemVariants} className="tag mb-4">
            Our Process
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6"
          >
            How we build
            <br />
            <span className="text-black/40">great things</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-black/60 max-w-2xl mx-auto"
          >
            A proven process that delivers results. Every project follows our 
            refined workflow to ensure success.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />
          
          <div className="space-y-8 lg:space-y-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step number - centered on line for desktop */}
                <motion.div
                  className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black text-white items-center justify-center text-lg font-bold z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  {feature.step}
                </motion.div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? "lg:text-right lg:pr-20" : "lg:col-start-2 lg:pl-20"}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    {/* Mobile step number */}
                    <div className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-bold mb-4">
                      {feature.step}
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-black/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-black rounded-3xl p-10 sm:p-16 text-white">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to start your project?
            </h3>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Let&apos;s create something amazing together. Get in touch and we&apos;ll 
              get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
              <Link
                href="/works"
                className="inline-flex items-center gap-2 px-8 py-4 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                View our work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
