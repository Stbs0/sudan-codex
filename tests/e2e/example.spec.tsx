import App from "@/App";
import { test, expect } from "@playwright/test";
import { render, screen } from "@testing-library/react";

test("has title", async ({ page }) => {
  await page.goto("/");
  render(<App />);
  screen.debug();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
