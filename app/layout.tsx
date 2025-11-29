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
  metadataBase: new URL("https://hindrastudio.com"),
  title: {
    default: "Hindra Studio | Brand Design, Web Development & Motion",
    template: "%s | Hindra Studio",
  },
  description:
    "Hindra Studio is a full-service creative agency specializing in brand identity, web development, and motion design. We help startups and enterprises build memorable brands that drive results.",
  keywords: [
    "branding agency",
    "brand identity design",
    "web development agency",
    "motion design studio",
    "creative agency",
    "UI/UX design",
    "product design",
    "brand strategy",
    "digital agency",
    "design studio",
    "logo design",
    "website development",
    "React development",
    "Next.js agency",
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
    siteName: "Hindra Studio",
    title: "Hindra Studio | Brand Design, Web Development & Motion",
    description:
      "Full-service creative agency specializing in brand identity, web development, and motion design. We help brands stand out and succeed.",
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
    title: "Hindra Studio | Brand Design, Web Development & Motion",
    description:
      "Full-service creative agency specializing in brand identity, web development, and motion design.",
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
  name: "Hindra Studio",
  description:
    "Full-service creative agency specializing in brand identity, web development, and motion design.",
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
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Hindra Studio Team",
  },
  foundingDate: "2016",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "15+",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Brand Identity Design",
    "Web Development",
    "Motion Design",
    "UI/UX Design",
    "Product Design",
    "Brand Strategy",
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
        {children}
      </body>
    </html>
  );
}
