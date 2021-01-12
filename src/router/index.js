import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/match",
    name: "Match",
    component: () => import("../views/Match.vue"),
  },
  {
    path: "/match/:matchId/play",
    name: "Play",
    component: () => import("../views/Play.vue"),
  },
  {
    path: "/match/:matchId/scorecard",
    name: "Scorecard",
    component: () => import("../views/Scorecard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
