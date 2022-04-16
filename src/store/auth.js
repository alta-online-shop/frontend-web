import { dispatch } from 'vuex-pathify';
import { make } from '../helpers/store';

const state = {
  finite: 'iddle',
  token: '',
};

export default make({
  namespaced: true,
  state,
  getters: {
    isAuthenticated(state) {
      return state.token != '';
    },
    loading(state) {
      return state.finite == 'loading';
    },
    error(state) {
      return state.finite == 'error';
    },
  },
  actions: {
    async login(store, user) {
      await dispatch('auth/setFinite', 'loading');

      try {
        const response = await store.rootState.api.post('/auth/login', user);
        const { data } = response.data;
        await dispatch('auth/setToken', data);
        await dispatch('auth/setFinite', 'iddle');
      } catch (error) {
        await dispatch('auth/setFinite', 'error');
        throw error.response.data.error || error.response.data.errors || 'invalid login';
      }
    },

    async register(store, user) {
      await dispatch('auth/setFinite', 'loading');

      try {
        await store.rootState.api.post('/auth/register', user);
        await dispatch('auth/setFinite', 'iddle');
      } catch (error) {
        await dispatch('auth/setFinite', 'error');
        throw error.response.data.error || error.response.data.errors || 'general error';
      }
    },

    async logout() {
      await dispatch('auth/setToken', '');
    },
  },
});
