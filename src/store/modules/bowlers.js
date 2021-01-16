export default {
  state: {
    bowlers: [],
    activeBowler: {},
  },
  mutations: {
    BOWLERS(state, items) {
      state.bowlers = items;
      this.commit("ACTIVE_BOWLER");
    },
    ACTIVE_BOWLER(state) {
      let bowlers = state.bowlers;
      bowlers.filter((item) => {
        if (item.isActive) state.activeBowler = item;
      });
    },
  },
  actions: {},
  getters: {
    getBowlers: (state) => state.bowlers,
    getActiveBowler: (state) => state.activeBowler,
  },
};
