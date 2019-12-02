import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    logWrapState: false,
    uid: '',
    isLogin: false,
    role: 0
  },
  mutations: {
    setUid (state, val) {
      state.uid = val
      console.log('切换登陆状态1')
    },
    setLogin (state, bol) {
      state.isLogin = bol
      console.log('切换登陆状态2')
    },
    setLogWrapState (state, bol) {
      state.logWrapState = bol
      console.log('切换模态框开关。')
    },
    setRole (state, code) {
      state.role = code
      console.log('vuex角色初始化完毕,角色码是' + code)
    }
  },
  getters: {
    getLogWrapState (state) {
      return state.logWrapState
    },
    getLogin (state) {
      return state.isLogin
    }
  }

})

export default store
