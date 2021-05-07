import cartApi from '@/api/cartApi'

export const state = () => ({
    cart: [],
    subtotal: 0,
    total: 0,
    step: 1,
})

export const mutations = {
    refreshCart(state, data) {
        state.cart = data
    },
    setCart(state, data) {
        state.cart = data
    },
    setStep(state, step) {
        state.step = step
    }
}

export const actions = {
    async appendToCart({commit}, data) {
        await cartApi.appendToCart(data, response => commit('refreshCart', response))
    },

    async getCart({commit}, userId) {
        await cartApi.getCart(userId, response => commit('setCart', response))
    },

    async removeCart({commit}, data) {
        await cartApi.removeCart(data, response => commit('refreshCart', response))
    },

    changeStep({commit}, step) {
        return commit('setStep', step)
    }

}

export const getters = {
    getCart: (state, getters, rootState) => {
        const services = rootState.allServices
        const user = rootState.auth.user

        const cart = state.cart.map(item => {
            const arr = {
                id: item._id,
                qty: item.qty,
                user: user,
                service: '',
            }
            arr.service = services.find(service => service.id == item.serviceId)
            return arr
        })
        return cart
    },
    getSubtotal: (state, getters) => {
        const carts = getters.getCart
        let subtotal = 0
        for (let i = 0; i < carts.length; i++ ){
            subtotal += parseFloat(carts[i].service.price)
        }
        return subtotal.toFixed(2)
    },
    getTotal: (state, getters) => {
        const carts = getters.getCart
        let subtotal = 0
        for (let i = 0; i < carts.length; i++ ){
            subtotal += parseFloat(carts[i].service.price)
        }
        return subtotal.toFixed(2)
    },
    getStep: state => state.step,
}
