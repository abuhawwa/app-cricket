import * as firebase from "@/firebase";
export default {
  state: () => ({
    bowlers: [],
    activeBowler: {},
  }),
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
  actions: {
    async toggleBowler({ rootGetters }, { ings, item }) {
      debugger;
      let innings = JSON.parse(JSON.stringify(rootGetters.innings[ings]));
      if (!innings.overs) return false;
      let bowlers = innings.bowlers;
      bowlers.forEach((item) => {
        item.isActive = false;
      });
      let bowler = {};
      if (item.bowler) {
        bowler = {
          name: item.bowler,
          id: bowlers.length + 1,
          isActive: true,
        };
        bowlers.push(bowler);
      } else {
        bowlers.filter((bowler) => {
          if (bowler.id === item.existingBowler.id) bowler.isActive = true;
        });
      }
      innings.overs.push({ over: [{ balls: [] }] });
      await firebase.matchesCollection
        .where("id", "==", parseInt(innings.id))
        .get()
        .then(function(res) {
          res.forEach(function(doc) {
            firebase.matchesCollection.doc(doc.id).update(innings);
          });
        });
    },
  },
  getters: {
    getBowlers: (state) => state.bowlers,
    getActiveBowler: (state) => state.activeBowler,
  },
};
