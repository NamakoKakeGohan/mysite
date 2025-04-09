import { createRouter, createWebHistory } from "vue-router";

import HomeView    from "../views/HomeView.vue";
import RecsView    from "../views/RecsView.vue";
import RankingView from "../views/RankingView.vue";
import AccountView from "../views/AccountView.vue";
import TagsView    from "../views/TagsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/Recs",
    name: "Recs",
    component: RecsView,
  },
  {
    path: "/Ranking",
    name: "Ranking",
    component: RankingView,
  },
  {
    path: "/Tags",
    name: "Tags",
    component: TagsView,
  },
  {
    path: "/Account",
    name: "Account",
    component: AccountView,
  },

  {
    path: "/Test",
    name: "Test",
    component: () => import("../views/TestView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
