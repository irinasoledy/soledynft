<template>
  <div class="d-flex" v-if="!$mobileDetect.mobile()">
    <div class="video">
      <div class="video__top d-flex justify-space-between">
        <v-sheet dark>
          <v-btn small dark>
            <v-icon>
              mdi-information
            </v-icon>
          </v-btn>
          <v-btn dark small class="ml-3">
            <v-icon>
              mdi-cog
            </v-icon>
          </v-btn>
          <span class="timer" v-if="timer.seted">
              {{ timer.minutes }}:{{ timer.seconds }}
          </span>
        </v-sheet>
        <!-- {{ interlocuitor }} -->
        <!-- <v-btn dark small @click="handleFullScreen()">
          <v-icon>
            mdi-fullscreen
          </v-icon>
        </v-btn> -->
      </div>

      <div class="video-container">
        <Videocall :prevUrl="prevRoute" />
      </div>
      <VideoBottom :interlocuitorUser="interlocuitor"/>
    </div>
    <!-- <chat v-show="chatDrawer" /> -->
  </div>

  <MobileChat v-else :prevRoute="prevRoute"></MobileChat>
</template>

<script>
import Videocall from "@/components/chat/video/videoCall";
import VideoBottom from "@/components/chat/video/video-bottom";
import MobileChat from "@/components/chat/mobile-chat/conference";
// import chat from "@/components/chat/video/chat";
import Util from "@/util";

export default {
  layout: "conference",
  props: ['interlocuitor', 'timer'],
  components: {
    VideoBottom,
    Videocall,
    MobileChat,
    // chat
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from.fullPath;
    });
  },
  data: () => ({
    chatDrawer: false,
    prevRoute: "/"
  }),
  methods: {
    handleFullScreen() {
      Util.toggleFullScreen();
    }
  },
  mounted() {
    this.$nuxt.$on("openChat", () => {
      this.chatDrawer = !this.chatDrawer;
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("openChat");
  }
};
</script>

<style lang="scss">
.video {
  width: 100%;
  height: calc(100vh - 128px - 70px) !important;
  background: rgb(34, 34, 34);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  &__menu-bottom {
    position: static;
  }

  &__top {
    padding: 15px;

    .v-sheet {
      background: rgb(34, 34, 34);
    }
  }

  .video-container {
    height: 100%;
  }
  .timer{
        position: absolute;
        right: 20px;
        font-size: 18px;
  }
}
</style>
