import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { ScreenProvider } from "./context/ScreenContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScreenProvider>
      <App />
    </ScreenProvider>
  </StrictMode>
);
