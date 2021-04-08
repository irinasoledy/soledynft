import userApi from '@/api/userApi'
import chatApi from '@/api/chatApi'

export const state = () => ({
    messages: [],
    unreadMessages: [],
    unreadFrom: [],
    lastMessage: {},
    newMessage: {},
    interlocutorMessage: null,
    interlocutor: {},
    from: {},

    // video
    calling: false,

    callUser: {},
    callFrom: null,
    videoInterlocuitor: {},

    reject: false,
    response: false

})

export const mutations = {
    setInterlocutor(state, user){
        state.interlocutor = user
        if (state.interlocutor) {
            state.interlocutorMessage = user._id
        }else{
            state.interlocutorMessage = null
        }
    },
    initCall(state, user){
        state.callUser = null
        state.callUser = user
    },
    refreshAllMessages(state, data) {
        state.messages = data.messages
        state.unreadMessages = data.parsedUnreadedMessages
    },
    refreshMessages(state, message) {
        state.messages.push(message)
        state.lastMessage = message
    },
    getMessages(state, messages) {
        state.messages = messages
    },
    refreshUnreadMessages(state, messages) {
        state.unreadMessages = messages
    },
    SOCKET_newMessage(state, data) {
        state.lastMessage = data.message
        state.newMessage = data.message
        if (state.interlocutorMessage === data.from) {
            state.messages.push(data.message)
        }else{
            state.unreadMessages.push(data)
        }
    },
    SOCKET_refreshReadedMessages(state, data) {
        if (state.interlocutorMessage === data.from) {
            state.messages = data.messages
        }
    },

    // video
    SOCKET_incomingCall(state, data) {
        if (state.calling === false) {
            state.calling = true
            state.callFrom = data.from
            // state.callUser = data.from
        }
    },

    SOCKET_cancelCall(state, data) {
        state.callFrom = null
        // state.callUser = null
        state.calling = false
        state.reject  = true
    },

    SOCKET_acceptCall(state, data) {
        state.response = true
    },

    restartStatuses(state, status) {
        state.reject = false
        state.response = false
        state.calling = status
    },

    setResponse(state, status) {
        state.response = status
    },

    setReject(state, status) {
        console.log(state.reject, 1);
        state.reject = status
        console.log(state.reject, 2);
    },

    setVideoInterlocuitor(state, user) {
        state.videoInterlocuitor = user
    }
}

export const actions = {
    setInterlocutorMessageUser({ commit }, user) {
        commit('setInterlocutor', user)
    },

    setInterlocutor({ commit }, user) {
        commit('setInterlocutor', user)
    },

    initCall({ commit }, user){
        commit('initCall', user)
    },

    restartStatuses({ commit }, status) {
        commit('restartStatuses', status)
    },

    confirmCall({ commit }) {
        console.log('confirm');
        commit('setResponse', true)
        commit('setReject', false)
    },

    cancelCall({ commit }) {
        console.log('cancel');
        commit('setResponse', false)
        commit('setReject', true)
    },

    setVideoInterlocuitor({ commit }, user) {
        commit('setVideoInterlocuitor', user)
    },

    async createMessage({ commit }, data) {
        await chatApi.createMessage(data, response => commit('refreshMessages', response))
    },

    async getMessages({ commit }, data) {
        await chatApi.getMessages(data, response => commit('getMessages', response))
    },

    async setMessagesAsReaded({ commit }, data) {
        await chatApi.setMessagesAsReaded(data, response => commit('refreshAllMessages', response))
    },

    async getUnreadedMessages({ commit }, id) {
        await chatApi.getUnreadedMessages(id, response => commit('refreshUnreadMessages', response))
    },

}

export const getters = {
    getMessages: state => state.messages,
    getLastMessage: state => state.lastMessage,
    getNewMessage: state => state.newMessage,
    getUnreadMessages: state => state.unreadMessages,
    getUnreadFrom: state => state.unreadFrom,

    getInterlocutor: state => state.interlocutor,
    getFrom: state => state.from,

    // video
    getCallUser: state => state.callUser,
    getCalling: state => state.calling,
    getCallFrom: state => state.callFrom,
    getVideoInterlocuitor: state => state.videoInterlocuitor,
    getReject: state => state.reject,
    getResponse: state => state.response,
}
