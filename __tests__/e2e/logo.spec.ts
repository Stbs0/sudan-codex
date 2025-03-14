import { test, expect } from "@playwright/test";

test.describe("Logo Navigation", () => {
  test("should navigate to home page when clicked", async ({ page }) => {
    // Start from a non-home page
    await page.goto("http://localhost:5173/some-other-route");

    // Find and click the logo
    const logoButton = page
      .getByRole("button")
      .filter({ has: page.getByAltText("logo") });
    await logoButton.click();

    // Verify we're on the home page
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("logo should be visible and clickable", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Check if logo is visible
    const logoImage = page.getByAltText("logo");
    await expect(logoImage).toBeVisible();

    // Ensure it's contained within a button
    const logoButton = page.getByRole("button").filter({ has: logoImage });
    await expect(logoButton).toBeVisible();
  });
});
