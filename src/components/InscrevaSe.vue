<template>
  <div class="signup-container">
    <h1>Inscreva-se</h1>
    <form @submit.prevent="signupWithEmail">
      <input type="text" v-model="cpf" placeholder="Digite seu CPF" required />
      <input
        type="email"
        v-model="email"
        placeholder="Digite seu Email"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Crie uma Senha"
        required
      />
      <button type="submit" class="btn btn-signup">Cadastrar</button>
    </form>
    <p>
      Já tem uma conta?
      <span @click="goToLogin" class="login-link">Faça Login</span>
    </p>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "InscrevaSe",
  data() {
    return {
      cpf: "",
      email: this.$route.query.email || "",
      password: "",
    };
  },
  methods: {
    validateCpf(cpf) {
      return cpf.length === 11;
    },
    async signupWithEmail() {
      if (!this.validateCpf(this.cpf)) {
        alert("CPF inválido. Certifique-se de que contém 11 dígitos.");
        return;
      }

      try {
        // Verificar se o email já está registrado com qualquer provedor
        const signInMethods = await fetchSignInMethodsForEmail(
          auth,
          this.email
        );

        if (signInMethods.length > 0) {
          // Se já houver métodos de login registrados com este e-mail
          if (signInMethods.includes("password")) {
            // Se o e-mail já está registrado com e-mail e senha
            alert("Este email já está registrado. Por favor, faça login.");
            return;
          } else {
            // Se o e-mail já está registrado com outro provedor (ex: Google)
            alert(
              "Este email já está registrado com um provedor de identidade. Clique aqui para definir uma senha para o email."
            );
            return;
          }
        }

        // Caso o e-mail não esteja registrado, continuar com o registro
        const result = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        // Salvar os dados do usuário no Firestore
        await setDoc(doc(db, "users", this.cpf), {
          email: this.email,
          cpf: this.cpf,
        });

        // Redirecionar para o dashboard após o registro
        const token = await result.user.getIdToken();
        localStorage.setItem("userToken", token);
        this.$router.push("/dashboard");
      } catch (error) {
        alert("Erro ao se cadastrar: " + error.message);
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0d1117;
  color: #c9d1d9;
}

form {
  background-color: #161b22;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 360px;
}

input {
  width: 100%;
  padding: 15px;
  margin: 0.5rem 0;
  border: 1px solid #30363d;
  border-radius: 6px;
  background-color: #0d1117;
  color: #c9d1d9;
}

.btn-signup {
  width: 100%;
  padding: 15px;
  margin-top: 1rem;
  background-color: #8250df;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-signup:hover {
  background-color: #6639b7;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #f0f6fc;
}

.login-link {
  color: #58a6ff;
  cursor: pointer;
  text-decoration: underline;
}

.separator {
  margin: 1.5rem 0;
  font-size: 0.875rem;
  color: #888;
}
</style>
