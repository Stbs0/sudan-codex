import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  name: "Sudan Codex E2E Tests",
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    process.env.CI
      ? {
          command: "bun run start",
          url: "http://localhost:3000",
          reuseExistingServer: false,
          env: {
            DATABASE_URL: process.env.TURSO_DATABASE_URL!,
          },
        }
      : {
          command: "bun run dev",
          url: "http://localhost:3000",
          reuseExistingServer: true,
          env: {
            DATABASE_URL: process.env.TURSO_DATABASE_URL!,
          },
        },
  ],
});
