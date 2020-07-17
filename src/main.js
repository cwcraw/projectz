import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// using Vuex to store photo states and adjust them.
Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


const store = new Vuex.Store({
  state: {
    photoList: [],
    savePhoto: []
  },
  mutations: {
    updatePhotoList: (state, unsplashList) => {
      state.photoList = []
      let id = 0
      for(let el of unsplashList) {
        //used to display only one alt text at a time.
        el.display = false
        el.divID=id.toString()
        state.photoList.push(el)
        id++
      }
    },
    savePhoto: (state, photo) => {
      state.savePhoto = photo
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
