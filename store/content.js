export const state = () => ({
  announcement: null
})

export const mutations = {
  SET_ANNOUNCEMENT(state, message){
    state.announcement = message
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
      commit('SET_ANNOUNCEMENT', "mlmlm")
    }
}

export const getters = {
    getAnnouncement: state => state.announcement
}
