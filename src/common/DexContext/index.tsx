import React, { createContext, PropsWithChildren } from "react";
import dex from "@assets/dex.json";
const pokedex = dex as DexEntity;
type DexContextType = {
  pokedex: Pokemon[];
  moveDex: MoveEntity[];
  abilityDex: AbilityEntity[];
  getForms: (id: Pokemon["id"]) => Pokemon[];
  getNextForm: typeof getNextForm;
};

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
const getForms = (id: Pokemon["id"]) =>
  (pokemons.find((p) => p.id === id)?.forms ?? []).map(
    (index) => pokemons[index]
  ) ?? [];
const getNextForm = (id: Pokemon["id"]) => {
  let forms = getForms(id).reduce(
    (acc: Pokemon[], val) =>
      acc.find((v) => v.id === val.id) ? acc : [...acc, val],
    []
  );
  let index = forms.findIndex((p) => p.id === id) + 1;
  if (index <= 0 || index >= forms.length) return undefined;
  return forms[index];
};
export const DexContext = createContext<DexContextType>({
  pokedex: pokemons,
  moveDex: pokedex.moves,
  abilityDex: pokedex.abilities,
  getForms,
  getNextForm,
});

const DexContextProvider = (props: PropsWithChildren<{}>) => {
  return (
    <DexContext.Provider
      value={{
        pokedex: pokemons,
        moveDex: pokedex.moves,
        abilityDex: pokedex.abilities,
        getForms,
        getNextForm,
      }}
    >
      {props.children}
    </DexContext.Provider>
  );
};
export default DexContextProvider;
