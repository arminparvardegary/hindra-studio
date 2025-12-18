import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "rush.video",
      },
      {
        protocol: "https",
        hostname: "rush.photos",
      },
      {
        protocol: "https",
        hostname: "rushboxes.com",
      },
      {
        protocol: "https",
        hostname: "scriptra.space",
      },
    ],
  },
};

export default nextConfig;
