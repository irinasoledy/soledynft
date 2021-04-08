<template lang="html">
    <div>
        <!-- Outcomming call -->
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
                            fab
                            dark
                            large
                            color="red"
                            @click="endCall(callUser)"
                            >
                            <v-icon dark>
                                mdi-phone-hangup
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <VideoArea :interlocuitor="userWith" v-else/>

            </v-card>
        </v-dialog>

        <!-- incoming call -->
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
                    fab
                    dark
                    large
                    color="green"
                    >
                    <v-icon dark>
                        mdi-phone
                    </v-icon>
                </v-btn>
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    large
                    color="red"
                    @click="endCall()"
                    >
                    <v-icon dark>
                        mdi-phone-hangup
                    </v-icon>
                </v-btn>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import VideoArea from '@/components/video/descktop/videoArea'

export default {
    data: () => ({
        dialogOut: false,
        dialogIn: false,
        audio: {},
        userWith: {},
    }),
    computed: mapGetters({
        user: 'chat/getUser',
        calling: 'dialog/getCalling',

        callUser: 'dialog/getCallUser',
        callFrom: 'dialog/getCallFrom',
        videoInterlocuitor: 'dialog/getVideoInterlocuitor',

        reject: 'dialog/getReject',
        response: 'dialog/getResponse',
    }),
    watch: {
        reject() {
            setTimeout(() => {
                if (this.reject === true) {
                    this.dialogIn = false
                    this.dialogOut = false
                    this.audio.pause();
                    this.audio.currentTime = 0;
                }
            }, 2000)
        },
        response() {
            if (this.response === true) {
                this.dialogOut = true
                this.audio.pause();
                this.audio.currentTime = 0;
                console.log('response');
            }
        },
        calling() {
            if (this.calling === true) {
                this.dialogIn = true
                this.audio.play();
            }else{
                this.dialogIn = false
                this.dialogOut = false
                this.audio.pause();
                this.audio.currentTime = 0;
            }
        },
        callUser() {
            if (this.callUser !== null) {
                this.startCall(this.callUser, this.user)
            }
        },
    },
    mounted(){
        $nuxt.$on('endVideoChat', () => {
            this.endCall()
        })
        this.audio = new Audio('/call.mp3')
    },
    methods: {
        ...mapActions({
            initCall : 'dialog/initCall',
            restartStatuses : 'dialog/restartStatuses',
            confirmCall : 'dialog/confirmCall',
            setVideoInterlocuitor: 'dialog/setVideoInterlocuitor',
        }),
        startCall(to, from) {
            this.dialogOut = true
            this.restartStatuses(false)
            const data = {
                to, from
            }
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
            const data = {
                to, from: this.user
            }
            this.$socket.emit('endCall', data)
        },
        acceptCall() {
            this.restartStatuses(true)
            this.dialogIn = false
            this.setVideoInterlocuitor(this.callFrom)

            this.$socket.emit('acceptCall', { to: this.callFrom, from: this.user }, () => {
                this.confirmCall()
            })
        }
    }
}
</script>

<style lang="scss">
    .video-dialog-window {
        width: 50% !important;
        height: calc(100vh - 128px);
        right: 25%;
        bottom: 0;
        top: auto;
        left: auto;
    }
    .v-dialog__content--active{
        // z-index: 0;
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
    }
</style>
