import { scan } from "react-scan"; // must be imported before React and React DOM

import { PostHogProvider } from "posthog-js/react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";

const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
};
scan({
  enabled: import.meta.env.DEV ? true : false,
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_KEY!}
      options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
