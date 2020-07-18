<template>
  <div>
    <p>Hello World</p>
    <div v-for="el in this.$store.state.bookmarkList" :key="el.id"></div>
  </div>
</template>

<script></script>

<style scoped></style>
