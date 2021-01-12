<template>
  <div class="match">
    <div class="card">
      <h5 class="card-header clearfix">
        New Match
        <a href="#" class="btn btn-outline-info btn-sm float-end">Home</a>
      </h5>
      <div class="card-body">
        <form autocomplete="off" @submit.prevent="onMatch">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="battingTeam"
              placeholder="Batting Team Name"
              v-model.trim="firstIngsTeam"
              required
            />
            <label for="battingTeam">Batting Team Name</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="bowlingTeam"
              placeholder="Bowling Team Name"
              v-model.trim="secondIngsTeam"
              required
            />
            <label for="bowlingTeam">Bowling Team Name</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              id="overs"
              placeholder="Overs"
              v-model.number="overs"
              required
              min="1"
            />
            <label for="overs">Overs</label>
          </div>
          <button type="submit" class="btn btn-success d-block ms-auto">
            Start Match
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Match",
  data() {
    return {
      firstIngsTeam: "",
      secondIngsTeam: "",
      overs: null,
    };
  },
  methods: {
    onMatch() {
      let ings = {
        id: Date.now(),
        overs: null,
        firstIngs: {
          team: "",
          isEnd: 0,
          isWon: false,
        },
        secondIngs: {
          team: "",
          isEnd: 0,
          isWon: false,
        },
      };
      ings.overs = this.overs;
      ings.firstIngs.team = this.firstIngsTeam;
      ings.secondIngs.team = this.secondIngsTeam;
      this.$store.dispatch("addMatch", ings);
    },
  },
};
</script>

<style>
</style>