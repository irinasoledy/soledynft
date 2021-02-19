import axios from "axios"

export const state = () => ({
    employees: [],
    clients: [],
    authUser: false,
    status: false,
    notifications: [],
    historyClientsList: [],
})

export const mutations = {
    LOGIN(state, data){
        state.authUser = data.user
    },
    INIT_APP_DATA(state, data){
        state.employees = data.employees
        state.authUser = data.authUser
    },
    ADD_NEW_EMPLOYEE(state, data){
        state.employees.push(data)
    },
    REMOVE_EMPLOYEE(state, id){
        state.employees = state.employees.filter(function(item) {
            return item._id !== id
        })
    },
    SET_USER_STATUS(state, data){
        state.status = data.user.online
        state.authUser = data.user
        state.notifications = data.notifications
    },
    SET_NOTIFICATIONS(state, data){
        state.notifications = data.notifications
    },
    SET_CLIENTS(state, clients){
        state.clients = clients
    },
    REMOVE_CLIENT(state, id){
        state.clients = state.clients.filter(function(item) {
            return item._id !== id
        })
    },
    SET_HISTORY_CLIENT_LIST(state, data){
        state.historyClientsList = data
    }
}

export const actions = {
    async login({ commit }, data){
        await axios.post('/auth/user-login', data)
            .then(response => {
                commit('LOGIN', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
    async initApp({ commit }, data){
        await axios.post('/back/init-app')
            .then(response => {
                commit('INIT_APP_DATA', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
    async createNewEmployee({ commit }, data){
        await axios.post('/back/employees/create', data)
            .then(response => {
                commit('ADD_NEW_EMPLOYEE', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
    async editEmployeeInfo({ commit }, data){
        await axios.post('/back/employees/edit-info', data)
    },
    async editEmployeeAccount({ commit }, data){
        await axios.post('/back/employees/edit-account', data)
    },
    async removeEmployee({ commit }, id){
        await axios.post('/back/employees/remove', {id})
            .then(response => {
                commit('REMOVE_EMPLOYEE', id)
            }).catch(err => {
                console.log(err);
            })
    },
    async setUserStatus({ commit }, data){
        await axios.post('/back/employees/change-status', data)
            .then(response => {
                console.log(response.data);
                commit('SET_USER_STATUS', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
    async getNotifications({ commit }){
        await axios.post('/back/notifications/all')
            .then(response => {
                commit('SET_NOTIFICATIONS', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
    async getClientsList({ commit }){
        await axios.post('/back/clients/all')
            .then(response => {
                commit('SET_CLIENTS', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
    async editClientInfo({ commit }, data){
        await axios.post('/back/clients/edit-info', data)
    },
    async editClientAccount({ commit }, data){
        await axios.post('/back/clients/edit-account', data)
    },
    async removeClient({ commit }, id){
        await axios.post('/back/clients/remove', {id})
            .then(response => {
                commit('REMOVE_CLIENT', id)
            }).catch(err => {
                console.log(err);
            })
    },
    async getClientsHitoryList({ commit }, id){
        await axios.post('/back/history/get-clients-list', {id})
            .then(response => {
                commit('SET_HISTORY_CLIENT_LIST', response.data)
            }).catch(err => {
                console.log(err);
            })
    },
}

export const getters = {
    getEmployees(state){ return state.employees },
    getAuthUser(state){ return state.authUser },
    getStatus(state){ return state.status },
    getNotifications(state){ return state.notifications },
    getClients(state){ return state.clients },
    getHistoryClientsList(state){ return state.historyClientsList },
}
