import { loadCurrentUserInfo, logout } from '@/api'

const state = {
  currentUser: {
    id: '',
    account: '',
    role: ''
  },
  profile: {
    theme: 'blue',
    layout: 'standalone' // standalone or coalesce
  },
  loaded: false
}

const getters = {}

const mutations = {
  setUser (state, payload) {
    state.currentUser = payload
  },
  setProfile (state, payload) {
    state.profile = payload
  },
  setStatus (state, payload = false) {
    state.loaded = payload
  }
}

const actions = {
  loadProfile ({ commit, state }) {
    if (state.loaded) {
      return { currentUser: state.currentUser, profile: state.profile }
    }
    return loadCurrentUserInfo().then(data => {
      commit('setUser', data.currentUser)
      commit('setProfile', data.profile)
      commit('setStatus', true)
      return data
    })
  },
  logout ({ commit }) {
    return logout().then(() => {
      commit('setUser', { id: '', account: '', role: '' })
      commit('setProfile', { theme: 'blue', layout: 'standalone' })
      commit('setStatus', false)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
