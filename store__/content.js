import axios from 'axios'

export const state = () => ({
    announcement: null,
    experts: [],
})

export const mutations = {
    SET_ANNOUNCEMENT(state, message){
        state.announcement = message
    },
    SET_EXPERTS(state, experts){
        state.experts = experts
    },
}

export const actions = {
    async nuxtServerInit({ commit }) {
        commit('SET_ANNOUNCEMENT', "mlmlm")
    },
    async getExpertsList({ commit }){
        axios.get('/api/v1/experts').then(data => {
            commit('SET_EXPERTS', data.data)
        })
    }
}

export const getters = {
    getAnnouncement: state => state.announcement,
    getExperts: state => state.experts,
}
