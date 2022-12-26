import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { SearchContext } from "./context";

const PokedexLookup = () => {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <>
      <TextField
        size="small"
        label="search"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        sx={{ maxWidth: "30ch", width: "30ch" }}
        onKeyDown={(evt) => {
          if (evt.key === "Escape") setSearch("");
        }}
        InputProps={{
          endAdornment:
            search === "" ? (
              <></>
            ) : (
              <IconButton onClick={() => setSearch("")}>
                <Close />
              </IconButton>
            ),
        }}
      />
    </>
  );
};

export default PokedexLookup;
