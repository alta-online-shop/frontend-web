import { make } from '../helpers/store';

const state = {
  orders: [],
};

export default make({
  namespaced: true,
  state,
});
