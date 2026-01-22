import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("@/pages/HomePage.vue");
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    alias: "/",
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
});
export default router;
