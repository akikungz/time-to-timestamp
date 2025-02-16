import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'docs',
  images: {
      unoptimized: true,
  },
  basePath: '/time-to-timestamp',
};

export default nextConfig;
