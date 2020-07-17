<template>
  <div>
    <p>Hello World</p>
    <input
      v-model="query"
      v-on:keyup.enter="searchUnsplash"
      placeholder="Search for Cats here"
    />
    <div v-if="this.displayFlag">
      <div v-for="el in this.$store.state.photoList" :key="el.id">
        <div 
          v-on:mouseover="overMouse(el)" >
          <div v-if="el.display">
            <h2>{{ el.alt_description }}</h2>
            <button :id="el.divID" v-on:click="bookmarkPhoto(el)">
              Bookmark Photo
            </button>
            <button v-on:click="downloadPhoto(el)">download</button>
            <!-- <div>Need to refactor below, I dont know how robust show:sync is -->
            <b-popover
              :show.sync="displayPopover[el.divID]"
              :target="el.divID"
              placement="bottom"
              title="Bookmark Your Photo"
            >
              <h1>List:</h1>
              New List: <input /> Description:<input />
              <button>Bookmark!</button>
              <button>Cancel!</button>
            </b-popover>
          </div>
          <img :src="el.urls.small" />
          <div v-if="el.display">
            <h2>{{ el.user.links.html }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("dotenv").config();
import axios from "axios";

export default {
  name: "SearchPage",
  data() {
    return {
      query: "",
      displayFlag: false,
      photoList: [],
      displayPopover: [false],
    };
  },
  methods: {
    async downloadPhoto(el) {
      console.log(el);
      let response = await axios.get(`${el.urls.raw}`, {
        responseType: "blob",
      });
      console.log(response.data);
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", `photo-${el.id}.jpg`);
      document.body.appendChild(fileLink);

      fileLink.click();
    },
    test(query) {
      console.log(query);
    },
    overMouse(el) {
      el.display = true;
      for(let item of this.$store.state.photoList)
        if(el !== item) {
          item.display = false
        }
    },
    bookmarkPhoto(el) {
      console.log(el);
    },
    async searchUnsplash(query) {
      let response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${query.target.value}&client_id=${process.env.VUE_APP_ACCESS_KEY}&count=10`
      );
      // console.log(response)
      this.$store.commit("updatePhotoList", response.data);
      console.log(response.data.display);
      this.displayFlag = true;
    },
  },
};
</script>

<style scoped></style>
