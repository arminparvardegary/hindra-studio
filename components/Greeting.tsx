"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
      setEmoji("☀️");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
      setEmoji("🌤️");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good evening");
      setEmoji("🌅");
    } else {
      setGreeting("Good night");
      setEmoji("🌙");
    }
  }, []);

  if (!greeting) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-black/70 text-sm font-medium"
    >
      <span>{emoji}</span>
      <span>{greeting}</span>
    </motion.div>
  );
}

