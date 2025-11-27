import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  reactCompiler: true,
  experimental: {
    typedEnv: true,
  },
  async rewrites() {
    const beforeFiles = [
      {
        source: "/__/auth/:path*",
        destination: "https://sudan-codex.firebaseapp.com/__/auth/:path*",
      },
    ];
    return { beforeFiles };
  },
};

export default nextConfig;
