import axios from 'axios'

const backURL = 'https://soledy.itmall.digital/'

export default {

    async getInitData(lang, cb){
        await axios.get(`${process.env.API}/api/v2/data?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getCategories(lang, cb){
        await axios.get(`${backURL}/api/categories?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getCollections(lang, cb){
        await axios.get(`${backURL}/api/collections?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getPromotions(lang, cb){
        await axios.get(`${backURL}/api/promotions?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
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
