import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_ACTIONS || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubPages ? "/k-history-timeline" : "",
  assetPrefix: isGithubPages ? "/k-history-timeline/" : "",
};

export default nextConfig;
