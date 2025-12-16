"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Scriptra",
    description: "AI-powered content creation",
    url: "https://scriptra.space",
    icon: "🤖",
    color: "bg-indigo-100",
  },
  {
    name: "Rush Photos",
    description: "Product photography from $25",
    url: "https://rush.photos",
    icon: "📸",
    color: "bg-blue-100",
  },
  {
    name: "Rush Video",
    description: "AI product videos",
    url: "https://rush.video",
    icon: "🎬",
    color: "bg-purple-100",
  },
  {
    name: "Rush Boxes",
    description: "Custom packaging solutions",
    url: "https://rushboxes.com",
    icon: "📦",
    color: "bg-amber-100",
  },
];

const faqs = [
  {
    question: "What is Hindra Studio?",
    answer: "Hindra Studio is a creative digital agency that builds innovative products. We create SaaS platforms, e-commerce services, and digital solutions.",
  },
  {
    question: "What products have you built?",
    answer: "We've built Scriptra (AI content platform), Rush Photos (product photography), Rush Video (AI video production), and Rush Boxes (custom packaging).",
  },
  {
    question: "Where are you located?",
    answer: "We're based in New Jersey, USA, but serve customers worldwide through our digital products.",
  },
];

export default function Built() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Mobile: stacked cards, Desktop: side by side with rotation effects */}
      <div className="flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
        
        {/* Left column */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Stats Card */}
          <div
            className="bg-white shadow-xl rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-[320px] sm:max-w-[350px] flex flex-col lg:-rotate-[8deg] lg:hover:rotate-0 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <Image src='/Group (1).svg' alt="Stats icon" width={24} height={24} />
              <p className="font-semibold text-gray-800">Our Numbers</p>
            </div>

            <div className="bg-gray-100 rounded-[16px] sm:rounded-[22px] py-4 sm:py-6 px-4 text-center shadow-sm mb-3 sm:mb-4">
              <p className="text-3xl sm:text-4xl font-bold text-black">4</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Live Products</p>
            </div>

            <div className="bg-gray-100 rounded-[16px] sm:rounded-[22px] py-4 sm:py-6 px-4 text-center shadow-sm mb-3 sm:mb-4">
              <p className="text-3xl sm:text-4xl font-bold text-black">2017</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Founded</p>
            </div>

            <div className="bg-gray-100 rounded-[16px] sm:rounded-[22px] py-4 sm:py-6 px-4 text-center shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-black">500+</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Happy Customers</p>
            </div>
          </div>

          {/* Products Card */}
          <div
            className="bg-white shadow-xl rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-[320px] sm:max-w-[350px] flex flex-col lg:rotate-[8deg] lg:hover:rotate-0 lg:-mt-12 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Image src='/Vector (6).svg' alt="Products icon" width={24} height={24} />
              <p className="font-semibold text-gray-800">Our Products</p>
            </div>

            <div className="flex flex-col gap-3">
              {products.map((product) => (
                <a
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center text-xl`}>
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">{product.name}</p>
                    <p className="text-gray-500 text-xs">{product.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Social Links Card */}
          <div
            className="bg-white shadow-xl rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-[320px] sm:max-w-[340px] lg:rotate-[8deg] lg:hover:rotate-0 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Image src='/Group (2).svg' alt="Social icon" width={24} height={24} />
              <p className="font-semibold text-gray-800">Connect With Us</p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <a href="https://linkedin.com/company/hindra-studio" target="_blank" rel="noopener noreferrer" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Image src='/linkedin.svg' alt="LinkedIn" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="https://youtube.com/@hindrastudio" target="_blank" rel="noopener noreferrer" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-red-100 transition-colors">
                <Image src='/youtube.svg' alt="YouTube" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="https://instagram.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-pink-100 transition-colors">
                <Image src='/instagram.svg' alt="Instagram" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="https://behance.net/hindrastudio" target="_blank" rel="noopener noreferrer" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Image src='/behance.svg' alt="Behance" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="https://dribbble.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-pink-100 transition-colors">
                <Image src='/dribbble.svg' alt="Dribbble" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="https://twitter.com/hindrastudio" target="_blank" rel="noopener noreferrer" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-blue-100 transition-colors">
                <span className="text-2xl sm:text-3xl">𝕏</span>
              </a>
            </div>
          </div>

          {/* FAQ Card */}
          <div
            className="bg-white shadow-xl rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-[320px] sm:max-w-[340px] flex flex-col gap-3 sm:gap-4 lg:-rotate-[8deg] lg:hover:rotate-0 lg:-mt-12 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Image src='/Vector (7).svg' alt="FAQ icon" width={24} height={24} />
              <p className="font-semibold text-gray-800">FAQ</p>
            </div>

            {faqs.map((faq, index) => (
              <details key={index} className={index === 0 ? "rounded-xl border shadow-sm" : "bg-gray-100 rounded-xl shadow-sm"}>
              <summary className="flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer list-none">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{faq.question}</span>
                  <Image src='/chevron-down-solid-full.svg' alt="Expand" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
              </summary>
              <div className="px-3 sm:px-4 pb-2.5 sm:pb-3">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                </p>
              </div>
            </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
        >
          Let&apos;s Build Something Together
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
