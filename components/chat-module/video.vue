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
                    <v-toolbar-title class="chat-user-name">
                        <small>Video Chat with  - {{ videoInterlocuitor.name }}</small>
                    </v-toolbar-title>
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
            <v-card class="call-area-in" align="center" justify="center" v-if="accepted">
                <h3>Incoming call</h3> <br>
                <p v-if="callFrom">{{ callFrom.name }}</p>
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
            <v-card class="call-area-in" align="center" justify="center" v-else>
                <div class="call-allert" v-if="callFrom">
                    Veti fi apelat de {{ callFrom.name }} in {{ allertConter }} sec
                </div>
                <v-btn
                    @click="acceptRequestToCall()"
                    class="mx-2"
                    dark large color="green"
                    >
                    Accept
                </v-btn>
                <v-btn
                    class="mx-2"
                    dark large color="red"
                    @click="rejectRequestToCall()"
                    >
                    Refuz
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
        allertConter: 5,
        accepted: false,
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
        trans: 'getTranslations',
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
            this.accepted = false
            if (this.calling === true) {
                this.setUserCallStatus({userId: this.user._id, status: 'No answer'})
                this.allertConter = 5
                this.dialogIn = true
                // this.audio.play();
                const timer = setInterval(() => {
                    if (this.allertConter > 0) {
                        this.allertConter--
                    }else{
                        clearInterval(timer)
                        this.accepted = true
                    }
                }, 1000)
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
            createMessage: 'dialog/createMessage',
            setUserCallStatus: 'dialog/setUserCallStatus'
        }),
        acceptRequestToCall() {
            this.setUserCallStatus({userId: this.user._id, status: 'Accepted'})
            this.audio.play()
            this.accepted = true
            // this.acceptCall()
        },
        rejectRequestToCall() {
            this.setUserCallStatus({userId: this.user._id, status: 'Refused'})
            this.rejectIncomingCall()
        },
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
            this.setUserCallStatus({userId: this.user._id, status: 'Accepted'})
            this.restartStatuses(true)
            this.dialogIn = false
            this.setVideoInterlocuitor(this.callFrom)

            this.$socket.emit('acceptCall', { to: this.callFrom, from: this.user }, () => {
                this.confirmCall()
            })
        },
        resetTimer() {
            clearInterval(this.iterval)
            this.timer.seted = false
            this.timer.seconds = 0
            this.timer.minutes = 0
            this.timer.hours = 0
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
            this.setUserCallStatus({userId: this.user._id, status: 'Refused'})
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
        overflow: hidden;
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
            height: calc(100vh - 56px);
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
    .call-allert{
        margin-bottom: 30px;
        font-weight: bold;
    }
</style>

