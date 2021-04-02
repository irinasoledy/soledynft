<template>
    <v-row>
        <v-col cols="12" sm="10">
            <v-text-field label="Message..." outline v-model="text" class="form-message" @keydown.enter="send"/>
        </v-col>
        <v-col cols="12" sm="2">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                @click="send"
                >
                <v-icon dark small>
                    mdi-send
                </v-icon>
            </v-btn>
        </v-col>

    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    props: ['interlocutor', 'mode'],
    data: () => ({
        text: ""
    }),
    computed: mapGetters({
        room: 'call/getRoomId',
        employee: 'chat/getEmployee',
        client: 'chat/getClient',
        history: 'chat/getHistory',
        user: 'chat/getUser',
        lastMessage: 'dialog/getLastMessage'
    }),
    methods: {
        ...mapActions({
            "createMessage": "dialog/createMessage"
        }),
        send() {
            const clientId = this.mode === 'client' ? this.interlocutor._id : this.user._id
            const employeeId = this.mode === 'employee' ? this.interlocutor._id : this.user._id
            const sendBy = this.mode === 'employee' ? 'client' : 'employee'

            const data = {
                clientId: clientId,
                employeeId: employeeId,
                message: this.text,
                sendBy: sendBy,
                session : clientId + employeeId
            }

            console.log(this.lastMessage);

            this.createMessage(data).then(() => {
                this.$socket.emit(
                    "createMessage",
                    {
                        message : this.lastMessage,
                        to: this.interlocutor._id,
                        from: this.user._id,
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
