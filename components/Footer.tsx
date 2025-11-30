"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { name: "AI Solutions", href: "/contact?service=ai" },
      { name: "Automation", href: "/contact?service=automation" },
      { name: "Web Development", href: "/contact?service=web" },
      { name: "Mobile Apps", href: "/contact?service=mobile" },
      { name: "Design & Branding", href: "/contact?service=design" },
      { name: "Video & Motion", href: "/contact?service=video" },
    ],
    work: [
      { name: "All Projects", href: "/works" },
      { name: "AI Projects", href: "/works?filter=ai" },
      { name: "Automation", href: "/works?filter=automation" },
      { name: "Web Apps", href: "/works?filter=web" },
      { name: "Mobile Apps", href: "/works?filter=mobile" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers", badge: "Hiring" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { 
      name: "Twitter", 
      href: "https://twitter.com/hindrastudio",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/hindra",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com/hindrastudio",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    { 
      name: "Dribbble", 
      href: "https://dribbble.com/hindra",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="relative bg-black text-white overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#DCDFFF]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-[#E9DCC8]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Newsletter Section */}
          <div className="border-b border-white/10">
            <div className="container-custom py-16 sm:py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Stay in the loop
                  </h2>
                  <p className="text-white/60 text-lg max-w-md">
                    Get the latest in AI, automation, and digital innovation delivered straight to your inbox.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubscribed ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
                      >
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">You&apos;re subscribed!</p>
                          <p className="text-white/60">Welcome to the Hindra community.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="relative flex-1">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                        >
                          {isSubmitting ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <>
                              Subscribe
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="container-custom py-16 sm:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Brand Column */}
              <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
                <Link href="/" className="inline-block mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center"
                  >
                    <span className="text-3xl font-bold text-black">H</span>
                  </motion.div>
                </Link>
                <p className="text-white/60 mb-6 max-w-xs">
                  End-to-end digital solutions. AI, automation, web, mobile, design - we build it all from zero to hero.
                </p>
                
                {/* Status indicator */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-white/70">Available for projects</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold mb-6 text-white">Services</h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{link.name}</span>
                        <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Work */}
              <div>
                <h3 className="font-semibold mb-6 text-white">Work</h3>
                <ul className="space-y-3">
                  {footerLinks.work.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{link.name}</span>
                        <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-6 text-white">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-green-500 text-white rounded-full">
                            {link.badge}
                          </span>
                        )}
                        <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social & Contact */}
              <div>
                <h3 className="font-semibold mb-6 text-white">Connect</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                <a
                  href="mailto:hello@hindra.studio"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  hello@hindra.studio
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10">
            <div className="container-custom py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white/40 text-sm text-center sm:text-left">
                  © {currentYear} Hindra Studio. All rights reserved.
                </p>
                
                <div className="flex items-center gap-6 text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#DCDFFF] rounded-full" />
                    Dubai, UAE
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>Working globally</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={scrollToTop}
                    className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    Back to top
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
