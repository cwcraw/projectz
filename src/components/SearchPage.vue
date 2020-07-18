<template>
  <div>
    <p>Hello World</p>
    <!-- Search Bar -->
    <input
      v-model="query"
      v-on:keyup.enter="searchUnsplash"
      placeholder="Search for Cats here"
    />

    <!-- Display list of 10 photos returned from search -->
    <div v-if="this.displayFlag">
      <div v-for="el in this.$store.state.photoList" :key="el.id">
        <!-- Div controls what is shown, need to use overMouse(el) method to make sure popover remains -->
        <div v-on:mouseover="overMouse(el)" class="imgCell">
          <div v-if="el.display">
            <button :id="el.divID.toString()">
              Bookmark Photo
            </button>
            <button v-on:click="downloadPhoto(el)">download</button>
            <!-- Popover is used to bookmark photos -->
            <!-- <div>Need to refactor below, I dont know how robust show:sync is -->
            <b-popover
              :show.sync="displayPopover[el.divID.toString()]"
              :target="el.divID.toString()"
              placement="bottom"
              title="Bookmark Your Photo"
            >
              <h1>List:</h1>
              <!-- Vue didn't like doing a nested v-for loop with two Vuex objects. Not sure why, but setting
              'listArray' equal to this.$store.state.listList is a workaround. Need to investigate. -->
              <select v-model="selectList">
                <option disabled value="">Please select one</option>
                <option v-for="listItem in listArray" :key="listItem.id">
                  {{ listItem }}
                </option>
              </select>
              New List:
              <input
                v-model="newList"
                v-on:keyup.enter="updatelistList"
                placeholder="Make New List"
              />
              Description:<input
                v-model="description"
                placeholder="Describe the Image"
              />

              <button v-on:click="bookmarkPhoto(el, description, selectList)">
                Bookmark!
              </button>
              <button>Cancel!</button>
            </b-popover>
          </div>
          <img :src="el.urls.small" class="singleImage" />
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
      listArray: this.$store.state.listList,
      displayPopover: [false],
      description: "",
      newList: "",
      selectList: "",
    };
  },
  methods: {
    bookmarkPhoto(el, desc, list) {
      console.log(desc, list);
      let payload = {
        el: el,
        desc: desc,
        list: list,
      };
      this.$store.commit("updateBookmarkList", payload);
      console.log(this.$store.state.bookmarkList);
    },
    updatelistList(val) {
      console.log(val.target.value);
      if (!this.listArray.includes(val.target.value)) {
        this.$store.commit("updatelistList", val.target.value);
      }
    },
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
    overMouse(el) {
      el.display = true;
      for (let item of this.$store.state.photoList)
        if (el !== item) {
          item.display = false;
        }
    },
    async searchUnsplash(query) {
      let response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${query.target.value}&client_id=${process.env.VUE_APP_ACCESS_KEY}&count=10`
      );
      this.$store.commit("updatePhotoList", response.data);
      console.log(response.data.display);
      this.displayFlag = true;
    },
  },
};
</script>

<style scoped>
.imgCell {
  display: block;
  margin-left: auto;
  margin-right: auto;
  min-height: 500px;
  margin-top: 20px;
  outline: 1px solid teal;
  outline-offset: 3 px;
  width: 650px;
}
.singleImage {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
