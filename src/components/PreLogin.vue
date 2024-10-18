<template>
    <div class="prelogin-container">
      <h1>Bem-vindo ao Eleições Virtuais</h1>
      <div class="button-group">
        <button @click="goToLogin" class="btn btn-login">Entrar</button>
        <button @click="goToSignup" class="btn btn-signup">Inscreva-se</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PreLogin',
    methods: {
      goToLogin() {
        this.$router.push('/login');
      },
      goToSignup() {
        this.$router.push('/inscreva-se');
      }
    }
  };
  </script>
  
  <style scoped>
  .prelogin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn {
    width: 200px;
    padding: 15px;
    font-size: 1.2rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-login {
    background-color: #4285f4;
  }
  
  .btn-signup {
    background-color: #db4437;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
  }
  </style>
  