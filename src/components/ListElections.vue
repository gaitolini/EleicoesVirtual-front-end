<template>
    <div class="list-container">
      <h2>Lista de Eleições</h2>
      <div v-if="loading" class="loading">Carregando eleições...</div>
      <table v-else>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eleicao in eleicoes" :key="eleicao.id">
            <td>{{ eleicao.nome }}</td>
            <td>{{ eleicao.dataInicio }}</td>
            <td>{{ eleicao.dataFim }}</td>
            <td>
              <router-link :to="{ name: 'edit', params: { id: eleicao.id } }" class="action-button">Editar</router-link>
              <button @click="deletarEleicao(eleicao.id)" class="action-button delete">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ListElections",
    data() {
      return {
        eleicoes: [],
        loading: true,
      };
    },
    methods: {
      async fetchElections() {
        try {
          // const response = await axios.get("http://localhost:8081/eleicoes");
          const response = await axios.get("https://api.gaitolini.com.br/eleicoes");
          this.eleicoes = response.data;
        } catch (error) {
          console.error("Erro ao buscar eleições:", error);
        } finally {
          this.loading = false;
        }
      },
      async deletarEleicao(id) {
        try {
          await axios.delete(`https://api.gaitolini.com.br/eleicoes/${id}`);
          this.eleicoes = this.eleicoes.filter(e => e.id !== id);
        } catch (error) {
          console.error("Erro ao deletar eleição:", error);
        }
      }
    },
    created() {
      this.fetchElections();
    }
  };
  </script>
  
  <style scoped>
  .list-container {
    max-width: 800px;
    margin: 50px auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .action-button {
    padding: 10px 15px;
    text-decoration: none;
    color: white;
    background-color: #4caf50;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .delete {
    background-color: #f44336;
  }
  
  .action-button:hover {
    opacity: 0.9;
  }
  </style>
  