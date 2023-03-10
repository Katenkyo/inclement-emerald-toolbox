import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { dark } from "./theming";
import AppRouter from "./Router";
import AppBar from "./AppBar";
import DexContextProvider from "@common/DexContext";
import SearchContextProvider from "@common/PokedexLookup/context";
import SearchResults from "@common/PokedexLookup/SearchResults";
import AttemptContextProvider from "@common/AttemptContext";

const App = () => {
  return (
    <>
      <AppRouter>
        <AppBar />
        <SearchResults />
      </AppRouter>
    </>
  );
};

const IncludeTheming = () => (
  <ThemeProvider theme={dark}>
    <DexContextProvider>
      <SearchContextProvider>
        <AttemptContextProvider>
          <CssBaseline />
          <App />
        </AttemptContextProvider>
      </SearchContextProvider>
    </DexContextProvider>
  </ThemeProvider>
);

export default IncludeTheming;
