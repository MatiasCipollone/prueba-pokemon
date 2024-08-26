<template>
  <div class="list-view-container">
    <input type="text" placeholder="🔍  Search Pokémon" v-model="search" />
    <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <ComponentList :pokemonName="pokemon.name" />
    </div>
    <div v-if="filteredPokemons.length === 0" class="container-404">
      <h1>Uh-oh!</h1>
      <p>You look lost on your journey!</p>
      <button class="button" @click="goHome">Go back home</button>
    </div>
    <footer class="fixed-footer">
      <button class="button all" @click="toogleButton">
        <p class="buttonText">All</p>
      </button>
      <button class="button favorite disabled" @click="toogleButton">
        <p class="buttonText">⭐ Favorite</p>
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, watch } from "vue";
import PokemonService from "@/service/PokemonService";
import ComponentList from "@/components/ComponentList.vue";
import { I_PokemonList } from "@/model/I_Pokemon";
import { useFavoriteStore } from "@/store/favorite";
import router from "@/router";

const search: Ref<string> = ref("");
const service = new PokemonService();
const pokemons = service.getPokemons();
const buttonActive: Ref<"all" | "favorites"> = ref("all");
let filteredPokemons: Ref<Array<I_PokemonList>> = ref([]);
const { favorites } = useFavoriteStore();

onMounted(async () => {
  await service.fetchPokemons();
  filteredPokemons.value = pokemons.value;
});

const toogleButton = () => {
  if (buttonActive.value === "all") {
    buttonActive.value = "favorites";
    const buttonFav = document.querySelector(".favorite");
    buttonFav?.classList.toggle("disabled");
    const buttonAll = document.querySelector(".all");
    buttonAll?.classList.toggle("disabled");
    filteredPokemons.value = pokemons.value.filter((pokemon) =>
      favorites.includes(pokemon.name)
    );
    search.value = "";
  } else {
    filteredPokemons.value = search.value
      ? pokemons.value.filter((pokemon) =>
          pokemon.name.includes(search.value.toLowerCase())
        )
      : pokemons.value;
    buttonActive.value = "all";
    const buttonAll = document.querySelector(".all");
    buttonAll?.classList.toggle("disabled");
    const buttonFav = document.querySelector(".favorite");
    buttonFav?.classList.toggle("disabled");
    search.value = "";
  }
};

const goHome = () => {
  router.push({ name: "home" });
};

watch(search, (value) => {
  if (buttonActive.value === "favorites") {
    filteredPokemons.value = pokemons.value.filter(
      (pokemon) =>
        favorites.includes(pokemon.name) &&
        pokemon.name.includes(value.toLowerCase())
    );
  } else {
    filteredPokemons.value =
      value === ""
        ? pokemons.value
        : pokemons.value.filter((pokemon) =>
            pokemon.name.includes(value.toLowerCase())
          );
  }
});
</script>

<style scoped lang="scss">
.list-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
  width: 100vw;
  height: 100%;
  min-width: 100%;
  margin: 0 auto;
}

input {
  height: 3rem;
  width: 100%;
  max-width: 50rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.container-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
}

.button {
  background-color: $red;
  color: white;
  padding: 0 20px;
  border-radius: 40px;
  border: none;
  width: 10rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: darken($redHover, 10%);
  }
  height: 3rem;
}

.disabled {
  background-color: $buttonDisabled;
  cursor: pointer;
}

@media (max-width: 768px) {
  .list-view-container {
    padding-bottom: 80px;
  }

  .fixed-footer {
    gap: 10px;
    padding: 15px;
  }

  input {
    width: 95%;
    max-width: none;
  }
}
</style>
