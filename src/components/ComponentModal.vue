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
        <button class="footer-button" @click="copyToClipboard">
          Share to my friends
        </button>

        <button
          v-if="isFavorite(props.pokemonName!) === false"
          class="star-button"
          @click.stop="toggleFavorite"
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="22" cy="22" r="22" fill="#F5F5F5" />
            <path
              d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z"
              fill="#BFBFBF"
            />
          </svg>
        </button>
        <button
          v-if="isFavorite(props.pokemonName!)"
          class="star-button"
          @click.stop="toggleFavorite"
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="22" cy="22" r="22" fill="#F5F5F5" />
            <path
              d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z"
              fill="#ECA539"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonService from "@/service/PokemonService";
import { defineProps, defineEmits, onMounted } from "vue";
import { useFavoriteStore } from "@/store/favorite";

const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
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

function copyToClipboard() {
  if (!props.pokemonName || !pokemon) return;

  const name =
    props.pokemonName.charAt(0).toUpperCase() + props.pokemonName.slice(1);
  const height = pokemon.value.height;
  const weight = pokemon.value.weight;
  const types = pokemon.value.types
    .map(
      (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    )
    .join(", ");

  const textToCopy = `Name: ${name}, Height: ${height}, Weight: ${weight}, Types: ${types}`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Pokemon details copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

onMounted(() => {
  if (props.pokemonName === undefined) return;
  service.fetchPokemon(props.pokemonName);
});

const toggleFavorite = () => {
  if (props.pokemonName === undefined) return;
  if (isFavorite(props.pokemonName)) {
    removeFavorite(props.pokemonName);
  } else {
    addFavorite(props.pokemonName);
  }
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  z-index: 1000;
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
  padding: 0 0 10px 0;
  border-radius: 10px;
  width: 95%;
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
  width: 105%;
  height: 210px;
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

.star-button {
  background-color: #ccc;
  border: none;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
