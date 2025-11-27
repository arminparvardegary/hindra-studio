"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Brand Identity",
    description: "Complete visual identity systems that capture your essence and set you apart from the competition.",
    features: ["Logo Design", "Brand Guidelines", "Visual Systems", "Brand Strategy"],
    color: "#DCDFFF",
  },
  {
    id: "02",
    title: "Web Development",
    description: "Fast, beautiful, and responsive websites that convert visitors into customers.",
    features: ["React / Next.js", "E-commerce", "CMS Integration", "Performance"],
    color: "#E9DCC8",
  },
  {
    id: "03",
    title: "Motion Design",
    description: "Captivating animations and videos that bring your brand to life.",
    features: ["2D Animation", "3D Animation", "Video Production", "Explainer Videos"],
    color: "#DCDFFF",
  },
  {
    id: "04",
    title: "UI/UX Design",
    description: "User-centered design that makes complex simple and delightful to use.",
    features: ["User Research", "Wireframing", "Prototyping", "User Testing"],
    color: "#E9DCC8",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [index % 2 === 0 ? -100 : 100, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [index % 2 === 0 ? -10 : 10, 0]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity, rotateY }}
      className={`grid md:grid-cols-2 gap-8 items-center ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium text-black/40"
        >
          {service.id}
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black"
        >
          {service.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-lg text-black/60 leading-relaxed"
        >
          {service.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {service.features.map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 bg-black/5 rounded-full text-sm text-black/70"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`relative aspect-square rounded-3xl overflow-hidden ${
          index % 2 === 1 ? "md:order-1" : ""
        }`}
        style={{ backgroundColor: service.color }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-[120px] sm:text-[180px] font-bold text-black/10"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            {service.id}
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white/30"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-14 h-14 rounded-lg bg-black/10"
          animate={{ y: [0, 15, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-white/50"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#DCDFFF]/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#E9DCC8]/30 blur-[100px]" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span variants={itemVariants} className="tag mb-4">
            What We Do
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-black/60 max-w-2xl mx-auto"
          >
            We offer a full range of design and development services to help 
            your brand stand out and succeed.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-20 sm:space-y-32">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
