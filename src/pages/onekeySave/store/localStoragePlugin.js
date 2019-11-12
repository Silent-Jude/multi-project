export const localStoragePlugin = store => {
  // 当store初始化后调用
  store.subscribe((MutationEvent, state) => {
    // 每次mutation之后调用
    // mutation的格式为{type, payload}
    Object.keys(state).forEach(item => {
      window.localStorage.setItem(item, JSON.stringify(state[item]))
    })
  })
}
