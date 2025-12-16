import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import FloatingWidgets from "@/components/FloatingWidgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hindra.studio"),
  title: {
    default: "Hindra Studio | Creative Digital Agency | Branding, Web & AI Solutions",
    template: "%s | Hindra Studio",
  },
  description:
    "Hindra Studio is a creative digital agency specializing in branding, web development, AI-powered tools, and content creation. We build products like Scriptra, Rush Photos, Rush Video, and Rush Boxes. From zero to hero.",
  keywords: [
    "creative agency",
    "digital agency",
    "brand identity design",
    "web development",
    "AI tools",
    "Scriptra",
    "Rush Photos",
    "Rush Video",
    "Rush Boxes",
    "product photography",
    "video production",
    "custom packaging",
    "SaaS development",
    "content creation",
    "social media agency",
    "startup branding",
    "full service agency",
    "Hindra Studio",
  ],
  authors: [{ name: "Hindra Studio", url: "https://hindra.studio" }],
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
    url: "https://hindra.studio",
    siteName: "Hindra Studio",
    title: "Hindra Studio | Creative Digital Agency",
    description:
      "Creative digital agency building innovative products. Scriptra (AI Content), Rush Photos, Rush Video, Rush Boxes. From zero to hero.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hindra Studio | Creative Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindra Studio | Creative Digital Agency",
    description:
      "Creative digital agency building innovative products. Scriptra, Rush Photos, Rush Video, Rush Boxes. From zero to hero.",
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
    google: "nSR5V7Nwr_FjMN0z5bXUTxzpc8gZcrkovt5QseOVOmY",
  },
  alternates: {
    canonical: "https://hindra.studio",
  },
  icons: {
    icon: '/icons/Logo.svg',
    shortcut: '/icons/Logo.svg',
    apple: '/icons/Logo.svg',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hindra Studio",
  description:
    "Creative digital agency building innovative products. We specialize in branding, web development, AI tools, and content creation. Creators of Scriptra, Rush Photos, Rush Video, and Rush Boxes.",
  url: "https://hindra.studio",
  logo: "https://hindra.studio/icons/Logo.svg",
  sameAs: [
    "https://instagram.com/hindrastudio",
    "https://linkedin.com/company/hindra-studio",
    "https://twitter.com/hindrastudio",
    "https://behance.net/hindrastudio",
    "https://scriptra.space",
    "https://rush.photos",
    "https://rush.video",
    "https://rushboxes.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@hindra.studio",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1122 Goffle Rd.",
    addressLocality: "Hawthorne",
    addressRegion: "NJ",
    postalCode: "07506",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Hindra Team",
  },
  foundingDate: "2017",
  areaServed: "Worldwide",
  knowsAbout: [
    "Brand Identity Design",
    "Web Development",
    "AI-Powered Tools",
    "Product Photography",
    "Video Production",
    "Custom Packaging",
    "SaaS Development",
    "Content Creation",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Scriptra",
        description: "AI-powered content creation platform",
        url: "https://scriptra.space",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Rush Photos",
        description: "Professional product photography service",
        url: "https://rush.photos",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Rush Video",
        description: "Product video production service",
        url: "https://rush.video",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Rush Boxes",
        description: "Custom packaging solutions",
        url: "https://rushboxes.com",
      },
    },
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
        <FloatingWidgets />
      </body>
    </html>
  );
}
