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
      // console.log('cmlcmlsdmlcmsdl');
      //   const { body } = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      // .then((response) => {
      //     const body = response.json()
      //     commit('SET_ANNOUNCEMENT', body)
      // })
    }
}

export const getters = {
    getAnnouncement: state => state.announcement
}
