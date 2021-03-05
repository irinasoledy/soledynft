import axios from 'axios'

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
    userMessages: [],
    lastMessage: {},
    waiting: true,
    history: {},
    cookie: false,

    // Feauters:
    camera: true,
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
    SOCKET_newMessage(state, data) {
        state.messages.push(data.simpleMessage)
        state.userMessages.push(data.message)
    },
    SOCKET_joinExistingRoom(state, data) {
        state.client = data.user
        state.room = data.room
        state.waiting = false
    },
    SOCKET_joinRoom(state, data){
        if (data.client) {
            state.client = data.client
            // state.user = data.user
        }
        if (data.employee) {
            state.employee = data.employee
            // state.user = data.user
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
     // SOCKET_changeAudioProccess(state){
     //     if (state.audioProccess === false) {
     //         state.audioProccess = true
     //     }else{
     //         state.audioProccess = false
     //     }
     // },
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
}

export const actions = {
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
        console.log(data, 'store');
    },
    setClientAsUser({ commit }, employee){
        commit('SET_CLIENT_AS_USER', employee)
    },
    async createMessage({ commit }, data){
        await axios.post('/create-message', data)
            .then(response => {
                commit('SET_HISTORY', response.data)
            })
    },
    async setUserCookies({ commit }, data){
        await axios.get("/init-user-cookie").then(data => {
            commit('SET_USER_COOKIE', data.data)
        })
    },
    async getClientMessages({ commit }, userId){
        const m = (name, text, id) => ({ name, text, id })

        await axios.post("/get-user-messages", {userId: userId}).then(data => {

            const parsedMessages = data.data.map((message) => {
                if (message.sendBy == "employee") {
                    return m (message.employee.name, message.message, message.employee._id)
                }else{
                    return m (message.client.name, message.message, message.client._id)
                }
            })

            commit('SET_MESSAGES_HISTORY', {messages: data.data, parsed: parsedMessages})
        })
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
}

export const getters = {
    getRooms: state => state.rooms,
    getRoom: state => state.room,
    getEmployee: state => state.employee,
    getClient: state => state.client,
    getMessages: state => state.messages,
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
}
