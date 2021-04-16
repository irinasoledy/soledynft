import axios from 'axios'

export default {

    async init(cb){
        await axios.get(`/api/crm/init`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async login(data, cb, cbError){
        await axios.post(`/api/crm/login`, data)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async getAuthUser(token, cb) {
        await axios.get(`/auth/crm/get`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => cb(response.data))
    },

    async getUser(id, cb){
        await axios.get(`/api/user?id=${id}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getUsers(type, cb){
        await axios.get(`/api/users?type=${type}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async createUser(data, cb){
        await axios.post(`/api/user`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async updateUser(id, user, cb){
        await axios.patch(`/api/${id}/user`, user)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async updateUserAvatar(id, user, cb){
        await axios.patch(`/api/${id}/user-avatar`, user)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async updateUserStatus(id, user, cb){
        await axios.patch(`/api/${id}/user-status`, user)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async deleteUser(id, cb){
        await axios.delete(`/api/${id}/user`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getNotifications(cb){
        await axios.get(`/api/notifications`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getHistory(id, cb){ //to change
        await axios.get(`/api/${id}/history`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getMessages(id, cb){
        await axios.get(`/api/messages?id=${id}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async assignmentServiceToEmployee(data, cb){
        await axios.post(`/api/user-services`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getEmployeeServices(id, cb){
        await axios.get(`/api/services?user=${id}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

}
