"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "@/public/icons/Logo.svg";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <div className="flex flex-col items-center text-center max-w-sm">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="Hindra Logo"
                            width={60}
                            height={60}
                            className="w-14 h-14 sm:w-16 sm:h-16"
                            priority
                        />
                    </Link>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-10"
                >
                    <h1 className="text-[clamp(6rem,25vw,18rem)] font-bold text-black leading-none mb-6 flex items-center justify-center">
                        <span>4</span>
                        <motion.span
                            animate={{
                                color: [
                                    "#000000",
                                    "#128850",
                                    "#FFB522",
                                    "#DFE780",
                                    "#DCDFFF",
                                    "#000000",
                                ],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            0
                        </motion.span>
                        <span>4</span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-medium text-neutral-900 mb-4">
                        Page not found
                    </h2>
                    <p className="text-neutral-500 text-base leading-relaxed">
                        The page you are looking for doesn&apos;t exist or has been moved.
                    </p>
                </motion.div>

                {/* Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link
                        href="/"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
                    >
                        Go back home
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
