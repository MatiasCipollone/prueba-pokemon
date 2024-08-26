<template>
  <div class="list-view-container">
    <input type="text" placeholder="🔍  Search Pokémon" v-model="search" />
    <div v-for="pokemon in pokemons" :key="pokemon.name">
      <ComponentList :pokemonName="pokemon.name" />
    </div>
    <footer class="fixed-footer">
      <button class="button all" @click="toogleButton">
        <p class="buttonText">All</p>
      </button>
      <button class="button favorite disabled" @click="toogleButton">
        <p class="buttonText">Favorite</p>
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";
import PokemonService from "@/service/PokemonService";
import ComponentList from "@/components/ComponentList.vue";

const search: Ref<string> = ref("");
const service = new PokemonService();
const pokemons = service.getPokemons();
const buttonActive: Ref<"all" | "favorites"> = ref("all");

onMounted(async () => {
  await service.fetchPokemons();
});

const toogleButton = () => {
  if (buttonActive.value === "all") {
    buttonActive.value = "favorites";
    const buttonFav = document.querySelector(".favorite");
    buttonFav?.classList.toggle("disabled");
    const buttonAll = document.querySelector(".all");
    buttonAll?.classList.toggle("disabled");
  } else {
    buttonActive.value = "all";
    const buttonAll = document.querySelector(".all");
    buttonAll?.classList.toggle("disabled");
    const buttonFav = document.querySelector(".favorite");
    buttonFav?.classList.toggle("disabled");
  }
};
</script>

<style scoped lang="scss">
.list-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
  width: 100vw;
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
