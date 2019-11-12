import Vuex from 'vuex'
import Vue from 'vue'
import {localStoragePlugin} from './localStoragePlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  plugins: [localStoragePlugin]
})
