// Arquivo: src/router/index.js

// Importações necessárias
import { createRouter, createWebHistory } from "vue-router";
import PreLogin from "@/components/PreLogin.vue";
import LoginPage from "@/components/LoginPage.vue";
import InscrevaSe from "@/components/InscrevaSe.vue";
import DashboardEleicoes from "@/components/DashboardEleicoes.vue";
import CreateElection from "@/components/CreateElection.vue";
import ListElections from "@/components/ListElections.vue";
import EditElection from "@/components/EditElection.vue";

// Configurando as rotas para as páginas
const routes = [
  { path: "/", name: "PreLogin", component: PreLogin },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/inscreva-se", name: "InscrevaSe", component: InscrevaSe },
  {
    path: "/dashboard",
    name: "DashboardEleicoes",
    component: DashboardEleicoes,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-election",
    name: "CreateElection",
    component: CreateElection,
    meta: { requiresAuth: true },
  },
  {
    path: "/list-elections",
    name: "ListElections",
    component: ListElections,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-election/:id",
    name: "EditElection",
    component: EditElection,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardas de rota para verificar autenticação
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem("userToken"); // Verifica se há um token no localStorage
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
