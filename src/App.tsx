import { RouterProvider } from "react-router-dom";

import router from "./lib/router";
import ThemeProvider from "./components/MainLayout/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./providers/AuthProvider";
import { useEffect } from "react";
import drugDB from "./config/indexedDB";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryQlient";

const App = () => {
  useEffect(() => {
    let ignore = false;
    const fn = async () => {
      if (ignore) return;
      const isExists = await drugDB.isExists();
      if (isExists === false) {
        await drugDB.populate();
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
