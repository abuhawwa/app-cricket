<template>
  <div class="team">
    <h6>{{ innings.team }}</h6>
    <ul
      class="list-unstyled d-flex justify-content-between align-items-baseline"
    >
      <li>
        <h5 class="fw-bold">
          {{ innings.score.runs }} - {{ innings.score.wickets }}
          <small>&nbsp;({{ innings.score.overs }}/{{ overLimit }})</small>
        </h5>
      </li>
      <li>
        <h6>Extras: {{ innings.score.extras }}</h6>
      </li>
    </ul>
    <Batsman :ingsBatsmans="innings.batsmans" />
    <Bowler :ingsBowlers="innings.bowlers" />
    <FollowOver :data="innings.overs" />
    <ScorePanel v-if="!innings.isEnd" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
const Batsman = defineAsyncComponent(() => import("@/components/Batsman.vue"));
const Bowler = defineAsyncComponent(() => import("@/components/Bowler.vue"));
const FollowOver = defineAsyncComponent(() =>
  import("@/components/FollowOver.vue")
);
const ScorePanel = defineAsyncComponent(() =>
  import("@/components/ScorePanel.vue")
);
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
    Bowler,
    FollowOver,
    ScorePanel,
  },
  computed: {
    ...mapGetters(["overLimit"]),
  },
};
</script>

<style>
</style>