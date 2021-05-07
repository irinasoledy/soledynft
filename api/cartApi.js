import axios from 'axios'

export default {
    async appendToCart(data, cb) {
        await axios.patch(`/api/cart`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async getCart(useId, cb) {
        await axios.get(`/api/cart?userId=${useId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async removeCart(data, cb) {
        await axios.delete(`/api/${data.cartId}/cart?userId=${data.userId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

}