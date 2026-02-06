# Project Overview

This is a Next.js project called "Sudan Codex". It's a web application that allows users to search through a drug index for Sudan. The application provides information about drugs, including brand names, generic names, and manufacturers.

The project is built with a modern web stack, including:

- **Framework:** [Next.js](https://nextjs.org/) with React
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `@radix-ui/react-` components
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
- **Backend:** [Firebase](https://firebase.google.com/) for services like authentication
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics) and [PostHog](https://posthog.com/)

The drug data is currently served from a local JSON file (`src/data/drugData.json`) via a Next.js API route.

# Building and Running

To get the development server running:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

Other useful commands:

- `bun run build`: Creates a production build.
- `bun run start`: Starts the production server.
- `bun run lint`: Lints the code using ESLint.
- `bun run knip`: Detects unused files, dependencies, and exports.

# Development Conventions

- **Styling:** The project uses Tailwind CSS for utility-first styling. UI components are built using Shadcn UI.
- **Components:** Components are organized by feature under `src/components`.
- **API Routes:** API logic is handled via Next.js API routes in the `src/app/api` directory.
- **State Management:** Client-side state is managed with Zustand, and server-side state with TanStack React Query.
- **Firebase:** Firebase services are abstracted in the `src/lib/firebase.ts` file and used for features like authentication.
- **Environment Variables:** The project uses environment variables for configuration (e.g., Firebase API keys). A `.env.local` file should be created to store these values.
