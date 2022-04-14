import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import pathify from 'vuex-pathify';

import product from './product';
import cart from './cart';

Vue.use(Vuex)

const api = (store) => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND,
  });

  store.state.api = api;
};

export default new Vuex.Store({
  plugins: [
    pathify.plugin,
    api,
  ],
  state: {
    api: null,
  },
  modules: {
    product,
    cart,
  },
});
