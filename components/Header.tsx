"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/public/icons/Logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Row */}
        <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5">
          {/* Logo */}
          <Link href="/" aria-label="Hindra home" className="inline-flex items-center">
            <Image
              src={Logo}
              alt="Hindra Logo"
              priority
              className="h-auto w-10 sm:w-12 md:w-14 lg:w-16"
              sizes="(min-width: 1024px) 64px, (min-width: 640px) 56px, 40px"
            />
          </Link>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="btn inline-flex items-center justify-center whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium tracking-wide sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3 md:text-base lg:px-6 lg:py-3.5"
            >
              Let&apos;s make it together
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
