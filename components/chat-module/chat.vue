<template lang="html">
    <div class="chat-module">

        <!-- Button -->
        <button type="button"
                v-if="mode === 'client'"
                @click="toogleMessageDialog"
                class="messages-btn transition-swing v-btn v-btn--bottom v-btn--is-elevated v-btn--fab v-btn--fixed v-btn--has-bg v-btn--right v-btn--round theme--light v-size--large primary"
                style="z-index: 6; margin-bottom: 0; transform-origin: center center;">
            <span class="v-btn__content">
                <span aria-hidden="true" class="v-icon notranslate theme--light">
                    <v-icon>mdi-chat</v-icon>
                </span>
            </span>
            <small v-if="unreadMessages.length">{{ unreadMessages.length }}</small>
        </button>

        <!-- Button -->
        <button type="button"
                v-if="mode === 'employee'"
                @click="toogleBotDialog"
                class="messages-btn transition-swing v-btn v-btn--bottom v-btn--is-elevated v-btn--fab v-btn--fixed v-btn--has-bg v-btn--right v-btn--round theme--light v-size--large primary"
                style="z-index: 6; margin-bottom: 0; transform-origin: center center;">
            <span class="v-btn__content">
                <span aria-hidden="true" class="v-icon notranslate theme--light">
                    <v-icon>mdi-chat</v-icon>
                </span>
            </span>
            <small v-if="unreadMessages.length">{{ unreadMessages.length }}</small>
        </button>

        <v-dialog
            content-class="chat-dialog-window"
            class="messagesDialog"
            v-model="dialogBot"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar class="messages-dialog-header" dark color="primary">
                    <v-btn icon dark @click="dialogBot = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>
                <wellcome :recepient="user"></wellcome>
            </v-card>
        </v-dialog>

        <v-dialog
            content-class="chat-dialog-window"
            class="messagesDialog"
            v-model="dialogList"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    class="messages-dialog-header"
                    dark
                    color="primary"
                >
                    <v-btn icon dark @click="dialogList = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Chats:</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items></v-toolbar-items>
                </v-toolbar>
                <v-list subheader class="messages-dialog-body">
                    <v-subheader>Recent dialogs</v-subheader>
                    <hr>
                    <v-list-item
                        v-for="history in histories"
                        :key="history.id"
                        @click="openDialogItem(history.recipientId)"
                        class="item-dialog-list"
                    >
                        <v-list-item-avatar light>
                            <v-img
                                v-if="history.recipientId.avatar"
                                :src="`/avatars/${history.recipientId.avatar}`"
                            ></v-img>
                            <v-avatar size="32" v-else light color="#AAA" class="white--text">
                                {{ getInitials(history.recipientId) }}
                            </v-avatar>
                            <span class="user-online" v-if="history.recipientId.online"></span>

                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="_chat-title">
                                {{ history.recipientId.name }}
                                <span>{{ getTimeAgo(history.date) }}</span>
                            </v-list-item-title>
                            <small class="user-position" v-if="history.recipientId.position">
                                {{ trans.Team[history.recipientId.position] }}
                            </small>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-badge color="red" overlap v-if="showMissedCallsByUser(history.recipientId)">
                                <span slot="badge">
                                    {{ showMissedCallsByUser(history.recipientId) }}
                                </span>
                                <v-icon :color="history.recipientId.online ? 'deep-purple accent-4' : 'grey'">
                                    mdi-phone
                                </v-icon>
                            </v-badge>

                            <v-badge color="red" overlap v-if="showUnreadByUser(history.recipientId)">
                            <span slot="badge">
                                {{ showUnreadByUser(history.recipientId) }}
                            </span>
                                <v-icon :color="history.recipientId.online ? 'deep-purple accent-4' : 'grey'">
                                    mdi-message-outline
                                </v-icon>
                            </v-badge>
                            <v-icon v-else :color="history.recipientId.online ? 'deep-purple accent-4' : 'grey'">
                                mdi-message-outline
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <hr>
                    <v-list-item
                        v-for="user in users"
                        v-if="!histories.find(history => history.recipientId._id === user._id)"
                        :key="user.id"
                        @click="openDialogItem(user)"
                        class="item-dialog-list"
                    >
                        <v-list-item-avatar light>
                            <v-img
                                v-if="user.avatar"
                                :src="`/avatars/${user.avatar}`"
                            ></v-img>
                            <v-avatar size="32" v-else light color="#AAA" class="white--text">
                                {{ getInitials(user) }}
                            </v-avatar>
                            <span class="user-online" v-if="user.online"></span>

                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="user.name"></v-list-item-title>
                            <small class="user-position" v-if="user.position">{{ trans.Team[user.position] }}</small>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon :color="user.online ? 'deep-purple accent-4' : 'grey'">
                                mdi-message-outline
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>

        <v-dialog
            content-class="chat-dialog-window"
            class="messagesDialog"
            v-model="dialogItem"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card v-if="interlocutor">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="closeDialogList()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-avatar size="32" v-if="interlocutor.avatar" light color="info">
                        <v-img
                            :src="`/avatars/${interlocutor.avatar}`"
                        ></v-img>
                    </v-avatar>
                    <v-avatar size="32" v-else light color="info">
                        {{ getInitials(interlocutor) }}
                    </v-avatar>
                    <v-toolbar-title class="chat-user-name">
                        <small class="chat-name"> {{ interlocutor.name }} </small>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-icon v-if="mode === 'client'" @click.prevent="redirectToEditUser(interlocutor)" color="grey"
                            class="text-right">
                        mdi-account
                    </v-icon>

                    <v-icon @click.prevent="callTo(interlocutor)" color="grey" class="text-right">
                        mdi-phone
                    </v-icon>

                </v-toolbar>
                <chatBox :user="user" :interlocutor="interlocutor" :mode="mode"/>
            </v-card>
            <v-card v-else>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="closeDialogList()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-if="snackbar"
            :vertical="vertical"
        >
            <small>new message!</small>
            <p>{{ lastMessage.message }}</p>
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="primary"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex"
import crmApi from '@/api/crmApi'
import chatBox from '@/components/chat-module/chat/chatBox'
import wellcome from '@/components/chat-module/chat-bot/wellcome'

