import { createRouter, createWebHistory } from "vue-router";

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
    path: "/:id", // アカウント情報を表示するルート
    name: "Account",
    component: AccountView,
    props: true, // ルートパラメータをpropsとして渡す
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
