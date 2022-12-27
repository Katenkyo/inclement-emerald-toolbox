import React, { useContext, useRef, useState } from "react";
import { Card, Grid, IconButton, Popover, Button } from "@mui/material";
import Upgrade from "@mui/icons-material/Upgrade";
import { DexContext } from "@common/DexContext";
import Profile from "@common/PokemonCard/components/Profile";
import { AttemptContext } from "@common/AttemptContext";

const FormsButton = ({ pokemon }: { pokemon: PlayerPokemonInstance }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { getForms } = useContext(DexContext);
  const { controls } = useContext(AttemptContext);
  const forms = getForms(pokemon.dexEntry.id);
  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen(true)}>
        <Upgrade />
      </IconButton>
      <Popover
        anchorEl={ref.current}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={0.5}
          padding={0.5}
        >
          {forms.map((p) => (
            <Card
              component={Button}
              onClick={() => {
                controls.evolve(pokemon.capturedAs, p);
                setOpen(false);
              }}
            >
              <Profile {...p} />
            </Card>
          ))}
        </Grid>
      </Popover>
    </>
  );
};

export default FormsButton;
