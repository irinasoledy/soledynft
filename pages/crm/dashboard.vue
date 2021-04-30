<template>
    <v-container grid-list-xl justify-center class="text-center">
        <h3>{{ user.name }}</h3>
        <h4>Wellcome to Customer Relationship Management!</h4>
        <h4>Logged as <i>{{ user.type }}</i> user</h4>

        <v-flex lg3 v-if="user.type === 'employee'">
            <v-card>
                <name-card v-bind="user"></name-card>
                <v-card-actions>
                    <v-switch :label="userStatus ? 'Online': 'Offline'" v-model="userStatus">
                    </v-switch>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    layout: "crm",
    middleware: ['admin'],
    computed: {
        user: {
            get() {
                return this.authUser()
            }
        },
        userStatus: {
            get(){
                return this.status()
            },
            set(status){
                this.setUserStatus({status, emploeeId: this.user._id}).then(() => {
                    this.$socket.emit('shareEmployeeStatus', this.user)
                    this.$socket.emit('refreshUserData')
                    console.log('kvdfm');
                })
            }
        }
    },
    methods: {
        ...mapActions({
            'setUserStatus': 'admin/setUserStatus',
            'getClientsList': 'admin/getClientsList',
            'removeClient' : 'admin/removeClient'
        }),
        ...mapGetters({
            authUser: 'authCRM/getUser',
            status: 'admin/getStatus',
            clientList: 'admin/getClients'
        }),
    }
}
</script>
