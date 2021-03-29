<template>
    <v-container class="grey lighten-5">
    <v-row
        no-gutters
        style="height: 150px;"
    >
        <v-col cols="12">
            <AreaChat v-if="messages.length" :messages="messages" :client="client" :employee="authUser" :room="room"></AreaChat>
            <TextChat v-if="messages.length" :client="client" :employee="authUser" :room="room"></TextChat>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import ListChat from "@/components/crm/widgets/chat/ListChat"
import TextChat from "@/components/crm/widgets/chat/TextChat"
import { mapActions, mapGetters } from "vuex"
import axios from "axios"

export default {
    layout: 'crm',
    data(){
        return {
            users: [],
            messages: [],
            room: '',
            client: {},
        }
    },
    computed: mapGetters({
        authUser: 'admin/getAuthUser',
        employees: 'admin/getEmployees',
        clients: 'admin/getClients',
        historyClientsList: 'admin/getHistoryClientsList',
        getUserMessages : 'chat/getUserMessages'
    }),
    async mounted(){
        this.client = await this.clients.find((client) => client._id === this.$route.params.id)
        if (Object.keys(this.client).length === 0) {
            this.$router.push("/back/my-area")
        }
        this.showMessages()
    },
    methods: {
        ...mapActions({
            'removeEmployee': 'admin/removeEmployee',
            'getClientsHitoryList' : 'admin/getClientsHitoryList',
            'getClientMessages' : 'chat/getClientMessages'
        }),
        async showMessages(){
            const id = this.client._id
            this.getClientMessages(id).then(() => {
                this.messages = this.getUserMessages
                if (this.messages.length) {
                    this.room = this.messages[this.messages.length - 1].room
                }
            })
        },
        getClientList(){
            this.getClientsHitoryList(this.user._id)
        }
    },
    components: {
        ListChat
    },
}
</script>
