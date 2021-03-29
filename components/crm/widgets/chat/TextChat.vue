<template>
    <div class="text-chat" fixed>
        <v-container class="ma-0 pa-0">
            <v-row no-gutters>
                <v-col>
                    <div class="d-flex flex-row align-center">
                        <v-text-field v-model="message" placeholder="Type Something" @keypress.enter="send"></v-text-field>
                        <v-btn icon class="ml-4" @click="send"><v-icon>mdi-send</v-icon></v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['client', 'employee', 'room'],
    data(){
        return {
            message: '',
        }
    },
    computed: mapGetters({
        lastMessage: 'chat/getLastMessage',
    }),
    methods: {
        ...mapActions({
            "createMessage": "chat/createMessage"
        }),
        send() {
            const data = {
                roomId : this.room,
                clientId : this.client,
                employeeId : this.employee,
                historyId : 'none',
                text : this.message,
                sendBy: 'employee'
            }


            this.createMessage(data).then(() => {
                this.$socket.emit(
                    "createMessage",
                    {
                        text: this.message,
                        user: this.employee,
                        room: this.client._id,
                        history: null,
                        message: this.$store.state.chat.lastMessage
                    },
                    data => {
                        if (typeof data === "string") {
                            console.error(data);
                        } else {
                            this.message = "";
                        }
                    }
                )
            })
        }
    }
}
</script>

<style media="screen">
    .text-chat{
        z-index: 1;
        position: relative;
        background-color: #FFF;
    }
</style>
