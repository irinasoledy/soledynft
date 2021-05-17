<template>

    <desktopVideo v-if="!$mobileDetect.mobile()" :user="user" :interlocuitor="interlocuitor" :timer="timer" />
    <mobileVideo v-else :user="user" :interlocuitor="interlocuitor" :mode="mode"/>

</template>

<script>

import mobileVideo from "@/components/chat-module/video/mobile/video-mobile";
import desktopVideo from "@/components/chat-module/video/desktop/video-desktop";

export default {
    props: ['user', 'interlocuitor', 'timer', 'mode'],
    data: () => ({
        chatDrawer: false,
        prevRoute: "/"
    }),
    components: { mobileVideo, desktopVideo },
    mounted(){
        console.log(this.interlocuitor);
    }
}
</script>

<style lang="scss">
    .video {
        //width: 100%;
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
