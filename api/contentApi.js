import axios from 'axios'

const backURL = 'https://soledy.itmall.digital'

export default {

    async getInitSettings(cb){
        await axios.get(`${backURL}/api/settings`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getCartItems(id, cb){
        await axios.get(`${backURL}/api/cart?userId=${id}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async saveSettings(data, cb){ //to change
        await axios.get(`${backURL}/api/set/settings?lang=${data.lang}&currency=${data.currency}&country=${data.country}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

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

    async getCategory(data, cb){
        await axios.get(`${backURL}/api/category?lang=${data.lang}&alias=${data.alias}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getProduct(data, cb){
        await axios.get(`${backURL}/api/product?lang=${data.lang}&alias=${data.alias}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getCollections(lang, cb){
        await axios.get(`${backURL}/api/collections?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getCollection(data, cb){
        await axios.get(`${backURL}/api/collection?lang=${data.lang}&alias=${data.alias}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getNewProducts(data, cb){
        await axios.get(`${backURL}/api/products/new?lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getOutletProducts(data, cb){
        await axios.get(`${backURL}/api/products/outlet?lang=${data.lang}&currency=${data.currency}`)
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
