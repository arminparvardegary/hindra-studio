"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/icons/Logo.svg";

export default function TestMotion() {
  const [showNav, setShowNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!showNav) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 pointer-events-none"
    >
      {/* Mobile full width with 20px padding; desktop compact pill */}
      <section className="w-full px-5 lg:px-0">
        <div className="relative isolate pointer-events-auto w-full lg:w-fit lg:mx-auto">
          {/* Mobile dropdown: zero gap, emerges from navbar bottom, width equals navbar */}
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <div
                className="absolute left-0 right-0 bottom-full lg:hidden z-0"
                aria-label="Mobile navigation"
              >
                <motion.div
                  initial={{ opacity: 0, scaleY: 0.01, y: 12 }}
                  animate={{ opacity: 1, scaleY: 1, y: 0 }}
                  exit={{ opacity: 0, scaleY: 0.01, y: 12 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 2.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: "bottom center", willChange: "transform, opacity" }}
                  className="w-full overflow-hidden rounded-t-2xl rounded-b-none border border-black/10 border-b-0 bg-[#fafafa] shadow-2xl"
                >
                  <ul className="flex flex-col divide-y divide-black/5">
                    <li>
                      <Link
                        href="/about"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-center text-black hover:bg-black hover:text-white transition-colors"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-center text-black hover:bg-black hover:text-white transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/works"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-center text-white bg-black hover:bg-black/90 transition-colors"
                      >
                        Works
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Navbar pill */}
          <div className="relative z-10">
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              className="
                inline-flex
                w-full lg:w-fit
                items-center rounded-full bg-[#fafafa] shadow ring-1 ring-black/10
                justify-between lg:justify-center
                gap-3 lg:gap-20
                py-2 sm:py-2.5 lg:py-1
                px-3 sm:px-4 lg:px-2
              "
            >
              {/* Logo */}
              <Link href="/" aria-label="Hindra home" className="shrink-0">
                <Image
                  src={Logo}
                  alt="Hindra Logo"
                  width={44}
                  height={44}
                  className="h-11 w-11 sm:h-12 sm:w-12"
                  sizes="(min-width: 640px) 48px, 44px"
                  priority
                />
              </Link>

              {/* Desktop links: original compact layout on lg+ */}
              <div className="hidden lg:flex items-center bg-[#fafafa] py-1 px-2 gap-1 rounded-full">
              <Link
                  href="/works"
                  className="text-black py-3 px-3 rounded-full hover:bg-black hover:text-white hover:px-8 transition-all duration-500 ease-in-out"
                >
                  Portfolio
                </Link>
                <Link
                  href="/about"
                  className="text-black py-3 px-3 rounded-full hover:bg-black hover:text-white hover:px-8 transition-all duration-500 ease-in-out"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-black py-3 px-4 rounded-full hover:bg-black hover:text-white hover:px-8 transition-all duration-500 ease-in-out"
                >
                  Contact
                </Link>
                <Link
                  href="/"
                  className="text-white bg-black py-3 px-3 hover:px-9 rounded-full transition-all duration-500 ease-in-out"
                >
                  Home
                </Link>
              </div>

              {/* Mobile chevron button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOpen(v => !v)}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white focus:outline-none focus:ring-2 focus:ring-black/30"
                >
                  <svg
                    className={`h-5 w-5 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.nav>
  );
}
