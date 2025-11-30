"use client";

import { Palette, Instagram, Globe, Video, Bot, Rocket, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

const SERVICES: Service[] = [
  { 
    title: "Brand Identity", 
    description: "Logo, visual identity & brand guidelines",
    Icon: Palette,
    color: "bg-purple-100"
  },
  { 
    title: "Social Media", 
    description: "Page setup, content & daily management",
    Icon: Instagram,
    color: "bg-pink-100"
  },
  { 
    title: "Website & Deploy", 
    description: "Custom website with full deployment",
    Icon: Globe,
    color: "bg-blue-100"
  },
  { 
    title: "Content Creation", 
    description: "Photos, videos, reels & graphics",
    Icon: Video,
    color: "bg-orange-100"
  },
  { 
    title: "AI & Automation", 
    description: "Chatbots & marketing automation",
    Icon: Bot,
    color: "bg-green-100"
  },
  { 
    title: "Launch & Growth", 
    description: "Go-to-market strategy & analytics",
    Icon: Rocket,
    color: "bg-amber-100"
  },
  { 
    title: "Community Management", 
    description: "Engagement & audience growth",
    Icon: Users,
    color: "bg-cyan-100"
  },
  { 
    title: "Complete Package", 
    description: "Everything your brand needs",
    Icon: TrendingUp,
    color: "bg-[#DCDFFF]"
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="w-full py-20 lg:py-32 bg-[#FAFAFA]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 sm:gap-16">
          {/* Header */}
          <div className="text-center max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-black/50 mb-4">
              Complete Brand Solution
            </p>
            <h2
              id="services-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6"
            >
              From Zero to Hero
            </h2>
            <p className="text-lg text-black/60">
              We handle everything. Brand identity, social media, website, content - all under one roof. 
              One team. One vision. Complete package.
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

          {/* Package Highlight */}
          <div className="w-full max-w-4xl bg-black rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              One Team. One Package. Everything You Need.
            </h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Stop juggling multiple vendors. We handle your entire brand journey - from the first logo sketch to daily social media posts. Your brand deserves a dedicated team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Get Your Brand Package
              </Link>
              <Link
                href="/works"
                className="px-8 py-4 text-white font-medium hover:text-white/70 transition-colors flex items-center gap-2"
              >
                See Success Stories
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
