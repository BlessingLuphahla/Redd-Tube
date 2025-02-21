import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { ScreenProvider } from "./context/ScreenContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScreenProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ScreenProvider>
  </StrictMode>
);
