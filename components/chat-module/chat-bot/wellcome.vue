<template lang="html">
    <v-card-text class="chat-bot">
        <div class="text-center" v-if="!alert">
            <h3 class="text-left">{{ trans.General.zoomHi }}</h3>
            <p class="text-left">{{ chatBotMessage }}</p>
            {{ trans.General.zoomAskLive }}
            <section class="text-left" @click="attemptToCall()">
                <v-icon>mdi-video</v-icon>
                <span class="section-title">Web chat</span>
                <span>{{ trans.General.zoomTalkToExperts }}</span>
            </section>
            {{ trans.General.orClickBelow }}
            <div class="discus-options text-left">
                <span @click="attemptToRequestCall()"><v-icon color="primary">mdi-phone</v-icon>{{ trans.General.zoomCallme }}</span>
                <span @click="attemptToDialog()"><v-icon color="primary">mdi-chat</v-icon>{{ trans.General.zoomWriteMe }}</span>
                <span @click="clossDialog()"><v-icon color="primary">mdi-close</v-icon>{{ trans.General.zoomNoThanks }}</span>
            </div>
        </div>
        <p v-if="alert" class="text-center">
            {{ trans.General.zoomResponseNoThanks }}
        </p><br>  <hr><br>
        <nuxt-link :to="'/ro/terms'">{{ trans.General.zoomPrivacy }}</nuxt-link>
    </v-card-text>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import userApi from '@/api/userApi'

export default {
    props: ['recipient'],
    data() {
        return {
            employee: this.lastMessage ? this.lastMessage.sender : null,
            counter: null,
            message: '',
            alert: false,
            counter: 5,
            assigned: false,
        }
    },
    computed: mapGetters({
        language: 'getLanguage',
        trans: 'getTranslations',
        chatBotMessage: 'chat/getChatBotMessage',
        lastMessage: 'dialog/getLastMessage',
        user: 'chat/getUser',
    }),
    mounted() {
        this.$nuxt.$on('checkAssignedStatut', () => {
            if (this.lastMessage.employee) {
                if (this.lastMessage.employee._id !== this.user._id) {
                    this.employee = this.lastMessage.employee
                } else {
                    this.employee = this.lastMessage.client
                }
            }

            // this.employee = this.lastMessage ? this.lastMessage.employee : null
            if (this.employee) {
                this.$nuxt.$emit('closeChatBotDialog')
                this.openDialog(this.employee)
            }
        })
    },
    methods: {
        ...mapActions({
            initCall : 'dialog/initCall',
            createMessage: 'dialog/createMessage',
            createMessageFromSelf: 'dialog/createMessageFromSelf',
            setInterlocutor : 'dialog/setInterlocutor',
        }),
        async attemptToCall() {
            await this.findEmployee()
            if (this.employee !== null) {
                this.assigned = true
                this.$nuxt.$emit('closeChatBotDialog')
                this.openVideoCall(this.employee)
            }else{
                await this.findOfflineEmployee()
                if (this.employee) {
                    this.message = `${this.trans.General.zoomMyName} ${this.employee.name}
                                    ${this.trans.General.zoomResponseBusy}`
                    this.sendMessage(this.user._id, this.employee._id, this.message)
                }
            }
        },
        async attemptToRequestCall() {
            await this.findEmployee()
            if (this.employee === null) {
                await this.findOfflineEmployee()
            }

            if (this.employee) {
                this.message = `${this.trans.General.zoomMyName} ${this.employee.name}
                                ${this.trans.General.zoomResponseUsToContactUser}`
                this.sendMessage(this.user._id, this.employee._id, this.message)
            }
        },
        async attemptToDialog() {
            await this.findEmployee()
            if (this.employee === null) {
                await this.findOfflineEmployee()
            }

            if (this.employee) {
                this.message = `${this.trans.General.zoomMyName} ${this.employee.name}
                                ${this.trans.General.canIHelp}`
                this.sendMessage(this.user._id, this.employee._id, this.message)
            }
        },
        clossDialog() {
            this.alert = true
            const timer = setInterval(() => {
                this.counter = this.counter - 1
            }, 1000)
            setTimeout(() => {
                this.alert = false
                this.$nuxt.$emit('closeChatBotDialog')
                clearTimeout(timer)
                this.counter = 5
            }, 5000)
        },
        async findEmployee() {
            await userApi.getRandomEmployee(response => this.employee = response)
        },
        async findOfflineEmployee() {
            await userApi.getRandomOfflineEmployee(response => this.employee = response)
        },
        openVideoCall(user) {
            this.initCall(user)
        },
        openDialog(user) {
            this.setInterlocutor(null)
            this.setInterlocutor(user)
        },
        sendMessage(to, from, message) {
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
                    this.assigned = true
                    this.$nuxt.$emit('closeChatBotDialog')
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.discus-options {
    margin-bottom: 30px;
}
.discus-options span{
    display: block;
    padding: 10px;
    color: $custom_blue;
    font-weight: 500;
    cursor: pointer;
}
</style>


