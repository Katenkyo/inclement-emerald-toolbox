import React, { useContext, useState } from "react";
import { AttemptContext } from "@common/AttemptContext";
import { Button, Card, Grid, IconButton, Paper } from "@mui/material";
import Profile from "@common/PokemonCard/components/Profile";
import Upgrade from "@mui/icons-material/Upgrade";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import BarChart from "@mui/icons-material/BarChart";
import Vaccines from "@mui/icons-material/Vaccines";
import FormsButton from "./components/FormsButton";
import KillButton from "./components/KillButon";
import StatsButton from "./components/StatsButton";

const BoxedCard = ({ pokemon }: { pokemon: PlayerPokemonInstance }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Card
      sx={[
        {
          display: "flex",
          flexDirection: "row",
          padding: 0.5,
          textTransform: "none",
        },
        (theme) =>
          pokemon.isDead
            ? {
                backgroundColor: theme.palette.error.dark,
                opacity: 0.95,
              }
            : {},
      ]}
      component={expanded ? Paper : Button}
      onClick={() => (expanded ? undefined : setExpanded(true))}
    >
      <Profile {...pokemon.dexEntry} nickname={pokemon.nickname} />
      {expanded && (
        <>
          <Button
            onClick={() => setExpanded(false)}
            sx={{
              minWidth: "0",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
            }}
          >
            <ChevronLeft />
          </Button>
          <Grid
            display="grid"
            gridTemplateColumns="repeat(1,1fr)"
            sx={{ maxHeight: "100%" }}
          >
            <FormsButton pokemon={pokemon} />
            <StatsButton pokemon={pokemon} />
            <KillButton pokemon={pokemon} />
          </Grid>
        </>
      )}
    </Card>
  );
};
const BoxedMon = () => {
  const { pokemons, controls } = useContext(AttemptContext);

  return (
    <Grid container direction="row" gap={0.5}>
      {pokemons.map((p) => (
        <BoxedCard key={p.nickname} pokemon={p} />
      ))}
    </Grid>
  );
};

export default BoxedMon;
