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
    refreshMessages(state, message) {
        state.messages.push(message)
        state.lastMessage = message
    },
    getMessages(state, messages) {
        state.messages = messages
    },
    refreshUnreadMessages(unreadMessages) {
        console.log(unreadMessages);
    },
    SOCKET_newMessage(state, data) {
        if (state.interlocutorMessage === data.from) {
            state.messages.push(data.message)
        }else{
            state.unreadMessages.push(data)
        }
        state.lastMessage = data.message
    },
}

export const actions = {
    setInterlocutorMessageUser({ commit }, user){
        commit('setInterlocutor', user)
    },
    setInterlocutor({ commit }, user){
        commit('setInterlocutor', user)
    },
    async createMessage({ commit }, data){
        await chatApi.createMessage(data, response => commit('refreshMessages', response))
    },

    async getMessages({ commit }, data){
        await chatApi.getMessages(data, response => commit('getMessages', response))
    },

    async setMessagesAsReaded({ commit }, data){
        await chatApi.setMessagesAsReaded(data, response => commit('refreshUnreadMessages', response))
    }

}

export const getters = {
    getMessages: state => state.messages,
    getLastMessage: state => state.lastMessage,
    getUnreadMessages: state => state.unreadMessages,
    getUnreadFrom: state => state.unreadFrom,

    getInterlocutor: state => state.interlocutor
}
