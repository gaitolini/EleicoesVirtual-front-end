<template>
    <div class="signup-container">
      <h1>Inscreva-se</h1>
      <form @submit.prevent="signupWithEmail">
        <input type="text" v-model="cpf" placeholder="Digite seu CPF" required />
        <input type="email" v-model="email" placeholder="Digite seu Email" required />
        <input type="password" v-model="password" placeholder="Crie uma Senha" required />
        <button type="submit" class="btn btn-signup">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <span @click="goToLogin" class="login-link">Faça Login</span></p>
    </div>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth, db } from '../firebase-config';
  import { doc, setDoc } from 'firebase/firestore';
  
  export default {
    name: 'InscrevaSe',
    data() {
      return {
        cpf: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async signupWithEmail() {
        if (this.cpf.length !== 11) {
          alert('CPF inválido. Certifique-se de que contém 11 dígitos.');
          return;
        }
        try {
          // Registrar o usuário com email e senha
          const result = await createUserWithEmailAndPassword(auth, this.email, this.password);
          // Salvar os dados do usuário no Firestore
          await setDoc(doc(db, 'users', this.cpf), {
            email: this.email,
            cpf: this.cpf
          });
          // Redirecionar para o dashboard após o registro
          const token = await result.user.getIdToken();
          localStorage.setItem('userToken', token);
          this.$router.push('/dashboard');
        } catch (error) {
          alert('Erro ao se cadastrar: ' + error.message);
        }
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  form {
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
  
  .btn-signup {
    width: 100%;
    padding: 10px;
    margin: 1rem 0;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .login-link {
    color: #4285f4;
    cursor: pointer;
  }
  </style>
  