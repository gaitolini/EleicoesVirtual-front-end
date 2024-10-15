<template>
  <div class="create-election-container">
    <div class="card">
      <h2>Criar Nova Eleição</h2>
      <form @submit.prevent="criarEleicao">
        <div class="form-group">
          <label for="nome">Nome da Eleição:</label>
          <input type="text" id="nome" v-model="eleicao.nome" required />
        </div>
        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" v-model="eleicao.descricao" required></textarea>
        </div>
        <div class="form-group">
          <label for="dataInicio">Data de Início:</label>
          <input type="date" id="dataInicio" v-model="eleicao.dataInicio" required />
        </div>
        <div class="form-group">
          <label for="dataFim">Data de Fim:</label>
          <input type="date" id="dataFim" v-model="eleicao.dataFim" required />
        </div>
        <button type="submit" :disabled="loading">Criar Eleição</button>
      </form>

      <div v-if="loading" class="loading">Processando, por favor aguarde...</div>
      <div v-if="message" :class="['message', messageType]">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateElection",
  data() {
    return {
      eleicao: {
        nome: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
      },
      loading: false, // Indicador de carregamento
      message: "", // Mensagem de feedback
      messageType: "", // Tipo da mensagem: sucesso ou erro
    };
  },
  methods: {
    async criarEleicao() {
      this.loading = true; // Ativar o indicador de carregamento
      this.message = ""; // Limpar mensagem anterior
      try {
        const response = await axios.post("https://api.gaitolini.com.br/eleicoes", this.eleicao);
        console.log("Eleição criada com sucesso:", response.data);
        this.message = "Eleição criada com sucesso!";
        this.messageType = "success";
        // Limpar o formulário
        this.eleicao = {
          nome: "",
          descricao: "",
          dataInicio: "",
          dataFim: "",
        };
      } catch (error) {
        console.error("Erro ao criar eleição:", error);
        this.message = "Erro ao criar eleição. Por favor, tente novamente.";
        this.messageType = "error";
      } finally {
        this.loading = false; // Desativar o indicador de carregamento
      }
    },
  },
};
</script>

<style scoped>
/* Estrutura geral */
.create-election-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* Card para o formulário */
.card {
  background: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
}

/* Título */
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Formulário */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  border-color: #4caf50;
  outline: none;
}

/* Botão */
button {
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

/* Indicador de carregamento */
.loading {
  text-align: center;
  color: #007bff;
  margin-top: 20px;
}

/* Mensagens de sucesso/erro */
.message {
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.error {
  background-color: #f2dede;
  color: #a94442;
}
</style>
