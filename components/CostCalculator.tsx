"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  monthly?: boolean;
}

const SERVICES: ServiceOption[] = [
  { id: "branding", name: "Brand Identity", basePrice: 2000, description: "Logo, colors, typography, guidelines" },
  { id: "social-setup", name: "Social Media Setup", basePrice: 500, description: "All platforms setup & optimization" },
  { id: "website", name: "Website", basePrice: 3000, description: "Custom responsive website" },
  { id: "ecommerce", name: "E-commerce Store", basePrice: 5000, description: "Online store with payments" },
  { id: "content", name: "Content Package", basePrice: 1500, description: "30 posts + graphics + reels" },
  { id: "video", name: "Video Production", basePrice: 2000, description: "Promo video + editing" },
  { id: "chatbot", name: "AI Chatbot", basePrice: 3000, description: "Custom chatbot for your site" },
];

const ADDONS: AddonOption[] = [
  { id: "social-mgmt", name: "Social Media Management", price: 800, monthly: true },
  { id: "content-monthly", name: "Monthly Content Creation", price: 600, monthly: true },
  { id: "community", name: "Community Management", price: 400, monthly: true },
  { id: "seo", name: "SEO Optimization", price: 1000 },
  { id: "hosting", name: "1 Year Hosting + Domain", price: 300 },
  { id: "rush", name: "Rush Delivery (2x faster)", price: 1500 },
  { id: "analytics", name: "Analytics & Reporting", price: 500 },
];

const PACKAGES = [
  { 
    id: "starter", 
    name: "Starter", 
    price: 3500, 
    includes: ["Brand Identity", "Social Setup", "Basic Website"],
    description: "Perfect for new brands"
  },
  { 
    id: "growth", 
    name: "Growth", 
    price: 6000, 
    includes: ["Full Branding", "Website", "Social Setup", "Content Pack"],
    description: "Ready to launch & grow",
    popular: true
  },
  { 
    id: "complete", 
    name: "Complete", 
    price: 10000, 
    includes: ["Everything", "AI Chatbot", "3 Months Management"],
    description: "Full brand transformation"
  },
];

export default function CostCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"custom" | "package">("package");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>("growth");
  const [step, setStep] = useState(1);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    if (mode === "package") {
      const pkg = PACKAGES.find(p => p.id === selectedPackage);
      const addonsTotal = selectedAddons.reduce((sum, id) => {
        const addon = ADDONS.find((a) => a.id === id);
        return sum + (addon?.price || 0);
      }, 0);
      return (pkg?.price || 0) + addonsTotal;
    }

    const servicesTotal = selectedServices.reduce((sum, id) => {
      const service = SERVICES.find((s) => s.id === id);
      return sum + (service?.basePrice || 0);
    }, 0);

    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    return servicesTotal + addonsTotal;
  };

  const getMonthlyTotal = () => {
    return selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return sum + (addon?.monthly ? addon.price : 0);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Floating Calculator Button */}
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-b from-[#DCDFFF] to-[#E9DCC8] text-black px-3 py-6 rounded-l-xl shadow-lg hover:px-4 transition-all group"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span className="text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Get Quote
        </span>
      </motion.button>

      {/* Calculator Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black">Brand Package Calculator</h2>
                  <p className="text-sm text-black/50">Get your instant estimate</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="px-6 py-4 border-b border-black/10">
                <div className="flex rounded-xl bg-black/5 p-1">
                  <button
                    onClick={() => { setMode("package"); setStep(1); }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      mode === "package" ? "bg-white shadow-sm text-black" : "text-black/60"
                    }`}
                  >
                    Packages
                  </button>
                  <button
                    onClick={() => { setMode("custom"); setStep(1); }}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      mode === "custom" ? "bg-white shadow-sm text-black" : "text-black/60"
                    }`}
                  >
                    Custom Build
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {mode === "package" ? (
                  <>
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="font-semibold text-black mb-4">Choose your package</h3>
                        {PACKAGES.map((pkg) => (
                          <button
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                              selectedPackage === pkg.id
                                ? "border-black bg-black/5"
                                : "border-black/10 hover:border-black/30"
                            }`}
                          >
                            {pkg.popular && (
                              <span className="absolute -top-2 right-4 px-2 py-0.5 text-[10px] font-bold bg-black text-white rounded-full">
                                POPULAR
                              </span>
                            )}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-semibold text-black">{pkg.name}</div>
                                <div className="text-sm text-black/50">{pkg.description}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-black">
                                  {formatPrice(pkg.price)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {pkg.includes.map((item) => (
                                <span key={item} className="px-2 py-1 text-xs bg-black/5 rounded-full text-black/70">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-3"
                      >
                        <h3 className="font-semibold text-black mb-4">Add extras?</h3>
                        {ADDONS.map((addon) => (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                              selectedAddons.includes(addon.id)
                                ? "border-black bg-black/5"
                                : "border-black/10 hover:border-black/30"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-black">{addon.name}</span>
                                {addon.monthly && (
                                  <span className="ml-2 px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full">
                                    Monthly
                                  </span>
                                )}
                              </div>
                              <div className="font-semibold text-black">
                                +{formatPrice(addon.price)}{addon.monthly && "/mo"}
                              </div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <>
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-3"
                      >
                        <h3 className="font-semibold text-black mb-4">What do you need?</h3>
                        {SERVICES.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                              selectedServices.includes(service.id)
                                ? "border-black bg-black/5"
                                : "border-black/10 hover:border-black/30"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium text-black">{service.name}</div>
                                <div className="text-sm text-black/50">{service.description}</div>
                              </div>
                              <div className="font-semibold text-black">
                                {formatPrice(service.basePrice)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-3"
                      >
                        <h3 className="font-semibold text-black mb-4">Add extras?</h3>
                        {ADDONS.map((addon) => (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                              selectedAddons.includes(addon.id)
                                ? "border-black bg-black/5"
                                : "border-black/10 hover:border-black/30"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-black">{addon.name}</span>
                                {addon.monthly && (
                                  <span className="ml-2 px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full">
                                    Monthly
                                  </span>
                                )}
                              </div>
                              <div className="font-semibold text-black">
                                +{formatPrice(addon.price)}{addon.monthly && "/mo"}
                              </div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-black/10 px-6 py-4">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-black/60">One-time</span>
                    {getMonthlyTotal() > 0 && (
                      <span className="block text-sm text-black/40">
                        + {formatPrice(getMonthlyTotal())}/mo
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">
                      {formatPrice(calculateTotal())}
                    </div>
                    <div className="text-xs text-black/40">USD (approx.)</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 rounded-full border border-black/20 text-black font-medium hover:bg-black/5 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={mode === "custom" && step === 1 && selectedServices.length === 0}
                      className="flex-1 px-6 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  ) : (
                    <Link
                      href={`/contact?estimate=${calculateTotal()}&package=${mode === "package" ? selectedPackage : "custom"}`}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-6 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity text-center"
                    >
                      Get Detailed Quote
                    </Link>
                  )}
                </div>

                <p className="text-xs text-center text-black/40 mt-3">
                  Final pricing based on your specific needs
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
