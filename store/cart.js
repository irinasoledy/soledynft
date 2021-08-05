import cartApi from '@/api/cartApi'

export const state = () => ({
    userCartId: null,
    cartProducts: [],
    cartSubproducts: [],


    cart: [],
    subtotal: 0,
    total: 0,
    step: 1,
    order: null,
    refresh: false,
})

export const mutations = {
    SET_USER_CART_ID(state, id) {
        state.userCartId = id
    },
    SET_CART_ITEMS(state, data) {
        state.cartProducts = data.products
        state.cartSubproducts = data.subproducts
    },

    refreshCart(state, data) {
        state.cart = data
    },
    refreshOrder(state, data) {
        state.order = data
    },
    setStep(state, step) {
        state.step = step
    },
    SOCKET_refreshCart(state) {
        state.refresh = !state.refresh
    },
}

export const actions = {
    async appendToCart({commit}, data) {
        await cartApi.appendToCart(data, response => commit('refreshCart', response))
    },

    async getCart({commit}, userId) {
        await cartApi.getCart(userId, response => commit('refreshCart', response))
    },

    async removeCart({commit}, data) {
        await cartApi.removeCart(data, response => commit('refreshCart', response))
    },

    async updateQty({commit}, data) {
        await cartApi.updateCartQty(data, response => commit('refreshCart', response))
    },

    async addCheckOutInfo({commit}, data) {
        await cartApi.addCheckOutInfo(data, response => commit('refreshOrder', response))
    },

    async updateCheckOutInfo({commit}, data) {
        await cartApi.updateCheckOutInfo(data, response => commit('refreshOrder', response))
    },

    async updatePaymentInfo({commit}, data) {
        await cartApi.updatePaymentInfo(data, response => commit('refreshOrder', response))
    },

    async pay({commit}, data) {
        await cartApi.pay(data, response => {
            commit('refreshOrder', response)
            commit('refreshCart', [])
        })
    },

    resetOrder({commit}) {
        commit('refreshOrder', null)
    },

    changeStep({commit}, step) {
        return commit('setStep', step)
    }

}

export const getters = {
    getCartsProducts: state => state.cartProducts,
    getCartsSubproducts: state => state.cartSubproducts,
    getUserCartId: state => state.userCartId,

    getCart: (state, getters, rootState) => {
        const services = rootState.allServices
        const user = rootState.auth.user

        const cart = state.cart.map(item => {
            const arr = {
                id: item._id,
                qty: item.qty,
                user: user,
                service: '',
                stripePrice: '',
                stripeProduct: '',
            }
            arr.service = services.find(service => service.id == item.serviceId)
            // arr.stripePrice = services.find(service => service.id == item.serviceId)
            return arr
        })
        return cart
    },
    getSubtotal: (state, getters) => {
        const carts = getters.getCart
        let subtotal = 0
        for (let i = 0; i < carts.length; i++) {
            subtotal += parseFloat(carts[i].service.price) * carts[i].qty
        }
        return subtotal.toFixed(2)
    },
    getTotal: (state, getters) => {
        const carts = getters.getCart
        let subtotal = 0
        for (let i = 0; i < carts.length; i++) {
            subtotal += parseFloat(carts[i].service.price) * carts[i].qty
        }
        return subtotal.toFixed(2)
    },
    getStep: state => state.step,
    getOrder: state => state.order,
    getRefresh: state => state.refresh,
}
