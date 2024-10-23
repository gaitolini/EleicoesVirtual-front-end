<template>
  <div class="dashboard-container">
    <h2>Bem-vindo ao Painel de Eleições</h2>

    <!-- Se o usuário for gaitolini@gmail.com, exibir a seleção de API -->
    <div v-if="isTestUser" class="api-selection">
      <label for="apiUrl">Selecione o ambiente de API:</label>
      <select v-model="apiUrl" id="apiUrl">
        <option value="http://localhost:8081">Localhost</option>
        <option value="https://api.gaitolini.com.br">Produção</option>
      </select>
    </div>

    <!-- Botão para criar nova eleição -->
    <div class="actions">
      <form @submit.prevent="criarEleicao" class="create-election-form">
        <input
          v-model="novaEleicao.nome"
          type="text"
          placeholder="Nome da Eleição"
          required
        />
        <input
          v-model="novaEleicao.descricao"
          type="text"
          placeholder="Descrição"
          required
        />
        <input v-model="novaEleicao.dataInicio" type="date" required />
        <button type="submit" class="action-button">Criar Nova Eleição</button>
      </form>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Lista de eleições -->
    <div class="elections-list">
      <h3>Lista de Eleições</h3>
      <ul v-if="elections && elections.length > 0">
        <li v-for="election in elections" :key="election.id">
          <strong>{{ election.nome }}</strong> - {{ election.descricao }} -
          {{ formatDate(election.dataInicio) }}
        </li>
      </ul>
      <p v-else>Não há eleições disponíveis no momento.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth } from "firebase/auth"; // Certifique-se de importar o auth do Firebase

export default {
  name: "DashboardEleicoes",
  data() {
    return {
      elections: [], // Armazena as eleições obtidas da API
      novaEleicao: {
        nome: "",
        descricao: "",
        dataInicio: "",
      },
      apiUrl: "http://localhost:8081", // "https://api.gaitolini.com.br", // API de produção por padrão
      isTestUser: false, // Flag para verificar se o usuário é gaitolini@gmail.com
      errorMessage: "", // Para exibir mensagens de erro
    };
  },
  methods: {
    // Função para obter e armazenar o token JWT
    async getTokenAndStore() {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const token = await user.getIdToken(); // Obtém o token JWT
            localStorage.setItem("jwt_token", token); // Armazena o token no localStorage
            this.checkUserEmail(); // Verificar o email do usuário
          } catch (error) {
            this.errorMessage = "Erro ao obter o token JWT.";
            console.error("Erro ao obter o token JWT:", error);
          }
        } else {
          console.log("Nenhum usuário autenticado.");
        }
      });
    },

    // Verifica se o usuário autenticado é gaitolini@gmail.com
    checkUserEmail() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email;
        if (userEmail === "gaitolini@gmail.com") {
          this.isTestUser = true; // Permitir ao usuário escolher a API
        }
      } else {
        console.log("Nenhum usuário autenticado.");
      }
    },

    // Formata a data para exibição
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Faz a requisição para listar as eleições
    async fetchElections() {
      try {
        const token = localStorage.getItem("jwt_token"); // Pegue o token JWT do localStorage
        if (!token) {
          this.errorMessage =
            "Token JWT não encontrado. Por favor, faça login novamente.";
          return;
        }
        const response = await axios.get(`${this.apiUrl}/eleicoes`, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclua o token JWT no cabeçalho
            "Content-Type": "application/json",
          },
        });
        this.elections = response.data;
      } catch (error) {
        this.elections = []; // Manter elections como array vazio em caso de erro
        this.errorMessage = "Erro ao carregar eleições.";
        console.error("Erro ao carregar eleições:", error);
      }
    },

    // Faz a requisição para criar uma nova eleição
    async criarEleicao() {
      try {
        console.log("Dados da nova eleição antes do envio:", this.novaEleicao);

        if (this.novaEleicao.dataInicio) {
          this.novaEleicao.dataInicio = new Date(
            this.novaEleicao.dataInicio
          ).toISOString();
        }

        const token = localStorage.getItem("jwt_token"); // Pegue o token JWT do localStorage
        const response = await axios.post(
          `${this.apiUrl}/eleicoes`,
          this.novaEleicao,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Inclua o token JWT no cabeçalho
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Eleição criada com sucesso:", response.data);
        this.fetchElections(); // Atualiza a lista de eleições após criar uma nova
        this.novaEleicao = { nome: "", descricao: "", dataInicio: "" }; // Limpar o formulário
      } catch (error) {
        this.errorMessage = "Erro ao criar eleição.";
        console.error("Erro ao criar eleição:", error);
      }
    },
  },

  async mounted() {
    try {
      await this.getTokenAndStore(); // Obter o token e armazenar no localStorage
      await this.fetchElections(); // Carregar a lista de eleições
    } catch (error) {
      this.errorMessage = "Erro durante a montagem do componente.";
      console.error("Erro durante a montagem do componente:", error);
    }
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

.api-selection {
  margin-bottom: 20px;
}

.error-message {
  color: red;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
