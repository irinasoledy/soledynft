<template>
      <v-bottom-navigation
        class="video-mobile__menu-bottom"
        :value="value"
        color="accent"
        dark
      >
      <!-- <v-btn small>
        <span>Mute</span>
        <v-icon>mdi-microphone</v-icon>
      </v-btn> -->

      <v-btn small v-if="microphone === true" @click="switchMicrophone(false)">
          <span>Mute</span>
          <v-icon>mdi-microphone</v-icon>
      </v-btn>
      <v-btn small v-if="microphone === false" @click="switchMicrophone(true)">
          <span>Unmute</span>
          <v-icon>mdi-microphone-off</v-icon>
      </v-btn>

      <!-- <v-btn small>
        <span>Stop Video</span>
        <v-icon>mdi-film</v-icon>
      </v-btn> -->

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
      <v-btn small>
        <span>Participants</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn small @click="$nuxt.$emit('openMenuMobile')">
        <span>More</span>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
  </v-bottom-navigation>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "video-bottom-mobile",
  data: () => ({
    value: 1,
    blockRoom: false,
    renameNickname: false,
    waitingRoom: false,
    shareScreen: true,
    chat: true,

  }),
  computed: mapGetters({
      user: 'chat/getUser',
      roomId : 'call/getRoomId',
      camera: 'chat/getCamera',
      microphone: 'chat/getMicrophone',
      videoInterlocuitor: 'dialog/getVideoInterlocuitor',
      reject: 'dialog/getReject',
      response: 'dialog/getResponse',
  }),
  methods: {
      ...mapActions({
          changeEmployeeStatus : 'chat/changeEmployeeStatus',
          switchCamera: 'chat/switchCamera',
          switchMicrophone: 'chat/switchMicrophone',
          setInterlocutor : 'dialog/setInterlocutor',
          cancelCall : 'dialog/cancelCall',
          restartStatuses: 'dialog/restartStatuses'
      }),
      toggleChat() {
          this.setInterlocutor(null)
          this.setInterlocutor(this.videoInterlocuitor)
      },
      end() {
          $nuxt.$emit('endVideoChat')
          this.cancelCall()
          this.restartStatuses(false)
          const data = {
              to: this.videoInterlocuitor, from: this.user
          }
          this.$socket.emit('endCall', data)
          // this.$socket.emit("stop", this.roomId);
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
      min-width:auto !important;
      &__content {
        font-size: 10px;
      }
    }
  }
</style>
