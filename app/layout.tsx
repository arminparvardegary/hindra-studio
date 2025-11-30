import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import ChatBot from "@/components/ChatBot";
import CookieConsent from "@/components/CookieConsent";
import SocialProof from "@/components/SocialProof";
import CursorFollower from "@/components/CursorFollower";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";
import CostCalculator from "@/components/CostCalculator";
import ExitIntent from "@/components/ExitIntent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hindrastudio.com"),
  title: {
    default: "Hindra | AI, Automation, Web & Design Solutions",
    template: "%s | Hindra",
  },
  description:
    "Hindra is a full-service digital agency providing end-to-end solutions. We build AI systems, automation, websites, mobile apps, and stunning designs. From zero to hero - we handle everything.",
  keywords: [
    "AI solutions",
    "artificial intelligence agency",
    "business automation",
    "workflow automation",
    "web development agency",
    "mobile app development",
    "custom software development",
    "digital transformation",
    "UI/UX design",
    "brand identity",
    "video production",
    "motion design",
    "chatbot development",
    "machine learning",
    "React development",
    "Next.js agency",
    "SaaS development",
    "enterprise software",
  ],
  authors: [{ name: "Hindra Studio" }],
  creator: "Hindra Studio",
  publisher: "Hindra Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hindrastudio.com",
    siteName: "Hindra",
    title: "Hindra | AI, Automation, Web & Design Solutions",
    description:
      "Full-service digital agency providing AI solutions, automation, web development, mobile apps, and design. End-to-end solutions for your business.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hindra Studio - Creative Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindra | AI, Automation, Web & Design Solutions",
    description:
      "Full-service digital agency providing AI solutions, automation, web development, mobile apps, and design.",
    creator: "@hindrastudio",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://hindrastudio.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hindra",
  description:
    "Full-service digital agency providing AI solutions, automation, web development, mobile apps, and design. End-to-end solutions from zero to hero.",
  url: "https://hindrastudio.com",
  logo: "https://hindrastudio.com/icons/Logo.svg",
  sameAs: [
    "https://instagram.com/hindrastudio",
    "https://linkedin.com/company/hindra",
    "https://twitter.com/hindrastudio",
    "https://dribbble.com/hindra",
    "https://behance.net/hindra",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@hindrastudio.com",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "AE",
  },
  founder: {
    "@type": "Person",
    name: "Hindra Team",
  },
  foundingDate: "2017",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "15+",
  },
  areaServed: "Worldwide",
  serviceType: [
    "AI Solutions",
    "Business Automation",
    "Web Development",
    "Mobile App Development",
    "Custom Software Development",
    "UI/UX Design",
    "Brand Identity",
    "Video Production",
    "Motion Design",
    "Digital Transformation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <CursorFollower />
        <ScrollProgress />
        <ThemeToggle />
        <CommandPalette />
        {children}
        <CostCalculator />
        <ChatBot />
        <SocialProof />
        <ExitIntent />
        <CookieConsent />
      </body>
    </html>
  );
}
