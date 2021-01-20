import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/previous",
    name: "Previous",
    component: () => import("../views/Previous.vue"),
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
    path: "/match/:matchId/firstIngs",
    name: "FirstIngs",
    component: () => import("../views/FirstIngs.vue"),
  },
  {
    path: "/match/:matchId/secondIngs",
    name: "SecondIngs",
    component: () => import("../views/SecondIngs.vue"),
  },
  {
    path: "/match/:matchId/summary",
    name: "Summary",
    component: () => import("../views/Summary.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
