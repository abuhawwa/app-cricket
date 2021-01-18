<template>
  <div class="p-2">
    <Team
      :innings="innings.secondIngs"
      v-if="typeof innings.secondIngs !== 'undefined'"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
const Team = defineAsyncComponent(() => import("@/components/Team.vue"));
export default {
  name: "SecondIngs",
  components: {
    Team,
  },
  provide: {
    ings: "secondIngs",
  },
  computed: {
    ...mapGetters(["innings"]),
  },
  async created() {
    const ings = this.innings;
    if (typeof ings.secondIngs !== "undefined") return true;
    let payload = {};
    payload.id = this.$route.params.matchId;
    await this.$store.dispatch("fetchMatch", payload);
  },
};
</script>