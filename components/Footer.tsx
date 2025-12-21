"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/icons/Logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Content */}
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={Logo}
                  alt="Hindra Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <p className="text-white/50 text-sm max-w-xs">
              End-to-end digital solutions. AI, automation, web, mobile, design.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-medium text-sm mb-4 text-white/70 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://scriptra.space" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  Scriptra
                </a>
              </li>
              <li>
                <a href="https://rush.photos" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  Rush Photos
                </a>
              </li>
              <li>
                <a href="https://rush.video" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  Rush Video
                </a>
              </li>
              <li>
                <a href="https://rushboxes.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  Rush Boxes
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-sm mb-4 text-white/70 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-white/50 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-white/50 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/50 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2">
                  Careers
                  <span className="px-1.5 py-0.5 text-[10px] bg-green-500 text-white rounded">Hiring</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium text-sm mb-4 text-white/70 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:hello@hindra.studio" className="text-white/50 hover:text-white transition-colors">
                  hello@hindra.studio
                </a>
              </li>
              <li>
                <a href="https://twitter.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/hindra" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {currentYear} Hindra Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Istanbul, Turkey
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
