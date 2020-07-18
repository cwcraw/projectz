<template>
  <div >
    <h1 id="Title">Cats-ta-gram</h1>
    <div v-if="this.$store.state.searchView">
    <button  v-on:click="toggleView" class="btn btn-dark">Bookmarks</button>
    </div>
    <div v-else>
    <button  v-on:click="toggleView" class="btn btn-dark">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleView: function() {
      console.log('toggling')
      this.$store.commit("toggleView");
    },
  },
};
</script>

<style scoped>
#Title {
  margin-left: 100px;
  font-style: oblique;
  color: darkmagenta;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 3em;
}
</style>
