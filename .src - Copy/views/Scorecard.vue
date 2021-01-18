<template>
  <div class="scorecard">
    <ul class="nav nav-tabs nav-justified">
      <li class="nav-item">
        <a
          href="#"
          :class="['nav-link', { active: tab === 'FirstIngs' }]"
          @click="tab = 'FirstIngs'"
          >1st Ings</a
        >
      </li>
      <li class="nav-item">
        <a
          href="#"
          :class="['nav-link', { active: tab === 'SecondIngs' }]"
          @click="tab = 'SecondIngs'"
          >2nd Ings</a
        >
      </li>
      <li class="nav-item">
        <a
          href="#"
          :class="['nav-link', { active: tab === 'Summary' }]"
          @click="tab = 'Summary'"
          >Summary</a
        >
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active">
        <keep-alive>
          <component :is="tabComponent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const FirstIngs = defineAsyncComponent(() =>
  import("@/components/FirstIngs.vue")
);
const SecondIngs = defineAsyncComponent(() =>
  import("@/components/SecondIngs.vue")
);
const Summary = defineAsyncComponent(() => import("@/components/Summary.vue"));

export default {
  name: "Scorecard",
  components: {
    FirstIngs,
    SecondIngs,
    Summary,
  },
  data() {
    return {
      tab: "FirstIngs",
    };
  },
  computed: {
    tabComponent() {
      return this.tab;
    },
  },
};
</script>

<style>
</style>