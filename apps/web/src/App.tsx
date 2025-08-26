import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./hooks/useAuth";
import drugDB from "./lib/indexedDB";
import router from "./lib/router";
import { ThemeProvider } from "./providers/theme-provider";
import { fetchDrugList } from "./services/drugServices";
import posthog from "posthog-js";
import { PHProvider } from "./providers/PHProvider";

const queryClient = new QueryClient();

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
      posthog.captureException(err, {
        place: "initialize db",
      });
    });
  }, []);

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
