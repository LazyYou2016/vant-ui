const state = {
  token: '',
  userInfo: {}
  // projectId: ''
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 获取用户信息
  getInfo ({ commit, state }) {
    debugger
    console.log(commit, state)
    return new Promise((resolve, reject) => {
      // 调用接口获取用户信息

      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      console.log(userInfo, 'userInfo')
      if (!userInfo) {
        reject(new Error('验证失败，请重新登录'))
      }

      resolve(userInfo)
      commit('SET_USERINFO', userInfo)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
