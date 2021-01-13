<template>
  <div class="team">
    <h6>{{ innings.team }}</h6>
    <ul
      class="list-unstyled d-flex justify-content-between align-items-baseline"
    >
      <li>
        <h5 class="fw-bold">
          {{ score.runs }} - {{ score.wickets }}
          <small>&nbsp;({{ score.overs }}/{{ overLimit }})</small>
        </h5>
      </li>
      <li>
        <h6>Extras: {{ score.extras }}</h6>
      </li>
    </ul>
    <Batsman :ingsBatsmans="innings.batsmans" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
const Batsman = defineAsyncComponent(() => import("@/components/Batsman.vue"));

export default {
  name: "Team",
  props: {
    innings: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Batsman,
  },
  computed: {
    ...mapGetters(["score", "overLimit"]),
  },
};
</script>

<style>
</style>