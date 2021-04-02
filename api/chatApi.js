import axios from 'axios'

export default {

    async createMessage(data, cb){
        await axios.post(`/api/message`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getMessages(data, cb){
        await axios.get(`/api/message?userId=${data.userId}&interlocutorId=${data.interlocutorId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async setMessagesAsReaded(data, cb){
        await axios.patch(`/api/message`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    }
}
