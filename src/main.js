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

//Using Vuex to store states used across the two pages. Also, the bookmarks and lists will be stored in the DB in the future.
const store = new Vuex.Store({
  state: {
    listList: ["Cats", "Cute Cats", "Very Cute Cats",'Miscellany'],
    bookmarkList: [
      {
        id: 0,
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
        photog: "https://unsplash.com/@maverick18",
        list: "Cute Cats",
        display: false,
      },
      {
        id: 1,
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
        photog: "https://unsplash.com/@chiabra",
        list: "Very Cute Cats",
        display: false,
      },
      {
        id: 2,
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
        photog: "https://unsplash.com/@thebucler",
        list: "Cats",
        display: false,
      },
    ],
    searchView: true
  },
  mutations: {
    toggleView: (state) =>{
      state.searchView = !state.searchView
    },
    updatePhotoList: (state, unsplashList) => {
      state.photoList = [];
      let id = 0;
      for (let el of unsplashList) {
        //used to display only one alt text at a time.
        el.display = false;
        el.divID = id;
        state.photoList.push(el);
        id++;
      }
    },
    updatelistList: (state, list) => {
      state.listList.push(list);
    },
    updateBookmarkList: (state, payload) => {
      let { el, desc, list } = payload;
      console.log(list)
      // The '||' statements are used to manage if a user doesn't input a value.
      let favoriteObject = {
        smallURL: el.urls.small,
        allURLs: el.urls,
        description: desc || el.alt_description,
        photog: el.user.links.html,
        list: list || 'Miscellany',
        display: false,
        id: state.bookmarkList.length,
      };
      console.log(favoriteObject)
      state.bookmarkList.push(favoriteObject);
    },
    editBookmarkList: (state, payload) => {
      let { el, desc, list } = payload;
      console.log(desc, list);
      if (desc) {
        el.description = desc;
      }
      el.list = list;
      for (let bookmark in state.bookmarkList) {
        if (bookmark.id === el.id) {
          bookmark = el;
        }
      }
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
