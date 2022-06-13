<template>
    <div class="minified-block" @click="openDialogOut()" v-if="minifiedDialog">
        <v-card
            flat
            tile
            width="100%"
            class="red lighten-1"
            >
            <v-card-text class="white--text" justify="center">
                <v-btn
                    class="mx-4"
                    icon
                    >
                    <v-icon size="24px">
                    mdi-phone
                    </v-icon>
                </v-btn>
                <span class="alert-area">
                    Video chat in procces with <b>Name</b>
                    <small>click to return </small>
                </span>
                <span class="timer" v-if="timer.seted">
                    {{ timer.minutes }}:{{ timer.seconds }}
                </span>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ['dialogOut', 'minifiedDialog', 'timer'],
    methods: {
        openDialogOut() {
            $nuxt.$emit('openDialogOut')
        }
    }
}
</script>

<style lang="scss">
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


