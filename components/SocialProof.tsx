"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  {
    name: "Sarah from TechFlow",
    action: "just started a project",
    time: "2 minutes ago",
    avatar: "S",
  },
  {
    name: "Michael from Dubai",
    action: "booked a consultation",
    time: "5 minutes ago",
    avatar: "M",
  },
  {
    name: "Emma from London",
    action: "joined our newsletter",
    time: "8 minutes ago",
    avatar: "E",
  },
  {
    name: "David from Singapore",
    action: "requested a quote",
    time: "12 minutes ago",
    avatar: "D",
  },
  {
    name: "Lisa from New York",
    action: "viewed our portfolio",
    time: "15 minutes ago",
    avatar: "L",
  },
];

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has dismissed notifications before
    const dismissed = sessionStorage.getItem("social-proof-dismissed");
    if (dismissed) return;

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible || hasInteracted) return;

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Show next notification after 15 seconds
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
      setIsVisible(true);
    }, 15000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, currentIndex, hasInteracted]);

  const dismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
    sessionStorage.setItem("social-proof-dismissed", "true");
  };

  const notification = notifications[currentIndex];

  return (
    <div className="print:hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-24 left-4 sm:left-6 z-40 print:hidden"
          >
          <div className="bg-white rounded-2xl shadow-xl border border-black/10 p-4 pr-10 max-w-xs relative">
            <button
              onClick={dismiss}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DCDFFF] to-[#E9DCC8] flex items-center justify-center text-black font-semibold">
                {notification.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-black">
                  {notification.name}
                </p>
                <p className="text-xs text-black/60">
                  {notification.action}
                </p>
                <p className="text-xs text-black/40 mt-0.5">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

