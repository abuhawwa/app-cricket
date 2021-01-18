<template>
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
          <input
            name="batsman"
            type="radio"
            :id="batsman.id"
            :value="batsman"
            v-model="activeStriker"
          />
          <label :for="batsman.id">{{ batsman.name }}</label>
        </td>
        <td class="text-center">{{ batsman.runs || 0 }}</td>
        <td class="text-center">{{ batsman.balls || 0 }}</td>
        <td class="text-center">{{ batsman.fours || 0 }}</td>
        <td class="text-center">{{ batsman.sixes || 0 }}</td>
        <td class="text-center">{{ $filters.strikeRate(batsman) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Batsman",
  props: {
    ingsBatsmans: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    batters() {
      let batters = this.ingsBatsmans.filter((item) => {
        return !item.isOut;
      });
      return batters;
    },
    activeStriker: {
      get() {
        return this.$store.getters.getStriker;
      },
      set(newVal) {
        let striker = newVal;
        let nonStriker = this.batters.filter((item) => {
          return item.id !== striker.id;
        });
        this.$store.commit("STRIKER", striker);
        this.$store.commit("NON_STRIKER", nonStriker[0]);
        this.$store.dispatch("toggleStriker");
      },
    },
  },
  async created() {
    const batters = this.batters;
    const striker = batters.filter((item) => {
      return item.isActive;
    });
    const nonStriker = batters.filter((item) => {
      return !item.isActive;
    });
    await this.$store.commit("BATTERS", batters);
    await this.$store.commit("STRIKER", striker[0]);
    await this.$store.commit("NON_STRIKER", nonStriker[0]);
  },
};
</script>

<style>
</style>