<template>
  <div>
    <h1 id="Title" v-on:click="topFunction">Cats-ta-gram</h1>
    <div v-if="this.$store.state.searchView" class="togButton">
      <button v-on:click="toggleView" >Bookmarks</button>
    </div>
    <div v-else class="togButton">
      <button v-on:click="toggleView" >Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleView: function() {
      this.$store.commit("toggleView");
    },
    topFunction: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0; 
    },
  },
};
</script>

<style scoped>
#Title {
  position: fixed; 
}
.togButton {
  padding: 50px;
 position: fixed;
 }
</style>
