"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const features = [
  {
    title: "Strategy",
    description: "Research-driven approach to understand your market",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Design",
    description: "Pixel-perfect visuals that capture your essence",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Development",
    description: "Clean, performant code that brings designs to life",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Motion",
    description: "Animations that add life to interactions",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const tools = [
  { name: "Figma", color: "bg-[#DCDFFF] text-black" },
  { name: "React", color: "bg-[#DCDFFF] text-black" },
  { name: "Next.js", color: "bg-black text-white" },
  { name: "Tailwind", color: "bg-[#DCDFFF] text-black" },
  { name: "Framer", color: "bg-[#E9DCC8] text-black" },
  { name: "AI Tools", color: "bg-[#E9DCC8] text-black" },
];

export default function Built() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#DCDFFF]/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.span
              variants={itemVariants}
              className="tag mb-6"
            >
              How we work
            </motion.span>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6"
            >
              Built with precision,<br />
              <span className="text-black/40">delivered with care</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-black/60 mb-8 leading-relaxed"
            >
              We combine strategic thinking with creative excellence to deliver 
              brands that make an impact. Every project is crafted with attention 
              to detail and a focus on real outcomes.
            </motion.p>

            {/* Features grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E9DCC8] flex items-center justify-center mb-3 text-black">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-black mb-1">{feature.title}</h3>
                  <p className="text-sm text-black/50">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Tools */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-black/40 mb-3">Technologies we use</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool.name}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${tool.color}`}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative flex flex-col items-center gap-8">
              {/* Top card - tilted left */}
              <motion.div
                className="relative z-10 w-[320px] bg-white rounded-3xl shadow-xl p-6"
                animate={inView ? { rotate: -8, y: [0, -10, 0] } : {}}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              >
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl ${i % 2 === 0 ? 'bg-[#DCDFFF]' : 'bg-[#E9DCC8]'}`}
                    />
                  ))}
                </div>
                <div className="h-3 w-24 bg-black/10 rounded-full mb-2" />
                <div className="h-2 w-16 bg-black/5 rounded-full" />
              </motion.div>

              {/* Middle card - tilted right */}
              <motion.div
                className="relative z-20 -mt-12 w-[320px] bg-white rounded-3xl shadow-xl p-6"
                animate={inView ? { rotate: 8, y: [0, 10, 0] } : {}}
                transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-black" />
                  <div>
                    <div className="h-3 w-20 bg-black/10 rounded-full mb-1" />
                    <div className="h-2 w-14 bg-black/5 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 bg-[#DCDFFF] rounded-xl" />
                  <div className="h-12 bg-[#E9DCC8] rounded-xl" />
                  <div className="h-12 bg-[#DCDFFF] rounded-xl" />
                </div>
              </motion.div>

              {/* Bottom card - tilted left */}
              <motion.div
                className="relative z-10 -mt-12 w-[280px] bg-white rounded-3xl shadow-lg p-5"
                animate={inView ? { rotate: -5, y: [0, -8, 0] } : {}}
                transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-3 w-16 bg-black/10 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-black" />
                    <div className="w-2 h-2 rounded-full bg-[#DCDFFF]" />
                    <div className="w-2 h-2 rounded-full bg-[#E9DCC8]" />
                  </div>
                </div>
                <div className="h-20 bg-black rounded-xl flex items-center justify-center">
                  <div className="text-white font-mono text-xs">
                    &lt;/&gt; Code
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-10 -left-10 w-20 h-20 bg-[#E9DCC8]/50 rounded-full blur-2xl" />
              <div className="absolute bottom-20 -right-10 w-24 h-24 bg-[#DCDFFF]/50 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            Ready to start your project?
          </h3>
          <p className="text-black/50 mb-8 max-w-xl mx-auto">
            Let&apos;s create something amazing together. Get in touch and let&apos;s discuss your next big idea.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn px-8 py-4">
              Start a project
            </Link>
            <Link href="/works" className="btn-outline px-8 py-4">
              View case studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
