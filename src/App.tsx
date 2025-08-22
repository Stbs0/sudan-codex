import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./hooks/useAuth";
import drugDB from "./lib/indexedDB";
import router from "./lib/router";
import { PHProvider } from "./providers/PHProvider";
import { ThemeProvider } from "./providers/theme-provider";
import { fetchDrugList } from "./services/drugServices";

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((m) => ({
        default: m.ReactQueryDevtools,
      }))
    )
  : () => null;

const App = () => {
  useEffect(() => {
    let ignore = false;
    const fn = async () => {
      if (ignore) return;
      const isExists = await drugDB.isExists();
      if (isExists === false) {
        const drugList = await fetchDrugList();
        await drugDB.populate(drugList);
        ignore = true;
      }
    };
    fn().catch((err) => {
      console.log(err);
    });
  }, []);
  const queryClient = new QueryClient();
  return (
    <PHProvider>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        <ThemeProvider
          defaultTheme='dark'
          storageKey='vite-ui-theme'>
          <AuthProvider>
            <SidebarProvider defaultOpen={false}>
              <RouterProvider router={router} />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PHProvider>
  );
};

export default App;
