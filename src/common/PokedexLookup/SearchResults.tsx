import { DexContext } from "@common/DexContext";
import { Backdrop, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { SearchContext } from "./context";

const ResultList = () => {
  const { search, setSearch } = useContext(SearchContext);
  const { pokedex } = useContext(DexContext);

  const results =
    search.length > 0
      ? pokedex.filter((p) =>
          p.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
        )
      : [];

  // <PokemonCard key={p.name} pokemon={p}/>
  return (
    <>
      {results.map((p) => (
        <Typography>{p.name}</Typography>
      ))}
    </>
  );
};

const Search = () => {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <Backdrop
      open={search.length > 0}
      sx={(theme) => ({ zIndex: theme.zIndex.appBar - 1 })}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) setSearch("");
      }}
    >
      <Paper
        sx={{
          width: "95%",
          height: "90%",
          marginTop: 5,
          maxHeight: "90%",
          overflowY: "scroll",
        }}
      >
        <ResultList />
      </Paper>
    </Backdrop>
  );
};

export default Search;
