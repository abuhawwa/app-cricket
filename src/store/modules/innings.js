import * as firebase from "@/firebase";
import router from "@/router";

export default {
  state: {
    innings: [],
  },
  mutations: {
    INNINGS(state, innings) {
      state.innings = innings;
    },
  },
  actions: {
    async addMatch({ dispatch }, match) {
      await firebase.matchesCollection
        .add(match)
        .then(() => {
          dispatch("fetchMatch", match);
          router.push({ name: "Play", params: { matchId: match.id } });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchMatch({ commit }, match) {
      await firebase.matchesCollection
        .where("id", "==", parseInt(match.id))
        .get()
        .then((res) => {
          res.forEach((item) => {
            commit("INNINGS", item.data());
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addIngsPlayers({ dispatch }, match) {
      await firebase.matchesCollection
        .where("id", "==", parseInt(match.id))
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            firebase.matchesCollection.doc(doc.id).update(match);
          });
          dispatch("fetchMatch", match);
          router.push({ name: "Scorecard", params: { match: match.id } });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    innings: (state) => state.innings,
  },
};
