import { RouterProvider } from "react-router-dom";

import router from "./lib/router";
import ThemeProvider from "./providers/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./providers/AuthProvider";
import { useEffect } from "react";
import drugDB from "./lib/indexedDB";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryQlient";
import { fetchDrugList } from "./services/drugServices";

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

    fn().catch((err) => console.log(err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={false}>
        <AuthProvider>
          <ThemeProvider
            defaultTheme='dark'
            storageKey='vite-ui-theme'>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default App;
