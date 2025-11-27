"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "10+ years of experience in brand strategy and design leadership.",
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Passionate about creating intuitive and beautiful user experiences.",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Development",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer with a love for clean, performant code.",
  },
  {
    name: "Emily Watson",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Bringing brands to life through engaging animations.",
  },
  {
    name: "David Park",
    role: "UX Researcher",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Data-driven approach to understanding user behavior.",
  },
  {
    name: "Lisa Thompson",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    bio: "Ensuring smooth delivery and happy clients every time.",
  },
];

const values = [
  {
    title: "Quality First",
    description: "We never compromise on quality. Every pixel, every line of code matters.",
    icon: "✦",
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients, treating every project as a partnership.",
    icon: "◈",
  },
  {
    title: "Innovation",
    description: "We stay ahead of trends while creating timeless designs that last.",
    icon: "◎",
  },
  {
    title: "Transparency",
    description: "Clear communication and honest feedback throughout the process.",
    icon: "◇",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="tag-soft mb-6">
              About us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
              We&apos;re a team of creative thinkers and makers
            </h1>
            <p className="text-xl text-black/60 leading-relaxed max-w-2xl">
              Hindra.studio is where you come when your brand needs to grow up a little 
              without losing its soul. We help founders, companies and studios turn 
              half-formed ideas into clear brands, fast websites and videos people 
              actually want to watch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#DCDFFF]/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5+", label: "Years of Experience" },
              { value: "250+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "15", label: "Team Members" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-bold text-black mb-2">{stat.value}</p>
                <p className="text-black/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 sm:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-black/60 leading-relaxed">
                <p>
                  Hindra was born from a simple belief: great design has the power to 
                  transform businesses and create meaningful connections between brands 
                  and their audiences.
                </p>
                <p>
                  We mix design, development, motion and smart use of AI so you can 
                  ship more, stress less and look as strong as the work you deliver.
                </p>
                <p>
                  Today, we continue to push boundaries, combining strategic thinking 
                  with creative excellence to deliver work that makes an impact.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl bg-[#E9DCC8] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-black flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">H</span>
                    </div>
                    <p className="text-black/60 font-medium">Since 2019</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#DCDFFF] rounded-full blur-3xl opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 sm:py-32 bg-black text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              These principles guide everything we do, from how we work with 
              clients to how we approach each project.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="text-center p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="tag mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              Meet the people behind Hindra
            </h2>
            <p className="text-black/50 max-w-2xl mx-auto">
              A diverse team of designers, developers, and strategists united by 
              a passion for creating exceptional work.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-[#DCDFFF]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-1">{member.name}</h3>
                <p className="text-sm text-black font-medium mb-2">{member.role}</p>
                <p className="text-black/50 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-[#E9DCC8]/30">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              Want to work with us?
            </h2>
            <p className="text-black/50 max-w-xl mx-auto mb-8">
              We&apos;re always looking for talented people to join our team and 
              exciting projects to work on.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn px-8 py-4">
                Start a project
              </Link>
              <Link href="/works" className="btn-outline px-8 py-4">
                View our work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <NavBar />
    </main>
  );
}
