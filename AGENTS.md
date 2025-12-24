# AI Agents Guide - Sudan Codex

This document provides instructions for AI coding assistants working on the Sudan Codex project.

## Project Overview

Sudan Codex is a drug information platform for healthcare providers in Sudan. It's a monorepo containing:

| App    | Path                   | Description                    |
| ------ | ---------------------- | ------------------------------ |
| Web    | `apps/web-nextjs`      | Next.js web application (main) |
| Mobile | `apps/mobile`          | React Native/Expo mobile app   |
| Legacy | `apps/legacy-vite-web` | Deprecated Vite app            |

## Quick Start

```bash
# Install dependencies
bun install

# Start development
bun run dev

# Run tests
bun run test

# Run E2E tests
bun run test:e2e

# Type checking
bun run check-types

# Linting
bun run lint
```

## Tech Stack

### Core

- **Runtime:** Bun
- **Monorepo:** Turborepo
- **Language:** TypeScript

### Web App (`apps/web-nextjs`)

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS + Shadcn UI
- **State:** Zustand (client) + TanStack Query (server)
- **Database:** Drizzle ORM + LibSQL/Turso
- **Auth:** Better Auth

### Mobile App (`apps/mobile`)

- **Framework:** React Native + Expo
- **Navigation:** Expo Router

### Testing

- **Unit:** Vitest + React Testing Library
- **E2E:** Playwright

## Directory Structure (Web App)

```
apps/web-nextjs/src/
├── app/              # Next.js App Router pages
│   └── api/          # API route handlers
├── components/       # React components by feature
│   ├── ui/           # Shadcn UI components
│   └── <feature>/    # Feature-specific components
├── db/               # Database layer
│   ├── queries/      # Query functions
│   └── schema/       # Drizzle schema
├── data/             # Static data files
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── providers/        # React context providers
└── services/         # External service integrations
```

## Code Conventions

### Package Manager

> ⚠️ **IMPORTANT:** Always use `bun` - never npm, yarn, or pnpm

### TypeScript

- Use `interface` for object shapes
- Avoid `any` - prefer `unknown` or specific types
- Use absolute imports with `@/` prefix

### React Components

- Use functional components with hooks
- Prefer named exports
- Use Server Components by default
- Add `'use client'` only when needed

### File Naming

| Type       | Convention               | Example             |
| ---------- | ------------------------ | ------------------- |
| Components | PascalCase               | `DrugDetails.tsx`   |
| Utilities  | camelCase                | `formatDate.ts`     |
| Tests      | `.test.tsx` / `.spec.ts` | `DrugList.test.tsx` |
| Types      | `.types.ts`              | `drug.types.ts`     |

## Database

The project uses Drizzle ORM with LibSQL/Turso.

### Common Commands

```bash
# Generate migrations
bun run db:generate

# Run migrations
bun run db:migrate

# Push schema changes (dev only)
bun run db:push

# Open Drizzle Studio
bun run db:studio

# Seed database
bun run db:seed
```

### Query Pattern

```typescript
// src/db/queries/drug.ts
import { db } from "../client";
import { drugs } from "../schema/drugs";

export async function getDrugById(id: string) {
  return db.query.drugs.findFirst({
    where: eq(drugs.id, id),
  });
}
```

## Testing

### Unit Tests (Vitest)

- Located in `__tests__/` directories
- Use React Testing Library
- Focus on user behavior

```typescript
// src/components/drugList/__tests__/DrugCard.test.tsx
import { render, screen } from '@testing-library/react';
import { DrugCard } from '../DrugCard';

describe('DrugCard', () => {
  it('displays drug name', () => {
    render(<DrugCard name="Aspirin" />);
    expect(screen.getByText('Aspirin')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

- Located in `e2e/` directory
- Test critical user flows

```typescript
// e2e/search.spec.ts
import { test, expect } from "@playwright/test";

test("user can search for drugs", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Search").fill("aspirin");
  await expect(page.getByRole("listitem")).toHaveCount.greaterThan(0);
});
```

## API Routes

Use Next.js Route Handlers:

```typescript
// src/app/api/drugs/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const drug = await getDrugById(params.id);
    if (!drug) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(drug);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

## Environment Variables

Required environment variables (create `.env.local`):

```env


# Database
DATABASE_URL=
TURSO_AUTH_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=
```

## Common Tasks

### Adding a New Component

1. Create component in `src/components/<feature>/`
2. Export from component index
3. Add tests in `__tests__/` folder

### Adding a New API Route

1. Create route handler in `src/app/api/`
2. Validate input with Zod
3. Handle errors appropriately
4. Return consistent JSON responses

### Adding a New Database Table

1. Define schema in `src/db/schema/`
2. Export from schema index
3. Run `bun run db:generate`
4. Run `bun run db:migrate`
5. Add query functions in `src/db/queries/`

## Troubleshooting

### Build Errors

```bash
bun run check-types  # Check TypeScript errors
bun run lint         # Check ESLint errors
```

### Test Failures

```bash
bun run test -- --reporter=verbose  # Verbose test output
```

### Database Issues

```bash
bun run db:studio  # Open database GUI
```
