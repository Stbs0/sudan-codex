import { expect, test } from "@playwright/test";

test.describe("Drug Info Page", () => {
  let drugInfoBrandName: string | null = null;
  test.beforeEach(async ({ page }) => {
    await page.goto("/drug-list");
    await page.getByText("Next").click({ clickCount: 9 });
    // Click the first drug card
    drugInfoBrandName = await page
      .locator("#drugInfo-card-brandName")
      .textContent();
    await page.locator("#drugInfo-card").first().click();

    // URL should change to include a slug.
    // The slug is variable, but it should be under /drug-list/
    await expect(page).toHaveURL(/\/drug-list\/.+/);
  });

  test("displays drug info", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: drugInfoBrandName }),
    ).toBeVisible();
  });
});
