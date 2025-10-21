/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // ✅ Allow images from utfs.io
        pathname: "/**", // ✅ Match any image path (e.g. /f/... etc.)
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
