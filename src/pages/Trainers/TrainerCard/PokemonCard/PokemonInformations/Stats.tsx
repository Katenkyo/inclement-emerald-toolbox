import { Box, Theme, Typography } from "@mui/material";
import React from "react";

export const statValueParser = (v?: string | number): PokemonStats => {
  let stat: PokemonStats = {
    atk: 0,
    def: 0,
    hp: 0,
    spe: 0,
    spa: 0,
    spd: 0,
  };
  switch (typeof v) {
    case "number":
      stat = { atk: v, def: v, hp: v, spe: v, spa: v, spd: v };
      break;
    case "string":
      let replaced = v.replace("Speed", "spe");
      // Handles full spread description
      if (replaced.match(/([0-9]+\/?){6}/gm)) {
        let [hp, atk, def, spa, spd, spe] = v
          .split("/")
          .map((v) => parseInt(v));
        stat = {
          hp,
          atk,
          def,
          spa,
          spd,
          spe,
        };
      }
      // Handles "general spread, specific one"
      replaced.split(",").forEach((part) => {
        part = part.trimStart();
        // Handles "All x" spreads
        if (part.match(/^All [0-9]+/gm)) {
          stat = statValueParser(parseInt(v.split(" ")[1]));
        }
        //Handles "xxx stat(/stat)?"
        else if (part.match(/^[0-9]+ [a-z]{2,3}(\/[a-z]{2,3})?/gm)) {
          const split = part.split(" ");
          let value = parseInt(split[0]);
          let keys = split[1].split("/") as (keyof PokemonStats)[];
          keys.forEach((k) => {
            stat[k] = value;
          });
        }
      });
      break;
    case "undefined":
    default:
      break;
  }
  return stat;
};
const generateGradient = (base: number) => (theme: Theme) => {
  const low = theme.palette.error.dark;
  const mid = theme.palette.warning.dark;
  const high = theme.palette.success.dark;
  const background = theme.palette.background.default;
  const selected = base <= 50 ? low : base < 100 ? mid : high;
  // not a lot of base 255, or over 155, so let's just have a better representation of stats
  const percent = Math.min(base / 1.55, 100);

  return `linear-gradient(90deg, ${selected} 0%, ${selected} ${percent}%, ${background} ${percent}%, ${background} 100%)`;
};
const StatGauge = ({
  base,
  iv,
  ev,
  label,
}: {
  base: number;
  iv: number;
  ev: number;
  label: keyof PokemonStats;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="caption" sx={{ width: "3ch" }}>
        {label.padEnd(3, " ")}
      </Typography>
      <Box
        sx={{
          width: "100px",
          borderRadius: "3em",
          backgroundColor: "red",
          background: generateGradient(base),
          my: 0.5,
          height: "16px",
          padding: 0,
        }}
      >
        <Typography
          sx={{
            width: "3ch",
            textAlign: "end",
            paddingLeft: 1,
            fontSize: "12px",
            top: "3px",
            lineHeight: 1,
            position: "relative",
          }}
        >
          {base}
        </Typography>
      </Box>
      <Typography variant="caption">{`${("" + iv).padStart(
        2,
        "0"
      )}|${ev}`}</Typography>
    </Box>
  );
};
const statOrder: (keyof PokemonStats)[] = [
  "hp",
  "atk",
  "def",
  "spa",
  "spd",
  "spe",
];
const Stats = ({
  pokemon,
  ivs,
  evs,
}: {
  pokemon: Pokemon;
  ivs: PokemonStats;
  evs: PokemonStats;
}) => {
  const baseStats: PokemonStats = { ...pokemon };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {statOrder.map((k) => (
          <StatGauge
            key={k}
            label={k}
            base={baseStats[k]}
            iv={ivs[k]}
            ev={evs[k]}
          />
        ))}
      </Box>
    </>
  );
};

export default Stats;
