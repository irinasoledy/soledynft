import axios from 'axios'

const backURL = 'https://back.soledynft.shop'

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

    async getMarketplaceCategory(data, cb){
        await axios.get(`${backURL}/api/marketplace/category?lang=${data.lang}&alias=${data.alias}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getAllProducts(data, cb){
        await axios.get(`${backURL}/api/products/all?lang=${data.lang}&currency=${data.currency}`)
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

    async getPromotions(data, cb){
        await axios.get(`${backURL}/api/promotions?lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getTranslations(lang, cb){
        await axios.get(`${backURL}/api/translations?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getBanners(lang, cb){
        await axios.get(`${backURL}/api/banners?lang=${lang}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getStaticPages(lang, cb){
        await axios.get(`${backURL}/api/static-pages?lang=${lang}`)
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

    async sortProducts(data, cb){
        await axios.get(`${backURL}/api/products/sort?order=${data.sort}&categoryId=${data.categoryId}&lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async filterProducts(data, cb){
        await axios.get(`${backURL}/api/products/filter?properties=${data.properties}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&categoryId=${data.categoryId}&lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getDefaultFilter(data, cb){
        await axios.get(`${backURL}/api/products/default-filter?categoryId=${data.categoryId}&lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getDesigners(data, cb){
        await axios.get(`${backURL}/api/designers?lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getDesigner(data, cb){
        await axios.get(`${backURL}/api/designer?lang=${data.lang}&currency=${data.currency}&alias=${data.alias}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },
}
