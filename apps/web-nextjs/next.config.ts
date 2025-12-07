import type { NextConfig } from "next";
import { withPostHogConfig } from "@posthog/nextjs-config";

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
export default withPostHogConfig(nextConfig, {
  personalApiKey: process.env.POSTHOG_API_KEY!, // Personal API Key
  envId: process.env.POSTHOG_ENV_ID!, // Environment ID
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST, // (optional), defaults to https://us.posthog.com
  sourcemaps: {
    // (optional)
    enabled: true, // (optional) Enable sourcemaps generation and upload, default to true on production builds
    project: "sudan-codex", // (optional) Project name, defaults to repository name
    deleteAfterUpload: true, // (optional) Delete sourcemaps after upload, defaults to true
  },
});
