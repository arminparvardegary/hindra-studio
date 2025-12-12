"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowConsent(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShowConsent(false);
  };

  return (
    <div className="print:hidden">
      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 print:hidden"
          >
          <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#DCDFFF] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-1">We value your privacy</h3>
                <p className="text-sm text-black/60 mb-4">
                  We use cookies to enhance your experience. By continuing, you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-black">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="px-4 py-2 bg-black/5 text-black text-sm font-medium rounded-full hover:bg-black/10 transition-colors"
                  >
                    Essential Only
                  </button>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

