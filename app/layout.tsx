import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import ChatBot from "@/components/ChatBot";
import CookieConsent from "@/components/CookieConsent";
import SocialProof from "@/components/SocialProof";
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
    default: "Hindra | Complete Brand Solution - Branding, Social Media & Web",
    template: "%s | Hindra",
  },
  description:
    "Hindra is your complete brand solution. We handle everything from branding to social media management to website development. One team, one package, zero hassle. From zero to hero.",
  keywords: [
    "brand agency",
    "complete brand solution",
    "social media management",
    "social media agency",
    "brand identity design",
    "web development agency",
    "content creation",
    "social media marketing",
    "brand package",
    "digital agency",
    "instagram management",
    "tiktok management",
    "website design",
    "logo design",
    "brand strategy",
    "full service agency",
    "brand launch",
    "startup branding",
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
    title: "Hindra | Complete Brand Solution - One Team, One Package",
    description:
      "Your complete brand solution. Branding, social media, website, content - we handle everything. One team for your entire brand journey.",
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
    title: "Hindra | Complete Brand Solution",
    description:
      "Your complete brand solution. Branding, social media, website, content - we handle everything from zero to hero.",
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
    "Complete brand solution agency. We handle branding, social media, website, and content - everything your brand needs from zero to hero.",
  url: "https://hindrastudio.com",
  logo: "https://hindrastudio.com/icons/Logo.svg",
  sameAs: [
    "https://instagram.com/hindrastudio",
    "https://linkedin.com/company/hindra",
    "https://twitter.com/hindrastudio",
    "https://tiktok.com/@hindrastudio",
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
    "Brand Identity Design",
    "Social Media Management",
    "Social Media Marketing",
    "Website Development",
    "Content Creation",
    "Video Production",
    "AI Chatbots",
    "Marketing Automation",
    "Community Management",
    "Complete Brand Packages",
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
        <div className="print:hidden">
          <ScrollProgress />
          <CommandPalette />
        </div>
        {children}
        <div id="floating-widgets" className="print:hidden" style={{ display: 'var(--widgets-display, block)' }}>
          <CostCalculator />
          <ChatBot />
          <SocialProof />
          <ExitIntent />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
