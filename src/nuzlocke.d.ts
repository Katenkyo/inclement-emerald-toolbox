type Attempt = {
  pokemons: PlayerPokemonInstance[];
  startingType: PokemonType;
  gender: "male" | "female";
};
type PlayerPokemonInstance = {
  id: number;
  nickname: string;
  ability: string;
  captureLocationName: string;
  dexEntry: Pokemon;
  capturedAs: Pokemon;
  nature: NatureName;
  evs: PokemonStats;
  ivs: PokemonStats;
  moves: MoveEntity[];
  isDead?: boolean;
};
