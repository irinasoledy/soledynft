<template>
    <v-bottom-navigation
        :value="value"
        class="video-mobile__menu-bottom"
        color="accent"
        dark
    >
        <v-row class="row-bottom-bar">
            <v-col>
                <v-btn small v-if="microphone === true" @click="switchMicrophone(false)">
                    <span>Mute</span>
                    <v-icon>mdi-microphone</v-icon>
                </v-btn>
                <v-btn small v-if="microphone === false" @click="switchMicrophone(true)">
                    <span>Unmute</span>
                    <v-icon>mdi-microphone-off</v-icon>
                </v-btn>
                <v-btn v-if="camera === true" @click="switchCamera(false)">
                    <span>Stop Video</span>
                    <v-icon>mdi-video</v-icon>
                </v-btn>
                <v-btn v-if="camera === false" @click="switchCamera(true)">
                    <span>Start Video</span>
                    <v-icon>mdi-video-off</v-icon>
                </v-btn>
                <v-btn small @click="toggleChat()">
                    <span>Chat</span>
                    <v-icon>mdi-chat</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <!--        <v-btn small v-if="microphone === true" @click="switchMicrophone(false)">-->
        <!--            <span>Mute</span>-->
        <!--            <v-icon>mdi-microphone</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn small v-if="microphone === false" @click="switchMicrophone(true)">-->
        <!--            <span>Unmute</span>-->
        <!--            <v-icon>mdi-microphone-off</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn v-if="camera === true" @click="switchCamera(false)">-->
        <!--            <span>Stop Video</span>-->
        <!--            <v-icon>mdi-video</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn v-if="camera === false" @click="switchCamera(true)">-->
        <!--            <span>Start Video</span>-->
        <!--            <v-icon>mdi-video-off</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn small @click="toggleChat()">-->
        <!--            <span>Chat</span>-->
        <!--            <v-icon>mdi-chat_old</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn small>-->
        <!--            <span>Participants</span>-->
        <!--            <v-icon>mdi-account-multiple</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn small @click="$nuxt.$emit('openMenuMobile')">-->
        <!--            <span>More</span>-->
        <!--            <v-icon>mdi-dots-vertical</v-icon>-->
        <!--        </v-btn>-->
    </v-bottom-navigation>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    props: ['user'],
    data: () => ({
        value: 1,
    }),
    computed: mapGetters({
        camera: 'chat/getCamera',
        microphone: 'chat/getMicrophone',
        videoInterlocuitor: 'dialog/getVideoInterlocuitor',
    }),
    methods: {
        ...mapActions({
            switchCamera: 'chat/switchCamera',
            switchMicrophone: 'chat/switchMicrophone',
            setInterlocutor: 'dialog/setInterlocutor',
            cancelCall: 'dialog/cancelCall',
            restartStatuses: 'dialog/restartStatuses'
        }),
        toggleChat() {
            this.setInterlocutor(null)
            this.setInterlocutor(this.videoInterlocuitor)
        },
        end() {
            const data = {to: this.videoInterlocuitor, from: this.user}
            $nuxt.$emit('endVideoChat')
            this.cancelCall()
            this.restartStatuses(false)
            this.$socket.emit('endCall', data)
        },
    }
}
</script>

<style lang="scss">
.video-mobile {
    &__menu-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between !important;
        background-color: #1E1E1E !important;
        height: 56px;
    }

    .v-btn {
        min-width: auto !important;

        &__content {
            font-size: 10px;
        }
    }
}
.row-bottom-bar{
    text-align: center;
}
</style>
