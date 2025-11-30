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
}

const SERVICES: ServiceOption[] = [
  { id: "ai", name: "AI Solutions", basePrice: 5000, description: "Chatbots, ML models, AI integration" },
  { id: "automation", name: "Automation", basePrice: 8000, description: "Business process automation" },
  { id: "website", name: "Website", basePrice: 3000, description: "Custom responsive website" },
  { id: "webapp", name: "Web Application", basePrice: 10000, description: "Full-stack web app" },
  { id: "mobile", name: "Mobile App", basePrice: 15000, description: "iOS & Android app" },
  { id: "branding", name: "Brand Identity", basePrice: 5000, description: "Logo, colors, guidelines" },
  { id: "video", name: "Video Production", basePrice: 2000, description: "Editing & motion graphics" },
  { id: "system", name: "Custom System", basePrice: 20000, description: "End-to-end software solution" },
];

const ADDONS: AddonOption[] = [
  { id: "rush", name: "Rush delivery (2x faster)", price: 3000 },
  { id: "seo", name: "SEO Optimization", price: 1500 },
  { id: "analytics", name: "Analytics Setup", price: 800 },
  { id: "hosting", name: "1 Year Hosting", price: 500 },
  { id: "maintenance", name: "Monthly Maintenance", price: 500 },
  { id: "training", name: "Team Training", price: 1000 },
  { id: "api", name: "API Integrations", price: 2000 },
  { id: "security", name: "Security Audit", price: 1500 },
];

const COMPLEXITY = [
  { id: "simple", name: "Simple", multiplier: 1, description: "Basic requirements" },
  { id: "standard", name: "Standard", multiplier: 1.5, description: "Average complexity" },
  { id: "complex", name: "Complex", multiplier: 2.5, description: "Advanced features" },
  { id: "enterprise", name: "Enterprise", multiplier: 4, description: "Large scale project" },
];

export default function CostCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [complexity, setComplexity] = useState("standard");
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
    const servicesTotal = selectedServices.reduce((sum, id) => {
      const service = SERVICES.find((s) => s.id === id);
      return sum + (service?.basePrice || 0);
    }, 0);

    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    const multiplier = COMPLEXITY.find((c) => c.id === complexity)?.multiplier || 1;

    return Math.round((servicesTotal * multiplier) + addonsTotal);
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
              className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-black/10 dark:border-white/10 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black dark:text-white">Project Calculator</h2>
                  <p className="text-sm text-black/50 dark:text-white/50">Get an instant estimate</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress */}
              <div className="px-6 py-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1">
                      <div
                        className={`h-1 rounded-full transition-colors ${
                          s <= step ? "bg-black dark:bg-white" : "bg-black/10 dark:bg-white/10"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-black/50 dark:text-white/50">
                  <span>Services</span>
                  <span>Scope</span>
                  <span>Extras</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Step 1: Services */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <h3 className="font-semibold text-black dark:text-white mb-4">What do you need?</h3>
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selectedServices.includes(service.id)
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/10"
                            : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium text-black dark:text-white">{service.name}</div>
                            <div className="text-sm text-black/50 dark:text-white/50">{service.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-black dark:text-white">
                              {formatPrice(service.basePrice)}
                            </div>
                            <div className="text-xs text-black/40 dark:text-white/40">starting</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Step 2: Complexity */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold text-black dark:text-white">Project scope?</h3>
                    {COMPLEXITY.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setComplexity(level.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          complexity === level.id
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/10"
                            : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-black dark:text-white">{level.name}</div>
                            <div className="text-sm text-black/50 dark:text-white/50">{level.description}</div>
                          </div>
                          <div className="text-sm font-medium text-black/60 dark:text-white/60">
                            {level.multiplier}x
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Step 3: Addons */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <h3 className="font-semibold text-black dark:text-white mb-4">Need any extras?</h3>
                    {ADDONS.map((addon) => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selectedAddons.includes(addon.id)
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/10"
                            : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-black dark:text-white">{addon.name}</div>
                          <div className="font-semibold text-black dark:text-white">
                            +{formatPrice(addon.price)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-[#1a1a1a] border-t border-black/10 dark:border-white/10 px-6 py-4">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-black/60 dark:text-white/60">Estimated Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      {formatPrice(calculateTotal())}
                    </div>
                    <div className="text-xs text-black/40 dark:text-white/40">USD (approx.)</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={step === 1 && selectedServices.length === 0}
                      className="flex-1 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  ) : (
                    <Link
                      href={`/contact?estimate=${calculateTotal()}&services=${selectedServices.join(",")}`}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity text-center"
                    >
                      Get Detailed Quote
                    </Link>
                  )}
                </div>

                <p className="text-xs text-center text-black/40 dark:text-white/40 mt-3">
                  Final pricing may vary based on specific requirements
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
