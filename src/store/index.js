import { createStore } from "vuex";
import innings from "./modules/innings";

export default createStore({
  modules: {
    innings,
  },
  strict: process.env.NODE_ENV !== "production",
});
