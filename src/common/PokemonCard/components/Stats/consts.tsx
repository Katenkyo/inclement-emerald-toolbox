import { Theme } from "@mui/material";

export const NATURES: {
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

export const natureColor =
  (stat: keyof PokemonStats, nature: typeof NATURES[NatureName]) =>
  (theme: Theme) => {
    if (nature === null) return theme.palette.text.primary;
    if (nature.minus === stat) return theme.palette.primary.main;
    if (nature.plus === stat) return theme.palette.error.main;
    return theme.palette.text.primary;
  };
