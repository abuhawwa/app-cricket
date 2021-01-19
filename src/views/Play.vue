<template>
  <div class="card">
    <h5 class="card-header">Add Players</h5>
    <div class="card-body">
      <form autocomplete="off" @submit.prevent="onPlay">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="striker"
            placeholder="Striker Name"
            v-model.trim="striker"
          />
          <label for="batsmenOne">Striker Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="nonStriker"
            placeholder="Non Striker Name"
            v-model.trim="nonStriker"
          />
          <label for="nonStriker">Non Striker Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="bowler"
            placeholder="Bowler Name"
            v-model.trim="bowler"
          />
          <label for="bowler">Bowler Name</label>
        </div>
        <button type="submit" class="btn btn-success d-block ms-auto">
          Let's Play
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Play",
  data() {
    return {
      striker: "",
      nonStriker: "",
      bowler: "",
    };
  },
  computed: {
    ...mapGetters(["innings"]),
  },
  methods: {
    onPlay() {
      debugger;
      let innings = JSON.parse(JSON.stringify(this.innings));
      const batsmans = [
        { name: this.striker, isActive: true, id: 1 },
        { name: this.nonStriker, isActive: false, id: 2 },
      ];
      const bowlers = [{ name: this.bowler, isActive: true, id: 1 }];
      const ings = !innings.firstIngs.isEnd ? "firstIngs" : "secondIngs";
      innings[ings].batsmans = batsmans;
      innings[ings].bowlers = bowlers;
      innings[ings].score = {
        runs: 0,
        wickets: 0,
        extras: 0,
        overs: 0,
      };
      this.$store.dispatch("addIngsPlayers", innings);
    },
  },
  async created() {
    if (Object.keys(this.innings).length) return true;
    let payload = {};
    payload.id = this.$route.params.matchId;
    await this.$store.dispatch("fetchMatch", payload);
  },
};
</script>

<style>
</style>