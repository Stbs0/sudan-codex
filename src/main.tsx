import { scan } from "react-scan"; // must be imported before React and React DOM

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

scan({
  enabled: import.meta.env.DEV ? true : false,
});
createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
