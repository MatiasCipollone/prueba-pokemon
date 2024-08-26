<template>
  <div class="homeContainer">
    <img src="@/assets/maskGroup.png" alt="Pokémon" />
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="info">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world
    </p>
    <button class="button" @click="goToList">
      <p class="buttonText">Get started</p>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToList = () => {
  router.push({ name: "list" });
};
</script>

<style scoped lang="scss">
.homeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: $background;
  gap: 20px;
}
.title {
  color: $textPrimary;
  font-size: 2rem;
}
.info {
  color: $textSecondary;
  margin-bottom: 8%;
  width: 75%;
  font-size: 0.9rem;
}
.button {
  background-color: $red;
  color: white;
  padding: 0 30px;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: darken($redHover, 10%);
  }
  height: 3rem;
}

.buttonText {
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
}

.button a {
  text-decoration: none;
  color: white;
}
</style>
