// Arquivo: src/main.js

import { createApp } from "vue"; // Para Vue 3
import App from "./App.vue";
import router from "./router"; // Importa o roteador atualizado
import { auth } from "./firebase-config"; // Certifique-se de que o Firebase está corretamente configurado

// Inicializa o app Vue
createApp(App).use(router).mount("#app");

// Adiciona um listener de autenticação (se necessário)
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Usuário autenticado:", user.email);
  } else {
    console.log("Nenhum usuário autenticado.");
  }
});
