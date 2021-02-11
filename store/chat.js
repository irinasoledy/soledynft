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
    waiting: true,
    history: {},
    cookie: false,

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
    SOCKET_newMessage(state, message) {
        state.messages.push(message)
    },
    SOCKET_joinExistingRoom(state, data) {
        state.client = data.user
        state.room = data.room
        state.waiting = false
    },
    SET_CLIENT_AS_USER(state, employee){
        state.employee = employee
    },
    SET_HISTORY(state, history){
        state.history = history
    },
    SET_USER_COOKIE(state, data){
       state.cookie = data.cookie
       state.user = data.user
   },
   SET_MESSAGES_HISTORY(state, data){
       state.messages = data
   },
   SOCKET_shareHistory(state, messages){
       state.messages = messages
   },

   // Video calling

     SOCKET_stopChat(state){
         if (state.connectRoom === false) {
             state.connectRoom = true
         }else{
             state.connectRoom = false
         }
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
    createMessage({ commit }, data){
        axios.post('/create-message', data)
            .then(response => {
                commit('SET_HISTORY', response.data.history)
            })
    },
    async setUserCookies({ commit }, data){
        await axios.get("init-user-cookie").then(data => {
            commit('SET_USER_COOKIE', data.data)
        })
    },
    async getClientMessages({ commit }, userId){
        const m = (name, text, id) => ({ name, text, id })

        await axios.post("get-user-messages", {userId: userId}).then(data => {

            const parsedMessages = data.data.map((message) => {
                if (message.sendBy == "employee") {
                    return m (message.employee.name, message.message, message.employee._id)
                }else{
                    return m (message.client.name, message.message, message.client._id)
                }
            })

            commit('SET_MESSAGES_HISTORY', parsedMessages)
        })
    }
}

export const getters = {
    getRooms(state){ return state.rooms },
    getRoom(state){ return state.room },
    getEmployee(state){ return state.employee },
    getClient(state){ return state.client },
    getMessages(state){ return state.messages },
    getUser(state){ return state.user },
    getHistory(state){ return state.history },
    getUserCookie(state){ return state.cookie },
    getWaiting(state){ return state.waiting },

    getConnectRoom(state){ return state.connectRoom },
    getVideoProccess(state){ return state.videoProccess },
    getAudioProccess(state){ return state.audioProccess },
    getVideoMute(state){ return state.videoMute },
    getVideoUnmute(state){ return state.videoUnmute },
    getAudioMute(state){ return state.audioMute },
    getAudioUnmute(state){ return state.audioUnmute },
}
