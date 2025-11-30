"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: Command[] = [
    {
      id: "home",
      title: "Go to Home",
      subtitle: "Main landing page",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      action: () => router.push("/"),
      keywords: ["home", "main", "landing"],
    },
    {
      id: "works",
      title: "View Projects",
      subtitle: "Our portfolio & case studies",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      action: () => router.push("/works"),
      keywords: ["portfolio", "projects", "work", "case study"],
    },
    {
      id: "about",
      title: "About Us",
      subtitle: "Learn about our team & values",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      action: () => router.push("/about"),
      keywords: ["team", "about", "company", "values"],
    },
    {
      id: "contact",
      title: "Contact Us",
      subtitle: "Get in touch with our team",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => router.push("/contact"),
      keywords: ["contact", "email", "message", "reach"],
    },
    {
      id: "careers",
      title: "Careers",
      subtitle: "Join our team",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => router.push("/careers"),
      keywords: ["jobs", "careers", "hiring", "work with us"],
    },
    {
      id: "ai",
      title: "AI Solutions",
      subtitle: "Chatbots, ML models & AI integration",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => router.push("/contact?service=ai"),
      keywords: ["ai", "artificial intelligence", "chatbot", "machine learning", "ml"],
    },
    {
      id: "automation",
      title: "Automation",
      subtitle: "Business process & workflow automation",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      action: () => router.push("/contact?service=automation"),
      keywords: ["automation", "workflow", "process", "automate"],
    },
    {
      id: "web",
      title: "Web Development",
      subtitle: "Websites, web apps & e-commerce",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      action: () => router.push("/contact?service=web"),
      keywords: ["website", "development", "web", "app", "ecommerce"],
    },
    {
      id: "design",
      title: "Design & Branding",
      subtitle: "UI/UX, brand identity & design systems",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      action: () => router.push("/contact?service=design"),
      keywords: ["design", "branding", "logo", "ui", "ux"],
    },
    {
      id: "video",
      title: "Video & Motion",
      subtitle: "Video editing, motion graphics & 3D",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      action: () => router.push("/contact?service=video"),
      keywords: ["video", "motion", "animation", "editing", "3d"],
    },
    {
      id: "mobile",
      title: "Mobile Apps",
      subtitle: "iOS, Android & cross-platform apps",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      action: () => router.push("/contact?service=mobile"),
      keywords: ["mobile", "app", "ios", "android", "react native"],
    },
    {
      id: "email",
      title: "Email Us",
      subtitle: "hello@hindra.studio",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
        </svg>
      ),
      action: () => window.open("mailto:hello@hindra.studio"),
      keywords: ["email", "mail"],
    },
    {
      id: "theme",
      title: "Toggle Dark Mode",
      subtitle: "Switch between light & dark theme",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      action: () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      },
      keywords: ["theme", "dark", "light", "mode"],
    },
  ];

  const filteredCommands = search
    ? commands.filter((cmd) => {
        const searchLower = search.toLowerCase();
        return (
          cmd.title.toLowerCase().includes(searchLower) ||
          cmd.subtitle?.toLowerCase().includes(searchLower) ||
          cmd.keywords?.some((k) => k.includes(searchLower))
        );
      })
    : commands;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }

      // Navigate with arrows
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }

      // Execute with Enter
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Keyboard hint */}
      <div className="fixed bottom-6 left-6 z-50 hidden lg:flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
        <kbd className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded border border-black/10 dark:border-white/20 font-mono">
          ⌘K
        </kbd>
        <span>Quick search</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setSearch("");
              }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
            >
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-black/10 dark:border-white/10">
                  <svg className="w-5 h-5 text-black/40 dark:text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search pages, services..."
                    className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                    autoFocus
                  />
                  <kbd className="px-2 py-0.5 text-xs bg-black/5 dark:bg-white/10 rounded text-black/50 dark:text-white/50">
                    ESC
                  </kbd>
                </div>

                {/* Commands list */}
                <div className="max-h-[400px] overflow-y-auto py-2">
                  {filteredCommands.length === 0 ? (
                    <div className="px-4 py-8 text-center text-black/50 dark:text-white/50">
                      No results found
                    </div>
                  ) : (
                    filteredCommands.map((cmd, index) => (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          cmd.action();
                          setIsOpen(false);
                          setSearch("");
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          index === selectedIndex
                            ? "bg-black/5 dark:bg-white/10"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white">
                          {cmd.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-black dark:text-white">{cmd.title}</div>
                          {cmd.subtitle && (
                            <div className="text-sm text-black/50 dark:text-white/50">{cmd.subtitle}</div>
                          )}
                        </div>
                        {index === selectedIndex && (
                          <kbd className="px-2 py-0.5 text-xs bg-black/5 dark:bg-white/10 rounded text-black/50 dark:text-white/50">
                            ↵
                          </kbd>
                        )}
                      </button>
                    ))
                  )}
                </div>

                {/* Footer hints */}
                <div className="px-4 py-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-black/40 dark:text-white/40">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded">↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span>Powered by Hindra</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

