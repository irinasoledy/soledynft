<template>
    <v-card
        class="mx-auto"
        width="350"
        >
        <v-container style="height: 400px;">
            <v-row
                class="fill-height"
                align-content="center"
                justify="center"
                >
                <v-col
                    class="subtitle-1 text-center"
                    cols="12"
                    >
                    Client waiting...
                </v-col>
                <v-col cols="6">
                    <v-progress-linear
                        color="deep-purple accent-4"
                        indeterminate
                        rounded
                        height="6"
                        ></v-progress-linear>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            audio: true,
        }
    },
    mounted(){

    },
    methods: {

    }
}
</script>

<style>
</style>
