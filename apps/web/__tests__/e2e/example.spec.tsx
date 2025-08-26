import { test, expect } from "@playwright/test";

test("basic navigation test", async ({ page }) => {
  // Navigate to the home page
  await page.goto("http://localhost:5173");

  // Verify the page loaded
  await expect(page).toHaveURL("http://localhost:5173/");

  // Check if the logo is visible
  const logo = page.getByAltText("logo");
  await expect(logo).toBeVisible();
});

test("responsive layout test", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Test desktop layout
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.getByAltText("logo")).toBeVisible();

  // Test mobile layout
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByAltText("logo")).toBeVisible();
});
