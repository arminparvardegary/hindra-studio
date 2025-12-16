/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;

