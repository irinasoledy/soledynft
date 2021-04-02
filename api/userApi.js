import axios from 'axios'

export default {

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
