"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function PrivacyPage() {
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

            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Privacy Policy
            </h1>
            <p className="text-black/60 mb-12">
              Last updated: November 2024
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-black/70">
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Introduction</h2>
                  <p>
                    Hindra Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed
                    to protecting your personal data. This privacy policy explains how we collect,
                    use, and safeguard your information when you visit our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Information We Collect</h2>
                  <p className="mb-4">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Contact Information:</strong> Name, email address, phone number when you contact us or submit a form.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent.</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                    <li><strong>Cookies:</strong> Small files stored on your device to improve your experience.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To send you newsletters and marketing communications (with your consent)</li>
                    <li>To improve our website and services</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Cookies</h2>
                  <p>
                    We use cookies to enhance your browsing experience. You can control cookie
                    preferences through your browser settings. Essential cookies are necessary
                    for the website to function properly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:privacy@hindra.studio" className="text-black underline">
                      privacy@hindra.studio
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

