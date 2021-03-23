import axios from 'axios'

export const state = () => ({
    envAPI: {},
    user: {},
    room: false,
    drawer: true,

    services: [],
    allServices: [],
    promotions: [],
    langs: [{id: 1, lang : 'ro', active: 1}, {id: 2, lang : 'en', active: 0}],
    lang: {id: 1, lang : 'ro', active: 1},
    translations: {},
    banners: [],
    pages: [],
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
      state.promotions = data.promotions
      state.pages = data.pages
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
    SET_ENV_API(state, env){
        state.envAPI = env
    }
}

export const actions = {
    async nuxtServerInit({ state, commit }) {
        await axios.get(`${process.env.API}/api/v2/data?lang=${state.lang.lang}`)
            .then(response => {
                commit('SET_SERVICES', response.data)
            }).catch(err => { console.log(err) })

        await axios.get(`${process.env.API}/api/v2/translations?lang=${state.lang.lang}`)
            .then(response => {
                commit('SET_TRANSALATIONS', response.data)
            }).catch(err => { console.log(err) })

        commit('SET_ENV_API', process.env.API)
    },
    async changeLanguage({ state, commit }, id) {
        commit('SET_DEFAULT_LANG', id)
        await axios.get(`${process.env.API}/api/v2/data?lang=${state.lang.lang}`)
            .then(response => {
                commit('SET_SERVICES', response.data)
            }).catch(err => { console.log(err) })

        await axios.get(`${process.env.API}/api/v2/translations?lang=${state.lang.lang}`)
            .then(response => {
                commit('SET_TRANSALATIONS', response.data)
            }).catch(err => { console.log(err) })
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
    getChangedEmployee: state => state.changedEmployee,
    getEnvAPI: state => state.envAPI,
    getPromotions: state => state.promotions,
    getPages: state => state.pages
}
