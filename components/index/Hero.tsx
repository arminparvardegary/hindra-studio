"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
      className="relative flex flex-col items-center justify-center min-h-[90vh] py-20 sm:py-24 lg:py-32"
      aria-labelledby="hero-title"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#DCDFFF]/40 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[#E9DCC8]/40 blur-[100px]" />
      </div>

      <motion.div
        className="container-custom relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-10">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCDFFF]"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="text-sm text-black">Available for new projects</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            id="hero-title"
            className="text-center font-bold leading-[1.1] tracking-tight max-w-4xl"
          >
            <span className="block text-black/40 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Design, Development
            </span>
            <span className="block text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
              & Motion
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-center text-lg sm:text-xl text-black/60 leading-relaxed"
          >
            We help founders, companies and studios turn half-formed ideas into 
            clear brands, fast websites and videos people actually want to watch.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/contact" className="btn px-8 py-4 text-base">
              Start a project
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/works" className="btn-outline px-8 py-4 text-base">
              View our work
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6"
          >
            <div className="flex -space-x-3">
              <Avatar className="h-11 w-11 ring-2 ring-white">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Client" />
                <AvatarFallback className="bg-[#DCDFFF]">CL</AvatarFallback>
              </Avatar>
              <Avatar className="h-11 w-11 ring-2 ring-white">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Client" />
                <AvatarFallback className="bg-[#DCDFFF]">CL</AvatarFallback>
              </Avatar>
              <Avatar className="h-11 w-11 ring-2 ring-white">
                <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Client" />
                <AvatarFallback className="bg-[#DCDFFF]">CL</AvatarFallback>
              </Avatar>
              <Avatar className="h-11 w-11 ring-2 ring-white bg-black text-white">
                <AvatarFallback className="text-sm font-medium bg-black text-white">+50</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-black fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-black/50">
                Trusted by <span className="font-semibold text-black">50+</span> clients worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-black/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
