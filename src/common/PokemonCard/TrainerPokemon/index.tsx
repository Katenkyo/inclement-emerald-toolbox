import React, { useContext } from "react";
import {
  Box,
  Divider,
  Grid,
  Paper,
  PaperProps,
  styled,
  Typography,
} from "@mui/material";
import { TrainerEntity } from "@pages/Trainers/TrainerSelect";
import { DexContext } from "@common/DexContext";
import PokemonStats from "../components/Stats";
import { statValueParser } from "../components/Stats/consts";
import PokemonMoves from "./Moves";
import Profile from "../components/Profile";

const ElevatedPaper = styled((props: PaperProps) => (
  <Paper elevation={3} {...props} />
))({});

const PokemonCard = ({
  pokemon,
  expanded = false,
}: {
  pokemon: TrainerEntity["team"][number];
  expanded?: boolean;
}) => {
  const { pokedex } = useContext(DexContext);
  const getDexEntry = () => {
    return pokedex.find((p) => p.name === pokemon?.name);
  };
  const entry = getDexEntry();
  return (
    <ElevatedPaper>
      <Grid
        container
        direction="row"
        justifyContent={expanded ? "flex-start" : "center"}
      >
        <Profile {...pokemon} {...entry} />
        {expanded && entry && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PokemonMoves
              names={pokemon?.moves ?? []}
              ability={pokemon?.ability ?? ""}
              item={pokemon?.item}
            />
            <Divider
              orientation="vertical"
              sx={{ mx: 0.5, height: "80%", alignSelf: "center" }}
            />
            <PokemonStats
              pokemon={entry}
              nature={pokemon?.nature as NatureName}
              evs={statValueParser(pokemon?.evs)}
              ivs={statValueParser(pokemon?.ivs)}
            />
          </Box>
        )}
      </Grid>
    </ElevatedPaper>
  );
};

export default PokemonCard;
