<template lang="html">
    <div>
        <!-- Outgoing call -->
        <v-dialog
            content-class="video-dialog-window"
            class="messagesDialog"
            v-model="dialogOut"
            fullscreen
            hide-overlay
            persistent
            transition="dialog-bottom-transition"
            >
            <v-card v-if="videoInterlocuitor">
                <v-toolbar dark color="primary">
                    <v-icon class="minify-window" @click="minifyWindow()">mdi-chevron-down</v-icon>
                    <v-toolbar-title class="chat-user-name"><small>Video Chat with  - {{ videoInterlocuitor.name }}</small></v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-row class="call-area-out" align="center" justify="center" v-if="!response">
                    <v-col align="center">
                        <h3>Calling...</h3> <br>

                        <p v-if="reject">Call was rejected by callee</p>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            height="6"
                        ></v-progress-linear> <br>
                        <v-btn
                            class="mx-2"
                            fab dark large color="red"
                            @click="rejectOutgoingCall()"
                            >
                            <v-icon dark>
                                mdi-phone-hangup
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <VideoBox :user="user" :interlocuitor="callUser" :timer="timer" :mode="mode" v-else/>
            </v-card>
        </v-dialog>

        <!-- Incoming call -->
        <v-dialog
            v-model="dialogIn"
            persistent
            max-width="400"
            >
            <v-card class="call-area-in" align="center" justify="center">
                <h3>Incoming call</h3> <br>
                <p>{{ callUser.name }}</p>
                <div>
                    <v-progress-linear
                    indeterminate
                    color="primary"
                    height="6"
                    ></v-progress-linear> <br>
                </div>
                <v-btn
                    @click="acceptCall()"
                    class="mx-2"
                    fab dark large color="green"
                    >
                    <v-icon dark>mdi-phone</v-icon>
                </v-btn>
                <v-btn
                    class="mx-2"
                    fab dark large color="red"
                    @click="rejectIncomingCall()"
                    >
                    <v-icon dark>mdi-phone-hangup</v-icon>
                </v-btn>
            </v-card>
        </v-dialog>

        <Minified
            :dialogOut="dialogOut"
            :minifiedDialog="minifiedDialog"
            :timer="timer"
        />
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import VideoBox from '@/components/chat-module/video/videoBox'
import Minified from '@/components/chat-module/video/minified'

