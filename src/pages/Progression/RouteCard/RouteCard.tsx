import { AttemptContext } from "@common/AttemptContext";
import { DexContext } from "@common/DexContext";
import { Sprite } from "@common/PokemonCard/components/image";
import {
  NATURES,
  statValueParser,
} from "@common/PokemonCard/components/Stats/consts";
import Check from "@mui/icons-material/Check";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

const Btn = styled(Button)(({ theme }) => ({
  "& img": { width: "32px", height: "32px" },
  margin: theme.spacing(0, 0.5),

  color: theme.palette.text.primary,
}));

const RouteCard = ({ route }: { route: RouteEntity }) => {
  const { pokedex } = useContext(DexContext);
  const { pokemons, controls } = useContext(AttemptContext);
  const [selected, setSelected] = useState<string>();
  const [nick, setNick] = useState<string>("");
  const [nature, setNature] = useState<NatureName | "">("");
  const [ability, setAbility] = useState<string>("");
  const instance = pokemons.find((p) => p.captureLocationName === route.name);
  const isEncountered = instance !== undefined;
  const dexEntry = pokedex.find(
    (d) => d.name.toLocaleLowerCase() === (selected ?? "").toLocaleLowerCase()
  );
  useEffect(() => {
    if (selected) setAbility("");
  }, [selected]);
  useEffect(() => {
    setSelected(
      isEncountered ? instance.dexEntry.name.toLocaleLowerCase() : ""
    );
  }, [pokemons]);

  return (
    <Paper sx={{ p: 0.5 }}>
      <Typography variant="h6">{route.name}</Typography>
      <Grid container direction="row" padding={1}>
        {route.encounters.map((v) => (
          <Btn
            key={v}
            startIcon={<Sprite name={v} />}
            onClick={() => setSelected(v)}
            disabled={isEncountered}
            sx={
              selected === v
                ? (theme) => ({
                    "&:not(.Mui-disabled)": {
                      color: theme.palette.background.default,
                    },
                    "&.Mui-disabled": {
                      color: theme.palette.background.default,
                    },
                    backgroundColor: theme.palette.text.primary,
                  })
                : {}
            }
          >
            {v}
          </Btn>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        sx={{ "& > *": { mx: 0.5 } }}
        justifyContent="flex-end"
      >
        <TextField
          label="Nickname"
          disabled={isEncountered || dexEntry === undefined}
          value={isEncountered ? instance.nickname : nick}
          onChange={(evt) => setNick(evt.target.value)}
          sx={{ mx: 0.5 }}
        />
        <FormControl
          sx={{ mx: 0.5 }}
          disabled={isEncountered || dexEntry === undefined}
        >
          <InputLabel>Nature</InputLabel>
          <Select
            label="Nature"
            value={isEncountered ? instance.nature : nature}
            onChange={(evt) =>
              setNature(evt.target.value as keyof typeof NATURES)
            }
            sx={(theme) => ({
              width: "20ch",
            })}
          >
            {Object.keys(NATURES).map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{ mx: 0.5 }}
          disabled={isEncountered || dexEntry === undefined}
        >
          <InputLabel>Ability</InputLabel>
          <Select
            label="Ability"
            value={isEncountered ? instance.ability : ability}
            onChange={(evt) => setAbility(evt.target.value)}
            sx={(theme) => ({
              width: "20ch",
            })}
          >
            {dexEntry &&
              [
                dexEntry.ability1,
                dexEntry.ability2,
                dexEntry.hiddenAbility,
              ].map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <IconButton
          disabled={
            isEncountered ||
            dexEntry === undefined ||
            nick.length === 0 ||
            nature.length === 0 ||
            ability.length === 0
          }
          onClick={() =>
            controls.addEnconter({
              id: dexEntry?.id as number,
              ability: ability,
              dexEntry: dexEntry as Pokemon,
              nickname: nick,
              nature: nature as NatureName,
              ivs: statValueParser(31),
              evs: statValueParser(0),
              captureLocationName: route.name,
              moves: [],
            })
          }
        >
          <Check />
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default RouteCard;
