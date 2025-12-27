"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getStats } from "@/lib/siteConfig";

// Minimal SVG Icons
const Icons = {
  stats: () => (
    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  product: () => (
    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  clients: () => (
    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  social: () => (
    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  faq: () => (
    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ai: () => (
    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  external: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  chevron: () => (
    <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

export default function Built() {
  const [stats, setStats] = useState(siteConfig.stats);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Simulate dynamic data loading
  useEffect(() => {
    // In production, fetch from API
    setStats(siteConfig.stats);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Built by Hindra</h2>
          <p className="text-black/60 text-lg max-w-2xl mx-auto">Our products, clients, and everything we do</p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-12">

          {/* Left Column */}
          <div className="flex flex-col gap-8 items-center">
            {/* Stats Card */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-[360px] lg:-rotate-3 lg:hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center gap-3 mb-6">
                <Icons.stats />
                <p className="font-semibold text-gray-800">Our Numbers</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-black">{stats.liveProducts}</p>
                  <p className="text-gray-500 text-sm mt-1">Product</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-black">{stats.foundedYear}</p>
                  <p className="text-gray-500 text-sm mt-1">Founded</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-black">{stats.happyCustomers}+</p>
                  <p className="text-gray-500 text-sm mt-1">Customers</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-black">{stats.projectsCompleted}+</p>
                  <p className="text-gray-500 text-sm mt-1">Projects</p>
                </div>
              </div>
            </div>

            {/* Our Product Card */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-[360px] lg:rotate-3 lg:hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center gap-3 mb-6">
                <Icons.product />
                <p className="font-semibold text-gray-800">Our Product</p>
              </div>

              <div className="flex flex-col gap-3">
                {siteConfig.ownProducts.map((product) => (
                  <a
                    key={product.name}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all group border border-indigo-100"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Icons.ai />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{product.name}</p>
                      <p className="text-gray-500 text-sm">{product.description}</p>
                    </div>
                    <Icons.external />
                  </a>
                ))}
              </div>
            </div>

            {/* Clients Card */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-[360px] lg:-rotate-3 lg:hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center gap-3 mb-6">
                <Icons.clients />
                <p className="font-semibold text-gray-800">Our Clients</p>
              </div>

              <div className="flex flex-col gap-3">
                {siteConfig.clients.map((client) => (
                  <a
                    key={client.name}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-black transition-colors">{client.name}</p>
                      <p className="text-gray-500 text-sm">{client.description}</p>
                    </div>
                    <Icons.external />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 items-center">
            {/* Social Links Card */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-[360px] lg:rotate-3 lg:hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center gap-3 mb-6">
                <Icons.social />
                <p className="font-semibold text-gray-800">Connect With Us</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-full h-20 bg-gray-50 rounded-2xl flex items-center justify-center ${social.hoverColor} transition-all duration-300`}
                    aria-label={social.name}
                  >
                    {social.icon ? (
                      <Image src={social.icon} alt={social.name} width={32} height={32} className="w-8 h-8 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                    ) : (
                      <span className="text-2xl font-bold group-hover:text-white transition-all duration-300">𝕏</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Card - Fixed width issue */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-[360px] min-w-[320px] lg:-rotate-3 lg:hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center gap-3 mb-6">
                <Icons.faq />
                <p className="font-semibold text-gray-800">FAQ</p>
              </div>

              <div className="flex flex-col gap-3">
                {siteConfig.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex justify-between items-center px-4 py-3 text-left"
                    >
                      <span className="font-semibold text-gray-800 text-sm pr-4">{faq.question}</span>
                      <div className={`transform transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}>
                        <Icons.chevron />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <p className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-semibold text-lg hover:bg-black/90 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Let&apos;s Build Something Together
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
