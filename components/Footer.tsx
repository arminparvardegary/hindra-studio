"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      style={{backgroundImage: "url('/img-clay-footer-garden.png')"}} 
      className="w-full flex justify-center py-20 pt-[20rem] pb-[8rem] md:pt-[25rem] md:pb-[10rem]"
    >
      <div className="w-[92%] md:w-[85%] lg:w-[75%] bg-[#F8F6F1] text-[#111] px-6 sm:px-8 md:px-10 py-12 md:py-16 lg:py-20 rounded-[24px] md:rounded-[32px] lg:rounded-[40px]">
        
        {/* Links Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-4">Services</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li><Link href="/services/branding" className="hover:text-black transition-colors">Brand Identity</Link></li>
              <li><Link href="/services/web" className="hover:text-black transition-colors">Web Development</Link></li>
              <li><Link href="/services/motion" className="hover:text-black transition-colors">Motion Design</Link></li>
              <li><Link href="/services/product" className="hover:text-black transition-colors">Product Design</Link></li>
              <li><Link href="/services/strategy" className="hover:text-black transition-colors">Brand Strategy</Link></li>
            </ul>
          </div>

          {/* Work */}
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-4">Work</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li><Link href="/works" className="hover:text-black transition-colors">All Projects</Link></li>
              <li><Link href="/works/luxe-motors" className="hover:text-black transition-colors">Luxe Motors</Link></li>
              <li><Link href="/works/kumu" className="hover:text-black transition-colors">Kumu Social</Link></li>
              <li><Link href="/works/carsome" className="hover:text-black transition-colors">Carsome</Link></li>
              <li><Link href="/works/van-heusen" className="hover:text-black transition-colors">Van Heusen</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-4">Resources</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li><Link href="/process" className="hover:text-black transition-colors">Our Process</Link></li>
              <li><Link href="/brand-guidelines" className="hover:text-black transition-colors">Brand Guidelines</Link></li>
              <li><Link href="/case-studies" className="hover:text-black transition-colors">Case Studies</Link></li>
              <li><Link href="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-4">Company</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li className="flex items-center gap-2 flex-wrap">
                <Link href="/careers" className="hover:text-black transition-colors">Careers</Link>
                <span className="text-[9px] sm:text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-medium whitespace-nowrap">Hiring!</span>
              </li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
            
            <h3 className="font-semibold text-sm md:text-base mb-4 mt-8">Legal</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-semibold text-sm md:text-base mb-4">Connect</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li><a href="https://instagram.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="https://linkedin.com/company/hindra" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a></li>
              <li><a href="https://twitter.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Twitter</a></li>
              <li><a href="https://dribbble.com/hindra" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Dribbble</a></li>
              <li><a href="https://behance.net/hindra" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Behance</a></li>
            </ul>
          </div>
        
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto mt-12 md:mt-16 lg:mt-20 border-t border-gray-200" />

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto mt-10 md:mt-12 lg:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">120+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Projects Delivered</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">50+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Happy Clients</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">8+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Years Experience</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">98%</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto mt-10 md:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Hindra Studio. Crafting brands that convert.
          </p>
          <p className="text-center sm:text-right">
            Based in Dubai, working globally.
          </p>
        </div>

      </div>
    </footer>
  );
}
