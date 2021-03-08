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
        </v-sheet>
        <v-btn dark small @click="handleFullScreen()">
          <v-icon>
            mdi-fullscreen
          </v-icon>
        </v-btn>
      </div>

      <div class="video-container">
        <Videocall :prevUrl="prevRoute" />
      </div>
      <video-bottom :prev="prevRoute"></video-bottom>
    </div>
    <!-- <Chat v-show="chatDrawer"></Chat> -->
    <chat v-show="chatDrawer" />
  </div>

  <MobileChat v-else :prevRoute="prevRoute"></MobileChat>
</template>

<script>
import Videocall from "@/components/video/videoCall";
import VideoBottom from "@/components/video/video-bottom";
import MobileChat from "@/components/mobile-chat/conference";
import chat from "@/components/video/chat";
import Util from "@/util";

export default {
  layout: "conference",
  components: {
    VideoBottom,
    Videocall,
    MobileChat,
    chat
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
      // console.log('mlmlm');
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
  height: 100vh;
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
}
</style>
