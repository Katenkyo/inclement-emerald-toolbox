import {
  calculate as smogonCalculate,
  Pokemon as SmogonPokemon,
  Move as SmogonMove,
  Field,
} from "@smogon/calc";

// Being lazy, not implementing everything atm, we'll just use Gen 7's data;
const GEN_NUM = 7;
const result = smogonCalculate(
  GEN_NUM,
  new SmogonPokemon(GEN_NUM, "Gengar", {
    overrides: {
      baseStats: { hp: 250, atk: 250, def: 250, spa: 250, spd: 250, spe: 250 },
    },
  }),
  new SmogonPokemon(GEN_NUM, "Vulpix"),
  new SmogonMove(GEN_NUM, "Surf"),
  new Field()
);

type BattleMon = Pick<
  PlayerPokemonInstance,
  "ability" | "nature" | "evs" | "ivs"
> & {
  name: string;
  heldItem?: string;
};

export const calculate = (
  attacker: BattleMon,
  defender: BattleMon,
  move: { name: string; power: number }
) => {
  const result = smogonCalculate(
    GEN_NUM,
    new SmogonPokemon(GEN_NUM, "gengar", {
      ability: "Intimidate",
      overrides: {
        baseStats: {
          hp: 250,
          atk: 250,
          def: 250,
          spa: 250,
          spd: 250,
          spe: 250,
        },
      },
    }),
    new SmogonPokemon(GEN_NUM, "Vulpix", { ability: "Water Absorb" }),
    new SmogonMove(GEN_NUM, "Surf"),
    new Field()
  );
  console.log(result);
};

export default calculate;
