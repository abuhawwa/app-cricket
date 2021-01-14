<template>
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
          <input
            name="bowler"
            type="radio"
            :id="bowler.id"
            :value="bowler"
            v-model="activeBowler"
          />
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
</template>

<script>
export default {
  name: "Bowler",
  props: {
    ingsBowlers: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    bowlers() {
      let bowlers = this.ingsBowlers.filter((item) => {
        return item.isActive;
      });
      return bowlers;
    },
    activeBowler() {
      return this.$store.getters.getActiveBowler;
    },
  },
  async created() {
    const bowler = this.bowlers;
    await this.$store.commit("ACTIVE_BOWLER", bowler[0]);
  },
};
</script>

<style>
</style>