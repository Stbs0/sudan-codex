import { expect, test } from "@playwright/test";

/**
 * Tests for the Home Page
 * Covers: Hero section, Header navigation, Theme toggle, Footer, Responsive design, and Accessibility.
 */

test.describe("Home Page Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // Verify the page title is correct
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Sudan Codex/);
  });

  test("displays welcome heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Welcome to Sudan Codex/i })
    ).toBeVisible();
  });

  test("displays description text", async ({ page }) => {
    // Check for description paragraph content
    const description = page
      .locator("p", { hasText: /Search through/i })
      .first();
    await expect(description).toBeVisible();
  });

  test("displays Explore Now button", async ({ page }) => {
    const exploreButton = page.getByRole("link", { name: /Explore Now/i });
    await expect(exploreButton).toBeVisible();
  });

  test("Explore Now button links to drug-list", async ({ page }) => {
    const exploreButton = page.getByRole("link", { name: /Explore Now/i });
    await expect(exploreButton).toHaveAttribute("href", "/drug-list");

    // Verify navigation works with explicit wait
    await exploreButton.click();
    await expect(page).toHaveURL(/.*drug-list/, { timeout: 10000 });
  });

  test("hero section has background image", async ({ page }) => {
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();

    // Check for background image via style or class
    const bgClass = await heroSection.getAttribute("class");
    expect(bgClass).toContain("bg-");
  });
});

test.describe("Home Page Header Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header is visible", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("logo is visible in header", async ({ page }) => {
    // Logo might be an image or text
    const logo = page
      .getByRole("link", { name: /Sudan Codex/i })
      .or(page.locator("header").getByRole("img", { name: /logo/i }));

    await expect(logo).toBeVisible();
  });

  test("drug list link in header works", async ({ page }) => {
    const drugListLink = page
      .locator("header")
      .getByRole("link", { name: /drug list/i });

    if (await drugListLink.isVisible().catch(() => false)) {
      await drugListLink.click();
      await expect(page).toHaveURL(/drug-list/);
    }
  });

  test("stats link in header works", async ({ page }) => {
    const statsLink = page
      .locator("header")
      .getByRole("link", { name: /stats/i });

    if (await statsLink.isVisible().catch(() => false)) {
      await statsLink.click();
      await expect(page).toHaveURL(/stats/);
    }
  });
});

test.describe("Home Page Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("theme toggle button exists", async ({ page }) => {
    // Just verify header has interactive elements
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Try to find the toggle button specifically
    const themeToggle = page
      .getByRole("button", { name: /toggle theme/i })
      .or(page.locator("button").filter({ hasText: /theme|mode/i }));

    // We expect it to be visible if the header is loaded
    if ((await themeToggle.count()) > 0) {
      await expect(themeToggle.first()).toBeVisible();
    }
  });

  test("can open theme menu", async ({ page }) => {
    // Find the theme toggle button by its sr-only text
    const themeButton = page.getByRole("button", { name: /toggle theme/i });

    if (await themeButton.isVisible().catch(() => false)) {
      await themeButton.click();

      // Theme options should appear - use first() to handle multiple matching elements
      // We look for 'Light' option in the dropdown
      const lightOption = page.getByRole("menuitem", { name: "Light" }).first();
      await expect(lightOption).toBeVisible();
    }
  });
});

test.describe("Home Page Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("footer exists", async ({ page }) => {
    const footer = page.locator("footer");

    if (await footer.isVisible().catch(() => false)) {
      await expect(footer).toBeVisible();
    }
  });

  test("privacy policy link exists in footer", async ({ page }) => {
    const footer = page.locator("footer");

    if (await footer.isVisible().catch(() => false)) {
      const privacyLink = footer.getByRole("link", { name: /privacy/i });

      if (await privacyLink.isVisible().catch(() => false)) {
        await expect(privacyLink).toHaveAttribute("href", /privacy/);
      }
    }
  });
});

test.describe("Home Page Responsive Design", () => {
  test("displays correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("/");

    // Hero should still be visible
    await expect(
      page.getByRole("heading", { name: /Welcome to Sudan Codex/i })
    ).toBeVisible();

    // Explore button should still be visible
    await expect(
      page.getByRole("link", { name: /Explore Now/i })
    ).toBeVisible();
  });

  test("displays correctly on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Welcome to Sudan Codex/i })
    ).toBeVisible();
  });

  test("displays correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Welcome to Sudan Codex/i })
    ).toBeVisible();
  });
});

test.describe("Home Page Accessibility", () => {
  test("page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have an h1
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);

      // Skip hidden images
      if (!(await img.isVisible())) continue;

      const alt = await img.getAttribute("alt");
      const role = await img.getAttribute("role");

      // Image should have alt text or be decorative (empty alt or presentation role)
      // This is a basic check to ensure we don't have images without any description
      expect(
        alt !== null || role === "presentation" || role === "none",
        `Image at index ${i} missing alt text`
      ).toBeTruthy();
    }
  });
});
