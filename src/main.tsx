import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.ts";

// Dev only: Spotify requires the 127.0.0.1 redirect, and storage is per origin,
// so make sure the app always runs on 127.0.0.1 instead of localhost.
if (import.meta.env.DEV && window.location.hostname === "localhost") {
  const { port, pathname, search, hash } = window.location;
  window.location.replace(
    `http://127.0.0.1:${port}${pathname}${search}${hash}`,
  );
}

const isRedirecting =
  import.meta.env.DEV && window.location.hostname === "localhost";

if (isRedirecting) {
  const { port, pathname, search, hash } = window.location;
  window.location.replace(
    `http://127.0.0.1:${port}${pathname}${search}${hash}`,
  );
} else {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
}
