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
    async toggleBowler({ commit, rootGetters }, { ings, item }) {
      let innings = JSON.parse(JSON.stringify(rootGetters.innings));
      if (!innings[ings].overs) return false;
      let bowlers = innings[ings].bowlers;
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
      innings[ings].overs.push({ over: [{ balls: [] }] });
      commit("INNINGS", innings);
      await firebase.matchesCollection
        .where("id", "==", parseInt(innings.id))
        .get()
        .then(function(res) {
          res.forEach(function(doc) {
            firebase.matchesCollection.doc(doc.id).update(innings);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getBowlers: (state) => state.bowlers,
    getActiveBowler: (state) => state.activeBowler,
  },
};
