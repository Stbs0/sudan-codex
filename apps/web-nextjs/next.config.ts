import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  reactCompiler: true,
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;
