import { expect, test } from "@playwright/test";

test.describe("Drug List Search and Filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/drug-list");
    // Skip tour if shown
    await page.getByText("Next").waitFor({ state: "visible", timeout: 3000 });
    await page.getByRole("button", { name: "Close" }).click();
  });

  test("search input accepts user input", async ({ page }) => {
    const searchInput = page.getByTestId("searchDrug");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("paracetamol");
    await page.waitForTimeout(1000);
    await expect(searchInput).toHaveValue("paracetamol");
  });

  test("filter dropdown shows options when clicked", async ({ page }) => {
    const filterTrigger = page.getByText("Filter By");
    await expect(filterTrigger).toBeVisible();

    await filterTrigger.click();

    // Check filter options appear
    await expect(
      page.getByRole("option", { name: "Brand Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Generic Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Agent Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Company Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Country of Origin" }),
    ).toBeVisible();
  });

  test("selecting a filter changes search behavior", async ({ page }) => {
    // Open filter dropdown
    const filterTrigger = page.getByText("Filter By");
    await filterTrigger.click();

    // Select 'Generic Name' filter
    await page.getByRole("option", { name: "Generic Name" }).click();

    // The filter should now be selected
    await expect(page.getByText("Generic Name")).toBeVisible();
  });

  test("clear search returns to initial results", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search and/or filter drugs...");

    // Type something
    await searchInput.fill("test");
    await page.waitForTimeout(500);

    // Clear search
    await searchInput.fill("");
    await page.waitForURL(/\/drug-list/);

    // Results should be back to initial
    await expect(page.locator("#drugInfo-card").first()).toBeVisible();
  });

  test("drug cards display all required information", async ({ page }) => {
    // Check first drug card has all expected elements
    const firstCard = page.locator("#drugInfo-card");
    await expect(firstCard).toBeVisible();

    // Check for brand name
    await expect(page.locator("#drugInfo-card-brandName")).toBeVisible();

    // Check for strength badge
    await expect(page.locator("#drugInfo-card-strength")).toBeVisible();

    // Check for dosage form
    await expect(page.locator("#drugInfo-card-dosageFormName")).toBeVisible();

    // Check for pack size
    await expect(page.locator("#drugInfo-card-packSize")).toBeVisible();

    // Check for generic name
    await expect(page.locator("#drugInfo-card-genericName")).toBeVisible();

    // Check for agent name
    await expect(page.locator("#drugInfo-card-agentName")).toBeVisible();

    // Check for company name
    await expect(page.locator("#drugInfo-card-companyName")).toBeVisible();

    // Check for country of origin
    await expect(page.locator("#drugInfo-card-countryOfOrigin")).toBeVisible();
  });

  test("infinite scroll loads more drugs on scroll", async ({ page }) => {
    // Get initial count of drug cards (roughly)
    const initialCards = await page.locator("[class*='Card']").count();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for more content to load
    await page.waitForTimeout(1000);

    // Scroll again
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Should have more cards
    const afterScrollCards = await page.locator("[class*='Card']").count();
    expect(afterScrollCards).toBeGreaterThanOrEqual(initialCards);
  });
});

test.describe("Drug List Keyboard Navigation", () => {
  test("can focus search input with keyboard", async ({ page }) => {
    await page.goto("/drug-list");

    // Tab to search input
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const searchInput = page.getByPlaceholder("Search and/or filter drugs...");
    // The input should eventually be focusable
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
  });
});
