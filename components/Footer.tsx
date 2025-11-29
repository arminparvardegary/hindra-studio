"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/icons/Logo.svg";

const footerLinks = {
  services: [
    { name: "Brand Identity", href: "/services/brand-identity" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "Motion Design", href: "/services/motion-design" },
    { name: "Product Design", href: "/services/product-design" },
    { name: "Brand Strategy", href: "/services/strategy" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Work", href: "/works" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Case Studies", href: "/works" },
    { name: "Brand Guidelines", href: "/resources/guidelines" },
    { name: "Design Process", href: "/resources/process" },
    { name: "FAQ", href: "/faq" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com/hindrastudio" },
    { name: "LinkedIn", href: "https://linkedin.com/company/hindra" },
    { name: "Twitter", href: "https://twitter.com/hindrastudio" },
    { name: "Dribbble", href: "https://dribbble.com/hindra" },
    { name: "Behance", href: "https://behance.net/hindra" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={Logo}
                alt="Hindra Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-sm">
              We craft brands, build websites, and create motion that moves people. 
              From strategy to execution, we bring your vision to life.
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={link.name}
                >
                  <span className="text-sm">{link.name.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Services */}
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get design tips and industry insights delivered to your inbox.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Hindra Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
