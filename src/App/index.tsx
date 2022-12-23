import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { dark } from "./theming";
import AppRouter from "./Router";
import AppBar from "./AppBar";

const App = () => {
  return (
    <>
      <AppRouter>
        <AppBar />
      </AppRouter>
    </>
  );
};

const IncludeTheming = () => (
  <ThemeProvider theme={dark}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

export default IncludeTheming;
