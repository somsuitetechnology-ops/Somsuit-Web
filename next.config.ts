import type { NextConfig } from "next";

/** Where Next.js proxies /cms-api/* in dev (same machine as `go run`). */
const cmsBackendInternal =
  process.env.CMS_BACKEND_INTERNAL_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8081";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Resolve @/ to src for existing components
  transpilePackages: [],
  async rewrites() {
    return [
      {
        source: "/cms-api/:path*",
        destination: `${cmsBackendInternal}/:path*`,
      },
    ];
  },
};

export default nextConfig;