export default {
    props: ['mode', 'user'],
    data: () => ({
        dialogList: false,
        dialogItem: false,
        dialogBot: false,
        snackbar: true,
        vertical: true,
        previewMessage: false,
        users: [],
        histories: [],
        userJoined: false,
        botted: false,
        counter: null,
    }),
    watch: {
        $route(to, from) {
            this.addUserAction(to)
            this.setNavigations(to.path)
        },
        async refreshUserData() { // To test this method...
            if (this.dialogList || this.dialogItem) {
                this.getHistories()
                if (this.interlocutor && (typeof this.interlocutor !== "undefined")) {
                    const interlocutor = this.users.find(user => user._id === this.interlocutor._id)
                    // this.setInterlocutor(interlocutor)
                    this.checkUnreadMessages(interlocutor)
                }
            }
        },
        async dialogList() {
            if (this.dialogItem === false) {
                this.getHistories()
            }
        },
        dialogItem() {
            if (this.dialogItem === false) {
                this.setInterlocutor(null)
            }
        },
        unreadMessages() {
            this.previewMessage = true
        },
        newMessage() {
            if (this.dialogItem === false && (this.lastMessage.sender._id !== this.user._id)) {
                this.setInterlocutor(null)
                this.setInterlocutor(this.lastMessage.sender)
                this.botted = true
            }
            var audio = new Audio('/message.mp3')
            audio.play()
        },
        call() {
            this.dialog = true
            var audio = new Audio('/salamisound-5580171-steam-locomotive-whistle.mp3'); // path to file
            audio.play();
            console.log('calling.....');
            this.setNullCall()
        },
        interlocutor() {
            if (this.dialogItem === false) {
                if (this.interlocutor) {
                    this.dialogItem = true
                }else{
                    this.dialogItem = false
                }
            }

        }
    },
    computed: mapGetters({
        refreshUserData: 'dialog/getRefreshUserData',
        call: 'call/getCall',
        roomId: 'call/getRoomId',
        interlocutor: 'dialog/getInterlocutor',
        lastMessage: 'dialog/getLastMessage',
        newMessage: 'dialog/getNewMessage',
        unreadMessages: 'dialog/getUnreadMessages',
        unreadFrom: 'dialog/getUnreadFrom',
        messages: 'dialog/getMessages',
        from: 'dialog/getFrom',
        trans: 'getTranslations',
        navigation: 'getNavigations',
    }),
    beforeDestroy() {
        if (this.counter) {
            clearTimeout(this.counter);
        }
    },
    async mounted() {
        if (this.mode === 'employee') {
            this.counter = setTimeout(async () => {
                if (this.botted === false) {
                    this.dialogBot = true
                }
            }, 30000)
        }
        this.$nuxt.$on('closeChatBotDialog', () => {
            this.dialogBot = false
        })
        if (!this.$store.state.chat.cookie && (this.mode === 'employee')) {
            await this.setUserCookies().then(() => {
                if (!this.userJoined) {
                    this.$socket.emit('userJoin', this.user._id)
                    this.addUserAction(this.$route)
                    this.userJoined = true
                    this.$socket.emit('refreshUsersData')
                }
            })
        }
        // get Unreaded messages
        await this.getUnreadedMessages(this.user._id)
    },
    methods: {
        ...mapActions({
            setUserCookies: 'chat/setUserCookies',
            setNullCall: 'call/setNullCall',
            setUser: 'chat/setUser',
            getUnreadedMessages: 'dialog/getUnreadedMessages',
            setInterlocutor: 'dialog/setInterlocutor',
            setInterlocutorMessageUser: 'dialog/setInterlocutorMessageUser',
            setMessagesAsReaded: 'dialog/setMessagesAsReaded',
            initCall: 'dialog/initCall',
            setNavigations: 'setNavigations',
        }),
        getInitials(user) {
            const name = user.name
            if (name) {
                const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
                let initials = [...name.matchAll(rgx)] || [];

                initials = (
                    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
                ).toUpperCase();

                return initials
            }
            return 'C'
        },
        showUnreadByUser(user) {
            if (this.unreadMessages.length) {
                const messages = this.unreadMessages.filter(message => {
                    if (message.from === user._id && message.message.callAlert === false) {
                        return message
                    }
                })

                if (messages) {
                    return messages.length
                }
            }
        },
        showMissedCallsByUser(user) {
            if (this.unreadMessages.length) {
                const messages = this.unreadMessages.filter(message => {
                    if (message.from === user._id && message.message.callAlert === true) {
                        return message
                    }
                })
                if (messages) {
                    return messages.length
                }
            }
        },
        async getHistories() {
            await crmApi.getUsers(this.mode, response => this.users = response.users)
            await crmApi.getHistoryUsers(this.user._id, response => this.histories = response)
        },
        toogleBotDialog() {
            this.dialogBot = !this.dialogBot
            this.botted = true
            this.$nuxt.$emit('checkAssignedStatut')
        },
        async toogleMessageDialog() {
            this.getHistories()
            this.dialogList = !this.dialogList
            this.previewMessage = false
        },
        closeDialogList() {
             this.dialogItem = false
             this.previewMessage = false
             this.dialogList = false
             setTimeout(() => {
                 this.setInterlocutor(null)
             }, 0)
        },
        openDialogItem(user) {
            this.previewMessage = false
            this.dialogList = false
            this.dialogItem = true
            this.setInterlocutor(user)
            this.checkUnreadMessages(user)
        },
        checkUnreadMessages(interlocutor) {
            const unreadMessages = this.showUnreadByUser(interlocutor)

            if (unreadMessages) {
                this.setMessagesAsReaded({interlocutorId: interlocutor._id, userId: this.user._id}).then(data => {
                    this.$socket.emit('refreshReadedMessages', {
                        to: interlocutor._id,
                        messages: this.messages,
                        from: this.user._id
                    })
                })
            }
        },
        callTo(user) {
            this.dialogList = false
            this.dialogItem = false
            this.initCall(user)
        },
        redirectToEditUser(user) {
            this.$router.push(`/crm/clients/edit/${user._id}`)
        },
        addUserAction(route, counter = 0, pages = 1) {
            if (this.mode === 'employee') {
                const data = {
                    userId: this.user._id,
                    cookie: this.user.cookies,
                    online: 1,
                    logged: 0,
                    visits: pages,
                    lastVisit: Date.now(),
                    currentPage: route.fullPath,
                    status: 'new',
                    visitsMin: counter,
                }
                this.$socket.emit('shareUserAction', data)
            }
        },
        rejectCall() {
            this.dialog = false
            this.$socket.emit('rejectCall', {roomId: this.roomId})
        },
        responseCall() {
            const data = {
                roomId: this.roomId
            }
            this.$socket.emit('responseCall', {roomId: this.roomId})
            this.$socket.emit("joinRoomAsEmployee", {roomId: this.roomId, employee: this.user}, async response => {
                await this.setUser(this.user)
                this.$router.push("/conference")
            });
        },
        dateToYMD(date) {
            let strArray=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            let mins = date.getMinutes();
            let h = date.getHours();
            let d = date.getDate();
            let m = strArray[date.getMonth()];
            let y = date.getFullYear();

            return h + ':' + mins + ' ' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
        },
        getTimeAgo(date){
            return this.dateToYMD(new Date(date))
        },
    },
    components: {
        chatBox, wellcome
    }
}
</script>

