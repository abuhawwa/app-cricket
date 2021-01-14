<template>
  <table class="table mb-0" v-if="balls.length">
    <thead>
      <tr>
        <th class="w-50" :colspan="0">This Over</th>
      </tr>
    </thead>
    <tbody>
      <tr class="d-flex">
        <td v-for="(ball, index) in balls" :key="index">
          {{ ball }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Over",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    balls() {
      let overs = [];
      let lastOver = [];
      let balls = [];
      overs = JSON.parse(JSON.stringify(this.data));
      if (!overs.length) return balls;
      lastOver = overs[overs.length - 1].over;
      lastOver.forEach((item) => {
        item.balls.forEach((ball) => {
          balls.push(ball.bowler);
        });
      });
      return balls;
    },
  },
};
</script>

<style>
</style>