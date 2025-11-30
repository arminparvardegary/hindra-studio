"use client";

import { Bot, Workflow, Globe, Palette, Video, Smartphone, Database, Sparkles } from "lucide-react";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

const SERVICES: Service[] = [
  { 
    title: "AI Solutions", 
    description: "Custom AI, chatbots, and machine learning",
    Icon: Bot,
    color: "bg-purple-100"
  },
  { 
    title: "Automation", 
    description: "Business process & workflow automation",
    Icon: Workflow,
    color: "bg-blue-100"
  },
  { 
    title: "Web Development", 
    description: "Websites, web apps & e-commerce",
    Icon: Globe,
    color: "bg-green-100"
  },
  { 
    title: "Design & Branding", 
    description: "UI/UX, brand identity & design systems",
    Icon: Palette,
    color: "bg-pink-100"
  },
  { 
    title: "Video & Motion", 
    description: "Video editing, motion graphics & 3D",
    Icon: Video,
    color: "bg-orange-100"
  },
  { 
    title: "Mobile Apps", 
    description: "iOS, Android & cross-platform apps",
    Icon: Smartphone,
    color: "bg-cyan-100"
  },
  { 
    title: "Custom Systems", 
    description: "End-to-end software solutions",
    Icon: Database,
    color: "bg-amber-100"
  },
  { 
    title: "Digital Transformation", 
    description: "Complete business digitalization",
    Icon: Sparkles,
    color: "bg-[#DCDFFF]"
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="w-full py-20 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 sm:gap-16">
          {/* Header */}
          <div className="text-center max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-black/50 mb-4">
              What We Do
            </p>
            <h2
              id="services-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6"
            >
              End-to-End Solutions
            </h2>
            <p className="text-lg text-black/60">
              From idea to launch and beyond. We handle everything so you can focus on growing your business.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            {SERVICES.map(({ title, description, Icon, color }) => (
              <div
                key={title}
                className="group relative rounded-2xl bg-white ring-1 ring-black/5 shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer overflow-hidden"
              >
                {/* Background color on hover */}
                <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:bg-white/50 transition-colors`}>
                    <Icon className="h-6 w-6 text-black" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
                  <p className="text-sm text-black/60 group-hover:text-black/80 transition-colors">{description}</p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
            >
              Start Your Project
            </Link>
            <Link
              href="/works"
              className="px-8 py-4 text-black font-medium hover:text-black/70 transition-colors flex items-center gap-2"
            >
              See Our Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
