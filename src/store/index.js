import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import pathify from 'vuex-pathify';
import vuexPersistedState from 'vuex-persistedstate';

import auth from './auth';
import product from './product';
import cart from './cart';

Vue.use(Vuex)

const api = (store) => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND,
  });

  store.state.api = api;
};

const persistedState = vuexPersistedState({
  paths:['auth.token'],
});

export default new Vuex.Store({
  plugins: [
    pathify.plugin,
    persistedState,
    api,
  ],
  state: {
    api: null,
  },
  modules: {
    auth,
    product,
    cart,
  },
});
