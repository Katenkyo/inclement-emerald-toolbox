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
import { TrainerEntity } from "../../pages/Trainers/TrainerSelect";
import { DexContext } from "@common/DexContext";
import PokemonStats, { statValueParser } from "./PokemonInformations/Stats";
import PokemonMoves from "./PokemonInformations/Moves";

const ElevatedPaper = styled((props: PaperProps) => (
  <Paper elevation={3} {...props} />
))({});

const StyledImg = styled("img")({ height: "96px", width: "96px" });

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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <StyledImg
            src={`https://play.pokemonshowdown.com/sprites/gen5/${(
              pokemon?.name ?? ""
            ).toLocaleLowerCase()}.png`}
          />
          <Typography variant="caption" textAlign="center">
            {pokemon?.name ?? ""}
          </Typography>
          <Grid container direction="row" justifyContent="center">
            {[entry?.type1, entry?.type2].map(
              (t) =>
                t && (
                  <img
                    key={t}
                    src={`https://veekun.com/dex/media/types/en/${t.toLocaleLowerCase()}.png`}
                  />
                )
            )}
          </Grid>
        </Box>
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
