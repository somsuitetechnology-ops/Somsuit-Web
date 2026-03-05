import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Resolve @/ to src for existing components
  transpilePackages: [],
};

export default nextConfig;
