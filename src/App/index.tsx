import React from "react";
import { test } from "@common/index";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import dex from "@assets/dex.json";
import { dark } from "./theming";

const App = (props: {}) => {
  return (
    <>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <Typography>Main menu</Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 2 }}>
        {test()}
      </Box>
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
