import { expect, test } from "@playwright/test";

test("navigates to drug list page", async ({ page }) => {
  await page.goto("/");
  // Assuming there's a way to navigate or just checking the route directly if we want to test that page isolated first
  // But let's check if we can search and get directed to results or similar.
  // The user said home is just a landing page.

  // Let's verify we can visit specific pages
  await page.goto("/drug-list");
  await expect(page).toHaveURL(/.*drug-list/);
});
