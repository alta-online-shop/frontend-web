import { make as pathifyMake } from 'vuex-pathify';

export const make = ({ namespaced, state, getters, mutations, actions }) => {
  const store = {
    namespaced,
    state,
    getters: {
      ...pathifyMake.getters(state),
      ...(getters || {}),
    },
    mutations: {
      ...pathifyMake.mutations(state),
      ...(mutations || {}),
    },
    actions: {
      ...pathifyMake.actions(state),
      ...(actions || {}),
    },
  };

  return store;
};
