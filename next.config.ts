import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    images: {
    unoptimized: true, // ✅ REQUIRED for static export / build upload
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
