export const state = () => ({
    user: {},
    room: false,
})

export const mutations = {
     setUser(state, user){
        const data = this.$axios.$get('/create-user', user);
        state.user = data
        // state.room = room
    },
}
