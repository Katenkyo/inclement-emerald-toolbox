import { Box } from "@mui/material";
import React from "react";
import StatGauge from "./StatGauge";

export const statOrder: (keyof PokemonStats)[] = [
  "hp",
  "atk",
  "def",
  "spa",
  "spd",
  "spe",
];
type StatOfInstanceProps = {
  ivs: PokemonStats;
  evs: PokemonStats;
  nature: NatureName;
};
type StatsWithoutInstanceProps = { pokemon: Pokemon };
type StatsWithInstanceProps = StatsWithoutInstanceProps & StatOfInstanceProps;
const isInstanceProps = (
  x: StatsWithInstanceProps | StatsWithoutInstanceProps
): x is StatsWithInstanceProps =>
  (x as StatsWithInstanceProps).ivs !== undefined;
const Stats = (props: StatsWithInstanceProps | StatsWithoutInstanceProps) => {
  const { pokemon } = props;
  const isInstance = isInstanceProps(props);
  const baseStats: PokemonStats = { ...pokemon };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {statOrder.map((k) => (
          <StatGauge
            key={k}
            label={k}
            base={baseStats[k]}
            iv={isInstance ? props.ivs[k] : undefined}
            ev={isInstance ? props.evs[k] : undefined}
            nature={isInstance ? props.nature : undefined}
          />
        ))}
      </Box>
    </>
  );
};

export default Stats;
