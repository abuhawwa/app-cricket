<template>
  <table class="table text-center table-score table-bordered">
    <tbody>
      <tr class="bg-light">
        <td>
          <button type="button" class="btn w-100" @click="score(0)">0</button>
        </td>
        <td>
          <button type="button" class="btn w-100" @click="score(1)">1</button>
        </td>
        <td>
          <button type="button" class="btn w-100" @click="score(2)">2</button>
        </td>
        <td class="bg-success" rowspan="2" @click="onUndo">
          <button type="button" class="btn w-100 text-white">Undo</button>
        </td>
      </tr>
      <tr class="bg-light">
        <td>
          <button type="button" class="btn w-100" @click="score(3)">3</button>
        </td>
        <td>
          <button type="button" class="btn w-100" @click="score(4)">4</button>
        </td>
        <td>
          <button type="button" class="btn w-100" @click="score(6)">6</button>
        </td>
      </tr>
      <tr>
        <td class="bg-info">
          <button
            type="button"
            class="btn w-100 text-white"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            @click="currentModal = 'Extra'"
          >
            Extra
          </button>
        </td>
        <td class="bg-danger">
          <button
            type="button"
            class="btn w-100 text-white"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            @click="currentModal = 'Wicket'"
          >
            Out
          </button>
        </td>
        <td class="bg-primary">
          <button
            type="button"
            class="btn w-100 text-white"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            @click="currentModal = 'Over'"
          >
            Over
          </button>
        </td>
        <td class="bg-secondary">
          <button type="button" class="btn w-100 text-white">Ings End</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Modal } from "bootstrap";
import { mapGetters } from "vuex";
export default {
  name: "ScorePanel",
  inject: ["ings"],
  data() {
    return {
      currentModal: "",
      modal: null,
    };
  },
  computed: {
    ...mapGetters(["getStriker", "getNonStriker", "getActiveBowler"]),
  },
  methods: {
    score(run, type = "score") {
      let striker = this.getStriker;
      let nonStriker = this.getNonStriker;
      let bowler = this.getActiveBowler;
      const runs = ["extra", "wicket"].includes(type) ? 0 : run;
      const extra = type === "extra" ? run.split("-") : "";
      const bye = ["bye"].includes(extra[0]) ? parseInt(extra[1]) : 0;
      const legBye = ["legBye"].includes(extra[0]) ? parseInt(extra[1]) : 0;
      const wide = ["wide"].includes(extra[0]) ? parseInt(extra[1]) : 0;
      const noBall = ["noBall"].includes(extra[0]) ? parseInt(extra[1]) : 0;
      const noBallRunBatsman = ["noBallRun"].includes(extra[0])
        ? parseInt(extra[1] - 1)
        : 0;
      const noBallRunBowler = ["noBallRun"].includes(extra[0]) ? 1 : 0;
      const isExtra = ["wide", "noBall", "noBallRun"].includes(extra[0]);
      const isWicket = type == "wicket" ? true : false;
      const wicket = isWicket ? run : {};
      const ings = this.ings;
      let obj = {
        batsman: {},
        bowler: {},
        teamExtras: {},
      };
    },
  },
  mounted() {
    this.modal = new Modal(document.getElementById("modal"));
  },
};
</script>

<style>
</style>