<template>
  <div class="containerApp">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $background;
  padding-top: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.containerApp {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
