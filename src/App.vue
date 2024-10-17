<template>
  <div id="app">
    <header>
      <h1>Eleições Virtuais</h1>
      <p>Sistema de eleições virtuais para uso didático</p>
    </header>
    <router-view></router-view> <!-- Este elemento renderiza os componentes baseados na rota ativa -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 20px;
}
header {
  background-color: #2196f3;
  color: white;
  padding: 10px;
}
</style>
