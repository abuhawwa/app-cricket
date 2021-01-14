export default {
  state: {
    activeBowler: {},
  },
  mutations: {
    ACTIVE_BOWLER(state, item) {
      state.activeBowler = item;
    },
  },
  actions: {},
  getters: {
    getActiveBowler: (state) => state.activeBowler,
  },
};
