import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";  // Make sure theme.js exists in src/

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Apply Material UI Theme Across Entire App */}
    <ThemeProvider theme={theme}>
      {/* Reset default browser styles */}
      <CssBaseline />

      <App />
    </ThemeProvider>
  </React.StrictMode>
);
