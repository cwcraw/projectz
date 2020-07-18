<template>
  <div>
    <p>Hello World,again</p>
    <div v-for="el in this.$store.state.listList" :key="el.id">
      <h1>{{ el }}</h1>
      <div v-for="image in favoriteArray" :key="image.id">
        <div v-on:mouseover="overMouse(image)">
          <div v-if="el === image.list && image.display">
            <button :id="image.id.toString()">
              Edit Bookmark
            </button>
            <button v-on:click="downloadPhoto(image)">download</button>
            <b-popover
              :show.sync="displayPopover[image.id]"
              :target="image.id.toString()"
              placement="bottom"
              title="Edit Your Bookmark"
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

              <button v-on:click="editBookmark(image, description, selectList)">
                Edit!
              </button>
              <button>Cancel!</button>
            </b-popover>
          </div>
          <img v-if="el === image.list" :src="image.smallURL" />
          <div v-if="el === image.list && image.display">
            <h2>{{ image.description }}</h2>
            <h2>{{ image.photog }}</h2>
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
  name: "FavoritesPage",
  data() {
    return {
      favoriteArray: this.$store.state.bookmarkList,
      displayPopover: [false],
      listArray: this.$store.state.listList,
      description: "",
      newList: "",
      selectList: "",
    };
  },
  methods: {
    editBookmark(el, desc, list) {
      console.log(el,desc,list)
      let payload = {
        el: el,
        desc: desc,
        list: list,
      }
      this.$store.commit("editBookmarkList", payload);
      console.log(this.$store.state.bookmarkList);
    },
    overMouse(el) {
      el.display = true;
      for (let item of this.$store.state.bookmarkList) {
        if (el.smallURL !== item.smallURL) {
          item.display = false;
        }
      }
    },
    updatelistList(val) {
      console.log(val.target.value);
      if (!this.listArray.includes(val.target.value)) {
        this.$store.commit("updatelistList", val.target.value);
      }
    },
    async downloadPhoto(el) {
      let response = await axios.get(`${el.allURLs.raw}`, {
        responseType: "blob",
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", `photo-favorite.jpg`);
      document.body.appendChild(fileLink);

      fileLink.click();
    },
  },
};
</script>

<style scoped></style>
