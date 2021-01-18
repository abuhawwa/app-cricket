import * as firebase from "@/firebase";
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
      item.isActive = true;
      state.striker = item;
    },
    NON_STRIKER(state, item) {
      item.isActive = false;
      state.nonStriker = item;
    },
  },
  actions: {
    async toggleStriker({ rootGetters }) {
      const ings = rootGetters.innings;
      const matchId = ings.id;
      await firebase.matchesCollection
        .where("id", "==", parseInt(matchId))
        .get()
        .then(function(res) {
          res.forEach(function(doc) {
            firebase.matchesCollection.doc(doc.id).update(ings);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getBatters: (state) => state.batters,
    getStriker: (state) => state.striker,
    getNonStriker: (state) => state.nonStriker,
  },
};
