import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'dist',
  images: {
      unoptimized: true,
  },
  basePath: '/time-to-timestamp',
};

export default nextConfig;
