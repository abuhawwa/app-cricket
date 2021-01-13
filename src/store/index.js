import { createStore } from "vuex";
import innings from "./modules/innings";
import batters from "./modules/batters";

export default createStore({
  modules: {
    innings,
    batters,
  },
  strict: process.env.NODE_ENV !== "production",
});
