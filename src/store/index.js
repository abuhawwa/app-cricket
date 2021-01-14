import { createStore } from "vuex";
import innings from "./modules/innings";
import batters from "./modules/batters";
import bowlers from "./modules/bowlers";

export default createStore({
  modules: {
    innings,
    batters,
    bowlers,
  },
  strict: process.env.NODE_ENV !== "production",
});
