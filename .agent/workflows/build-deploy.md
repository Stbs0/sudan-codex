---
description: Build and deploy the application
---

# Build and Deploy Workflow

## Building for Production

### Build All Apps

// turbo

1. Build all applications:

```bash
bun run build
```

### Build Web App Only

// turbo 2. Build just the web application:

```bash
cd apps/web-nextjs && bun run build
```

### Start Production Server (Local)

3. Start the production server locally:

```bash
cd apps/web-nextjs && bun run start
```

## Pre-deployment Checks

// turbo 4. Run type checking:

```bash
bun run check-types
```

// turbo 5. Run linting:

```bash
bun run lint
```

// turbo 6. Run tests:

```bash
bun run test
```

## Deployment

The application is deployed automatically via GitHub Actions:

- Merges to `main` trigger automatic deployment to Firebase Hosting
- Preview deployments are created for pull requests

### Manual Firebase Deploy

7. Deploy to Firebase manually (requires Firebase CLI):

```bash
cd apps/web-nextjs && firebase deploy
```

### Vercel Deploy

If using Vercel:

```bash
cd apps/web-nextjs && vercel --prod
```

## Environment Setup

Ensure these environment variables are set in your deployment platform:

### Required

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `DATABASE_URL`
- `TURSO_AUTH_TOKEN`

### Optional (Analytics)

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
