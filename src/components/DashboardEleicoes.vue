<template>
  <div class="dashboard-container">
    <h2>Bem-vindo ao Painel de Eleições</h2>

    <!-- Botão para criar nova eleição -->
    <div class="actions">
      <form @submit.prevent="criarEleicao" class="create-election-form">
        <input
          v-model="novaEleicao.name"
          type="text"
          placeholder="Nome da Eleição"
          required
        />
        <input
          v-model="novaEleicao.description"
          type="text"
          placeholder="Descrição"
          required
        />
        <input v-model="novaEleicao.date" type="date" required />
        <button type="submit" class="action-button">Criar Nova Eleição</button>
      </form>
    </div>

    <!-- Lista de eleições -->
    <div class="elections-list">
      <h3>Lista de Eleições</h3>
      <ul v-if="elections.length > 0">
        <li v-for="election in elections" :key="election.id">
          <strong>{{ election.name }}</strong> - {{ election.description }} -
          {{ formatDate(election.date) }}
        </li>
      </ul>
      <p v-else>Não há eleições disponíveis no momento.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Para fazer as requisições HTTP

export default {
  name: "DashboardEleicoes",
  data() {
    return {
      elections: [], // Armazena as eleições obtidas da API
      novaEleicao: {
        name: "",
        description: "",
        date: "",
      },
    };
  },
  methods: {
    // Formata a data para exibição
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Faz a requisição para listar as eleições
    async fetchElections() {
      try {
        const response = await axios.get(
          "https://api.gaitolini.com.br/eleicao/eleicoes"
        );
        this.elections = response.data;
      } catch (error) {
        console.error("Erro ao carregar eleições:", error);
      }
    },

    // Faz a requisição para criar uma nova eleição
    async criarEleicao() {
      try {
        const response = await axios.post(
          "https://api.gaitolini.com.br/eleicao/eleicoes",
          this.novaEleicao
        );
        console.log("Eleição criada com sucesso:", response.data);
        // Após criar a eleição, buscar novamente a lista
        this.fetchElections();
        // Limpar o formulário
        this.novaEleicao = { name: "", description: "", date: "" };
      } catch (error) {
        console.error("Erro ao criar eleição:", error);
      }
    },
  },
  async mounted() {
    // Carrega a lista de eleições ao montar o componente
    await this.fetchElections();
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #0d1117;
  color: #c9d1d9;
  min-height: 100vh;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #f0f6fc;
}

.actions {
  margin-bottom: 30px;
}

.create-election-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type="text"],
input[type="date"] {
  padding: 10px;
  width: 300px;
  font-size: 1rem;
  border: 1px solid #30363d;
  border-radius: 6px;
  background-color: #161b22;
  color: #c9d1d9;
}

button {
  padding: 15px 25px;
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  background-color: #238636;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2ea043;
}

.elections-list {
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
}

.elections-list ul {
  list-style: none;
  padding: 0;
}

.elections-list li {
  background-color: #161b22;
  padding: 10px;
  border: 1px solid #30363d;
  margin-bottom: 10px;
  border-radius: 6px;
}

.elections-list li strong {
  color: #58a6ff;
}
</style>
