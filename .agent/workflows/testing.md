---
description: Run unit tests and E2E tests
---

# Testing Workflow

## Unit Tests (Vitest)

### Run All Unit Tests

// turbo

1. Run the full test suite:

```bash
bun run test
```

### Run Tests in Watch Mode

2. Run tests in watch mode for development:

```bash
cd apps/web-nextjs && bun run test:watch
```

### Run Specific Test File

3. Run a specific test file:

```bash
cd apps/web-nextjs && bun run test src/components/drugList/__tests__/DrugCard.test.tsx
```

### Run Tests with Coverage

// turbo 4. Run tests with coverage report:

```bash
cd apps/web-nextjs && bun run test:coverage
```

## E2E Tests (Playwright)

### Install Browsers (First Time)

5. Install Playwright browsers:

```bash
cd apps/web-nextjs && bunx playwright install
```

### Run All E2E Tests

// turbo 6. Run E2E test suite:

```bash
bun run test:e2e
```

### Run E2E Tests with UI

7. Run E2E tests with Playwright UI:

```bash
cd apps/web-nextjs && bunx playwright test --ui
```

### Run Specific E2E Test

8. Run a specific E2E test file:

```bash
cd apps/web-nextjs && bunx playwright test e2e/home.spec.ts
```

### View Test Report

9. View the HTML test report:

```bash
cd apps/web-nextjs && bunx playwright show-report
```

## Writing Tests

### Unit Test Template

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading")).toBeVisible();
  });
});
```
