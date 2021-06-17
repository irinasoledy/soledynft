<template></template>

<script>

import {mapActions, mapGetters} from 'vuex'
import userApi from '@/api/userApi'

export default {
    props: ['title'],
    data() {
        return {
            employee: null,
            counter: null,
        }
    },
    computed: mapGetters({
        user: 'chat/getUser',
        lastMessage: 'dialog/getLastMessage',
        trans: 'getTranslations',
        navigation: 'getNavigations',
    }),
    beforeDestroy() {
        if (this.counter) {
            clearTimeout(this.counter);
        }
    },
    mounted() {
        if (!this.user.botActivated) {
            const path = this.$nuxt.$route.path
            this.counter = setTimeout(async (path) => {
                await this.findEmployee()
                if (this.employee) {
                    const message = await this.renderMessageTemplate()
                    this.sendMessage(this.user._id, this.employee._id, message, () => {
                        this.setUserBotActivated()
                    })
                }
            }, 30000)
        }
    },
    methods: {
        ...mapActions({
            createMessage: 'dialog/createMessage',
            createMessageFromSelf: 'dialog/createMessageFromSelf',
            setUser: 'chat/setUser',
            setNavigations: 'setNavigations',
        }),
        renderMessageTemplate() {
            let message = this.trans.General.hi + " " + " " + this.employee.name + " "
            message += this.title
            return message
        },
        async findEmployee() {
            await userApi.getRandomEmployee(response => this.employee = response)
        },
        async setUserBotActivated() {
            await userApi.setUserBotActivated({id: this.user._id}, response => this.setUser(response))
        },
        sendMessage(to, from, message, callback) {
            if (to) {
                const sendBy = 'employee'

                const data = {
                    senderId: from,
                    recepientId: to,
                    clientId: to,
                    employeeId: from,
                    message: message,
                    sendBy: sendBy,
                    session: to + from,
                    callAlert: false,
                }

                this.createMessage(data).then(() => {
                    this.createMessageFromSelf({ message: this.lastMessage, to, from })
                    callback()
                })
            }
        }
    }
}
</script>

<style lang="css" scoped>

</style>
