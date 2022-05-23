<template>
    <v-container class="grey lighten-5">
        <div v-if="historyClientsList.length">
            <ListChat :users="historyClientsList" :employee="user"></ListChat>
        </div>
        <div v-else>
            <v-col cols="12" class="text-center">
                <div>The employee has no history.</div>
            </v-col>
        </div>
    </v-container>
</template>

<script>
import ListChat from "@/components/crm/widgets/chat/ListChat"
import { mapActions, mapGetters } from "vuex"

export default {
    layout: 'crm',
    data(){
        return {
            users: [],
            user: {}
        }
    },
    computed: mapGetters({
        authUser: 'admin/getAuthUser',
        employees: 'admin/getEmployees',
        historyClientsList: 'admin/getHistoryClientsList',
    }),
    async mounted(){
        this.user = await this.employees.find((employee) => employee._id === this.$route.params.id)
        if (Object.keys(this.user).length === 0) {
            this.$router.push("/back/employees")
        }
        this.getClientList()
    },
    methods: {
        ...mapActions({
            'removeEmployee': 'admin/removeEmployee',
            'getClientsHitoryList' : 'admin/getClientsHitoryList'
        }),
        getClientList(){
            this.getClientsHitoryList(this.user._id)
        }
    },
    components: {
        ListChat
    },
}
</script>

