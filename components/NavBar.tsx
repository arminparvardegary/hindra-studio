"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/public/icons/Logo.svg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  if (!showNav) return null;

  return (
    <>
      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-10 h-full flex flex-col items-center justify-center px-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Logo */}
              <div className="absolute top-6 left-6">
                <Image
                  src={Logo}
                  alt="Hindra Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-4xl sm:text-5xl font-bold transition-colors ${isActive(link.href)
                        ? "text-white"
                        : "text-white/40 hover:text-white"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="absolute bottom-12 left-0 right-0 px-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-4 bg-white text-black rounded-full text-center font-bold text-lg hover:bg-white/90 transition-colors"
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 pointer-events-none"
      >
        <section className="w-full px-4 sm:px-5 lg:px-0">
          <div className="relative isolate pointer-events-auto w-full lg:w-fit lg:mx-auto">
            {/* Navbar pill */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              className="inline-flex w-full lg:w-fit items-center rounded-full bg-[#fafafa] shadow-lg ring-1 ring-black/10 justify-between lg:justify-center gap-3 lg:gap-16 py-2.5 px-3 sm:px-4 lg:px-2"
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
              <div className="hidden lg:flex items-center bg-[#fafafa] py-1 px-2 gap-1 rounded-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-3 px-4 rounded-full transition-all duration-300 ease-out text-sm font-medium ${isActive(link.href)
                      ? "text-white bg-black"
                      : "text-black hover:bg-black hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white focus:outline-none active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>
      </motion.nav>
    </>
  );
}
