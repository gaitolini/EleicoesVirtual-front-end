// firebase-config.js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SUA_AUTH_DOMAIN",
  projectId: "project-739485088609",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

// Inicializar Firebase (evitar reinicializar se já estiver inicializado)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
