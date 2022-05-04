import { dispatch } from "vuex-pathify";
import { make } from "../helpers/store";

const state = {
  finite: "iddle",
  products: [],
  product: {},
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
    async getAllProducts(store, categoryID) {
      dispatch("product/setFinite", "loading");

      try {
        const response = await store.rootState.api.get("/products", {
          params: {
            category: categoryID,
          },
        });
        const { data } = response.data;
        console.log("all data", data);
        dispatch("product/setProducts", data);
        dispatch("product/setFinite", "iddle");
      } catch (error) {
        dispatch("product/setFinite", "error");
      }
    },
    async getProductByID(store, productID) {
      dispatch("product/setFinite", "loading");

      try {
        const response = await store.rootState.api.get(`/products/${productID}`);
        const { data } = response.data;
        dispatch("product/setProduct", data);
        dispatch("product/setFinite", "iddle");
      } catch (error) {
        dispatch("product/setFinite", "error");
      }
    },
    async setRatings(store, { productID, count }) {
      dispatch("product/setFinite", "loading");

      try {
        const response = await store.rootState.api.post(`/products/${productID}/ratings`, {
          count,
        });
        const { data } = response.data;
        dispatch("product/setProduct", data);
        dispatch("product/setFinite", "iddle");
      } catch (error) {
        dispatch("product/setFinite", "error");
      }
    },
  },
});
