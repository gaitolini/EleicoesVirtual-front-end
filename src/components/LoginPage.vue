/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="login-container">
    <h1>Eleições Virtuais</h1>
    <div class="login-box">
      <button @click="loginWithGoogle" class="btn btn-google">
        Login com Google
      </button>
      <form @submit.prevent="loginWithEmail">
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Senha"
          required
        />
        <button type="submit" class="btn btn-email">Login com Email</button>
      </form>
      <p @click="showSignup = !showSignup">Não tem conta? Inscreva-se</p>
      <form v-if="showSignup" @submit.prevent="signupWithEmail">
        <input
          type="email"
          v-model="newEmail"
          placeholder="Novo Email"
          required
        />
        <input
          type="password"
          v-model="newPassword"
          placeholder="Nova Senha"
          required
        />
        <button type="submit" class="btn btn-email">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase-config"; // O auth é importado do arquivo firebase-config

// Inicializando o Google Provider de forma correta
const googleProvider = new GoogleAuthProvider();

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      newEmail: "",
      newPassword: "",
      showSignup: false,
    };
  },
  methods: {
    async loginWithGoogle() {
      try {
        // Correção para Firebase v9 modular
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken(); // Obtém o token JWT
        localStorage.setItem("userToken", token); // Armazena o token no localStorage
        this.$router.push("/dashboard"); // Redireciona para o dashboard
      } catch (error) {
        alert("Erro ao fazer login com Google: " + error.message);
      }
    },
    async loginWithEmail() {
      try {
        // Correção para Firebase v9 modular
        const result = await signInWithEmailAndPassword(auth, this.email, this.password);
        const token = await result.user.getIdToken(); // Obtém o token JWT
        localStorage.setItem("userToken", token); // Armazena o token no localStorage
        this.$router.push("/dashboard"); // Redireciona para o dashboard
      } catch (error) {
        alert("Erro ao fazer login: " + error.message);
      }
    },
    async signupWithEmail() {
      try {
        // Correção para Firebase v9 modular
        const result = await createUserWithEmailAndPassword(auth, this.newEmail, this.newPassword);
        const token = await result.user.getIdToken(); // Obtém o token JWT após o cadastro
        localStorage.setItem("userToken", token); // Armazena o token no localStorage
        this.$router.push("/dashboard"); // Redireciona para o dashboard
      } catch (error) {
        alert("Erro ao se cadastrar: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  margin: 1rem 0;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-google {
  background-color: #db4437;
}

.btn-email {
  background-color: #4285f4;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}
</style>
