// Arquivo: src/components/LoginPage.vue

<template>
  <div class="login-container">
    <div class="login-box">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" class="logo" />
      <h1>Entrar no Eleições Virtuais</h1>
      <form @submit.prevent="loginWithEmail">
        <div class="form-group">
          <label for="email">Nome de usuário ou endereço de e-mail</label>
          <input type="email" id="email" v-model="email" placeholder="Digite seu email" required />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
          <a href="#" class="forgot-password">Esqueceu sua senha?</a>
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
      <div class="separator">ou</div>
      <button @click="googleLogin" class="btn btn-google">Login com Google</button>
      <div class="signup-link">
        Novo no Eleições Virtuais? <span @click="goToSignup" class="link">Crie uma conta</span>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async googleLogin() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        localStorage.setItem('userToken', token);
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Erro ao fazer login com Google: ' + error.message);
      }
    },
    async loginWithEmail() {
      try {
        const result = await signInWithEmailAndPassword(auth, this.email, this.password);
        const token = await result.user.getIdToken();
        localStorage.setItem('userToken', token);
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
      }
    },
    goToSignup() {
      this.$router.push('/inscreva-se');
    }
  }
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
  background-color: #24292e;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 360px;
  color: white;
}

.logo {
  width: 50px;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f6f8fa;
}

.forgot-password {
  font-size: 0.875rem;
  color: #0366d6;
  text-decoration: none;
  float: right;
  margin-top: 0.5rem;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #2ea44f;
  color: white;
}

.btn-google {
  background-color: #db4437;
  color: white;
  margin-top: 1rem;
}

.separator {
  margin: 1.5rem 0;
  font-size: 0.875rem;
  color: #888;
}

.signup-link {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #f6f8fa;
}

.link {
  color: #58a6ff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
