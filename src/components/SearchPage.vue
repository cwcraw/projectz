<template>
  <div>
    <!-- Search Bar -->
    <input
      v-model="query"
      v-on:keyup.enter="searchUnsplash"
      placeholder="Search for cats here"
    />

    <!-- Display list of 20 photos returned from search -->
    <div v-if="this.displayFlag">
      <div v-for="el in this.$store.state.photoList" :key="el.id">
        <!-- Div below controls if extra information is shown. Need to use overMouse(el) method to make sure popover remains -->
        <div
          v-on:mouseover="overMouse(el)"
          v-on:mouseleave="leaveMouse"
          class="imgCell"
        >
          <div v-if="el.display" class="topDisplay">
            <button :id="el.divID.toString()">
              Bookmark Photo
            </button>
            <button v-on:click="downloadPhoto(el)">Download</button>
            <!-- Popover is used to bookmark photos -->
            <!-- Need to refactor below, I dont know how robust show:sync is -->
            <b-popover
              :show.sync="displayPopover[el.divID.toString()]"
              :target="el.divID.toString()"
              placement="bottom"
              title="Bookmark Your Photo"
            >
              <!-- Vue didn't like doing a nested v-for loop with two Vuex objects. Not sure why, but setting
              'listArray' equal to this.$store.state.listList is a workaround. Need to investigate. -->
              <select v-model="selectList">
                <option disabled value="">Please select a category</option>
                <option v-for="listItem in listArray" :key="listItem.id">
                  {{ listItem }}
                </option>
              </select>

              <h6>New category:</h6>
              <input
                v-model="newList"
                v-on:keyup.enter="updatelistList"
                placeholder="Make a new Category"
              />
              <h6>Description:</h6>
              <input v-model="description" placeholder="Describe the image" />
              <br />

              <button v-on:click="bookmarkPhoto(el, description, selectList)">
                Bookmark
              </button>
              <button v-on:click="displayPopover = [false]">Cancel</button>
            </b-popover>
          </div>
          <div v-else class="topDisplay"></div>
          <img :src="el.urls.small" class="singleImage" />
          <div v-if="el.display" class="bottomDisplay">
            <a :href="el.user.links.html">
              Visit the Photographer's page for more cats!
            </a>
          </div>
          <div v-else class="bottomDisplay"></div>
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
      listArray: this.$store.state.listList,
      displayPopover: [false],
      description: "",
      newList: "",
      selectList: "",
      throttler: false,
    };
  },
  methods: {
    bookmarkPhoto(el, desc, list) {
      let payload = {
        el: el,
        desc: desc,
        list: list,
      };
      this.$store.commit("updateBookmarkList", payload);
    },
    updatelistList(val) {
      if (!this.listArray.includes(val.target.value)) {
        this.$store.commit("updatelistList", val.target.value);
      }
    },
    async downloadPhoto(el) {
      let response = await axios.get(`${el.urls.raw}`, {
        responseType: "blob",
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", `photo-${el.id}.jpg`);
      document.body.appendChild(fileLink);

      fileLink.click();
    },
    overMouse(el) {
      el.display = true;

      for (let item of this.$store.state.photoList) {
        if (el !== item) {
          item.display = false;
        }
      }
    },
    leaveMouse() {
      if (this.throttler) return;
      this.throttler = true;

      for (let item of this.$store.state.photoList) item.display = false;
      setTimeout(() => (this.throttler = false), 1);
    },
    async searchUnsplash(query) {
      let response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${query.target.value}&client_id=${process.env.VUE_APP_ACCESS_KEY}&count=10`
      );
      this.$store.commit("updatePhotoList", response.data);
      this.displayFlag = true;
    },
  },
};
</script>

<style scoped>
.imgCell {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  outline: 1px solid teal;
  outline-offset: 3 px;
  width: 650px;
}
.topDisplay {
  min-height: 70px;
}
.bottomDisplay {
  min-height: 70px;
}
.singleImage {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
