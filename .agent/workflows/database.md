---
description: Database management with Drizzle ORM
---

# Database Workflow

## Prerequisites

Ensure you have the correct environment variables set in `.env.local`:

- `DATABASE_URL` - LibSQL/Turso database URL
- `TURSO_AUTH_TOKEN` - Authentication token for Turso

## Common Database Tasks

### View Database

1. Open Drizzle Studio to view and edit data:

```bash
bun run db:studio
```

### Generate Migrations

// turbo 2. Generate migration files after schema changes:

```bash
bun run db:generate
```

### Run Migrations

3. Apply pending migrations to the database:

```bash
bun run db:migrate
```

### Push Schema (Development Only)

4. Push schema changes directly (skips migrations):

```bash
bun run db:push:dev
```

### Seed Database

5. Seed the database with initial data:

```bash
bun run db:seed
```

### Drop Database

6. Drop all tables (DANGEROUS):

```bash
bun run db:drop
```

## Schema Changes

### Adding a New Table

1. Create schema file in `apps/web-nextjs/src/db/schema/`:

```typescript
// src/db/schema/newTable.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const newTable = sqliteTable("new_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});
```

2. Export from schema index:

```typescript
// src/db/schema/index.ts
export * from "./newTable";
```

3. Generate and run migration:

```bash
bun run db:generate
bun run db:migrate
```

### Adding Queries

Create query functions in `apps/web-nextjs/src/db/queries/`:

```typescript
// src/db/queries/newTable.ts
import { db } from "../client";
import { newTable } from "../schema";
import { eq } from "drizzle-orm";

export async function getById(id: string) {
  return db.query.newTable.findFirst({
    where: eq(newTable.id, id),
  });
}

export async function getAll() {
  return db.query.newTable.findMany();
}

export async function create(data: { name: string }) {
  return db.insert(newTable).values({
    id: crypto.randomUUID(),
    name: data.name,
    createdAt: new Date(),
  });
}
```
