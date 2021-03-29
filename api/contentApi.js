import axios from 'axios'

export default {

    async getInitData(lang, cb){
        await axios.get(`${process.env.API}/api/v2/data?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getTranslations(lang, cb){
        await axios.get(`${process.env.API}/api/v2/translations?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getExperts(cb){
        await axios.get(`/api/experts`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getEmployeesByService(serviceId, cb){
        await axios.get(`/api/experts-by-service?serviceId=${serviceId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

}
