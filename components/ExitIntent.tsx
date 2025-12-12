"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem("exitIntentShown");
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse moves toward browser UI (top of page)
      if (e.clientY <= 5 && !isVisible && !hasShown) {
        setIsVisible(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Only add listener after 10 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send to your email service
    console.log("Exit intent email:", email);
    setSubmitted(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  return (
    <div className="print:hidden">
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm print:hidden"
            />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors z-10"
              >
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-[#DCDFFF] to-[#E9DCC8] px-8 py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                >
                  <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-black">Wait, before you go!</h3>
                <p className="text-black/70 mt-2">
                  Get a free brand audit worth $500
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-8">
                {!submitted ? (
                  <>
                    <p className="text-black/60 text-center mb-6">
                      Join 2,000+ founders who receive our weekly design tips and exclusive offers.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/5 text-black placeholder:text-black/40 outline-none focus:border-black transition-colors"
                      />
                      <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition-opacity"
                      >
                        Get Free Brand Audit
                      </button>
                    </form>

                    <p className="text-xs text-center text-black/40 mt-4">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-black">You&apos;re in!</h4>
                    <p className="text-black/60 mt-2">Check your inbox for the brand audit.</p>
                  </motion.div>
                )}
              </div>

              {/* Trust indicators */}
              <div className="px-8 py-4 bg-black/5 flex items-center justify-center gap-6 text-xs text-black/50">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No spam
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  2K+ subscribers
                </span>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
