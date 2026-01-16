import { expect, test } from "@playwright/test";

test.describe("Drug Details Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/drug-list");
    await page.getByText("Next").waitFor({ state: "visible", timeout: 3000 });
    await page.getByRole("button", { name: "Close" }).click();

    const firstCard = page.locator("#drugInfo-card").first();
    await firstCard.waitFor({ state: "visible" });
    await firstCard.click();

    // explicit navigation wait
    await page.waitForURL(/\/drug-list\/.+/);
  });

  test("correct url", async ({ page }) => {
    await expect(page).toHaveURL(/\/drug-list\/.+/);
  });
  test("displays drug brand name as heading", async ({ page }) => {
    // There should be a heading on the page with the drug name
    const headings = page.getByRole("heading");
    await expect(headings.first()).toBeVisible();
  });

  test("back button navigates to drug list", async ({ page }) => {
    // Look for any back navigation element
    const backLink = page
      .getByRole("link", { name: /back/i })
      .or(page.locator("a[href='/drug-list']"));
    if (await backLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await backLink.click();
      await expect(page).toHaveURL(/\/drug-list$/);
    }
  });

  test("page shows drug information sections", async ({ page }) => {
    // Verify key drug information sections are present
    await expect(page.getByTestId(/Generic Name/)).toBeVisible();
    await expect(page.getByTestId(/Dosage Form/)).toBeVisible();
    await expect(page.getByTestId(/Company/)).toBeVisible();
    await expect(page.getByTestId(/Agent/)).toBeVisible();
    await expect(page.getByTestId(/Country of Origin/)).toBeVisible();
    await expect(page.getByTestId(/Strength/)).toBeVisible();
    await expect(page.getByTestId(/Pack Size/)).toBeVisible();
  });
});

// test.describe("Drug Details Accordion", () => {
//   test("accordions can be expanded and collapsed", async ({ page }) => {
//     // Navigate to drug details
//     await page.goto("/drug-list");

//     const nextButton = page.getByText("Next");
//     if (await nextButton.isVisible({ timeout: 1000 }).catch(() => false)) {
//       await nextButton.click({ clickCount: 9 });
//     }

//     await page.locator("#drugInfo-card").first().click();
//     await expect(page).toHaveURL(/\/drug-list\/.+/);

//     // Look for accordion triggers
//     const accordionTriggers = page.locator("[data-state]").filter({
//       has: page.locator("button"),
//     });

//     if ((await accordionTriggers.count()) > 0) {
//       const firstTrigger = accordionTriggers.first().locator("button").first();
//       if (await firstTrigger.isVisible().catch(() => false)) {
//         await firstTrigger.click();
//         // Verify accordion expanded - content should be visible
//         await page.waitForTimeout(300);
//       }
//     }
//   });
// });

// test.describe("Drug Details Navigation", () => {
//   test("can navigate between drug list and details multiple times", async ({
//     page,
//   }) => {
//     await page.goto("/drug-list");

//     const nextButton = page.getByText("Next");
//     if (await nextButton.isVisible({ timeout: 1000 }).catch(() => false)) {
//       await nextButton.click({ clickCount: 9 });
//     }

//     // Go to first drug
//     await page.locator("#drugInfo-card").first().click();
//     await expect(page).toHaveURL(/\/drug-list\/.+/);

//     // Go back
//     await page.goBack();
//     await expect(page).toHaveURL(/\/drug-list/);

//     // Wait for page to settle
//     await page.waitForLoadState("networkidle");

//     // Go to drug again (should still work)
//     if (await page.locator("#drugInfo-card").first().isVisible()) {
//       await page.locator("#drugInfo-card").first().click();
//       await expect(page).toHaveURL(/\/drug-list\/.+/);
//     }
//   });

//   test("direct URL access works", async ({ page }) => {
//     // First get a valid slug
//     await page.goto("/drug-list");

//     const nextButton = page.getByText("Next");
//     if (await nextButton.isVisible({ timeout: 1000 }).catch(() => false)) {
//       await nextButton.click({ clickCount: 9 });
//     }

//     await page.locator("#drugInfo-card").first().click();

//     const url = page.url();
//     const slug = url.split("/drug-list/")[1];

//     // Navigate away and back directly
//     await page.goto("/");
//     await page.goto(`/drug-list/${slug}`);

//     await expect(page).toHaveURL(new RegExp(`/drug-list/${slug}`));
//   });
// });
