<template>
    <v-container class="grey lighten-5">
    <v-row
        no-gutters
        style="height: 150px;"
    >
    <v-col cols="12">
        <AreaChat v-if="messages.length" :messages="messages" :client="client" :employee="authUser"></AreaChat>
    </v-col>
    </v-row>
        <!-- <div v-if="historyClientsList.length">
            <ListChat :users="historyClientsList" :employee="user"></ListChat>
        </div>
        <div v-else>
            <v-col cols="12" class="text-center">
                <div>The employee has no history.</div>
            </v-col>
        </div> -->
    </v-container>
</template>

<script>
import ListChat from "@/components/dashboard/widgets/chat/ListChat"
import { mapActions, mapGetters } from "vuex"
import axios from "axios"

export default {
    layout: 'dashboard',
    data(){
        return {
            users: [],
            messages: [],
            client: {},
        }
    },
    computed: mapGetters({
        authUser: 'admin/getAuthUser',
        employees: 'admin/getEmployees',
        clients: 'admin/getClients',
        historyClientsList: 'admin/getHistoryClientsList',
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
            'getClientsHitoryList' : 'admin/getClientsHitoryList'
        }),
        async showMessages(){
            const id = this.client._id
            await axios.post('/back/history/get-messages', {id})
                .then(response => {
                    this.messages = response.data
                }).catch(err => {
                    console.log(err);
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
