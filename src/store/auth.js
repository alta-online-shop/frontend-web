import { make } from '../helpers/store';

const state = {
  token: '',
};

export default make({
  namespaced: true,
  state,
  getters: {
    isAuthenticated(state) {
      return state.token != '';
    },
  },
});
