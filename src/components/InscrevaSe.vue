<template>
    <div class="signup-container">
      <h1>Inscreva-se</h1>
      <form @submit.prevent="signupWithEmail">
        <input type="text" v-model="cpf" placeholder="Digite seu CPF" required />
        <input type="email" v-model="email" placeholder="Digite seu Email" required />
        <input type="password" v-model="password" placeholder="Crie uma Senha" required />
        <button type="submit" class="btn btn-signup">Cadastrar</button>
      </form>
      <div class="separator">ou</div>
      <button @click="signupWithGoogle" class="btn btn-google">Inscreva-se com Google</button>
      <p>Já tem uma conta? <span @click="goToLogin" class="login-link">Faça Login</span></p>
    </div>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
  import { auth, googleProvider, db } from '../firebase-config';
  import { doc, setDoc, getDoc } from 'firebase/firestore';
  
  export default {
    name: 'InscrevaSe',
    data() {
      return {
        cpf: '',
        email: this.$route.query.email || '',
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
          // Verificar se o CPF já está registrado no Firestore
          const userDoc = await getDoc(doc(db, 'users', this.cpf));
          if (userDoc.exists() && userDoc.data().email !== this.email) {
            alert('CPF já registrado com um email diferente. Por favor, verifique suas informações.');
            return;
          }
          // Registrar o usuário com email e senha ou vincular a um usuário existente
          const result = await createUserWithEmailAndPassword(auth, this.email, this.password).catch(async (error) => {
            if (error.code === 'auth/email-already-in-use') {
              const credential = EmailAuthProvider.credential(this.email, this.password);
              const existingUser = auth.currentUser;
              if (existingUser) {
                await linkWithCredential(existingUser, credential);
                return existingUser;
              }
              throw error;
            } else {
              throw error;
            }
          });
          // Enviar email de verificação
          await sendEmailVerification(result.user);
          alert('Email de verificação enviado. Por favor, verifique seu email para completar o cadastro.');
          // Salvar os dados do usuário no Firestore
          await setDoc(doc(db, 'users', this.cpf), {
            email: this.email,
            cpf: this.cpf
          });
        } catch (error) {
          alert('Erro ao se cadastrar: ' + error.message);
        }
      },
      async signupWithGoogle() {
        if (this.cpf.length !== 11) {
          alert('CPF inválido. Certifique-se de que contém 11 dígitos.');
          return;
        }
        try {
          // Fazer login com o Google
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          // Verificar se já existe um registro com o CPF no Firestore
          const userDoc = await getDoc(doc(db, 'users', this.cpf));
          if (userDoc.exists() && userDoc.data().email !== user.email) {
            alert('CPF já registrado com um email diferente. Por favor, verifique suas informações.');
            return;
          }
          // Enviar email de verificação se necessário
          if (!user.emailVerified) {
            await sendEmailVerification(user);
            alert('Email de verificação enviado. Por favor, verifique seu email para completar o cadastro.');
          }
          // Salvar os dados do usuário no Firestore
          await setDoc(doc(db, 'users', this.cpf), {
            email: user.email,
            cpf: this.cpf
          });
        } catch (error) {
          alert('Erro ao se cadastrar com Google: ' + error.message);
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
  
  .btn-signup, .btn-google {
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
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .login-link {
    color: #4285f4;
    cursor: pointer;
  }
  
  .separator {
    margin: 1.5rem 0;
    font-size: 0.875rem;
    color: #888;
  }
  </style>
