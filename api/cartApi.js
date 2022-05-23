import axios from 'axios'

const backURL = 'https://back.soledynft.shop'

const token = 'SVQzSaN7QoRtGd6bAk8MeWoE8U1YhAmTvZNMEHUP'

const headers = {"X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":token}

export default {

    // async appendToCart(data, cb) {  // Remake post
    //     await axios.get(`${backURL}/api/set/cart?productId=${data.productId}&userId=${data.userId}`)
    //         .then(response => cb(response.data))
    //         .catch(err => console.log(err))
    // },

    async appendToCart(data, cb) {
        await axios.post(`${backURL}/en/api/cart`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async removeCart(data, cb) {
        await axios.delete(`${backURL}/en/api/cart?id=${data.cartId}&userId=${data.userId}&lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async updateCartQty(data, cb) {
        await axios.patch(`${backURL}/en/api/cart`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getCart(useId, cb) {
        await axios.get(`/api/cart?userId=${useId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async clearCart(data, cb) {
        await axios.delete(`${backURL}/en/api/carts?userId=${data.userId}&lang=${data.lang}&currency=${data.currency}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },



    async addCheckOutInfo(data, cb) {
        await axios.post(`/api/checkout`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async updateCheckOutInfo(data, cb) {
        await axios.patch(`/api/checkout`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async updatePaymentInfo(data, cb) {
        await axios.patch(`/api/checkout/payment`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async pay(data, cb) {
        await axios.patch(`/api/checkout/pay`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async changeOrderStatus(data, cb) {
        await axios.patch(`/api/order/status`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async changeOrderPayment(data, cb) {
        await axios.patch(`/api/order/payment`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async changeOrderAppointmentDate(data) {
        await axios.patch(`/api/order/appointment`, data)
    },

    async getOrders(data, cb) {
        await axios.get(`/api/orders?userId=${data.userId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async getOrder(orderId, cb) {
        await axios.get(`/api/order?id=${orderId}`)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async createStripeProducts(data, cb) {
        await axios.post(`/api/stripe`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },

    async addCartToOrder(data, cb) {
        await axios.patch(`/api/order/merge`, data)
            .then(response => cb(response.data))
            .catch(err => console.log(err))
    },


}









