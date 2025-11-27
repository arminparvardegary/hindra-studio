"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/icons/Logo.svg";

export default function NavBar() {
  const [showNav, setShowNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/works", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/", label: "Home" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 pointer-events-none"
    >
      {/* Mobile full width with padding; desktop compact pill */}
      <section className="w-full px-5 lg:px-0">
        <div className="relative isolate pointer-events-auto w-full lg:w-fit lg:mx-auto">
          {/* Mobile dropdown */}
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
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: "bottom center", willChange: "transform, opacity" }}
                  className="w-full overflow-hidden rounded-t-2xl rounded-b-none border border-black/10 border-b-0 bg-white shadow-xl"
                >
                  <ul className="flex flex-col divide-y divide-black/5">
                    {navLinks.slice(0, 3).map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-3 text-center transition-colors ${
                            isActive(link.href)
                              ? "bg-black text-white"
                              : "text-black hover:bg-[#DCDFFF]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
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
                items-center rounded-full bg-white shadow-lg ring-1 ring-black/10
                justify-between lg:justify-center
                gap-3 lg:gap-16
                py-2 sm:py-2.5 lg:py-1.5
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
                  className="h-10 w-10 sm:h-11 sm:w-11"
                  sizes="(min-width: 640px) 44px, 40px"
                  priority
                />
              </Link>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center bg-white py-1 px-2 gap-1 rounded-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2.5 px-4 rounded-full transition-all duration-300 ${
                      isActive(link.href)
                        ? "bg-black text-white"
                        : "text-black hover:bg-[#DCDFFF]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
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
