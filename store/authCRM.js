import crmApi from '@/api/crmApi'

export const state = () => ({
    user: null,
    token: null,
    message: null,
})

export const mutations = {

    SUCCESS_LOGIN(state, data) {
        state.loginMessage = data.message
        state.token = data.token
    },

    FAILED_LOGIN(state, data) {
        state.loginMessage = data.message
        state.token = null
    },

    SET_TOKEN(state, token) {
        state.token = token
    },

    SET_USER(state, user) {
        state.user = user
    },

    RESET_STATE(state) {
        state.user = null
        state.token = null
        state.message = null
    }
}

export const actions = {

    async login({ commit }, data) {
        await crmApi.login(data, response => {
            commit('SUCCESS_LOGIN', response)
        }, error => {
            commit('FAILED_LOGIN', error)
        })
    },

    async getUser({ state, commit }, data) {
        commit('SET_TOKEN', localStorage.getItem('crm-token'))

        await crmApi.getAuthUser(state.token, response => {
            commit('SET_USER', response.user)
        })
    },

    setUser({ commit }, user) {
        commit('SET_USER', user)
    },

    reset({ commit }) {
        commit('RESET_STATE')
    }
}

export const getters = {
    getUser: state => state.user,
    getMessage: state => state.message,
    getToken: state => state.token
}
