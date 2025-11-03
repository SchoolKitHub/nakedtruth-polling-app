/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Fix deprecated options warning
    ignoreDuringBuilds: false,
  },
  // other config options here
}

export default nextConfig;
