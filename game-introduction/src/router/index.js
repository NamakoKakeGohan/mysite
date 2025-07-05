import { createRouter, createWebHashHistory } from "vue-router";

import HomeView       from "../views/HomeView.vue";
import AccountView    from "../views/AccountView.vue";
import RankingView    from "../views/RankingView.vue";
import TagsView       from "../views/TagsView.vue";
import TestView       from "../views/TestView.vue";
import TestResultView from "../views/TestResultView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
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
    path: "/Test",
    name: "Test",
    component: TestView,
  },
  {
    path: "/TestResult",
    name: "TestResult",
    component: TestResultView,
  },
  {
    path: "/user/:id",
    name: "Account",
    component: AccountView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
