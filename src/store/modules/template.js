const state = {
  name: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  name ({ commit }) {
    commit('SET_NAME', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
