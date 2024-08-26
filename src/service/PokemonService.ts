import { I_Pokemon, I_PokemonList } from "@/model/I_Pokemon";
import { ref, Ref } from "vue";

class PokemonService {
  private pokemons: Ref<Array<I_PokemonList>>;
  private pokemon: Ref<I_Pokemon> | Ref<object>;

  constructor() {
    this.pokemons = ref([]);
    this.pokemon = ref({});
  }

  getPokemons(): Ref<Array<I_PokemonList>> {
    return this.pokemons;
  }

  getPokemon(): Ref<I_Pokemon> {
    return this.pokemon as Ref<I_Pokemon>;
  }

  async fetchPokemons(): Promise<void> {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      this.pokemons.value = data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchPokemon(name: string): Promise<void> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemon = await response.json();
      this.pokemon.value = pokemon;
    } catch (error) {
      console.error(error);
    }
  }
}

export default PokemonService;
