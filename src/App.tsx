import { RouterProvider } from "react-router-dom";

import router from "./lib/router";
import ThemeProvider from "./components/MainLayout/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";

const App = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <ThemeProvider
        defaultTheme='dark'
        storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default App;
