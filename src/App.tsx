import { RouterProvider } from "react-router-dom";

import router from "./lib/router";
import ThemeProvider from "./components/MainLayout/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./providers/AuthProvider";

const App = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AuthProvider>
        <ThemeProvider
          defaultTheme='dark'
          storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </SidebarProvider>
  );
};

export default App;
