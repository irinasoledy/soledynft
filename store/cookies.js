import axios from "axios"

export const state = () => ({
    user: false,
})

export const mutations = {
     SET_USER_COOKIE(state, data){
        state.user = data
    },
}

export const actions = {
    async setUserCookies({ commit }, data){
        await axios.get("init-user-cookie").then(data => {
            commit('SET_USER_COOKIE', data.data)
        })
    }
}

export const getters = {
    getUserCookie(state){ return state.user },
}
