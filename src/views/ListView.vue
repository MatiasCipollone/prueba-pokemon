<template>
  <input type="text" placeholder="🔍  Search Pokémon" v-model="search" />
  <div>
    <div v-for="pokemon in pokemons" :key="pokemon.name">
      <p>{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { onMounted } from "vue";
import PokemonService from "@/service/PokemonService";

const search: Ref<string> = ref("");
const service = new PokemonService();
const pokemons = service.getPokemons();

onMounted(async () => {
  await service.fetchPokemons();
});
</script>

<style scoped lang="scss">
input {
  width: 32rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>
