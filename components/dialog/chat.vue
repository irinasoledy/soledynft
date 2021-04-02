<template lang="html">
    <div>
        <v-tooltip
            v-model="previewMessage"
            top
            >
            <template v-slot:activator="{ on, attrs }">
                <!-- Button -->
                <button type="button"
                    @click="toogleMessageDialog"
                    class="messages-btn transition-swing v-btn v-btn--bottom v-btn--is-elevated v-btn--fab v-btn--fixed v-btn--has-bg v-btn--right v-btn--round theme--light v-size--large primary"
                    style="z-index: 6; margin-bottom: 0px; transform-origin: center center;">
                    <span class="v-btn__content">
                        <span aria-hidden="true" class="v-icon notranslate theme--light">
                            <v-icon>mdi-chat</v-icon>
                        </span>
                    </span>
                    <small v-if="unreadMessages.length">{{ unreadMessages.length }}</small>
                </button>
            </template>
            <span>{{ lastMessage.message }}</span>
        </v-tooltip>

        <v-dialog
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
                    <v-btn
                        icon
                        dark
                        @click="dialogList = false"
                        >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Chats: </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list subheader class="messages-dialog-body">
                    <!-- <v-subheader>Recent chat</v-subheader> -->
                    <v-list-item
                        v-for="user in users"
                        :key="user.id"
                        @click="openDialogItem(user)"
                        class="item-dialog-list"
                        >
                        <v-list-item-avatar>
                            <v-img
                                v-if="user.avatar"
                                :src="`/avatars/${user.avatar}`"
                                ></v-img>
                            <v-avatar size="32" v-else dark color="info">
                                C
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="user.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon :color="user.online ? 'deep-purple accent-4' : 'grey'">
                                mdi-message-outline
                            </v-icon>
                            <v-badge color="red" overlap v-if="showUnreadByUser(user)">
                                <span slot="badge">
                                    {{ showUnreadByUser(user) }}
                                </span>
                            </v-badge>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
        <v-dialog
            class="messagesDialog"
            v-model="dialogItem"
            fullscreen
            hide-overlay

            >
            <v-card v-if="interlocutor">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="closeDialogList">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                        <v-avatar size="32" v-if="interlocutor.avatar" dark color="info">
                            <v-img
                                :src="`/avatars/${interlocutor.avatar}`"
                            ></v-img>
                        </v-avatar>
                        <v-avatar size="32" v-else dark color="info">
                            C
                        </v-avatar>
                    <v-toolbar-title class="chat-user-name"><small>{{ interlocutor.name }}</small> </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <chatBox :interlocutor="interlocutor" :mode="mode" />
            </v-card>
        </v-dialog>
        <v-snackbar
            v-if="snackbar"
            :vertical="vertical"
            >
            <small>new message!</small>
            <p>{{ newMessage.message }}</p>
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

import { mapActions, mapGetters } from "vuex"
import crmApi from '@/api/crmApi'
import chatBox from '@/components/dialog/chat/chatBox'

export default {
    props: ['mode'],
    data: () => ({
        dialogList: false,
        dialogItem: false,
        snackbar: true,
        vertical: true,
        previewMessage: false,
        users: [],
        userJoined: false,
        // interlocutor: {},
    }),
    watch:{
        $route (to, from){
            this.addUserAction(to)
        },
        unreadMessages(){
            this.previewMessage = true
        },
        call(){
            this.dialog = true
            var audio = new Audio('/salamisound-5580171-steam-locomotive-whistle.mp3'); // path to file
            audio.play();
            console.log('calling.....');
            this.setNullCall()
        },
        interlocutor(){
            if (this.interlocutor) {
                this.dialogItem = true
            }
        }
    },
    computed: mapGetters({
        user: 'chat/getUser',
        interlocutor: 'dialog/getInterlocutor',
        call : 'call/getCall',
        roomId : 'call/getRoomId',
        newMessage: 'chat/getNewMessage',
        lastMessage: 'dialog/getLastMessage',
        unreadMessages: 'dialog/getUnreadMessages',
        unreadFrom: 'dialog/getUnreadFrom'
    }),
    mounted(){
        if (!this.$store.state.chat.cookie && (this.mode === 'employee')) {
            this.setUserCookies().then(() => {
                if (!this.userJoined) {
                    this.$socket.emit('userJoin', this.user._id)
                    this.addUserAction(this.$route)
                    this.userJoined = true
                }
            })
        }
    },
    methods: {
        ...mapActions({
            "setUserCookies" : "chat/setUserCookies",
            'setNullCall' : 'call/setNullCall',
            'setUser' : 'chat/setUser',
            setInterlocutor : 'dialog/setInterlocutor',
            setInterlocutorMessageUser : 'dialog/setInterlocutorMessageUser',
            setInterlocutor : 'dialog/setInterlocutor',
            setMessagesAsReaded : 'dialog/setMessagesAsReaded',
        }),
        showUnreadByUser(user){
            if (this.unreadMessages.length) {
                const messages = this.unreadMessages.filter(message => {
                    return message.from === user._id
                })

                if (messages) {
                    return messages.length
                }
            }
        },
        async toogleMessageDialog(){
            await crmApi.getUsers(this.mode, response => this.users = response.users)
            this.dialogList = !this.dialogList
            this.previewMessage = false
        },
        closeDialogList(){
            this.previewMessage = false
            this.dialogList = true
            this.dialogItem = false
            // this.setInterlocutorMessageUser(null)
            this.setInterlocutor(null)
        },
        openDialogItem(user){
            console.log(user);
            this.previewMessage = false
            // this.interlocutor = user
            this.dialogList = false
            this.dialogItem = true
            this.setInterlocutor(user)
            // this.setInterlocutorMessageUser(user._id)
            this.checkUnreadMessages(user)
        },
        checkUnreadMessages(interlocutor){
            const unreadMessages = this.showUnreadByUser(interlocutor)

            if (unreadMessages) {
                this.setMessagesAsReaded({ interlocutorId : interlocutor._id, userId : this.user._id })
            }
        },
        addUserAction(route, counter = 0, pages = 1){
            if (this.mode === 'employee') {
                const data = {
                    userId : this.user._id,
                    cookie:  this.user.cookies,
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
        rejectCall(){
            this.dialog = false
            this.$socket.emit('rejectCall', { roomId: this.roomId })
        },
        responseCall(){
            const data = {
                roomId: this.roomId
            }
            this.$socket.emit('responseCall', { roomId: this.roomId })
            this.$socket.emit("joinRoomAsEmployee", {roomId : this.roomId, employee : this.user}, async response => {
                await this.setUser(this.user)
                this.$router.push("/conference")
            });
        }
    },
    components: {
        chatBox
    }
}
</script>

<style lang="scss">
    .v-dialog--fullscreen{
        width: 420px;
        height: calc(100vh - 140px);
        right: 0;
        bottom: 0;
        top: auto;
        left: auto;
    }
    .item-dialog-list{
        cursor: pointer;
    }
    .messages-btn small{
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
    .chat-user-name{
        margin-left: 20px;
    }
    .messages-dialog-header{
        position: fixed;
        width: 100%;
        z-index: 1
    }
    .messagesDialog{
        padding-top: 150px;
    }
    .messages-dialog-body{
        padding-top: 77px;
    }
</style>
