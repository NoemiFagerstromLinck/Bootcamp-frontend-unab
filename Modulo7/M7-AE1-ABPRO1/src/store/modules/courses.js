const state = () => ({
  courses: [],
  loading: false,
  error: null,
  unsubscribe: null
})

const getters = {
  allCourses: (state) => state.courses,
  activeCourses: (state) => state.courses.filter(course => course.estado),
  getCourseByCode: (state) => (codigo) => state.courses.find(course => course.codigo === codigo),
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
  hasListener: (state) => typeof state.unsubscribe === 'function'
}

const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setLoading(state, value) {
    state.loading = value
  },
  setError(state, message) {
    state.error = message
  },
  setUnsubscribe(state, fn) {
    state.unsubscribe = fn
  },
  addCourseLocal(state, course) {
    state.courses = [course, ...state.courses]
  },
  updateCourseLocal(state, { id, data }) {
    const idx = state.courses.findIndex(course => course.id === id)
    if (idx !== -1) {
      state.courses.splice(idx, 1, { ...state.courses[idx], ...data })
    }
  },
  deleteCourseLocal(state, courseId) {
    state.courses = state.courses.filter(course => course.id !== courseId)
  },
  clearError(state) {
    state.error = null
  }
}

const actions = {
  initCoursesListener({ commit }) {
    if (typeof window !== 'undefined') {
      const seeded = window.__localCoursesSeed
      if (Array.isArray(seeded)) commit('setCourses', seeded)
    }
    commit('setLoading', false)
    const noop = () => {}
    commit('setUnsubscribe', noop)
    return noop
  },

  stopListener({ state, commit }) {
    if (state.unsubscribe && typeof state.unsubscribe === 'function') {
      try {
        state.unsubscribe()
      } finally {
        commit('setUnsubscribe', null)
      }
    }
  },

  async fetchCourses({ commit, state }) {
    commit('setLoading', true)
    commit('clearError')
    try {
      commit('setCourses', state.courses)
      return { success: true }
    } catch (error) {
      commit('setError', 'Error al obtener los cursos')
      return { success: false }
    } finally {
      commit('setLoading', false)
    }
  },

  async addCourse({ commit }, courseData) {
    commit('setLoading', true)
    commit('clearError')
    try {
      const id = Math.random().toString(36).slice(2)
      commit('addCourseLocal', { id, ...courseData })
      return { success: true, id }
    } catch (error) {
      const message = 'Error al agregar el curso'
      commit('setError', message)
      return { success: false, error: message }
    } finally {
      commit('setLoading', false)
    }
  },

  async updateCourse({ commit }, { courseId, courseData }) {
    commit('setLoading', true)
    commit('clearError')
    try {
      commit('updateCourseLocal', { id: courseId, data: courseData })
      return { success: true }
    } catch (error) {
      const message = 'Error al actualizar el curso'
      commit('setError', message)
      return { success: false, error: message }
    } finally {
      commit('setLoading', false)
    }
  },

  async deleteCourse({ commit }, courseId) {
    commit('setLoading', true)
    commit('clearError')
    try {
      commit('deleteCourseLocal', courseId)
      return { success: true }
    } catch (error) {
      const message = 'Error al eliminar el curso'
      commit('setError', message)
      return { success: false, error: message }
    } finally {
      commit('setLoading', false)
    }
  },

  clearError({ commit }) {
    commit('clearError')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
