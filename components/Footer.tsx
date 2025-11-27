"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/icons/Logo.svg";

const footerLinks = {
  services: [
    { name: "Brand Identity", href: "/services#brand" },
    { name: "Web Development", href: "/services#web" },
    { name: "Motion Design", href: "/services#motion" },
    { name: "UI/UX Design", href: "/services#uiux" },
    { name: "AI Integration", href: "/services#ai" },
    { name: "Strategy", href: "/services#strategy" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers", badge: "Hiring!" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/works" },
    { name: "FAQ", href: "/contact#faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { name: "Twitter", icon: "𝕏", href: "#" },
  { name: "LinkedIn", icon: "in", href: "#" },
  { name: "Instagram", icon: "📷", href: "#" },
  { name: "Dribbble", icon: "🏀", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#E9DCC8]/30 pt-20 pb-8">
      <div className="container-custom">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={Logo}
                alt="Hindra Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-black/60 text-sm leading-relaxed mb-6 max-w-xs">
              We help founders, companies and studios turn half-formed ideas into clear brands, 
              fast websites and videos people actually want to watch.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-black mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-black/60 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-black mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-black/60 hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-[#E9DCC8] text-black rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-black mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-black/60 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-black mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-black/60 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-y border-black/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-black mb-1">Stay in the loop</h3>
              <p className="text-sm text-black/60">Get updates on our latest work and insights.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-full border border-black/10 bg-white text-sm focus:outline-none focus:border-black transition-colors"
              />
              <button type="submit" className="btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black/50">
            © {new Date().getFullYear()} Hindra Studio. All rights reserved.
          </p>
          <p className="text-sm text-black/50">
            Designed with care. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
