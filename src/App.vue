<template>
  <div id="app">
    <Header id = "header"/>

    <div v-if="this.$store.state.searchView">
      <SearchPage id='search'/>
    </div>
    <div v-else>
      <FavoritesPage id='favorite'/>
    </div>
  </div>
</template>

<script>
import SearchPage from "./components/SearchPage.vue";
import FavoritesPage from "./components/FavoritesPage.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    SearchPage,
    FavoritesPage,
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#header {
  padding: 10px
}
</style>
