import { expect, test } from "@playwright/test";

test.describe("Page Navigation", () => {
  test("drug list page loads", async ({ page }) => {
    await page.goto("/drug-list");
    await expect(page).toHaveURL(/.*drug-list/);
    // Expect some content specific to drug list, e.g., a list item or filter
    // Since we know there is a SearchDrug component, let's check for it if possible,
    // or just the heading if it exists.
  });

  test("login page loads", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await expect(page).toHaveURL(/.*sign-in/i);
    // Check for email/password inputs or login button
    await expect(
      page.getByRole("button", { name: "Sign in with Google" })
    ).toBeVisible();
  });

  test("signup page loads", async ({ page }) => {
    await page.goto("/auth/sign-up");
    await expect(page).toHaveURL(/.*sign-up/i);
    await expect(
      page.getByRole("button", { name: "Sign in with  Google" })
    ).toBeVisible();
  });

  test("stats page loads", async ({ page }) => {
    await page.goto("/stats");
    await expect(page).toHaveURL(/.*stats/);
  });

  test("privacy policy page loads", async ({ page }) => {
    await page.goto("/privacy-policy");
    await expect(page).toHaveURL(/.*privacy-policy/);
  });
});
