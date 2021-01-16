<template>
  <div class="newOver">
    <form id="modalForm" autocomplete="off" @submit.prevent="onOver">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="bowler"
          placeholder="Bowler Name"
          v-model="form.bowler"
        />
        <label for="bowler">New Bowler Name</label>
      </div>
      <div class="mb-3">
        <h5 class="text-center fw-bold">OR</h5>
      </div>
      <select
        class="form-select form-select-lg mb-3"
        v-model="form.existingBowler"
      >
        <option :value="{}" disabled selected>
          --Select Existing Bowler--
        </option>
        <option v-for="(bowler, index) in bowlers" :value="bowler" :key="index">
          {{ bowler.name }}
        </option>
      </select>
      <button type="submit" class="btn btn-success float-end">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NewOver",
  emits: ["over"],
  data() {
    return {
      form: {
        bowler: "",
        existingBowler: {},
      },
    };
  },
  computed: {
    ...mapGetters(["getActiveBowler", "getBowlers"]),
    bowlers() {
      let bowlers = this.getBowlers.filter((item) => {
        return item.id !== this.getActiveBowler.id;
      });
      return bowlers;
    },
  },
  methods: {
    onOver() {
      this.$emit("over", this.form);
      this.form.bowler = "";
      this.form.existingBowler = {};
    },
  },
};
</script>

<style>
</style>