<template>
    <v-flex xs12 class="chat-form">
        <v-text-field label="Message..." outline v-model="text" class="form-message" @keydown.enter="send"/>
    </v-flex>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    data: () => ({
        text: ""
    }),
    computed: mapGetters({
        // room: 'chat/getRoom',
        room: 'call/getRoomId',
        employee: 'chat/getEmployee',
        client: 'chat/getClient',
        history: 'chat/getHistory',
        user: 'chat/getUser',
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
                historyId : this.history ? this.history._id : 'none',
                text : this.text,
                sendBy: this.user.type
            }

            this.createMessage(data).then(() => {
                this.$socket.emit(
                    "createMessage",
                    {
                        text: this.text,
                        user: this.$store.state.chat.user,
                        room: this.room,
                        history: null,
                    },
                    data => {
                        if (typeof data === "string") {
                            console.error(data);
                        } else {
                            this.text = "";
                        }
                    }
                )
            })
        }
    }
}
</script>
