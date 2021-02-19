import axios from "axios"

export const state = () => ({
    auth: false,
})

export const mutations = {
     LOGIN(state, data){
        state.auth = data.auth
    },
}

export const actions = {
    login({ commit }, data){
        axios.post('/auth/user-login', data)
            .then(response => {
                commit('LOGIN', response.data)
            }).catch(err => {
                console.log(err);
            })
    }
}

export const getters = {
    getAuth(state){ return state.auth },
}
