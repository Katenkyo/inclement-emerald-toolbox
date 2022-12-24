import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { dark } from "./theming";
import AppRouter from "./Router";
import AppBar from "./AppBar";
import DexContextProvider from "@common/DexContext";

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
    <DexContextProvider>
      <CssBaseline />
      <App />
    </DexContextProvider>
  </ThemeProvider>
);

export default IncludeTheming;
