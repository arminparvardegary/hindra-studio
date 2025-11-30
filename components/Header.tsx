"use client";

import { motion } from "framer-motion";
import Logo from "@/public/icons/Logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
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
              {/* If you do not use a global .btn class, uncomment the utilities below */}
              {/* className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow-sm ring-1 ring-black/10 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40 sm:px-6 sm:py-3 md:text-base md:px-7 md:py-3.5" */}
              Let&apos;s make it together
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
