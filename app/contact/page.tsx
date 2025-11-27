"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const services = [
  "Brand Identity",
  "Web Development",
  "Motion Design",
  "UI/UX Design",
  "AI Integration",
  "Strategy",
  "Other",
];

const budgetRanges = [
  "< $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />
      
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="tag-soft mb-6">
                Get in touch
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
                Let&apos;s create something amazing
              </h1>
              <p className="text-xl text-black/60 leading-relaxed mb-10">
                Have a project in mind? We&apos;d love to hear about it. Send us a message 
                and we&apos;ll get back to you within 24 hours.
              </p>

              {/* Contact Info */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DCDFFF] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black mb-1">Email</p>
                    <a href="mailto:hello@hindra.studio" className="text-black/60 hover:text-black transition-colors">
                      hello@hindra.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E9DCC8] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black mb-1">Location</p>
                    <p className="text-black/60">
                      Working globally
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DCDFFF] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-black mb-1">Response time</p>
                    <p className="text-black/60">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="font-medium text-black mb-4">Follow us</p>
                <div className="flex gap-3">
                  {[
                    { name: "Twitter", icon: "𝕏" },
                    { name: "LinkedIn", icon: "in" },
                    { name: "Instagram", icon: "📷" },
                    { name: "Dribbble", icon: "🏀" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all"
                    >
                      <span className="text-sm">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-[#DCDFFF]/50"
                >
                  <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">Message sent!</h3>
                  <p className="text-black/60 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "",
                        budget: "",
                        message: "",
                      });
                    }}
                    className="btn-outline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 p-8 sm:p-12 rounded-3xl bg-[#DCDFFF]/30">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-black mb-2">
                        Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-black mb-2">
                        Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all resize-none"
                      placeholder="Describe your project, goals, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  <p className="text-sm text-black/40 text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-black/60 hover:text-black underline">
                      privacy policy
                    </a>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-32 bg-[#E9DCC8]/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              Frequently asked questions
            </h2>
            <p className="text-black/50 max-w-2xl mx-auto">
              Have questions? We&apos;ve got answers.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What's your typical project timeline?",
                a: "Project timelines vary based on scope and complexity. A typical branding project takes 4-6 weeks, while a full website can take 8-12 weeks. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                q: "Do you work with clients remotely?",
                a: "Absolutely! We work with clients worldwide. We use tools like Zoom, Slack, and Notion to ensure smooth communication and collaboration regardless of location.",
              },
              {
                q: "What's included in your branding packages?",
                a: "Our branding packages typically include strategy workshops, logo design, color palette, typography selection, brand guidelines, and basic marketing collateral. We can customize packages based on your needs.",
              },
              {
                q: "Do you offer ongoing support after project completion?",
                a: "Yes! We offer various support packages for ongoing maintenance, updates, and new feature development. We're here for the long term.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white"
              >
                <h3 className="text-lg font-semibold text-black mb-2">{faq.q}</h3>
                <p className="text-black/60 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
