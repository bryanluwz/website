import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "..";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
