import contentApi from '@/api/contentApi'
import userApi from '@/api/userApi'

export const state = () => ({
    langs: [
        {id: 1, lang: 'ro', active: 1, name: 'RO'},
        {id: 2, lang: 'en', active: 0, name: 'EN'},
        {id: 3, lang: 'ru', active: 0, name: 'RU'}
    ],
    lang: {
        "id": 38,
        "lang": "ro",
        "default": 1,
        "description": "Romana",
        "active": 1,
        "created_at": "2019-09-16 03:02:30",
        "updated_at": "2020-08-05 07:40:18"
    },
    countries: {},
    country: {
        "id": 176,
        "name": "Romania",
        "iso": "RO",
        "iso3": "ROM",
        "num_code": 642,
        "phone_code": 40,
        "flag": "ro.png",
        "vat": "0.20",
        "active": 1,
        "main": 1,
        "lang_id": 38,
        "currency_id": 27,
        "warehouse_id": 1,
        "created_at": "2019-08-05 10:58:37",
        "updated_at": "2020-08-31 12:51:58"
    },
    currencies: {},
    currency: {
        "id": 5,
        "abbr": "EUR",
        "type": "1",
        "rate": "1.00",
        "active": 1,
        "exchange_dependable": 1,
        "correction_factor": "0.00",
        "created_at": "2019-08-05 17:48:31",
        "updated_at": "2020-08-31 12:48:58"
    },
    categories: {},
    collections: {},
    envAPI: {},
    pages: [],
    services: [],
    allServices: [],
    promotions: [],
    experts: [],
    translations: {},
    banners: [],
    drawer: true,

    user: {},
    room: false,
    changedEmployee: null,
    test: false,
    ping: false,
    pageName: '',
    navigations: 0,
})

export const mutations = {
    SET_SETTINGS(state, data) {
        state.langs = data.langs
        state.countries = data.countries
        state.currencies = data.currencies
    },
    SOCKET_pingUsers(state) {
        state.ping = !state.ping
    },
    SOCKET_refreshUserList(state, data) {
        this.commit('admin/SET_CLIENTS_ACTIONS', data.actions)
        this.commit('SET_EXPERTS', data.users)
    },
    setTest(state, param) {
        state.test = param
    },
    setUser(state, user) {
        const data = this.$axios.$get('/create-user', user);
        state.user = data
    },
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    drawer(state, val) {
        state.drawer = val
    },
    SET_SERVICES(state, data) {
        state.services = data.services
        state.allServices = data.servicesAll
        // state.promotions = data.promotions
        state.pages = data.pages
        state.banners = data.banners
    },
    SET_DEFAULT_LANG(state, id) {
        state.lang = state.langs.find((lang) => lang.id === id)
    },
    SET_DEFAULT_CURRENCY(state, id) {
        state.currency = state.currencies.find((currency) => currency.id === id)
    },
    SET_DEFAULT_COUNTRY(state, id) {
        state.country = state.countries.find((country) => country.id === id)
    },
    SET_TRANSALATIONS(state, data) {
        state.translations = data.vars
    },
    SET_CATEGORIES(state, data) {
        state.categories = data
    },
    SET_COLLECTIONS(state, data) {
        state.collections = data
    },
    SET_PROMOTIONS(state, data) {
        state.promotions = data
    },
    SOCKET_refreshEmployeeStatus(state, employee) {
        state.changedEmployee = employee
    },
    SET_ENV_API(state, env) {
        state.envAPI = env
    },
    SET_EXPERTS(state, experts) {
        state.experts = experts
    },
    SET_PAGE_NAME(state, pageName) {
        state.pageName = pageName
    },
    SET_NAVIGATION(state, nav) {
        state.navigations = nav
    }
}

export const actions = {

    async nuxtServerInit({state, commit}) {
        const currentLang = this.$router.history.current.params.lang

        if (currentLang) {
            const findLang = state.langs.find(lang => lang.lang === currentLang)
            if (findLang) {
                commit('SET_DEFAULT_LANG', findLang.id)
            }
        }

        await contentApi.getInitSettings(data => commit('SET_SETTINGS', data))

        await contentApi.getCategories(state.lang.lang, data => commit('SET_CATEGORIES', data))
        await contentApi.getCollections(state.lang.lang, data => commit('SET_COLLECTIONS', data))
        await contentApi.getPromotions(state.lang.lang, data => commit('SET_PROMOTIONS', data))


        await contentApi.getTranslations(state.lang.lang, data => commit('SET_TRANSALATIONS', data))
        await contentApi.getInitData(state.lang.lang, data => commit('SET_SERVICES', data))

        commit('SET_ENV_API', process.env.API)
    },

    // async changeLanguage({state, commit}, id) {
    //     commit('SET_DEFAULT_LANG', id)
    //     await contentApi.getTranslations(state.lang.lang, (response) => commit('SET_TRANSALATIONS', response))
    //     await contentApi.getInitData(state.lang.lang, (response) => commit('SET_SERVICES', response))
    // },

    async changeSettings({state, commit}, data) {
        commit('SET_DEFAULT_LANG', data.lang)
        commit('SET_DEFAULT_CURRENCY', data.currency)
        commit('SET_DEFAULT_COUNTRY', data.country)

        await contentApi.getCategories(state.lang.lang, data => commit('SET_CATEGORIES', data))
        await contentApi.getCollections(state.lang.lang, data => commit('SET_COLLECTIONS', data))
        await contentApi.getPromotions(state.lang.lang, data => commit('SET_PROMOTIONS', data))

        await contentApi.getTranslations(state.lang.lang, (response) => commit('SET_TRANSALATIONS', response))
        await contentApi.getInitData(state.lang.lang, (response) => commit('SET_SERVICES', response))
    },

    async getExpertsList({commit}) {
        await contentApi.getExperts(data => commit('SET_EXPERTS', data))
    },

    banner({state}) {
        return 'ok'
    },

    setDefaultChangedEmployee({commit}) {
        commit('SOCKET_refreshEmployeeStatus', null)
    },

    async setUserOnline({commit}, data) {
        await userApi.setUserOnline(data, response => {
            // commit('admin/SET_CLIENTS', response)
            // commit('SET_EXPERTS', response.users)
        }, error => {
            console.log(error);
        })
    },

    setPageName({commit}, pageName) {
        commit('SET_PAGE_NAME', pageName)
    },

    setNavigations({commit}, nav) {
        commit('SET_NAVIGATION', nav)
    }
}

export const getters = {
    getServices: state => state.services,
    getAllServices: state => state.allServices,

    getLanguages: state => state.langs,
    getLanguage: state => state.lang,

    getCountries: state => state.countries,
    getCountry: state => state.country,

    getCurrencies: state => state.currencies,
    getCurrency: state => state.currency,

    getTranslations: state => state.translations,
    getChangedEmployee: state => state.changedEmployee,
    getEnvAPI: state => state.envAPI,
    getPages: state => state.pages,
    getExperts: state => state.experts,
    getBanners: state => state.banners,
    getServerPing: state => state.ping,
    getPageName: state => state.pageName,
    getNavigations: state => state.navigations,

    getCategories: state => state.categories,
    getCollections: state => state.collections,
    getPromotions: state => state.promotions,
}
