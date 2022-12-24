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
        let [hp, atk, def, spa, spd, spe] = v.split("/").map(parseInt);
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
const StatGauge = () => {};
const Stats = ({
  pokemon,
  ivs,
  evs,
}: {
  pokemon: Pokemon;
  ivs: PokemonStats;
  evs: PokemonStats;
}) => {
  return <></>;
};

export default Stats;
