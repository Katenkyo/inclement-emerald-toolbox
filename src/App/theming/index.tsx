import React from "react";
import { createTheme } from "@mui/material";

export const dark = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *::-webkit-scrollbar {
        width: 0.3rem;
        height: 0.5rem;
      },
      *::-webkit-scrollbar-track {
        background: transparent;
      },
      *::-webkit-scrollbar-thumb {
        background-color: #707070;
        border-radius: 1rem;
      },
    `,
    },
  },
  palette: {
    mode: "dark",
  },
});
