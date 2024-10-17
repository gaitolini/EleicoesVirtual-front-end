<template>
    <div class="dashboard-container">
      <h2>Bem-vindo ao Painel de Eleições</h2>
      <div class="actions">
        <router-link to="/create" class="action-button">Criar Nova Eleição</router-link>
        <router-link to="/list" class="action-button">Listar Eleições</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardEleicoes"
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    text-align: center;
    margin-top: 50px;
  }
  
  .actions {
    margin-top: 20px;
  }
  
  .action-button {
    display: inline-block;
    margin: 10px;
    padding: 15px 25px;
    text-decoration: none;
    color: white;
    background-color: #4caf50;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #45a049;
  }
  </style>
  