export default {
    props: ['user', 'mode'],
    data: () => ({
        dialogOut: false,
        dialogIn: false,
        minifiedDialog: false,
        audio: {},
        timer: {
            seted: false,
            seconds: 0,
            minutes: 0,
            hours: 0,
        },
        iterval: '',
        interlocuitor: {},
        userWith: {},

    }),
    computed: mapGetters({
        calling: 'dialog/getCalling',

        callUser: 'dialog/getCallUser',
        callFrom: 'dialog/getCallFrom',
        videoInterlocuitor: 'dialog/getVideoInterlocuitor',

        reject: 'dialog/getReject',
        response: 'dialog/getResponse',
        lastMessage: 'dialog/getLastMessage'
    }),
    watch: {
        reject() {
            setTimeout(() => {
                if (this.reject === true) {
                    this.dialogIn = false
                    this.dialogOut = false
                    this.minifiedDialog = false
                    this.audio.pause();
                    this.audio.currentTime = 0;
                    this.resetTimer()
                    // const message = 'Call Rejected'
                    // this.sendMessage(this.callUser._id, this.user._id, message, 'rejected')
                }
            }, 2000)
        },
        response() {
            if (this.response === true) {
                this.dialogOut = true
                this.audio.pause();
                this.audio.currentTime = 0;
                this.runTimer()
            }
        },
        calling() {
            if (this.calling === true) {
                this.dialogIn = true
                this.audio.play();
            }else{
                this.dialogIn = false
                this.dialogOut = false
                this.minifiedDialog = false
                this.audio.pause();
                this.audio.currentTime = 0;
                this.resetTimer()
            }
        },
        callUser() {
            if (this.callUser !== null) {
                this.startCall(this.callUser, this.user)
            }
        },
    },
    mounted() {
        $nuxt.$on('endVideoChat', () => {
            this.endCall()
            const message = `Call duration ${this.timer.minutes}:${this.timer.seconds}`
            this.sendMessage(this.callUser._id, this.user._id, message, 'accepted')
            this.resetTimer()
        })

        $nuxt.$on('openDialogOut', () => {
            this.dialogOut = true
        })

        this.audio = new Audio('/call.mp3')
    },
    methods: {
        ...mapActions({
            initCall : 'dialog/initCall',
            restartStatuses : 'dialog/restartStatuses',
            confirmCall : 'dialog/confirmCall',
            setVideoInterlocuitor: 'dialog/setVideoInterlocuitor',
            createMessage: 'dialog/createMessage'
        }),
        minifyWindow() {
            this.dialogOut = false
            this.minifiedDialog = true
        },
        startCall(to, from) {
            const data = { to, from }
            this.dialogOut = true
            this.restartStatuses(false)
            this.setVideoInterlocuitor(to)
            this.$socket.emit('startCall', data)
        },
        endCall() {
            const to = this.callUser
            this.restartStatuses(false)
            this.dialogOut = false
            this.dialogIn = false
            this.audio.pause()
            this.audio.currentTime = 0
            this.minifiedDialog = false
            const data = { to, from: this.user }
            this.$socket.emit('endCall', data)
        },
        acceptCall() {
            this.restartStatuses(true)
            this.dialogIn = false
            this.setVideoInterlocuitor(this.callFrom)

            this.$socket.emit('acceptCall', { to: this.callFrom, from: this.user }, () => {
                this.confirmCall()
            })
        },
        resetTimer() {
            clearInterval(this.iterval)
            console.log('reset')
            this.timer.seted = false
            this.timer.seconds = 0
            this.timer.minutes = 0
            this.timer.hours = 0
            console.log(this.timer)
        },
        runTimer() {
            this.resetTimer()
            this.timer.seted = true
            let sec = 0;
            this.iterval = setInterval(() => {
                this.timer.seconds = this.pad(++sec%60)
                this.timer.minutes = this.pad(parseInt(sec/60,10))
            }, 1000);
        },
        pad(val) {
            return val > 9 ? val : "0" + val
        },
        rejectOutgoingCall() { //missed call
            const message = 'Missed Call'
            const status = 'missed'
            this.endCall()
            this.sendMessage(this.callUser._id, this.user._id, message, status)
        },
        rejectIncomingCall() { //reject call
            const message = 'Rejected Call'
            const status = 'rejected'
            this.endCall()
            this.sendMessage(this.callUser._id, this.user._id, message, status)
        },
        sendMessage(to, from, message, callStatus) {
            if (to) {
                const sendBy = this.mode === 'employee' ? 'client' : 'employee'

                const data = {
                    senderId: from,
                    recepientId: to,
                    clientId: to,
                    employeeId: from,
                    message: message,
                    sendBy: sendBy,
                    session: to + from,
                    callAlert: true,
                    callStatus
                }

                this.createMessage(data).then(() => {
                    this.$socket.emit( "createMessage", { message: this.lastMessage, to, from }, data => {})
                })
            }

        }
    }
}
</script>

<style lang="scss">
    .video-dialog-window {
        width: 70% !important;
        height: calc(100vh - 128px);
        right: 30%;
        bottom: 0;
        top: auto;
        left: auto;
    }
    .call-area-out{
        height: calc(100vh - 128px - 70px) !important;
        padding: 15px;
    }
    .call-area-in{
        padding: 20px;
    }
    @media (max-width: 991px) {
        .video-dialog-window {
            width: 100% !important;
            height: calc(100vh - 52px);
            right: 0;
            bottom: 0;
            top: auto;
            left: auto;
        }
        .minified-block{
            width: 100% !important;
            right: 0 !important;
            .alert-area{
                padding-right: 39px;
                font-size: 12px;
            }
        }
    }
    .minify-window{
        cursor: pointer;
        margin-right: 20px;
    }
    .minified-block{
        position: fixed;
        bottom: 0;
        right: 25%;
        z-index: 9;
        background-color: #FFF;
        width: 50%;
        cursor: pointer;
        .timer{
            position: absolute;
            right: 15px;
            top: 23px;
            font-size: 19px;
            font-weight: bold;
        }
    }
</style>
