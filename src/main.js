import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// using Vuex to store photo states and adjust them.
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const store = new Vuex.Store({
  state: {
    photoList: [],
    savePhoto: [], // do I need this?
    listList: ["cats", "cute cats", "very cute cats"],
    bookmarkList: [
      {
        smallURL:
          "https://images.unsplash.com/photo-1591369631806-e6473e109c9e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
        allURLs: {
          raw:
            "https://images.unsplash.com/photo-1591369631806-e6473e109c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          full:
            "https://images.unsplash.com/photo-1591369631806-e6473e109c9e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          regular:
            "https://images.unsplash.com/photo-1591369631806-e6473e109c9e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          small:
            "https://images.unsplash.com/photo-1591369631806-e6473e109c9e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          thumb:
            "https://images.unsplash.com/photo-1591369631806-e6473e109c9e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
        },
        description: "silver tabby cat on green textile",
        photog: "https://unsplash.com/photos/fYPCG1xUhRs",
        list: "cute cats",
      },
      {
        smallURL:
          "https://images.unsplash.com/photo-1570476440787-ea8aa393ed0a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
        allURLs: {
          raw:
            "https://images.unsplash.com/photo-1570476440787-ea8aa393ed0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          full:
            "https://images.unsplash.com/photo-1570476440787-ea8aa393ed0a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          regular:
            "https://images.unsplash.com/photo-1570476440787-ea8aa393ed0a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          small:
            "https://images.unsplash.com/photo-1570476440787-ea8aa393ed0a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          thumb:
            "https://images.unsplash.com/photo-1570476440787-ea8aa393ed0a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
        },
        description: "white kitten in basket",
        photog: "https://unsplash.com/photos/ya_8wMWZEEc",
        list: "very cute cats",
      },
      {
        smallURL:
          "https://images.unsplash.com/photo-1587989657587-4beb321b4098?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
        allURLs: {
          raw:
            "https://images.unsplash.com/photo-1587989657587-4beb321b4098?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          full:
            "https://images.unsplash.com/photo-1587989657587-4beb321b4098?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          regular:
            "https://images.unsplash.com/photo-1587989657587-4beb321b4098?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          small:
            "https://images.unsplash.com/photo-1587989657587-4beb321b4098?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
          thumb:
            "https://images.unsplash.com/photo-1587989657587-4beb321b4098?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE0OTAwNH0",
        },
        description: "orange and white cat on brown brick wall",
        photog: "https://unsplash.com/photos/vK8n1jvnwS8",
        list: "cats",
      },
    ],
  },
  mutations: {
    updatePhotoList: (state, unsplashList) => {
      state.photoList = [];
      let id = 0;
      for (let el of unsplashList) {
        //used to display only one alt text at a time.
        el.display = false;
        el.divID = id.toString();
        state.photoList.push(el);
        id++;
      }
    },
    updatelistList: (state, list) => {
      state.listList.push(list);
    },
    updateBookmarkList: (state, payload) => {
      let { el, desc, list } = payload;
      console.log(desc, list);
      let favoriteObject = {
        smallURL: el.urls.small,
        allURLs: el.urls,
        description: desc || el.alt_description,
        photog: el.links.html,
        list: list,
      };
      state.bookmarkList.push(favoriteObject);
    },
    savePhoto: (state, photo) => {
      state.savePhoto = photo;
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
