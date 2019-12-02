import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    adminLog: false,
    currentPhone: null,
    isLogin: false,
    recommend: []
    // token: ''
  },
  mutations: {
    setAdminLog (state) {
      state.adminLog = true
    },
    changeUserStatus (state, phone) {
      if (phone) {
        state.currentPhone = phone
        state.isLogin = true
        // console.log('vuex中的phone设置完毕')
      } else if (phone == null) {
        // 登出的时候，情况sessionStorage里面的东西
        sessionStorage.setItem('userName', null)
        sessionStorage.setItem('userToken', '')
        state.currentPhone = null
        state.isLogin = false
        // state.token = "";
      }
    },
    setRecommend (state, arr) {
      state.recommend = arr
      // console.log('vuex里面的recommend设置完毕')
      // console.log(state.recommend)
    }
  },
  getters: {
    getAdminLog (state) {
      return state.adminLog
    },
    getLogInfo (state) {
      return state.isLogin
    },
    getCurrentPhone (state) {
      return state.currentPhone
    },
    getRecommend (state) {
      return state.recommend
    }
  }
})

export default store
