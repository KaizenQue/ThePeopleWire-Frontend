import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // 🔥 REQUIRED for build / static deploy
  images: {
    unoptimized: true,       // 🔥 disables Next Image optimizer
  },
  reactCompiler: true,
};

export default nextConfig;