<style lang="scss">
.amo-button-holder{
    z-index: 1 !important;
    bottom: 8px !important;
}
.v-btn--fab.v-size--large{
    height: 50px !important;
    width: 50px !important;
    right: 34px;
}
.user-online {
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    background: #27ae60;
    border-radius: 50%;
    right: 5px;
    bottom: 5px;
}

.chat-dialog-window {
    width: 30% !important;
    height: calc(100vh - 128px);
    right: 0;
    bottom: 0;
    top: auto;
    left: auto;
}

.chat-module .item-dialog-list {
    cursor: pointer;
}

.chat-module .messages-btn small {
    position: absolute;
    display: block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    top: 0px;
    left: 70%;
    background: $custom_red;
    border-radius: 50%;
    font-size: 13px;
}

.chat-module .chat-user-name {
    margin-left: 20px;
}

.chat-module .messages-dialog-header {
    position: fixed;
    width: 100%;
    z-index: 1
}

.chat-module .messagesDialog {
    padding-top: 150px;
}

.chat-module .messages-dialog-body {
    padding-top: 77px;
}

@media (max-width: 991px) {
    .chat-dialog-window {
        width: 100% !important;
        height: calc(100vh - 56px);
        right: 0;
        bottom: 0;
        top: auto;
        left: auto;
    }
}

.chat-name {
    margin-left: 20px;
}

.v-badge {
    margin: 0 10px;
}

hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
}
._chat-title{
    position: relative;
    span{
        position: absolute;
        font-size: 8px;
        right: 0px;
        top: 6px;
    }
}
.user-position{
    font-size: 11px !important;
    color: #AAA !important;
}
.chat-bot {
    padding-top: 30px !important;
    h3 {
        font-size: 20px;
        margin-bottom: 20px;
    }
    p {
        font-size: 16px;
    }
    section {
        border: 1px solid $custom_blue;
        border-radius: 10px;
        padding: 15px;
        cursor: pointer;
        margin-bottom: 20px;
        .v-icon {
            position: absolute;
            font-size: 40px;
            color: $custom_blue;
        }
        span {
            display: block;
            margin-left: 50px;
            font-size: 17px;
            line-height: 1;
        }
        .section-title {
            font-size: 22px;
            font-weight: bold;
            color: $custom_blue;
            text-transform: uppercase;
            margin-bottom: 10px;
            margin-top: 8px;
        }
    }
}
</style>
