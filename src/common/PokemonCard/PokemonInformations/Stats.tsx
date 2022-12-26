import { Box, Theme, Typography } from "@mui/material";
import React from "react";

const NATURES: {
  [id in NatureName]: null | {
    plus: keyof PokemonStats;
    minus: keyof PokemonStats;
  };
} = {
  Adamant: { plus: "atk", minus: "spa" },
  Bashful: null,
  Bold: { plus: "def", minus: "atk" },
  Brave: { plus: "atk", minus: "spe" },
  Calm: { plus: "spd", minus: "atk" },
  Careful: { plus: "spd", minus: "spa" },
  Docile: null,
  Gentle: { plus: "spd", minus: "def" },
  Hardy: null,
  Hasty: { plus: "spe", minus: "def" },
  Impish: { plus: "def", minus: "spa" },
  Jolly: { plus: "spe", minus: "spa" },
  Lax: { plus: "def", minus: "spd" },
  Lonely: { plus: "atk", minus: "def" },
  Mild: { plus: "spa", minus: "def" },
  Modest: { plus: "spa", minus: "atk" },
  Naive: { plus: "spe", minus: "spd" },
  Naughty: { plus: "atk", minus: "spd" },
  Quiet: { plus: "spa", minus: "spe" },
  Quirky: null,
  Rash: { plus: "spa", minus: "spd" },
  Relaxed: { plus: "def", minus: "spe" },
  Sassy: { plus: "spd", minus: "spe" },
  Serious: null,
  Timid: { plus: "spe", minus: "atk" },
};

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
const natureColor =
  (stat: keyof PokemonStats, nature: typeof NATURES[NatureName]) =>
  (theme: Theme) => {
    if (nature === null) return theme.palette.text.primary;
    if (nature.minus === stat) return theme.palette.primary.main;
    if (nature.plus === stat) return theme.palette.error.main;
    return theme.palette.text.primary;
  };

type StatGaugeOfInstanceProps = StatGaugeProps & {
  iv: number;
  ev: number;
  nature: NatureName;
};
type StatGaugeProps = { base: number; label: keyof PokemonStats };
const isStatGaugeOfInstance = (
  x: StatGaugeOfInstanceProps | StatGaugeProps
): x is StatGaugeOfInstanceProps =>
  (x as StatGaugeOfInstanceProps).ev !== undefined;
const StatGauge = (props: StatGaugeProps | StatGaugeOfInstanceProps) => {
  const { base, label } = props;
  const isInstance = isStatGaugeOfInstance(props);

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
      {isInstance && (
        <Typography
          variant="caption"
          sx={{ color: natureColor(label, NATURES[props.nature]) }}
        >{`${("" + props.iv).padStart(2, "0")}|${props.ev}`}</Typography>
      )}
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
  nature,
}: {
  pokemon: Pokemon;
  ivs: PokemonStats;
  evs: PokemonStats;
  nature: NatureName;
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
            nature={nature}
          />
        ))}
      </Box>
    </>
  );
};

export default Stats;
