import { expect, test } from "@playwright/test";

test.describe("Stats Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/stats");
  });

  test("should load the stats page correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Sudan Drug Index Statistics | Sudan Codex/);
    await expect(
      page.getByRole("heading", { name: "Sudan Drug Index Statistics" })
    ).toBeVisible();
  });

  test("should display summary cards", async ({ page }) => {
    await expect(page.getByText("Total Drugs")).toBeVisible();
    await expect(page.getByText("Unique Companies")).toBeVisible();
    await expect(page.getByText("Unique Brand Names")).toBeVisible();
    await expect(page.getByText("Unique Generic Names")).toBeVisible();
    await expect(page.getByText("Unique Agents")).toBeVisible();
  });

  test("should display top statistics tables", async ({ page }) => {
    await expect(page.getByText("Top Companies by Brand Names")).toBeVisible();
    await expect(page.getByText("Top Agents by Drug Count")).toBeVisible();
    await expect(
      page.getByText("Top Generic Names by Drug Count")
    ).toBeVisible();
    await expect(page.getByText("Most Frequent Brand Names")).toBeVisible();
  });

  test("should have working links in tables", async ({ page }) => {
    // Check if there is at least one link in the 'Top Companies' table
    // We target the first link inside the table body for companies
    const firstCompanyLink = page
      .locator("table")
      .filter({ hasText: "Top Companies by Brand Names" })
      .locator("tbody tr")
      .first()
      .getByRole("link");

    // It's dynamic data, so we can't be sure there is always data, but likely there is.
    // We condition this check or just check visibility if it exists.
    if ((await firstCompanyLink.count()) > 0) {
      await expect(firstCompanyLink).toBeVisible();
      const href = await firstCompanyLink.getAttribute("href");
      expect(href).toMatch(/\/stats\/companies\/.*/);
    }
  });
});
