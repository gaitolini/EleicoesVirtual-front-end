import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import CreateElection from "../components/CreateElection.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/create-election",
    name: "CreateElection",
    component: CreateElection,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/"]; // Definir as páginas públicas (como a de login)
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userToken");

  if (authRequired && !loggedIn) {
    // Se a rota exige autenticação e o usuário não está logado, redirecione para a página de login
    return next("/");
  }

  next();
});

export default router;
