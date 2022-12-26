type Attempt = {
  pokemons: PlayerPokemonInstance[];
  startingType: PokemonType;
  gender: "male" | "female";
};
type PlayerPokemonInstance = {
  id: number;
  nickname: string;
  captureLocationName: string;
  dexEntry: Pokemon;
  nature: NatureName;
  evs: PokemonStats;
  ivs: PokemonStats;
  moves: MoveEntity[];
  isDead?: boolean;
};
