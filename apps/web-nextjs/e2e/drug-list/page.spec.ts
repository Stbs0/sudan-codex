import { expect, test } from "@playwright/test";

test.describe("Drug List Page", () => {
  test("drug list page loads and has correct title", async ({ page }) => {
    await page.goto("/drug-list");
    await expect(page).toHaveURL(/.*drug-list/);
    await expect(page).toHaveTitle(/Drug List | Sudan Codex/);
  });

  test("displays main heading", async ({ page }) => {
    await page.goto("/drug-list");
    await expect(
      page.getByRole("heading", {
        name: "Sudan Drug List – Search All Registered Drugs, Generics & Manufacturers",
      }),
    ).toBeVisible();
  });

  test("search and filter components are visible", async ({ page }) => {
    await page.goto("/drug-list");

    // Check for search input
    await expect(
      page.getByPlaceholder("Search and/or filter drugs..."),
    ).toBeVisible();

    await expect(page.getByText("Filter By")).toBeVisible();
  });

  test("displays a list of drugs", async ({ page }) => {
    await page.goto("/drug-list");
    let hasVisited: string | null = null;
    await page.addInitScript(() => {
      hasVisited = localStorage.getItem("hasVisited");
    });
    if (hasVisited === null) {
      await page.getByText("Next").click({ clickCount: 9 });
    }
    await expect(page.locator("#drugInfo-card")).toBeVisible();
  });

  test("navigates to drug details on card click", async ({ page }) => {
    await page.goto("/drug-list");
    let hasVisited: string | null = null;
    await page.addInitScript(() => {
      hasVisited = localStorage.getItem("hasVisited");
    });
    if (hasVisited === null) {
      await page.getByText("Next").click({ clickCount: 9 });
    }
    // Click the first drug card
    await page.locator("#drugInfo-card").click();

    // URL should change to include a slug.
    // The slug is variable, but it should be under /drug-list/
    await expect(page).toHaveURL(/\/drug-list\/.+/);
  });
});
