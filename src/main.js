import { createApp } from "vue"; // Para Vue 3
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "./components/LoginPage.vue";
import DashboardEleicoes from "./components/DashboardEleicoes.vue";
import CreateElection from "./components/CreateElection.vue";
import ListElections from "./components/ListElections.vue";
import EditElection from "./components/EditElection.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  {
    path: "/dashboard",
    component: DashboardEleicoes,
    meta: { requiresAuth: true },
  },
  { path: "/create", component: CreateElection, meta: { requiresAuth: true } },
  { path: "/list", component: ListElections, meta: { requiresAuth: true } },
  { path: "/edit/:id", component: EditElection, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Verificar a autenticação antes de cada rota
router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem("userToken");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

// Criar a instância do Vue usando `createApp` para Vue 3
createApp(App).use(router).mount("#app");
