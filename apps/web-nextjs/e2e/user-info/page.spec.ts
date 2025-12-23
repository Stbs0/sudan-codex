import { expect, test } from "@playwright/test";

test.describe("User Info Page", () => {
  test("should redirect to login when unauthenticated", async ({ page }) => {
    // Attempt to access the user-info page directly
    await page.goto("/user-info");

    // Should be redirected to /log-in
    await expect(page).toHaveURL(/.*log-in/);
  });
});
