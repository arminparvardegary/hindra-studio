"use client";

import React from "react";
import Image from "next/image";

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
              <p className="font-semibold text-gray-800">Stats</p>
            </div>

            <div className="bg-gray-100 rounded-[16px] sm:rounded-[22px] py-4 sm:py-6 px-4 text-center shadow-sm mb-3 sm:mb-4">
              <p className="text-3xl sm:text-4xl font-bold text-black">50+</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Projects completed</p>
            </div>

            <div className="bg-gray-100 rounded-[16px] sm:rounded-[22px] py-4 sm:py-6 px-4 text-center shadow-sm mb-3 sm:mb-4">
              <p className="text-3xl sm:text-4xl font-bold text-black">7+</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Years experience</p>
            </div>

            <div className="bg-gray-100 rounded-[16px] sm:rounded-[22px] py-4 sm:py-6 px-4 text-center shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-black">100+</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Happy Customers</p>
            </div>
          </div>

          {/* Resume Card */}
          <div
            className="bg-white shadow-xl rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-[320px] sm:max-w-[350px] flex flex-col lg:rotate-[8deg] lg:hover:rotate-0 lg:-mt-12 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Image src='/Vector (6).svg' alt="Resume icon" width={24} height={24} />
              <p className="font-semibold text-gray-800">Resume</p>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="w-[2px] bg-gray-200 rounded-full"></div>
              <div className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">Position or Role</p>
                  <p className="text-gray-500 text-xs sm:text-sm -mt-1">Company Name</p>
                  <div className="flex items-center gap-2 mt-2 bg-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-sm w-fit">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded"></div>
                    <p className="text-gray-500 text-xs sm:text-sm">Mon, Year – Mon, Year</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">Position or Role</p>
                  <p className="text-gray-500 text-xs sm:text-sm -mt-1">Company Name</p>
                  <div className="flex items-center gap-2 mt-2 bg-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-sm w-fit">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded"></div>
                    <p className="text-gray-500 text-xs sm:text-sm">Mon, Year – Mon, Year</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">Position or Role</p>
                  <p className="text-gray-500 text-xs sm:text-sm -mt-1">Company Name</p>
                  <div className="flex items-center gap-2 mt-2 bg-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-sm w-fit">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded"></div>
                    <p className="text-gray-500 text-xs sm:text-sm">Mon, Year – Mon, Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Stack Card */}
          <div
            className="bg-white shadow-xl rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 w-full max-w-[320px] sm:max-w-[340px] lg:rotate-[8deg] lg:hover:rotate-0 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <Image src='/Group (2).svg' alt="Stack icon" width={24} height={24} />
              <p className="font-semibold text-gray-800">My Stack</p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <a href="#" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Image src='/linkedin.svg' alt="LinkedIn" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="#" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Image src='/youtube.svg' alt="YouTube" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="#" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Image src='/instagram.svg' alt="Instagram" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="#" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Image src='/behance.svg' alt="Behance" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="#" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Image src='/dribbble.svg' alt="Dribbble" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
              </a>

              <a href="#" className="w-full h-16 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Image src='/pinterest.svg' alt="Pinterest" width={40} height={40} className="w-8 h-8 sm:w-[50px] sm:h-[50px]" />
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

            <div className="rounded-xl border shadow-sm p-3 sm:p-4">
              <div className="flex justify-between items-center cursor-pointer">
                <p className="font-semibold text-gray-800 text-sm sm:text-base">Question goes here</p>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Long answer for this frequently asked question goes here.
              </p>
            </div>

            <details className="bg-gray-100 rounded-xl shadow-sm">
              <summary className="flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer list-none">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">Question goes here</span>
                <Image src='/chevron-down-solid-full.svg' alt="Expand" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              </summary>
              <div className="px-3 sm:px-4 pb-2.5 sm:pb-3">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Long answer for this question goes here.
                </p>
              </div>
            </details>

            <details className="bg-gray-100 rounded-xl shadow-sm">
              <summary className="flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer list-none">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">Question goes here</span>
                <Image src='/chevron-down-solid-full.svg' alt="Expand" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              </summary>
              <div className="px-3 sm:px-4 pb-2.5 sm:pb-3">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Long answer for this question goes here.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
