<template>
  <div>
    <div class="containerItem" @click="openModal">
      <h3 class="pokemonName">
        {{
          props.pokemonName!.charAt(0).toUpperCase() +
          props.pokemonName!.slice(1)
        }}
      </h3>
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
    <ComponentModal
      :pokemonName="props.pokemonName"
      :visible="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import ComponentModal from "@/components/ComponentModal.vue";
import { useFavoriteStore } from "@/store/favorite";

const props = defineProps({
  pokemonName: String,
});

const isModalVisible = ref(false);
const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

const openModal = () => {
  if (props.pokemonName === undefined) return;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

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
.containerItem {
  background-color: $backgroundSecondary;
  border-radius: 10px;
  padding: 15px 40px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.3s;
  width: 50rem;
  max-width: 50rem;
  position: relative;
  &:hover {
    background-color: $backgroundSecondaryHover;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  transition: background-color 0.3s;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background-color: #bbb;
  }
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

.container_image {
  display: flex;
  justify-content: center;
  align-items: end;
  background-image: url("@/assets/background.png");
  margin-bottom: 20px;
  width: 110%;
  height: 200px;
}

@media (max-width: 768px) {
  .containerItem {
    width: 90vw;
    padding: 15px;
  }
}
</style>
