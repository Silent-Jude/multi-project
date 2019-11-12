import Vuex from 'vuex'
import Vue from 'vue'
import {localStoragePlugin} from './localStoragePlugin'

import testData from './testData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    testData
  },
  plugins: [localStoragePlugin]
})
