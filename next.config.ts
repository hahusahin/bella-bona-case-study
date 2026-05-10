import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 caching model: explicit 'use cache' + cacheLife() instead of
  // route-segment revalidate. Pages are uncached by default (SSR-equivalent)
  // unless marked with 'use cache'. This gives fine-grained control per fetch.
  cacheComponents: true,

  // Silence workspace root warning from git worktree having its own lockfile
  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      // Sanity CDN
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
