import axios from "axios"

export const state = () => ({
    roomId: false,
    call: false,
    reject: false,
    response: false,
})

export const mutations = {
    SOCKET_call(state, data){
        state.call = data.call
    },
    SOCKET_setRoom(state, data){
        state.roomId = data.roomId
    },
    SET_NULL_CALL(state){
        state.call = false
    },
    SOCKET_call_reject(state, statut){
        state.reject = statut
    },
    SOCKET_call_response(state, statut){
        state.response = statut
    },
}

export const actions = {
    setNullCall({ commit }){
        commit('SET_NULL_CALL')
    },
    setDefaultReject({ commit }){
        commit('SOCKET_call_reject', false)
    },
    setDefaultResponse({ commit }){
        commit('SOCKET_call_response', false)
    },
}

export const getters = {
    getCall: state => state.call,
    getRoomId: state => state.roomId,
    getReject: state => state.reject,
    getResponse: state => state.response,
}
