import React from "react";
import { createTheme } from "@mui/material";

export const dark = createTheme({
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "& input": {
            borderRadius: theme.shape.borderRadius,
          },
          "& .Mui-disabled": {
            backgroundColor: theme.palette.grey["900"],
            "& > fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              backgroundColor: "transparent",
            },
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      a {
        text-decoration: none;
        color: inherit;
      }
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
