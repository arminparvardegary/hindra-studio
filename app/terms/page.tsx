"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function TermsPage() {
  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />

      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="tag-soft mb-6 inline-block">Legal</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Terms of Service
            </h1>
            <p className="text-black/60 mb-12">
              Last updated: November 2024
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-black/70">
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Agreement to Terms</h2>
                  <p>
                    By accessing or using Hindra Studio&apos;s website and services, you agree to be 
                    bound by these Terms of Service. If you do not agree to these terms, please 
                    do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Services</h2>
                  <p>
                    Hindra Studio provides creative services including but not limited to brand 
                    identity design, web development, motion design, and digital strategy. All 
                    services are subject to separate agreements and quotes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Intellectual Property</h2>
                  <p className="mb-4">
                    All content on this website, including text, graphics, logos, and images, 
                    is the property of Hindra Studio and is protected by copyright laws.
                  </p>
                  <p>
                    For client projects, intellectual property rights are transferred upon full 
                    payment as outlined in individual project agreements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">User Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate information when contacting us</li>
                    <li>Not use our website for any unlawful purpose</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Payment Terms</h2>
                  <p>
                    For all project engagements, payment terms are outlined in individual 
                    proposals and contracts. Standard terms include a deposit before work 
                    begins and final payment upon project completion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Limitation of Liability</h2>
                  <p>
                    Hindra Studio shall not be liable for any indirect, incidental, special, 
                    or consequential damages arising from the use of our website or services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Modifications</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be 
                    effective immediately upon posting to our website. Continued use of our 
                    services constitutes acceptance of modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Contact</h2>
                  <p>
                    For questions about these Terms of Service, please contact us at{" "}
                    <a href="mailto:legal@hindra.studio" className="text-black underline">
                      legal@hindra.studio
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}

