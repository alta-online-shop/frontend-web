import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import pathify from "vuex-pathify";
import vuexPersistedState from "vuex-persistedstate";

import auth from "./auth";
import category from "./category";
import product from "./product";
import cart from "./cart";
import transaction from "./transaction";

Vue.use(Vuex);

const api = (store) => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND,
    headers: {
      authorization: `Bearer ${store.state.auth.token}`,
    },
  });

  store.state.api = api;
};

const persistedState = vuexPersistedState({
  paths: ["auth.token"],
});

export default new Vuex.Store({
  plugins: [pathify.plugin, persistedState, api],
  state: {
    api: null,
  },
  modules: {
    auth,
    category,
    product,
    cart,
    transaction,
  },
});
