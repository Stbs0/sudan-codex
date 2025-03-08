import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./hooks/useAuth";
import { analytics } from "./lib/firebase";
import drugDB from "./lib/indexedDB";
import router from "./lib/router";
import { ThemeProvider } from "./providers/theme-provider";
import { fetchDrugList } from "./services/drugServices";

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
        logEvent(analytics, "drug_list_fetch");
      }
    };
    fn().catch((err) => console.log(err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <ThemeProvider
        defaultTheme='dark'
        storageKey='vite-ui-theme'>
        <SidebarProvider defaultOpen={false}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
