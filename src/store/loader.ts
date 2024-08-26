import { defineStore } from "pinia";

export const useLoaderStore = defineStore({
  id: "loader",
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
