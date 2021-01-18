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
          <button type="button" class="btn w-100 text-white" @click="onIngsEnd">
            Ings End
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Modal -->
  <div
    class="modal fade"
    id="modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            {{
              currentModal === "Extra"
                ? "Innings Extra"
                : currentModal === "Wicket"
                ? "Innings Wicket"
                : "Innings Bowler"
            }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Extra v-if="currentModal === 'Extra'" @extra="onExtra" />
          <Wicket v-if="currentModal === 'Wicket'" @out="onOut" />
          <NewOver v-if="currentModal === 'Over'" @over="onOver" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
const Extra = defineAsyncComponent(() => import("@/components/Extra.vue"));
const Wicket = defineAsyncComponent(() => import("@/components/Wicket.vue"));
const NewOver = defineAsyncComponent(() => import("@/components/NewOver.vue"));
export default {
  name: "ScorePanel",
  inject: ["ings"],
  data() {
    return {
      currentModal: "",
      modal: null,
    };
  },
  components: {
    Extra,
    Wicket,
    NewOver,
  },
  computed: {
    ...mapGetters(["getStriker", "getNonStriker", "getActiveBowler"]),
  },
  methods: {
    onExtra(extra) {
      this.modal.hide();
      document.getElementById("modalForm").reset();
      this.score(extra, "extra");
    },
    onOut(wicket) {
      this.modal.hide();
      this.score(wicket, "wicket");
    },
    onOver(item) {
      this.modal.hide();
      const ings = this.ings;
      this.toggleBatters(0, true, this.getStriker, this.getNonStriker);
      this.$store.dispatch("toggleBowler", { ings, item });
    },
    onUndo() {
      const ings = this.ings;
      this.toggleBatters(1, false, this.getStriker, this.getNonStriker);
      this.$store.commit("UNDO_INGS", ings);
    },
    onIngsEnd() {
      const ings = this.ings;
      this.$store.commit("INGS_END", ings);
    },
    score(val, type = "score") {
      let striker = this.getStriker;
      let nonStriker = this.getNonStriker;
      let bowler = this.getActiveBowler;
      const runs = ["extra", "wicket"].includes(type) ? 0 : val;
      const extra = type === "extra" ? val.split("-") : "";
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
      const wicket = isWicket ? val : {};
      const ings = this.ings;
      let obj = {
        batsman: {
          striker: {
            name: striker.name,
            id: striker.id,
            runs: runs || noBallRunBatsman,
            ball: wide ? 0 : 1,
            four: runs === 4 ? 1 : 0,
            six: runs === 6 ? 1 : 0,
            isOut: isWicket
              ? wicket.batter.id === striker.id
                ? true
                : false
              : false,
          },
          nonStriker: {
            name: nonStriker.name,
            id: nonStriker.id,
            isOut: isWicket
              ? wicket.batter.id === nonStriker.id
                ? true
                : false
              : false,
          },
        },
        bowler: {
          name: bowler.name,
          id: bowler.id,
          ball: isExtra ? 0 : 1,
          runs: runs || noBallRunBatsman,
          wicket: isWicket
            ? wicket.dismissalType && wicket.dismissalType !== "run out"
              ? 1
              : 0
            : 0,
          dismissal_type: isWicket ? wicket.dismissalType : "",
          extras: {
            wide: wide,
            noBall: noBall || noBallRunBowler,
          },
          isExtra: isExtra,
        },
        teamExtras: {
          byes: bye,
          legByes: legBye,
        },
      };
      const switchByRun = runs || bye || legBye || noBallRunBatsman;
      this.toggleBatters(switchByRun, false, striker, nonStriker);
      this.$store.commit("ADD_SCORE_TO_INNINGS", { ings, obj, wicket });
    },
    toggleBatters(val, isOVer, striker, nonStriker) {
      if (val === 1 || val === 3 || isOVer) {
        this.$store.commit("STRIKER", nonStriker);
        this.$store.commit("NON_STRIKER", striker);
      }
    },
  },
  mounted() {
    this.modal = new Modal(document.getElementById("modal"), {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>

<style>
</style>