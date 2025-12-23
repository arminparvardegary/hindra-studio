"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero() {
  const text1 = "Your Brand, Our Mission";
  const text2 = "HINDRA";
  const prefersReducedMotion = useReducedMotion();

  const chars1 = useMemo(() => text1.split(""), [text1]);
  const chars2 = useMemo(() => text2.split(""), [text2]);

  return (
    <section
      className="relative flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-light-aqua blur-2xl opacity-40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-light-purple blur-2xl opacity-30"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + community row */}
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-10">
          <h1
            id="hero-title"
            className="mt-4 text-center font-light leading-[1.05] text-balance text-[clamp(1.9rem,7vw,3rem)] sm:text-[clamp(2.2rem,6vw,3.5rem)] lg:text-[clamp(2.6rem,5vw,4.25rem)] text-gray-300 relative z-10"
          >
            {chars1.map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                      color: [
                        "#D1D5DB",
                        "#128850",
                        "#FFB522",
                        "#DFE780",
                        "#D1D5DB",
                      ],
                    }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 7,
                      delay: index * 0.05,
                    }
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}

            <br />

            <span className="inline-block mt-2">
              with{" "}
              {chars2.map((char, index) => (
                <motion.span
                  key={`hindra-${index}`}
                  className="inline-block font-semibold"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                        color: [
                          "#12885133",
                          "#ffb52248",
                          "#dee7803f",
                          "#000000",
                        ],
                      }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                        duration: 6,
                        repeat: Infinity,
                        repeatDelay: 7,
                        delay: (index + 20) * 0.05,
                      }
                  }
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="flex -space-x-3 sm:-space-x-4">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ring-1 ring-white/10">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                  alt="Customer"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ring-1 ring-white/10">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Customer"
                />
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ring-1 ring-white/10">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
                  alt="Customer"
                />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              4 live products serving customers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
