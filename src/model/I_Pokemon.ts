export interface I_PokemonList {
  name: string;
  url: string;
}

interface I_Cries {
  latest: string;
  legacy: string;
}

interface I_Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface I_Form {
  name: string;
  url: string;
}

interface I_GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface I_Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}

interface I_Species {
  name: string;
  url: string;
}

interface I_Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface I_Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Use any because the API response is too large and complex
// to define all the properties
// Uso any porque la respuesta de la API es demasiado grande y compleja
// para definir todas las propiedades

export interface I_Pokemon {
  abilities: Array<I_Ability>;
  base_experience: number;
  cries: I_Cries;
  forms: Array<I_Form>;
  game_indices: Array<I_GameIndex>;
  height: number;
  held_items: Array<any>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<I_Move>;
  name: string;
  order: number;
  past_abilities: Array<any>;
  past_types: Array<any>;
  species: I_Species;
  sprites: any;
  stats: Array<I_Stats>;
  types: Array<I_Type>;
  weight: number;
}
