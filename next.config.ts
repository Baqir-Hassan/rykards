import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Crawlers and browsers still request /favicon.ico; serve the R mark there too.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicon-48.png" }];
  },
};

export default nextConfig;
