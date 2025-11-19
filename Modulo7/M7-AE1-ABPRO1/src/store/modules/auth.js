let authInitPromise = null

const state = () => ({
  user: null,
  loading: false,
  error: null,
  authReady: false,
  justLoggedInAt: null,
  sessionOrigin: null,
  lastToastTs: 0
})

const getters = {
  isAuthenticated: (state) => !!state.user,
  currentUser: (state) => state.user,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
  isAuthReady: (state) => state.authReady
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setLoading(state, value) {
    state.loading = value
  },
  setError(state, message) {
    state.error = message
  },
  setAuthReady(state, value) {
    state.authReady = value
  },
  setJustLoggedInAt(state, timestamp) {
    state.justLoggedInAt = timestamp
  },
  setSessionOrigin(state, origin) {
    state.sessionOrigin = origin
  },
  setLastToastTs(state, timestamp) {
    state.lastToastTs = timestamp
  },
  clearError(state) {
    state.error = null
  },
  resetJustLogged(state) {
    state.justLoggedInAt = null
  }
}

const actions = {
  initAuthStateListener({ commit }) {
    if (authInitPromise) return authInitPromise
    commit('setLoading', true)
    authInitPromise = new Promise((resolve) => {
      commit('setAuthReady', true)
      commit('setLoading', false)
      resolve(null)
    })
    return authInitPromise
  },

  async registerUser({ commit }, { email }) {
    commit('setLoading', true)
    commit('clearError')
    try {
      const fakeUser = { uid: 'local-user', email }
      commit('setSessionOrigin', 'manual')
      commit('setUser', fakeUser)
      return { success: true, user: fakeUser }
    } catch (error) {
      const message = 'Error de registro local'
      commit('setError', message)
      return { success: false, error: message }
    } finally {
      commit('setLoading', false)
    }
  },

  async loginUser({ commit }, { email }) {
    commit('setLoading', true)
    commit('clearError')
    try {
      const fakeUser = { uid: 'local-user', email }
      commit('setSessionOrigin', 'manual')
      commit('setUser', fakeUser)
      return { success: true, user: fakeUser }
    } catch (error) {
      const message = 'Error de inicio de sesión local'
      commit('setError', message)
      return { success: false, error: message }
    } finally {
      commit('setLoading', false)
    }
  },

  async logoutUser({ commit }) {
    commit('setLoading', true)
    commit('clearError')
    try {
      commit('setUser', null)
      commit('setSessionOrigin', null)
      commit('resetJustLogged')
      return { success: true }
    } catch (error) {
      const message = 'Error de cierre de sesión local'
      commit('setError', message)
      return { success: false, error: message }
    } finally {
      commit('setLoading', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
