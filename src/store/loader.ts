import { defineStore } from "pinia";

export const useLoaderStore = defineStore({
  id: "loader",
  state: () => ({
    loading: false,
  }),
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
