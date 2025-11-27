"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
};

const SERVICES: Service[] = [
  {
    title: "Brand Identity",
    description: "Turn scattered assets into a clear, memorable brand that grows with you",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    features: ["Logo Design", "Color Systems", "Typography", "Brand Guidelines"],
  },
  {
    title: "Web Development",
    description: "Fast, clean websites that work on every device and load in a blink",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ["React/Next.js", "Responsive Design", "Performance", "SEO Ready"],
  },
  {
    title: "Motion Design",
    description: "Videos and animations people actually want to watch and share",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ["UI Animations", "Explainer Videos", "Social Content", "Brand Motion"],
  },
  {
    title: "UI/UX Design",
    description: "Interfaces that feel natural and help users get things done",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    title: "AI Integration",
    description: "Smart use of AI so you can ship more and stress less",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: ["Workflow Automation", "Content Generation", "Smart Tools", "Process Optimization"],
  },
  {
    title: "Strategy",
    description: "Honest advice on what works and what does not for your goals",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: ["Market Research", "Brand Positioning", "Growth Planning", "Consulting"],
  },
];

export default function ServicesSection() {
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
    <section
      ref={ref}
      aria-labelledby="services-title"
      className="py-24 sm:py-32 bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag-soft mb-4">
            What we do
          </span>
          <h2
            id="services-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4"
          >
            Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-black/60">
            We mix design, development, motion and smart use of AI so you can 
            ship more, stress less and look as strong as the work you deliver.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative p-8 rounded-3xl transition-all duration-500 hover:shadow-lg ${
                index % 2 === 0 ? 'bg-[#DCDFFF]/50 hover:bg-[#DCDFFF]' : 'bg-[#E9DCC8]/50 hover:bg-[#E9DCC8]'
              }`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-black mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-black/60 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-black/70">
                    <svg className="w-4 h-4 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-black/50 mb-4">
            Have a specific need? We&apos;re flexible and love a good challenge.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition-all"
          >
            Let&apos;s talk about your project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
