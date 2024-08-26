<template>
  <div>
    <div class="containerItem" @click="openModal">
      <h3 class="pokemonName">
        {{
          props.pokemonName!.charAt(0).toUpperCase() +
          props.pokemonName!.slice(1)
        }}
      </h3>
      <button class="star-button" @click.stop="toggleFavorite">⭐</button>
      <button
        v-if="isFavorite(props.pokemonName!)"
        class="star-button"
        @click.stop="toggleFavorite"
      >
        🗑
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
  width: 100vw;
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
