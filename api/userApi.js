import axios from 'axios'

const backURL = 'https://back.soledynft.shop'

export default {

    async makeOffer(data, cb, cbError) {
        await axios.post(`${backURL}/en/api/offer`, data)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async setUserOnline(data, cb) {
        await axios.post(`/user/pong`, data)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async register(data, cb, cbError) {
        await axios.post(`/auth/register`, data)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async getUser(data, cb) {
        await axios.get(`/init-user-cookie`)
            .then(response => cb(response.data))
            .catch(err => console.log(err) )
    },

    async savePolicy(data) {
        await axios.post(`/api/policy`, data)
            .then(response => true)
            .catch(err => console.log(err) )
    },

    async attemptToLoginFacebook(provider, code, guest, cb, cbError) {
        await axios.post(`/auth/social/facebook`, {provider, code, guest})
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async attemptToLoginGoogle(provider, code, guest, cb, cbError) {
        await axios.post(`/auth/social/google`, {provider, code, guest})
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async bookUser(data, cb) {
        await axios.post(`/api/user/book`, data)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async valadateEmail(user, cb) {
        await axios.post(`/api/user/validate`, user)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async getRandomEmployee(cb) {
        await axios.get(`/api/user/random/employee`)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async getRandomOfflineEmployee(cb) {
        await axios.get(`/api/user/random/offline/employee`)
            .then(response => cb(response.data))
            .catch(err => cbError(err.response.data))
    },

    async setUserBotActivated(id, cb) {
        await axios.post(`/api/user/set/botActivated`, id)
            .then(response => cb(response.data))
    },

    async sendAcceptPoliciesMail(data) {
        await axios.post(`${process.env.APISERVICE}/api/mail/acceptPolicies`, data)
    },

    async socialLogin(hash, cb, cbError) {
        await axios.get(`${process.env.APISERVICE}/api/auth-user?hash=${hash}`)
            .then(response => cb(response))
            .catch(err => cbError(err.response.data))
    },

    async chechSocialUserLogin(data, cb) {
        await axios.post(`/api/auth/social`, data)
            .then(response => cb(response.data))
    },

    async addLeadToAmoCrm(data, cb) {
        const stringData = `?name=${data.name}&email=${data.email}&phone=${data.phone}&age=${data.age}&comments=${data.comments}&whatsapp=${data.whatsapp}&messenger=${data.messenger}&preferred=${data.preferred}`

        // Must be POST Method
        await axios.get(`${process.env.API}/api/v2/leads${stringData}`)
            .then(response => cb(response.data))
    },
}
