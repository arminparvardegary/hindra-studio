"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero() {
  const text1 = "Design That Speaks";
  const text2 = "HINDRA";
  const prefersReducedMotion = useReducedMotion();

  const chars1 = useMemo(() => text1.split(""), [text1]);
  const chars2 = useMemo(() => text2.split(""), [text2]);

  return (
    <section
      className="relative flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32"
      aria-labelledby="hero-title"
    >
      {/* Background gradients */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#DCDFFF]/40 to-transparent blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-[#E9DCC8]/30 to-transparent blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12">
          {/* Main headline */}
          <h1
            id="hero-title"
            className="mt-4 text-center font-light leading-[1.05] text-balance text-[clamp(2.2rem,8vw,4rem)] sm:text-[clamp(2.8rem,7vw,5rem)] lg:text-[clamp(3.5rem,6vw,6rem)] text-gray-300 relative z-10"
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
                          "#000000",
                          "#DCDFFF",
                          "#E9DCC8",
                          "#D1D5DB",
                        ],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 5,
                        delay: index * 0.04,
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
                            "#00000020",
                            "#00000050",
                            "#000000",
                            "#000000",
                          ],
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 4,
                          repeat: Infinity,
                          repeatDelay: 6,
                          delay: (index + 15) * 0.06,
                        }
                  }
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-center text-lg sm:text-xl text-gray-500 max-w-2xl">
            We craft brands, build websites, and create motion that moves people. 
            From strategy to execution, we bring your vision to life.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <div className="flex -space-x-3 sm:-space-x-4">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Client"
                />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Client"
                />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  alt="Client"
                />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Client"
                />
                <AvatarFallback>TR</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-left">
              <p className="text-sm sm:text-base font-medium text-gray-900">
                120+ Projects Delivered
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Trusted by startups & enterprises
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
