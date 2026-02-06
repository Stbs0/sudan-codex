# Sudan Codex

[![Firebase](https://img.shields.io/badge/Firebase-hosted-brightgreen?logo=firebase)](https://sudancodex.app)
![CI](https://github.com/stbs0/sudan-codex/actions/workflows/firebase-hosting-merge.yml/badge.svg)

## Overview

Sudan Codex is a web application designed to provide FDA drug labeling information for healthcare providers in Sudan. The platform offers easy access to essential drug information, helping medical professionals make informed decisions about medications.

## Features

- 📱 Responsive design for all devices
- 🔍 Search functionality for drug information
- ♾️ Infinite scroll for browsing drug list
- 🌓 Dark/Light theme support
- 🔐 User authentication with multiple providers
- 💾 Offline data access using IndexedDB

## Tech Stack

### Frontend

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form with Zod validation
- **Offline Storage:** Dexie.js (IndexedDB)

### Backend & Infrastructure

- **Authentication:** Firebase Auth
- **Hosting:** Firebase Hosting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (preferred package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Stbs0/sudan-codex.git
   cd sudan-codex
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a Firebase project and set up your environment variables.

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm test:e2e` - Run end-to-end tests

## Envoirments

- create `.env`, `.env.development`,`.env.productions`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Live Demo

Visit the live application at [https://sudancodex.app/](https://sudancodex.app/)

## Roadmap

- [ ] Add metadata to each page for better SEO
- [ ] Find additional drug information sources
- [ ] Implement offline-first architecture (PWA)
- [ ] Add multi-language support

## Author

### Mohammed Ibrahim Mahmoud

## License

This project is licensed under the MIT License.
