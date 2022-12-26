import { DexContext } from "@common/DexContext";
import { DexPokemonCard } from "@common/PokemonCard";
import { Backdrop, List, ListItem, Paper, Typography } from "@mui/material";
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

  return (
    <List>
      {results.map((p) => (
        <ListItem
          key={p.name}
          sx={(theme) => ({
            "&:nth-of-type(2n)": {
              backgroundColor: `${theme.palette.background.default}50`,
            },
            overflowX: "scroll",
          })}
        >
          <DexPokemonCard pokemon={p} />
        </ListItem>
      ))}
    </List>
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
