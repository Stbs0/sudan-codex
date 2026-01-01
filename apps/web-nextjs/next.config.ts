import { withPostHogConfig } from "@posthog/nextjs-config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    typedEnv: true,
  },
};
const posthogApiKey = process.env.POSTHOG_API_KEY;
const posthogEnvId = process.env.POSTHOG_ENV_ID;

if (!posthogApiKey) {
  throw new Error("POSTHOG_API_KEY environment variable is required");
}
if (!posthogEnvId) {
  throw new Error("POSTHOG_ENV_ID environment variable is required");
}
export default withPostHogConfig(nextConfig, {
  personalApiKey: posthogApiKey,
  envId: posthogEnvId,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST, // (optional), defaults to https://us.posthog.com
  sourcemaps: {
    // (optional)
    enabled:
      process.env.NODE_ENV === "production" && process.env.CI ? true : false, // (optional) Enable sourcemaps generation and upload, default to true on production builds
    project: "sudan-codex", // (optional) Project name, defaults to repository name
    deleteAfterUpload: true, // (optional) Delete sourcemaps after upload, defaults to true
  },
});
