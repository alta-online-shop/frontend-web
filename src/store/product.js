import { dispatch } from 'vuex-pathify';
import { make } from '../helpers/store';

const state = {
  finite: 'iddle',
  products: [],
};

export default make({
  namespaced: true,
  state,
  getters: {
    loading(state) {
      return state.finite == 'loading';
    },
    error(state) {
      return state.finite == 'error';
    },
  },
  actions: {
    async getAllProducts(store) {
      dispatch('product/setFinite', 'loading');

      try {
        const response = await store.rootState.api.get('/products');
        const { data } = response.data;
        dispatch('product/setProducts', data);
        dispatch('product/setFinite', 'iddle');
      } catch (error) {
        dispatch('product/setFinite', 'error');
      }
    },
  },
});
