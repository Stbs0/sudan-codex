import { RouterProvider } from "react-router-dom";

import router from "./lib/router";
import ThemeProvider from "./components/MainLayout/theme-provider";
import AuthProvider from "./providers/AuthProvider";

const App = () => {
  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
