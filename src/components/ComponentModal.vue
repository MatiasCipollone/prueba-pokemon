<template>
  <div class="modal-overlay" v-if="props.visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <div class="modal-body">
        <div class="container_image">
          <img
            :src="pokemon.sprites.front_default"
            alt="pokemon"
            width="170"
            height="170"
          />
        </div>
        <div class="container_data">
          <div class="item">
            <p class="item_param">Name:</p>
            {{
              props.pokemonName!.charAt(0).toUpperCase() +
              props.pokemonName!.slice(1)
            }}
          </div>
          <div class="item">
            <p class="item_param">Altura:</p>
            {{ pokemon.height }}
          </div>
          <div class="item">
            <p class="item_param">Peso:</p>
            {{ pokemon.weight }}
          </div>
          <div class="item">
            <p class="item_param">Type:</p>
            {{
              pokemon.types
                .map(
                  (type) =>
                    type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)
                )
                .join(", ")
            }}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="footer-button">Share to my friends</button>
        <button class="footer-button">a</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonService from "@/service/PokemonService";
import { defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  visible: Boolean,
  pokemonName: String,
});

const service = new PokemonService();
const pokemon = service.getPokemon();

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}

onMounted(() => {
  if (props.pokemonName === undefined) return;
  service.fetchPokemon(props.pokemonName);
  console.log("POKEMONNN", pokemon);
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
  margin-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid lightgray;
}

.item_param {
  margin-right: 10px;
  font-weight: bold;
}

.container_data {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
}

.modal-body {
  text-align: left;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.container_image {
  display: flex;
  justify-content: center;
  align-items: end;
  background-image: url("@/assets/background.png");
  margin-bottom: 20px;
  width: 110%;
  height: 200px;
}

.footer-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: $red;
  color: white;
  border-radius: 40px;
  &:hover {
    background-color: darken($redHover, 10%);
  }
}
</style>
