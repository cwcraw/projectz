<template>
  <div>
    <div v-for="el in this.$store.state.listList" :key="el.id">
      <h1>{{ el }}</h1>
      <div v-for="image in favoriteArray" :key="image.id">
        <div
          v-on:mouseover="overMouse(image)"
          v-on:mouseleave="leaveMouse"
          class="imgCell"
        >
          <div v-if="el === image.list" class="outline">
            <div v-if="image.display" class="topDisplay">
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
                <!-- Vue didn't like doing a nested v-for loop with two Vuex objects. Not sure why, but setting
              'listArray' equal to this.$store.state.listList is a workaround. Need to investigate. -->
                <select v-model="selectList">
                  <option disabled value="">Please select new category</option>
                  <option v-for="listItem in listArray" :key="listItem.id">
                    {{ listItem }}
                  </option>
                </select>
                <h6>New category:</h6>
                <input
                  v-model="newList"
                  v-on:keyup.enter="updatelistList"
                  placeholder="Make New List"
                />
                <h6>Description:</h6>
                <input v-model="description" placeholder="Describe the Image" />
                <br />

                <button
                  v-on:click="editBookmark(image, description, selectList)"
                >
                  Edit
                </button>
                <button v-on:click="displayPopover = [false]">Cancel</button>
              </b-popover>
            </div>
            <div v-else class="topDisplay"></div>

            <img :src="image.smallURL" class="singleImage" />
            <div v-if="image.display" class="bottomDisplay">
              <h2>{{ image.description }}</h2>
              <a :href="image.photog">
                Visit the Photographer's page for more cats!
              </a>
            </div>
            <div v-else class="bottomDisplay"></div>
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
      throttler: false,
    };
  },
  methods: {
    editBookmark(el, desc, list) {
      console.log(el, desc, list);
      let payload = {
        el: el,
        desc: desc,
        list: list,
      };
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
    leaveMouse() {
      if (this.throttler) return;
      this.throttler = true;

      for (let item of this.$store.state.bookmarkList) item.display = false;
      setTimeout(() => (this.throttler = false), 1);
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

<style scoped>
.imgCell {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;

  width: 650px;
}
.outline {
  outline: 1px solid teal;
  outline-offset: 3 px;
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
