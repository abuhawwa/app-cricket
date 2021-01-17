<template>
  <div class="wicket">
    <form id="modalForm" autocomplete="off" @submit.prevent="onWicket">
      <div class="mb-3">
        <label for="batter" class="form-label">Batter out</label>
        <select class="form-select" id="batter" v-model="form.batter">
          <option disabled selected value="">--Select--</option>
          <option
            v-for="(batsman, index) in batsmans"
            :key="index"
            :value="batsman"
          >
            {{ batsman.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dt" class="form-label">Dismissal Type</label>
        <select class="form-select" id="dt" v-model="form.dismissalType">
          <option disabled selected value="">--Select--</option>
          <option value="caught">Caught</option>
          <option value="lbw">LBW</option>
          <option value="bowled">Bowled</option>
          <option value="stumped">Stumped</option>
          <option value="run out">Run out</option>
          <option value="hit wicket">Hit wicket</option>
          <option value="retired">Retired</option>
        </select>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="bowler"
          placeholder="Bowler Name"
          v-model="form.newBatsman"
        />
        <label for="bowler">New Batsman Name</label>
      </div>
      <button type="submit" class="btn btn-success float-end">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Wicket",
  emits: ["out"],
  data() {
    return {
      form: {
        batter: "",
        dismissalType: "",
        newBatsman: "",
      },
    };
  },
  computed: {
    batsmans() {
      return this.$store.getters.getBatters;
    },
  },
  methods: {
    onWicket() {
      this.$emit("out", this.form);
      this.form.batter = "";
      this.form.dismissalType = {};
      this.form.newBatsman = "";
    },
  },
};
</script>

<style>
</style>