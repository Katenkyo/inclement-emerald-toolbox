declare module "*.json";

interface DexEntity {
  abilities: unknown;
  moves: unknown;
  moveCategories: unknown;
  pokemons: DexEntry[];
  statIndexes: unknown;
  fieldList: Array<keyof Pokemon>;
  badges: string[];
  tms: string[];
  matchUps: MatchUpsEntity;
}
type DexEntry = {
  [n: string]: any;
};

type Pokemon = PokemonStats & {
  id: number;
  name: string;
  obtainable: boolean;
  type1: PokemonType;
  total: number;
  ability1: unknown;
  changes: string;
  hiddenAbility: unknown;
  type2: PokemonType;
  group1: string;
  group2: string;
  forms: number[];
  evos: string[];
  learnSet: {
    egg: number[];
    level: number[];
    tm: number[];
    tutorMoves: number[];
  };
  progression: number;
  ability2: unknown;
};

type PokemonStats = {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
};
type MatchUpsEntity = {
  [k in PokemonType]: {
    [k in PokemonType]?: number;
  };
};

type PokemonType =
  | "grass"
  | "ice"
  | "psychic"
  | "bug"
  | "dark"
  | "steel"
  | "ghost"
  | "rock"
  | "flying"
  | "normal"
  | "fairy"
  | "water"
  | "dragon"
  | "poison"
  | "electric"
  | "fire"
  | "fighting"
  | "ground";

type NatureName =
  | "Adamant"
  | "Bashful"
  | "Bold"
  | "Brave"
  | "Calm"
  | "Careful"
  | "Docile"
  | "Gentle"
  | "Hardy"
  | "Hasty"
  | "Impish"
  | "Jolly"
  | "Lax"
  | "Lonely"
  | "Mild"
  | "Modest"
  | "Naive"
  | "Naughty"
  | "Quiet"
  | "Quirky"
  | "Rash"
  | "Relaxed"
  | "Sassy"
  | "Serious"
  | "Timid";
