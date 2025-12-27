// test/utils.tsx (Vitest + Testing Library examples)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
