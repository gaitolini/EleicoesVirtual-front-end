// Arquivo: src/main.js

import { createApp } from "vue"; // Para Vue 3
import App from "./App.vue";
import router from "./router"; // Importa o roteador atualizado

createApp(App).use(router).mount("#app");
