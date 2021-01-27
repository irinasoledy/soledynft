<template lang="html">
    <div>
        <v-row no-gutters class="row text-center">
            <v-col
                cols="12"
                sm="6">
                <hr>
                <h3>Local</h3>
                <div id="my-video-chat-window" ref="myVideo" class="local-video"></div>
            </v-col>
            <v-col
                cols="12"
                sm="6">
                <hr>
                <h3>Remote</h3>
                <div id="remote-media-div" class="remote-video"></div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ['username', 'room'],
    data: function () {
        return {
            accessToken: '',
            videoChatWindow: '',
            activeRoom: '',
            deactivateChat: false,
        }
    },
    mounted : function () {
        console.log('Video chat room loading...')

        this.getAccessToken()
        this.videoChatWindow = document.getElementById('video-chat-window');
    },
    methods : {
        getAccessToken : function () {
            const _this = this
            const axios = require('axios')

            // Request a new token
            axios.get(`http://localhost:3000/token?identity=${this.username}`)
                .then(function (response) {
                    _this.accessToken = response.data.token
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    _this.connectToRoom()
                });
        },
        connectToRoom : function () {

            const { connect, createLocalVideoTrack } = require('twilio-video');
            const _this = this;

            connect( this.accessToken, { name:this.room }).then(room => {

                console.log(`Successfully joined a Room: ${room}`);

                _this.activeRoom = room;

                const videoChatWindow = this.$refs["myVideo"];

                createLocalVideoTrack().then(track => {
                    videoChatWindow.appendChild(track.attach());
                });

                room.participants.forEach(participant => {
                 participant.on('trackSubscribed', track => {
                    document.getElementById('remote-media-div').appendChild(track.attach());
                  });
                });

                room.on('participantConnected', participant => {
                    console.log(`Participant "${participant.identity}" connected`);

                    participant.tracks.forEach(publication => {
                        console.log( publication.track, 'foreach');
                        if (publication.isSubscribed) {
                            const track = publication.track;
                            document.getElementById('remote-media-div').appendChild(track.attach());

                        }
                    });

                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });
                });
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
        },
    },
}
</script>

<style>
    video{
        width: 100% !important;
    }
</style>
