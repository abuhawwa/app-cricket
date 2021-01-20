<template>
  <div class="previous">
    <div class="row" v-if="items.length">
      <div
        class="col-6 mb-2"
        v-for="(item, index) in items.slice().reverse()"
        :key="index"
      >
        <router-link
          :to="{ name: 'Summary', params: { matchId: item.id } }"
          class="shadow d-block bg-light rounded-5 p-2"
        >
          <div class="row">
            <div class="col-12 text-center border-bottom mb-2 text-dark">
              {{ day(item.id) }}
            </div>
            <div class="col-6">
              <ul
                :class="[
                  'list-inline text-center',
                  !item.firstIngs.isWon ? 'text-muted' : 'text-dark',
                ]"
              >
                <li>
                  {{ item.firstIngs.team }}
                </li>
                <li>
                  {{ item.firstIngs.score?.runs }}-{{
                    item.firstIngs.score?.wickets
                  }}
                </li>
              </ul>
            </div>
            <div class="col-6">
              <ul
                :class="[
                  'list-inline text-center',
                  !item.secondIngs.isWon ? 'text-muted' : 'text-dark',
                ]"
              >
                <li>
                  {{ item.secondIngs.team }}
                </li>
                <li>
                  {{ item.secondIngs.score?.runs }}-{{
                    item.secondIngs.score?.wickets
                  }}
                </li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row" v-if="!items.length && !isLoader">
      <div class="col-12">
        <div class="alert alert-danger text-center my-5" role="alert">
          No matches found!
          <router-link to="/" class="btn btn-link">Home</router-link>
        </div>
      </div>
    </div>
    <div v-if="isLoader">loading...</div>
  </div>
</template>


<script>
import * as firebase from "@/firebase";
export default {
  name: "Previous",
  data() {
    return {
      items: [],
      isLoader: true,
    };
  },
  methods: {
    day(id) {
      return new Date(id).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  async created() {
    await firebase.matchesCollection
      .get()
      .then((res) => {
        this.isLoader = false;
        res.forEach((item) => {
          debugger;
          this.items.push(item.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>