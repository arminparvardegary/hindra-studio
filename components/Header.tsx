"use client";

import { motion } from "framer-motion";
import Logo from "@/public/icons/Logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="container-custom">
        {/* Row */}
        <div className="flex items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <Link href="/" aria-label="Hindra home" className="inline-flex items-center">
            <Image
              src={Logo}
              alt="Hindra Logo"
              priority
              className="h-auto w-10 sm:w-12 md:w-14"
              sizes="(min-width: 768px) 56px, 40px"
            />
          </Link>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="btn text-xs sm:text-sm"
            >
              Let&apos;s make it together
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
