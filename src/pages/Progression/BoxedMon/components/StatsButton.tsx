import React, { useContext, useRef, useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import BarChart from "@mui/icons-material/BarChart";
import { AttemptContext } from "@common/AttemptContext";
import { NATURES } from "@common/PokemonCard/components/Stats/consts";
import Stats from "@common/PokemonCard/components/Stats";

const StatsButton = ({ pokemon }: { pokemon: PlayerPokemonInstance }) => {
  const { controls } = useContext(AttemptContext);
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen(true)}>
        <BarChart />
      </IconButton>
      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
      >
        <Grid padding={1}>
          <Grid container direction="row">
            <FormControl sx={{ mx: 0.5 }}>
              <InputLabel>Nature</InputLabel>
              <Select
                label="Nature"
                value={pokemon.nature}
                onChange={(evt) =>
                  controls.update({
                    ...pokemon,
                    nature: evt.target.value as NatureName,
                  })
                }
                sx={{ width: "20ch" }}
              >
                {Object.keys(NATURES).map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mx: 0.5 }}>
              <InputLabel>Ability</InputLabel>
              <Select
                label="Ability"
                value={pokemon.ability}
                onChange={(evt) =>
                  controls.update({ ...pokemon, ability: evt.target.value })
                }
                sx={{ width: "20ch" }}
              >
                {[
                  pokemon.dexEntry.ability1,
                  pokemon.dexEntry.ability2,
                  pokemon.dexEntry.hiddenAbility,
                ].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Stats
            pokemon={pokemon.dexEntry}
            ivs={pokemon.ivs}
            evs={pokemon.evs}
            nature={pokemon.nature}
          />
        </Grid>
      </Popover>
    </>
  );
};

export default StatsButton;
