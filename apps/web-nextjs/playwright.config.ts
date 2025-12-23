import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  name: "Sudan Codex E2E Tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
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
    {
      command: "bun run start",
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
