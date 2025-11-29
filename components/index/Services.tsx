"use client";

import { motion } from "framer-motion";
import { 
  Palette, 
  Code, 
  Video, 
  Smartphone, 
  Layers, 
  Zap 
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

const SERVICES: Service[] = [
  { 
    title: "Brand Identity", 
    description: "Logos, visual systems, and guidelines that define your unique presence in the market",
    Icon: Palette,
    color: "bg-[#DCDFFF]",
  },
  { 
    title: "Web Development", 
    description: "Fast, modern websites built with cutting-edge technology for optimal performance",
    Icon: Code,
    color: "bg-[#E9DCC8]",
  },
  { 
    title: "Motion Design", 
    description: "Animations and videos that capture attention and communicate your message effectively",
    Icon: Video,
    color: "bg-[#F5F5F5]",
  },
  { 
    title: "Product Design", 
    description: "User interfaces that are intuitive, beautiful, and drive business results",
    Icon: Smartphone,
    color: "bg-[#DCDFFF]",
  },
  { 
    title: "Design Systems", 
    description: "Scalable component libraries for consistent brand experiences across platforms",
    Icon: Layers,
    color: "bg-[#E9DCC8]",
  },
  { 
    title: "Brand Strategy", 
    description: "Research-driven strategies that position your brand for long-term success",
    Icon: Zap,
    color: "bg-[#F5F5F5]",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="w-full py-20 sm:py-28 lg:py-36 bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">What We Do</p>
          <h2
            id="services-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6"
          >
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            End-to-end creative solutions that help brands stand out, connect with audiences, and drive measurable results.
          </p>
        </header>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map(({ title, description, Icon, color }) => (
            <motion.article
              key={title}
              variants={itemVariants}
              className={`
                group relative overflow-hidden
                rounded-2xl ${color}
                p-8 sm:p-10
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
              `}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
