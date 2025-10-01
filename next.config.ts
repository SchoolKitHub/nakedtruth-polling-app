import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Fix deprecated options warning
    ignoreDuringBuilds: false,
  },
  /* config options here */
};

export default nextConfig;
