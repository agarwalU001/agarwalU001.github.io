import type { NextConfig } from "next";

// Set by the GitHub Pages workflow when the site is served from a sub-path (/<repo>).
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Fully static site: deployable to GitHub Pages, Vercel, Netlify or any host.
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
