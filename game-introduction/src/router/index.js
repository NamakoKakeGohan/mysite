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
    name: "home",
    component: HomeView,
  },
  {
    path: "/ranking",
    name: "ranking",
    component: RankingView,
  },
  {
    path: "/tags",
    name: "tags",
    component: TagsView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
  {
    path: "/testResult",
    name: "testResult",
    component: TestResultView,
  },
  {
    path: "/user/:id",
    name: "account",
    component: AccountView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
