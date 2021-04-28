import crmApi from '@/api/crmApi'

export const state = () => ({
    remoteLoginSwich: false,
    userToLogin: {},
})

export const mutations = {

    SOCKET_remoteLogin(state, data) {
        state.remoteLoginSwich = !state.remoteLoginSwich
        state.userToLogin = data.toLoginUser
    },
}

export const actions = {}

export const getters = {
    getRemoteLogin: state => state.remoteLoginSwich,
    getUserToLogin: state => state.userToLogin,
}
