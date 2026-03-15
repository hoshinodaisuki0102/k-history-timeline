import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "/k-history-timeline",
  assetPrefix: "/k-history-timeline/",
};

export default nextConfig;
