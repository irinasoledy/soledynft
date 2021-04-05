import userApi from '@/api/userApi'
import chatApi from '@/api/chatApi'

export const state = () => ({
    messages: [],
    unreadMessages: [],
    unreadFrom: [],
    lastMessage: {},
    interlocutorMessage: null,
    interlocutor: {}
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
        if (state.interlocutorMessage === data.from) {
            state.messages.push(data.message)
        }else{
            state.unreadMessages.push(data)
        }
        state.lastMessage = data.message
    },
    SOCKET_refreshReadedMessages(state, data) {
        if (state.interlocutorMessage === data.from) {
            state.messages = data.messages
        }
    },
}

export const actions = {
    setInterlocutorMessageUser({ commit }, user) {
        commit('setInterlocutor', user)
    },

    setInterlocutor({ commit }, user) {
        commit('setInterlocutor', user)
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
    getUnreadMessages: state => state.unreadMessages,
    getUnreadFrom: state => state.unreadFrom,

    getInterlocutor: state => state.interlocutor
}
