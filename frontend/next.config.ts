import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/public/imag/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "startperks.vercel.app",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
