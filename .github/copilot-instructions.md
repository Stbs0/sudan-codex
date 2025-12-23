# GitHub Copilot Instructions for Sudan Codex

## Project Context

Sudan Codex is a drug information platform for healthcare providers in Sudan. This is a monorepo managed with Turborepo containing web (Next.js) and mobile (React Native/Expo) applications.

## Key Technologies

- **Runtime:** Bun (always use `bun` commands, not npm/yarn/pnpm)
- **Web:** Next.js 15 with App Router, React, TypeScript
- **Mobile:** React Native with Expo
- **Styling:** Tailwind CSS, Shadcn UI components
- **Database:** Drizzle ORM with LibSQL/Turso
- **State:** Zustand (client), TanStack React Query (server)
- **Auth:** Firebase Authentication
- **Testing:** Vitest, Playwright

## Code Style Preferences

### TypeScript

- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` type - use `unknown` when type is uncertain
- Use const assertions where appropriate

### React/Next.js

- Use functional components with hooks
- Prefer named exports: `export function Component() {}`
- Use Server Components by default, add `'use client'` only when needed
- Import from `@/` for absolute imports

### Component Structure

```tsx
interface ComponentProps {
  // Props with JSDoc comments
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks at the top
  // Event handlers
  // Render logic
  return (/* JSX */);
}
```

### Database Queries

- Use Drizzle ORM patterns
- Place queries in `src/db/queries/`
- Use prepared statements for performance

## Testing Guidelines

- Use React Testing Library for component tests
- Use Playwright for E2E tests
- Focus on user behavior, not implementation
- Place unit tests in `__tests__/` folders

## Common Patterns

### API Route Handler

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Logic here
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

### Custom Hook

```typescript
export function useHookName() {
  const [state, setState] = useState<Type>();

  useEffect(() => {
    // Effect logic
  }, [deps]);

  return { state, actions };
}
```

### React Query Usage

```typescript
export function useData() {
  return useQuery({
    queryKey: ["key"],
    queryFn: fetchData,
  });
}
```

## File Organization

- Components: `src/components/<feature>/`
- Hooks: `src/hooks/`
- API Routes: `src/app/api/`
- Database: `src/db/`
- Services: `src/services/`

## Remember

- Always use semantic HTML and proper accessibility
- Handle loading and error states
- Include proper TypeScript types
- Write comments for complex logic
- Follow existing patterns in the codebase
