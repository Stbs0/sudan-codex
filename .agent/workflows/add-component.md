---
description: Add a new React component with tests
---

# Add Component Workflow

## Steps to Add a New Component

### 1. Create the Component

Create a new file in `apps/web-nextjs/src/components/<feature>/`:

```typescript
// src/components/<feature>/NewComponent.tsx
interface NewComponentProps {
  title: string;
  onClick?: () => void;
}

export function NewComponent({ title, onClick }: NewComponentProps) {
  return (
    <div className="p-4 rounded-lg border">
      <h3 className="text-lg font-semibold">{title}</h3>
      {onClick && (
        <button
          onClick={onClick}
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Click Me
        </button>
      )}
    </div>
  );
}
```

### 2. Export from Index

If the feature folder has an index file, add the export:

```typescript
// src/components/<feature>/index.ts
export { NewComponent } from "./NewComponent";
```

### 3. Create Tests

Create a test file in `apps/web-nextjs/src/components/<feature>/__tests__/`:

```typescript
// src/components/<feature>/__tests__/NewComponent.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewComponent } from '../NewComponent';

describe('NewComponent', () => {
  it('renders the title', () => {
    render(<NewComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();
    render(<NewComponent title="Test" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not render button without onClick', () => {
    render(<NewComponent title="Test" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
```

### 4. Run Tests

// turbo

```bash
cd apps/web-nextjs && bun run test src/components/<feature>/__tests__/NewComponent.test.tsx
```

### 5. Check Types

// turbo

```bash
bun run check-types
```

## Component Best Practices

### Props Interface

- Always define a TypeScript interface for props
- Use JSDoc comments for complex props
- Make props optional when they have sensible defaults

### Styling

- Use Tailwind CSS classes
- Use Shadcn UI components from `@/components/ui/`
- Keep styling consistent with existing components

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works

### Server vs Client Components

- Use Server Components by default
- Add `'use client'` only when using:
  - React hooks (useState, useEffect)
  - Browser APIs
  - Event handlers
