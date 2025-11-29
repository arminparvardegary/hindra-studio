import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
