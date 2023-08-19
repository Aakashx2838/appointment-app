import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

import "./css/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          zIndex: 99999,
        },
      }}
    />
    <App />
  </React.StrictMode>,
);
