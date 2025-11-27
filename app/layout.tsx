import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingActions from "@/components/FloatingActions";
import NoiseOverlay from "@/components/NoiseOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hindra Studio - Design, Development & Motion",
  description: "We help founders, companies and studios turn half-formed ideas into clear brands, fast websites and videos people actually want to watch.",
  keywords: ["branding", "design studio", "web development", "motion design", "creative agency", "brand identity"],
  openGraph: {
    title: "Hindra Studio - Design, Development & Motion",
    description: "We help founders, companies and studios turn half-formed ideas into clear brands, fast websites and videos people actually want to watch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-black`}
      >
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        <NoiseOverlay />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
