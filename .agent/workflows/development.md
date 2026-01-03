---
description: Start development server and run common development tasks
---

# Development Workflow

## Start Development Server

// turbo

1. Start the dev server:

```bash
bun run dev
```

The web app will be available at http://localhost:3000

## Common Development Tasks

### Type Checking

// turbo 2. Run TypeScript type checking:

```bash
bun run check-types
```

### Linting

// turbo 3. Run ESLint:

```bash
bun run lint
```

### Database Studio

4. Open Drizzle Studio to view/edit database:

```bash
bun run db:studio
```

## Working with Specific Apps

### Web App Only

```bash
cd apps/web-nextjs && bun run dev
```

### Mobile App Only

```bash
cd apps/mobile && bun run start
```

## Troubleshooting

If you encounter dependency issues:

```bash
bun run clean && bun install
```
