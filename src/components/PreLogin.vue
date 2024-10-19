<template>
    <div class="prelogin-container">
      <div class="header">
      </div>
      <div class="content">
        <h1>Vamos construir a partir daqui</h1>
        <p>A plataforma de desenvolvimento com tecnologia de IA líder no mundo.</p>
        <div class="email-signup">
          <input type="email" v-model="email" placeholder="Endereço de email" required />
          <button @click="goToSignup" class="btn-signup">Inscreva-se no Eleições Virtuais</button>
          <button @click="goToLogin" class="btn-enter">Entrar</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PreLogin',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push({ path: '/inscreva-se', query: { email: this.email } });
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
  background-color: #0d1117;
  color: #c9d1d9;
}

.header {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.content {
  text-align: center;
  max-width: 600px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #f0f6fc;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.email-signup {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

input[type="email"] {
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #30363d;
  border-radius: 6px;
  width: 300px;
  background-color: white;
  color: #30363d;
}

.btn-signup {
  background-color: #8250df;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-signup:hover {
  background-color: #6639b7;
}

.btn-enter {
  background-color: transparent;
  color: #8250df;
  border: 1px solid #8250df;
  padding: 15px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-enter:hover {
  background-color: #6639b7;
  color: #0d1117;
}
</style>
