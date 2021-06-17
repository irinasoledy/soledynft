<template>
    <div class="d-flex">

        <div class="video">
            <small class="chatWarning">{{ trans.General.chatWarning }}</small>
            <div class="video__top d-flex justify-space-between">
                <v-sheet dark>
                    <!-- <v-btn small dark>
                        <v-icon>mdi-information</v-icon>
                    </v-btn>
                    <v-btn dark small class="ml-3">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn> -->
                    <span class="timer" v-if="timer.seted">
                        {{ timer.minutes }}:{{ timer.seconds }}
                    </span>
                </v-sheet>
            </div>
            <div class="video-container">
                <callVideo :user="user" :interlocuitorUser="interlocuitor"/>
            </div>
            <bottomVideo :user="user" :interlocuitorUser="interlocuitor" />
        </div>
    </div>
</template>

<script>

import callVideo from "@/components/chat-module/video/desktop/call-desktop"
import bottomVideo from "@/components/chat-module/video/desktop/bottom-desktop"
import {mapGetters} from "vuex";

export default {
    props: ['user', 'interlocuitor', 'timer'],
    components: {callVideo, bottomVideo},
    computed: mapGetters({
        trans: 'getTranslations',
    }),
}
</script>

<style>
.chatWarning{
    position: absolute;
    text-align: center;
    color: #FFF;
    padding: 15px !important;
    
}
@media (max-width: 400px) {
    .chatWarning{
        width: 70%;
        left: 15%;
    }
}
</style>
