const storage = localStorage.getItem('testData') && JSON.parse(localStorage.getItem('testData')) || {}

export default {
  state: {
    testDataInfo: storage.testData || {}
  },
  mutations: {
    SETTESTDATAINFO (state, data) {
      state.testDataInfo = data
    }
  },
  actions: {
    setTestDataInfo ({commit}, data) {
      commit('SETTESTDATAINFO', data)
    }
  }
}
