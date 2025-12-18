import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Sudan Codex/);
  });

  test("explore button exists and works", async ({ page }) => {
    await page.goto("/");

    const exploreButton = page.getByText("Explore");
    await expect(exploreButton).toBeVisible();
  });
  test("explore button navigate to drug list page", async ({ page }) => {
    await page.goto("/");

    const exploreButton = page.getByText("Explore");
    await exploreButton.click();
    await expect(page).toHaveURL(/.*drug-list/);
  });
});
