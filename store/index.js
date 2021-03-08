import axios from 'axios'

export const state = () => ({
    user: {},
    room: false,
    drawer: true,

    services: [],
    allServices: [],
    langs: [{id: 1, lang : 'ro', active: 1}, {id: 2, lang : 'en', active: 0}],
    lang: {id: 1, lang : 'ro', active: 1},
    translations: {},
    changedEmployee: null
})

export const mutations = {
    setUser(state, user){
        const data = this.$axios.$get('/create-user', user);
        state.user = data
    },
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    drawer(state, val) {
        state.drawer = val
    },
    SET_SERVICES(state, data){
      state.services = data.services
      state.allServices = data.servicesAll
  },
    SET_DEFAULT_LANG(state, id){
        state.lang = state.langs.find((lang) => lang.id === id)
    },
    SET_TRANSALATIONS(state, data){
        state.translations = data.vars
    },
    SOCKET_refreshEmployeeStatus(state, employee){
        state.changedEmployee = employee
    },
}

export const actions = {
    async nuxtServerInit({ commit }) {
        // await axios.get('https://back.itmall.digital/api/v2/services/en')
        //     .then(response => {
        //         commit('SET_SERVICES', response.data)
        //     }).catch(err => { console.log(err) })
        await axios.get(`https://back.itmall.digital/api/v2/data?lang=en`)
            .then(response => {
                commit('SET_SERVICES', response.data)
            }).catch(err => { console.log(err) })

        await axios.get('https://back.itmall.digital/api/v2/translations?lang=en')
            .then(response => {
                commit('SET_TRANSALATIONS', response.data)
            }).catch(err => { console.log(err) })
    },
    changeLanguage({ commit }, id) {
        commit('SET_DEFAULT_LANG', id)
    },
    setDefaultChangedEmployee({ commit }){
        commit('SOCKET_refreshEmployeeStatus', null)
    }
}

export const getters = {
    getServices: state => state.services,
    getAllServices: state => state.allServices,
    getLanguages: state => state.langs,
    getLanguage: state => state.lang,
    getTranslations: state => state.translations,
    getChangedEmployee: state => state.changedEmployee
}
