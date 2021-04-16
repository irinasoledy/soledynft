import axios from 'axios'

export default {

    async register(data, cb, cbError){
        await axios.post(`/auth/register`, data)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async getUser(data, cb){
        await axios.get(`/init-user-cookie`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async savePolicy(data){
        await axios.post(`/api/policy`, data)
            .then(response => true)
            .catch(err => console.log(err) )
    }

}
