// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBubRqySf26h_LaTJGfwZlDHVxJXFJTz9A",
  authDomain: "eleicoesvirtual.firebaseapp.com",
  projectId: "eleicoesvirtual",
  storageBucket: "eleicoesvirtual.appspot.com",
  messagingSenderId: "739485088609",
  appId: "1:739485088609:web:d31f97dc972e62ba202320",
  measurementId: "G-TCY2FJ5J70",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
