import { defineStore } from "pinia";

export const useFavoriteStore = defineStore({
  id: "favorite",
  state: () => ({
    favorites: [] as string[],
  }),
  getters: {
    isFavorite: (state) => (pokemon: string) =>
      state.favorites.includes(pokemon),
  },
  actions: {
    addFavorite(pokemon: string) {
      this.favorites.push(pokemon);
    },
    removeFavorite(pokemon: string) {
      const index = this.favorites.indexOf(pokemon);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
  },
});
