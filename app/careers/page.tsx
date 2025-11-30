"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const positions = [
  {
    id: "senior-designer",
    title: "Senior Brand Designer",
    department: "Design",
    location: "Remote / Dubai",
    type: "Full-time",
    description: "We're looking for a Senior Brand Designer to lead visual identity projects and mentor junior designers.",
    requirements: [
      "5+ years of brand design experience",
      "Strong portfolio showcasing brand identity work",
      "Proficiency in Figma, Illustrator, and Photoshop",
      "Experience leading design projects",
      "Excellent communication skills",
    ],
  },
  {
    id: "frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Dubai",
    type: "Full-time",
    description: "Join our engineering team to build beautiful, performant web experiences using React and Next.js.",
    requirements: [
      "4+ years of frontend development experience",
      "Expert in React, Next.js, and TypeScript",
      "Strong understanding of modern CSS and animations",
      "Experience with Framer Motion or similar",
      "Passion for pixel-perfect implementations",
    ],
  },
  {
    id: "motion-designer",
    title: "Motion Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create captivating animations and motion graphics that bring brands to life.",
    requirements: [
      "3+ years of motion design experience",
      "Proficiency in After Effects and Cinema 4D",
      "Strong understanding of animation principles",
      "Experience with Lottie animations",
      "Creative portfolio with diverse motion work",
    ],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    department: "Operations",
    location: "Dubai",
    type: "Full-time",
    description: "Manage client relationships and ensure smooth delivery of creative projects.",
    requirements: [
      "3+ years of project management in creative agencies",
      "Experience with Notion, Asana, or similar tools",
      "Strong client communication skills",
      "Ability to manage multiple projects simultaneously",
      "Understanding of design and development workflows",
    ],
  },
];

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Remote First",
    description: "Work from anywhere in the world. We believe in flexibility and trust.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Competitive Salary",
    description: "We offer top-market compensation packages with annual reviews.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Learning Budget",
    description: "$2,000 annual budget for courses, conferences, and books.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Flexible PTO",
    description: "Unlimited paid time off. We trust you to manage your time.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Equipment Budget",
    description: "Top-of-the-line equipment to do your best work.",
  },
];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 bg-gradient-to-b from-[#E9DCC8]/30 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              We&apos;re hiring!
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
              Join our team of{" "}
              <span className="text-gradient">creative minds</span>
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl mx-auto">
              We&apos;re building something special at Hindra. Join us and work on exciting 
              projects with talented people from around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why join Hindra?</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We believe in creating an environment where creativity thrives and everyone can do their best work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DCDFFF] text-black flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="tag mb-4">Open Positions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Find your next role
            </h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              We&apos;re always looking for talented people to join our team.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {positions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-black/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-black/5 transition-colors text-left"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">{position.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-black/50">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {position.location}
                      </span>
                      <span className="px-2 py-0.5 bg-[#DCDFFF] text-black rounded-full text-xs font-medium">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedPosition === position.id ? 180 : 0 }}
                    className="shrink-0 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {selectedPosition === position.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-black/10">
                        <p className="text-black/70 mb-6">{position.description}</p>
                        
                        <h4 className="font-semibold text-black mb-3">Requirements</h4>
                        <ul className="space-y-2 mb-6">
                          {position.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-black/60">
                              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {req}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => setIsApplying(true)}
                          className="btn"
                        >
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* General Application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-12 p-8 rounded-3xl bg-[#DCDFFF]/30 text-center"
          >
            <h3 className="text-2xl font-bold text-black mb-3">Don&apos;t see the right role?</h3>
            <p className="text-black/60 mb-6">
              We&apos;re always interested in meeting talented people. Send us your portfolio and we&apos;ll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@hindra.studio"
              className="btn-outline inline-flex items-center gap-2"
            >
              Send your portfolio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="tag mb-4">Our Culture</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                Built on trust, driven by curiosity
              </h2>
              <div className="space-y-4 text-black/60">
                <p>
                  At Hindra, we believe the best work comes from teams that trust each other. 
                  We&apos;ve built a culture where everyone has a voice and ideas are valued regardless 
                  of title or tenure.
                </p>
                <p>
                  We&apos;re curious people who love learning. Whether it&apos;s a new design tool, 
                  a programming language, or an industry we&apos;ve never worked in, we&apos;re always 
                  excited to expand our horizons.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-square rounded-2xl bg-[#DCDFFF] flex items-center justify-center">
                <svg className="w-16 h-16 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="aspect-square rounded-2xl bg-[#E9DCC8] flex items-center justify-center">
                <svg className="w-16 h-16 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="aspect-square rounded-2xl bg-[#E9DCC8] flex items-center justify-center">
                <svg className="w-16 h-16 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="aspect-square rounded-2xl bg-[#DCDFFF] flex items-center justify-center">
                <svg className="w-16 h-16 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <NavBar />

      {/* Application Modal */}
      <AnimatePresence>
        {isApplying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsApplying(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Apply Now</h3>
                <button
                  onClick={() => setIsApplying(false)}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-black/60 mb-6">
                Send your resume and portfolio to{" "}
                <a href="mailto:careers@hindra.studio" className="text-black font-medium underline">
                  careers@hindra.studio
                </a>
              </p>

              <div className="p-4 rounded-xl bg-[#DCDFFF]/30 mb-6">
                <p className="text-sm text-black/70">
                  <strong>Tip:</strong> Include links to your best work and tell us why you&apos;re excited about joining Hindra.
                </p>
              </div>

              <a
                href="mailto:careers@hindra.studio"
                className="btn w-full justify-center"
              >
                Open Email Client
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

