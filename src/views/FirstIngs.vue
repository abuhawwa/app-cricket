<template>
  <Nav />
  <div class="p-2">
    <Team
      :innings="innings.firstIngs"
      v-if="typeof innings.firstIngs !== 'undefined'"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
const Nav = defineAsyncComponent(() => import("@/components/Nav.vue"));
const Team = defineAsyncComponent(() => import("@/components/Team.vue"));
export default {
  name: "FirstIngs",
  components: {
    Nav,
    Team,
  },
  provide: {
    ings: "firstIngs",
  },
  computed: {
    ...mapGetters(["innings"]),
  },
  async created() {
    const ings = this.innings;
    if (typeof ings.firstIngs !== "undefined") return true;
    let payload = {};
    payload.id = this.$route.params.matchId;
    await this.$store.dispatch("fetchMatch", payload);
  },
};
</script>