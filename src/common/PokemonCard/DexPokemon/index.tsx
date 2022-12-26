import { DexContext } from "@common/DexContext";
import { ChevronRight } from "@mui/icons-material";
import { Box, Typography, styled, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import Profile from "../components/Profile";
import Stats from "../components/Stats";

const TonedDown = styled("span")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.disabled,
}));

const AbilityNode = ({ name }: { name?: string }) => {
  const { abilityDex } = useContext(DexContext);
  const ability = abilityDex.find(
    (a) => a.name.toLocaleLowerCase() === name?.toLocaleLowerCase()
  );
  if (ability === undefined) return <>{name ?? ""}</>;
  return (
    <>
      {`${ability.name} `}
      <TonedDown>{`${ability.effect.replace("&apos;", "'")}`}</TonedDown>
    </>
  );
};
const DexPokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { getNextForm } = useContext(DexContext);
  const nextForm = getNextForm(pokemon.id);
  const hasNext = nextForm && nextForm.name !== pokemon.name;
  return (
    <>
      <Profile {...pokemon} />
      <Stats pokemon={pokemon} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          "& > *": {
            my: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "& > *": {
              my: 1,
            },
          }}
        >
          <Typography>
            Ability 1: <AbilityNode name={pokemon.ability1} />
          </Typography>
          <Typography>
            Ability 2: <AbilityNode name={pokemon.ability2} />
          </Typography>
          <Typography>
            Hidden: <AbilityNode name={pokemon.hiddenAbility} />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "& > *": {
              my: 1,
            },
          }}
        >
          <Typography>{pokemon.evos}</Typography>
          <TonedDown>{pokemon.changes}</TonedDown>
        </Box>
      </Box>
      {hasNext && !open && (
        <Button
          sx={(theme) => ({
            height: "120px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            color: theme.palette.text.primary,
            backgroundColor: `${theme.palette.text.primary}2`,
            minWidth: "0",
            padding: "0",
            mx: 1,
          })}
          onClick={() => setOpen(true)}
        >
          <ChevronRight />
        </Button>
      )}
      {hasNext && open && <DexPokemonCard pokemon={nextForm} />}
    </>
  );
};

export default DexPokemonCard;
