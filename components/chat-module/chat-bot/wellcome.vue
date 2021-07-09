<template lang="html">
    <v-card-text class="chat-bot">
        <div class="text-center" v-if="!alert">
            <h3 class="text-left">Hello</h3>
            <p class="text-left">{{ chatBotMessage }}</p>
            Intreaba-ne Live:
            <section class="text-left" @click="attemptToCall()">
                <v-icon>mdi-video</v-icon>
                <span class="section-title">Web chat</span>
                <span>Chat with one of our friendly experts.</span>
            </section>
            sau
            <div class="discus-options text-left">
                <span @click="attemptToRequestCall()"><v-icon color="primary">mdi-phone</v-icon> VREAU SA MA SUNATI</span>
                <span @click="attemptToDialog()"><v-icon color="primary">mdi-chat</v-icon> VREAU SA-MI SCRIETI AICI</span>
                <span @click="clossDialog()"><v-icon color="primary">mdi-close</v-icon> NU, MULTUMESC</span>
            </div>
        </div>
        <p v-if="alert" class="text-center">
            Va multumim pentru raspuns.
            Ne contactati oricind aveti nevoie de ajutor.
            Chatul se va inchide automat in {{ counter }} sec.
        </p><br>  <hr><br>
        <nuxt-link :to="'/ro/terms'">Privacy policy</nuxt-link>
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
            this.employee = this.lastMessage ? this.lastMessage.employee : null
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
                    this.message = `Buna ziua. Ma numesc ${this.employee.name}.
                                    Sunt acum in altă discuție.
                                    Lasati va rog numarul de contact si revin in max. 30 de minute`
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
                this.message = `Buna ziua. Ma numesc ${this.employee.name}.
                                Lasati va rog un numar de contact si revenim noi cu un sunet`
                this.sendMessage(this.user._id, this.employee._id, this.message)
            }
        },
        async attemptToDialog() {
            await this.findEmployee()
            if (this.employee === null) {
                await this.findOfflineEmployee()
            }

            if (this.employee) {
                this.message = `Buna ziua. Ma numesc ${this.employee.name}.
                                Cu ce va pot ajuta?`
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
