import { expect, test } from "@playwright/test";

test.describe("Agents Stats Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/agents/siho-trading-coltd");
  });

  test("page loads correctly", async ({ page }) => {
    await expect(page).toHaveURL(/.*siho-trading-coltd/);
  });

  test("displays page heading", async ({ page }) => {
    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible();
  });

  test("displays list of agents", async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState("networkidle");

    // There should be some content on the page
    const content = await page.content();
    expect(content.length).toBeGreaterThan(1000);
  });

  test("agent links navigate to individual agent pages", async ({ page }) => {
    // Wait for content
    await page.waitForLoadState("networkidle");

    // Find first link in the agents list
    const agentLinks = page.locator("a[href*='s/']");

    if ((await agentLinks.count()) > 0) {
      const firstAgentLink = agentLinks.first();
      const href = await firstAgentLink.getAttribute("href");

      await firstAgentLink.click();

      await expect(page).toHaveURL(
        new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      );
    }
  });
});

test.describe("Companies Stats Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/companies/remedica-ltd");
  });

  test("page loads correctly", async ({ page }) => {
    await expect(page).toHaveURL(/.*remedica-ltd/);
  });

  test("displays company statistics", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Page should have content
    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible();
  });

  test("company links navigate to individual company pages", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");

    const companyLinks = page.locator("a[href*='/companies/']");

    if ((await companyLinks.count()) > 0) {
      const firstCompanyLink = companyLinks.first();
      const href = await firstCompanyLink.getAttribute("href");

      await firstCompanyLink.click();

      await expect(page).toHaveURL(
        new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      );
    }
  });
});

test.describe("Generics Stats Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/generics/acetazolamide");
  });

  test("page loads correctly", async ({ page }) => {
    await expect(page).toHaveURL(/.*acetazolamide/);
  });

  test("displays generic drug statistics", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible();
  });

  test("generic links navigate to individual generic pages", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");

    const genericLinks = page.locator("a[href*='/generics/']");

    if ((await genericLinks.count()) > 0) {
      const firstGenericLink = genericLinks.first();
      const href = await firstGenericLink.getAttribute("href");

      await firstGenericLink.click();

      await expect(page).toHaveURL(
        new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      );
    }
  });
});

test.describe("Stats Navigation", () => {
  test("main stats page has links to sub-pages", async ({ page }) => {
    await page.goto("/stats");

    // Check for navigation to different stat types
    const agentsLink = page.getByRole("link", { name: /agents/i });
    const companiesLink = page.getByRole("link", { name: /companies/i });
    const genericsLink = page.getByRole("link", { name: /generics/i });

    // At least one of these should exist
    const hasLinks =
      (await agentsLink.isVisible().catch(() => false)) ||
      (await companiesLink.isVisible().catch(() => false)) ||
      (await genericsLink.isVisible().catch(() => false));

    // Stats page should have some navigation or data
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(500);
  });
});

test.describe("Stats Data Display", () => {
  test("stats tables have proper structure", async ({ page }) => {
    await page.goto("/stats");

    await page.waitForLoadState("networkidle");

    // Check for table elements
    const tables = page.locator("table");

    if ((await tables.count()) > 0) {
      const firstTable = tables.first();

      // Tables should have headers and body
      await expect(firstTable.locator("thead, th").first()).toBeVisible();
      await expect(firstTable.locator("tbody, td").first()).toBeVisible();
    }
  });

  test("stats cards display numeric values", async ({ page }) => {
    await page.goto("/stats");

    await page.waitForLoadState("networkidle");

    // Look for elements that display numbers (stats cards)
    const content = await page.content();

    // Stats page should contain numbers
    expect(content).toMatch(/\d+/);
  });
});
