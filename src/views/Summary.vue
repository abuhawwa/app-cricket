<template>
  <div class="summary">
    <button class="btn w-50" type="button" @click="onFirstIngs">
      1st Innings
    </button>
    <button class="btn w-50" type="button" @click="onSecondIngs">
      2nd Innings
    </button>
    <div v-if="ings">
      <table class="table">
        <thead>
          <tr>
            <th class="w-50">Batting</th>
            <th class="text-center">R</th>
            <th class="text-center">B</th>
            <th class="text-center">4s</th>
            <th class="text-center">6s</th>
            <th class="text-center">S/R</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(batsman, index) in batters" :key="index">
            <td>
              <label>{{ batsman.name }}</label>
            </td>
            <td class="text-center">{{ batsman.runs || 0 }}</td>
            <td class="text-center">{{ batsman.balls || 0 }}</td>
            <td class="text-center">{{ batsman.fours || 0 }}</td>
            <td class="text-center">{{ batsman.sixes || 0 }}</td>
            <td class="text-center">{{ $filters.strikeRate(batsman) }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th class="w-50">Bowling</th>
            <th class="text-center">O</th>
            <th class="text-center">M</th>
            <th class="text-center">R</th>
            <th class="text-center">W</th>
            <th class="text-center">Econ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bowler, index) in bowlers" :key="index">
            <td>
              <label :for="bowler.id">{{ bowler.name }}</label>
            </td>
            <td class="text-center">{{ bowler.overs || 0 }}</td>
            <td class="text-center">0</td>
            <td class="text-center">{{ bowler.runs || 0 }}</td>
            <td class="text-center">
              {{ bowler.wickets ? bowler.wickets.length : 0 }}
            </td>
            <td class="text-center">{{ $filters.economy(bowler) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Summary",
  data() {
    return {
      batters: [],
      bowlers: [],
      ings: "",
    };
  },
  computed: {
    ...mapGetters(["innings"]),
  },
  methods: {
    onFirstIngs() {
      const ings = this.innings.firstIngs;
      this.batters = ings.batsmans;
      this.bowlers = ings.bowlers;
      this.ings = "firstIngs";
    },
    onSecondIngs() {
      const ings = this.innings.secondIngs;
      this.batters = ings.batsmans;
      this.bowlers = ings.bowlers;
      this.ings = "secondIngs";
    },
  },
  async created() {
    const ings = this.innings;
    if (
      typeof ings.firstIngs !== "undefined" ||
      typeof ings.secondIngs !== "undefined"
    )
      return true;
    let payload = {};
    payload.id = this.$route.params.matchId;
    await this.$store.dispatch("fetchMatch", payload);
  },
};
</script>

<style>
</style>