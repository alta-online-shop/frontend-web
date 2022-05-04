import { dispatch } from "vuex-pathify";
import { make } from "../helpers/store";

const state = {
  finite: "iddle",
  categories: [],
};

export default make({
  namespaced: true,
  state,
  getters: {
    loading(state) {
      return state.finite == "loading";
    },
    error(state) {
      return state.finite == "error";
    },
  },
  actions: {
    async getAllCategories(store) {
      dispatch("category/setFinite", "loading");

      try {
        const response = await store.rootState.api.get("/categories");
        const { data } = response.data;
        dispatch("category/setCategories", data);
        dispatch("category/setFinite", "iddle");
      } catch (error) {
        dispatch("category/setFinite", "error");
      }
    },
  },
});
