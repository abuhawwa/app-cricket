import * as firebase from "@/firebase";
import router from "@/router";

export default {
  state: {
    innings: [],
    score: {
      runs: 0,
      wickets: 0,
      extras: 0,
      overs: 0,
    },
  },
  mutations: {
    INNINGS(state, innings) {
      state.innings = innings;
    },
    SWITCH_BOWLER(state, { ings, item }) {
      let bowlers = state.innings[ings].bowlers;
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
      state.innings[ings].overs.push({ over: [{ balls: [] }] });
      this.dispatch("toggleBowler");
    },
    UNDO_INGS(state, ings) {
      const overs = state.innings[ings].overs;
      const lastOver = overs[overs.length - 1].over;
      lastOver.forEach((item) => {
        const lastItem = item.balls.length - 1;
        item.balls.forEach((ball, index) => {
          if (index === lastItem) item.balls.splice(lastItem, 1);
        });
      });
      this.dispatch("updateIngs", ings);
    },
    ADD_SCORE_TO_INNINGS(state, { ings, obj }) {
      if (!state.innings[ings].overs) {
        state.innings[ings].overs = [];
        state.innings[ings].overs.push({ over: [{ balls: [obj] }] });
      } else {
        const overs = state.innings[ings].overs;
        const lastindex = overs.length - 1;
        overs.forEach((item, index) => {
          if (lastindex === index) {
            item.over.forEach((over) => {
              over.balls.push(obj);
            });
          }
        });
      }
      this.dispatch("updateIngs", ings);
    },
    INDIVIDUAL_BATSMAN_SCORE(state, ings) {
      let batters = state.innings[ings].batsmans;
      let overs = state.innings[ings].overs;
      if (!overs) return false;
      batters.forEach((batsman) => {
        let runs = 0;
        let balls = 0;
        let fours = 0;
        let sixes = 0;
        overs.forEach((item) => {
          item.over.forEach((over) => {
            if (!over.balls.length) {
              batsman.runs = runs;
              batsman.balls = balls;
              batsman.fours = fours;
              batsman.sixes = sixes;
              batsman.isOut = false;
              return true;
            }
            over.balls.forEach((ball) => {
              if (batsman.id === ball.batsman.striker.id) {
                runs += ball.batsman.striker.runs;
                balls += ball.batsman.striker.ball;
                fours += ball.batsman.striker.four;
                sixes += ball.batsman.striker.six;
                batsman.isOut = ball.batsman.striker.isOut;
                batsman.runs = runs;
                batsman.balls = balls;
                batsman.fours = fours;
                batsman.sixes = sixes;
              }
              if (batsman.id === ball.batsman.nonStriker.id)
                batsman.isOut = ball.batsman.nonStriker.isOut;
            });
          });
        });
      });
    },
    INDIVIDUAL_BOWLER_SCORE(state, ings) {
      let bowlers = state.innings[ings].bowlers;
      let overs = state.innings[ings].overs;
      if (!overs) return false;
      bowlers.forEach((bowler) => {
        let runs = 0;
        let balls = 0;
        let wides = 0;
        let noBalls = 0;
        let wickets = [];
        overs.forEach((item) => {
          item.over.forEach((over) => {
            if (!over.balls.length) {
              bowler.runs = runs;
              bowler.balls = balls;
              bowler.wides = wides;
              bowler.noBalls = noBalls;
              bowler.wickets = wickets;
              bowler.overs = 0;
              return true;
            }
            over.balls.forEach((ball) => {
              if (bowler.id === ball.bowler.id) {
                runs += ball.bowler.runs;
                runs += ball.bowler.extras.wide;
                runs += ball.bowler.extras.noBall;
                balls += ball.bowler.ball;
                wides += ball.bowler.extras.wide;
                noBalls += ball.bowler.extras.noBall;
                if (ball.bowler.wicket)
                  wickets.push({
                    wicket: ball.bowler.wicket,
                    dismissal_type: ball.bowler.dismissal_type,
                  });
                bowler.runs = runs;
                bowler.balls = balls;
                bowler.wides = wides;
                bowler.noBalls = noBalls;
                bowler.wickets = wickets;
                bowler.overs = Number.isInteger(balls / 6)
                  ? balls / 6
                  : parseFloat(parseInt(balls / 6) + "." + (balls % 6));
              }
            });
          });
        });
      });
    },
    TEAM_SCORE(state, ings) {
      let overs = state.innings[ings].overs;
      if (!overs) return false;
      let score = state.score;
      let runs = 0;
      let balls = 0;
      let extras = 0;
      let wickets = 0;
      overs.forEach((item) => {
        item.over.forEach((over) => {
          over.balls.forEach((ball) => {
            runs += ball.bowler.runs;
            runs += ball.bowler.extras.wide;
            runs += ball.bowler.extras.noBall;
            runs += ball.teamExtras.byes;
            runs += ball.teamExtras.legByes;
            balls += ball.bowler.ball;
            extras += ball.bowler.extras.wide;
            extras += ball.bowler.extras.noBall;
            extras += ball.teamExtras.byes;
            extras += ball.teamExtras.legByes;
            if (ball.bowler.dismissal_type) wickets += 1;
            score.runs = runs;
            score.extras = extras;
            score.wickets = wickets;
            score.overs = Number.isInteger(balls / 6)
              ? balls / 6
              : parseFloat(parseInt(balls / 6) + "." + (balls % 6));
          });
        });
      });
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
        .then(function(res) {
          res.forEach(function(doc) {
            firebase.matchesCollection.doc(doc.id).update(match);
          });
          dispatch("fetchMatch", match);
          router.push({ name: "Scorecard", params: { match: match.id } });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async toggleBowler({ state }) {
      const innings = state.innings;
      await firebase.matchesCollection
        .where("id", "==", parseInt(innings.id))
        .get()
        .then(function(res) {
          res.forEach(function(doc) {
            firebase.matchesCollection.doc(doc.id).update(innings);
          });
        });
    },
    async updateIngs({ state, commit }, ings) {
      commit("INDIVIDUAL_BATSMAN_SCORE", ings);
      commit("INDIVIDUAL_BOWLER_SCORE", ings);
      commit("TEAM_SCORE", ings);
      const innings = state.innings;
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
    innings: (state) => state.innings,
    score: (state) => state.score,
    overLimit: (state) => state.innings.overs,
  },
};
