import axios from 'axios'

export default {

    async getTwillioToken(identity, cb) {
        await axios.get(`/api/twillio/token?identity=${identity}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async createMessage(data, cb) {
        await axios.post(`/api/message`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getMessages(data, cb) {
        await axios.get(`/api/message?userId=${data.userId}&interlocutorId=${data.interlocutorId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async setMessagesAsReaded(data, cb) {
        await axios.patch(`/api/messages/readed`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getUnreadedMessages(id, cb) {
        await axios.get(`/api/messages/unreaded?user=${id}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async setUserCallStatus(data) {
        await axios.patch(`/api/user/callStatus`, data)
            .then(response => console.log('ok'))
            .catch(err => console.log(err) )
    },

    async setLeadsAmoCrm(data, cb) {
        await axios.post(`/api/leads`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    }

}


