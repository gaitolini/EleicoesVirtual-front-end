<template>
    <div>
      <h2>Editar Eleição</h2>
      <form @submit.prevent="editarEleicao">
        <div>
          <label for="nome">Nome da Eleição:</label>
          <input type="text" id="nome" v-model="eleicao.nome" required />
        </div>
        <div>
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" v-model="eleicao.descricao" required></textarea>
        </div>
        <div>
          <label for="dataInicio">Data de Início:</label>
          <input type="date" id="dataInicio" v-model="eleicao.dataInicio" required />
        </div>
        <div>
          <label for="dataFim">Data de Fim:</label>
          <input type="date" id="dataFim" v-model="eleicao.dataFim" required />
        </div>
        <button type="submit" :disabled="loading">Salvar Alterações</button>
      </form>
  
      <div v-if="loading" class="loading">Processando, por favor aguarde...</div>
      <div v-if="message" :class="messageType">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "EditElection",
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
    created() {
      this.carregarEleicao();
    },
    methods: {
      // Método para carregar os dados da eleição
      async carregarEleicao() {
        this.loading = true;
        const eleicaoId = this.$route.params.id;
  
        try {
          const response = await axios.get(`https://api.gaitolini.com.br/eleicoes/${eleicaoId}`);
          // const response = await axios.get(`http://localhost:8081/eleicoes/${eleicaoId}`);
          this.eleicao = response.data;
        } catch (error) {
          console.error("Erro ao carregar eleição:", error);
          this.message = "Erro ao carregar dados da eleição. Por favor, tente novamente.";
          this.messageType = "error";
        } finally {
          this.loading = false;
        }
      },
      // Método para salvar as alterações da eleição
      async editarEleicao() {
        this.loading = true;
        const eleicaoId = this.$route.params.id;
  
        try {
          await axios.put(`https://api.gaitolini.com.br/eleicoes/${eleicaoId}`, this.eleicao);
          // await axios.put(`http://localhost:8081/eleicoes/${eleicaoId}`, this.eleicao);
          this.message = "Eleição atualizada com sucesso!";
          this.messageType = "success";
        } catch (error) {
          console.error("Erro ao editar eleição:", error);
          this.message = "Erro ao editar eleição. Por favor, tente novamente.";
          this.messageType = "error";
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    max-width: 500px;
    margin: 0 auto;
  }
  div {
    margin-bottom: 15px;
  }
  button {
    padding: 10px 20px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
  
  .loading {
    text-align: center;
    color: #007bff;
    margin-top: 10px;
  }
  
  .success {
    color: #4caf50;
    text-align: center;
    margin-top: 10px;
  }
  
  .error {
    color: #f44336;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  