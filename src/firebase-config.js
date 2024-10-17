// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurações do Firebase - Substitua com os dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBubRqySf26h_LaTJGfwZlDHVxJXFJTz9A",
  authDomain: "eleicoesvirtual.firebaseapp.com",
  projectId: "eleicoesvirtual",
  storageBucket: "eleicoesvirtual.appspot.com",
  messagingSenderId: "739485088609",
  appId: "SUA_APP_ID", // Para obter o appId, você pode verificar no console do Firebase
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar os serviços de autenticação e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Criar o GoogleAuthProvider para login com Google
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
