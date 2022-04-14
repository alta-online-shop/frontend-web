import { dispatch } from 'vuex-pathify';
import { make } from '../helpers/store';

const state = {
  products: [],
};

export default make({
  namespaced: true,
  state,
  actions: {
    async getAllProducts(store) {
      const response = await store.rootState.api.get('/products');
      const { data } = response.data;
      dispatch('product/setProducts', data);
    },
  },
});
