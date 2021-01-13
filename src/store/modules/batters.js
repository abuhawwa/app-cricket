export default {
  state: {
    batters: [],
    striker: {},
    nonStriker: {},
  },
  mutations: {
    BATTERS(state, items) {
      state.batters = items;
    },
    STRIKER(state, item) {
      debugger;
      item.isActive = true;
      state.striker = item;
      // this.dispatch("toggleBatsman", { item: item });
    },
    NON_STRIKER(state, item) {
      item.isActive = false;
      state.nonStriker = item;
    },
  },
  actions: {},
  getters: {
    getBatters: (state) => state.batters,
    getStriker: (state) => state.striker,
    getNonStriker: (state) => state.nonStriker,
  },
};
