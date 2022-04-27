import { dispatch } from 'vuex-pathify';
import { make } from '../helpers/store';

const state = {
  finite: 'iddle',
  transactions: [],
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
    async getAllTransactions(store) {
      dispatch('transaction/setFinite', 'loading');

      try {
        const response = await store.rootState.api.get('/orders');
        const { data } = response.data;
        dispatch('transaction/setTransactions', data);
        dispatch('transaction/setFinite', 'iddle');
      } catch (error) {
        dispatch('transaction/setFinite', 'error');
      }
    },

    async createTransaction(store, data) {
      dispatch('transaction/setFinite', 'loading');

      try {
        await store.rootState.api.post('/orders', data);
        dispatch('transaction/setFinite', 'iddle');
      } catch (error) {
        dispatch('transaction/setFinite', 'error');
      }
    },
  },
});
