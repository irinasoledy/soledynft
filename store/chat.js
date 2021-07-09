import axios from 'axios'
import userApi from '@/api/userApi'
import chatApi from '@/api/chatApi'

export const state = () => ({
    employees : [],
    employee: {},
    clients: [],
    client: {},
    rooms: [],
    room: {},
    participants: {},
    user: {},
    messages: [],
    newMessage: {},
    userMessages: [],
    lastMessage: {},
    waiting: true,
    history: {},
    cookie: false,
    policy: true,

    // Feauters:
    camera: false,
    microphone: true,
    endChat: false,

    // Video calling
    connectRoom: true,
    videoProccess: true,
    audioProccess: true,
    videoMute: false,
    videoUnmute: false,
    audioMute: false,
    audioUnmute: false,
    chatBotMessage: null,
})

export const mutations = {
    CREATE_ROOM(state, data){
        state.room = data.room
        state.employee = data.user
        state.participants.employee = data.user
        state.user = data.user
    },
    SET_ROOM_LIST(state, data){
        state.rooms = data
    },
    CHANGE_EMPLOEE_SATUS(state, rooms){
        state.rooms = rooms
    },
    SOCKET_reloadEmployeeList(state, data){
        state.rooms = data
    },
    SOCKET_joinExistingRoom(state, data) {
        state.client = data.user
        state.room = data.room
        state.waiting = false
    },
    SOCKET_joinRoom(state, data){
        if (data.client) {
            state.client = data.client
        }
        if (data.employee) {
            state.employee = data.employee
        }
        state.room = data.room
    },
    SET_CLIENT_AS_USER(state, employee){
        state.employee = employee
    },
    SET_HISTORY(state, data){
        state.lastMessage = data
        state.history = data.history
    },
    SET_USER_COOKIE(state, data){
       state.cookie = data.cookie
       state.user = data.user
   },
   SET_MESSAGES_HISTORY(state, data){
       state.messages = data.parsed
       state.userMessages = data.messages
   },
   SOCKET_shareHistory(state, messages){
       state.messages = messages
   },
   SET_USER(state, user){
        state.user = user
   },

     // Video calling
     SOCKET_stopChat(state){
         state.endChat = state.endChat ? false : true
     },
     SOCKET_changeVideoProccess(state){
         if (state.videoProccess === false) {
             state.videoProccess = true
         }else{
             state.videoProccess = false
         }
     },
     SOCKET_videoMute(state, data){
         state.videoMute = data
         state.videoUnmute = false
     },
     SOCKET_videoUnmute(state, data){
         state.videoMute = false
         state.videoUnmute = data
     },
     SOCKET_audioMute(state, data){
         state.audioMute = data
         state.audioUnmute = false
     },
     SOCKET_audioUnmute(state, data){
         state.audioMute = false
         state.audioUnmute = data
     },
     SWITCH_CAMERA(state, statut){
         state.camera = statut
     },
     SWITCH_MICROPHONE(state, statut){
         state.microphone = statut
     },
     SWITCH_POLICY(state){
         state.policy = false
     },
     SET_CHAT_BOT_MESSAGE(state, message) {
         state.chatBotMessage = message
     }
}

export const actions = {
    setChatBotmessage({ commit }, message) {
        commit('SET_CHAT_BOT_MESSAGE', message)
    },
    createNewRoom({ commit }, name) {
        axios.post('/create-employee-user', {name: name})
            .then(response => {
                commit('CREATE_ROOM', response.data)
            })
    },
    getActiveRoomList({ commit }){
        axios.post('/get-active-room-list')
            .then(response => {
                commit('SET_ROOM_LIST', response.data)
            })
    },
    changeEmployeeStatus({ commit }, data){
        return new Promise((resolve, reject) => {
            axios.post('/change-emploee-status', data)
                .then(response => {
                    commit('CHANGE_EMPLOEE_SATUS', response.data)
                    resolve('Success')
                })
        })
    },
    joinExistingRoom({ commit }, data){
    },
    setClientAsUser({ commit }, employee){
        commit('SET_CLIENT_AS_USER', employee)
    },
    async createMessage({ commit }, data){
        await chatApi.createMessage(data, response => commit('SET_HISTORY', response))
    },
    async setUserCookies({ commit }, data){
        await userApi.getUser(data, response => commit('SET_USER_COOKIE', response))
    },
    async getClientMessages({ commit }, userId){
        const m = (name, text, id) => ({ name, text, id })

        await axios.post("/get-user-messages", {userId: userId}).then(data => {})
    },
    async savePolicyOptions({ commit }, data){
        userApi.savePolicy(data)
    },
    setUser({ commit }, user){
        commit('SET_USER', user)
    },
    switchCamera({ commit }, statut){
        commit('SWITCH_CAMERA', statut)
    },
    switchMicrophone({ commit }, statut){
        commit('SWITCH_MICROPHONE', statut)
    },
    switchPolicy({ commit }){
        commit('SWITCH_POLICY')
    }
}

export const getters = {
    getRooms: state => state.rooms,
    getRoom: state => state.room,
    getEmployee: state => state.employee,
    getClient: state => state.client,
    getMessages: state => state.messages,
    getNewMessage: state => state.newMessage,

    getUserMessages: state => state.userMessages,
    getLastMessage: state => state.lastMessage,
    getUser: state => state.user,
    getHistory: state => state.history,
    getUserCookie: state => state.cookie,
    getWaiting: state => state.waiting,
    // to change
    getConnectRoom: state => state.connectRoom,
    getVideoProccess: state => state.videoProccess,
    getAudioProccess: state => state.audioProccess,
    getVideoMute: state => state.videoMute,
    getVideoUnmute: state => state.videoUnmute,
    getAudioMute: state => state.audioMute,
    getAudioUnmute: state => state.audioUnmute,

    // Feauters:
    getCamera: state => state.camera,
    getMicrophone: state => state.microphone,
    getEndChat: state => state.endChat,

    getPolicy: state => state.policy,

    getLastMessage: state => state.lastMessage,
    getChatBotMessage: state => state.chatBotMessage,
}
