import React, { createContext, PropsWithChildren } from "react";
import dex from "@assets/dex.json";
const pokedex = dex as DexEntity;
type DexContextType = {
  pokedex: Pokemon[];
  moveDex: MoveEntity[];
};

export const DexContext = createContext<DexContextType>({
  pokedex: [],
  moveDex: [],
});
const getPokemonFromDexEntryBuilder =
  (fieldList: DexEntity["fieldList"]) =>
  (entry: DexEntry): Pokemon => {
    const p: Partial<Pokemon> = {};
    fieldList.forEach((field, index) => {
      p[field] = entry[`${index}`];
    });
    return p as Pokemon;
  };
const buildPokemons = () => {
  return pokedex.pokemons.map(getPokemonFromDexEntryBuilder(pokedex.fieldList));
};
const pokemons = buildPokemons();

const DexContextProvider = (props: PropsWithChildren<{}>) => {
  return (
    <DexContext.Provider value={{ pokedex: pokemons, moveDex: pokedex.moves }}>
      {props.children}
    </DexContext.Provider>
  );
};
export default DexContextProvider;
