<template>
    <main>
        <div id="pageTable">
            <v-container grid-list-xl fluid>
                <v-row>
                    <v-col lg6>
                        <v-card>
                            <v-card-title>
                                <h5>Operators </h5>
                                <v-btn small to="/crm/employees/create/operator">
                                    Create new
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-toolbar flat color="white">
                                <v-text-field
                                    flat
                                    solo
                                    prepend-icon="mdi-magnify"
                                    placeholder="Search"
                                    v-model="searchEmployees"
                                    hide-details
                                    class="hidden-sm-and-down"
                                    ></v-text-field>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0">
                                <v-data-table
                                    :headers="headersEmployees"
                                    :search="searchEmployees"
                                    :items="employees"
                                    class="elevation-1"
                                    item-key="name"
                                    v-model="selected"
                                    >
                                        <template v-slot:[`item`]="{ item, index }">
                                        <tr>
                                            <td>
                                                #{{ index + 1  }}
                                            </td>
                                            <td>
                                                <v-avatar size="32" v-if="item.avatar">
                                                    <img :src="`/avatars/${item.avatar}`" alt="">
                                                </v-avatar>
                                                <v-avatar size="32" v-else dark color="info">
                                                    {{ item.name.charAt(0) }}
                                                </v-avatar>
                                            </td>
                                            <td>
                                                <span>{{ item.name }}</span>
                                            </td>
                                            <td>
                                                <nuxt-link :to="'/crm/employees/edit/operators/' + item._id">
                                                    <v-icon
                                                        small
                                                        class="mr-2"
                                                        >
                                                        mdi-pencil
                                                    </v-icon>
                                                </nuxt-link>
                                            </td>
                                            <td>
                                                <a href="#" @click="deleteItem(item)">
                                                    <v-icon
                                                        small
                                                        class="mr-2"
                                                        >
                                                        mdi-delete
                                                    </v-icon>
                                                </a>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg6>
                        <v-card>
                            <v-card-title>
                                <h5>Managers </h5>
                                <v-btn small to="/crm/employees/create/manager" v-if="authUser.type === 'root'">
                                    Create new
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-toolbar flat color="white">
                                <v-text-field
                                    flat
                                    solo
                                    prepend-icon="mdi-magnify"
                                    placeholder="Search"
                                    v-model="searchManagers"
                                    hide-details
                                    class="hidden-sm-and-down"
                                    ></v-text-field>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0">
                                <v-data-table
                                    :headers="headersManagers"
                                    :search="searchManagers"
                                    :items="managers"
                                    class="elevation-1"
                                    item-key="name"
                                    v-model="selected"
                                    >
                                        <template v-slot:[`item`]="{ item, index }">
                                        <tr>
                                            <td>
                                                #{{ index + 1  }}
                                            </td>
                                            <td>
                                                <v-avatar size="32" v-if="item.avatar">
                                                    <img :src="`/avatars/${item.avatar}`" alt="">
                                                </v-avatar>
                                                <v-avatar size="32" v-else dark color="info">
                                                    {{ item.name.charAt(0) }}
                                                </v-avatar>
                                            </td>
                                            <td>
                                                <span>{{ item.name }}</span>
                                            </td>
                                            <td>
                                                <span v-if="authUser.type === 'root'">
                                                    <nuxt-link :to="'/crm/employees/edit/managers/' + item._id">
                                                        <v-icon
                                                            small
                                                            class="mr-2"
                                                            >
                                                            mdi-pencil
                                                        </v-icon>
                                                    </nuxt-link>
                                                    <a href="#" @click="deleteItem(item)">
                                                        <v-icon
                                                            small
                                                            class="mr-2"
                                                            >
                                                            mdi-delete
                                                        </v-icon>
                                                    </a>
                                                </span>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: "crm",
    middleware: ['admin'],
    data() {
        return {
            searchEmployees: '',
            searchManagers: '',
            selected: [],
            headersEmployees: [
                    { text: 'ID', value: 'id'},
                    { text: 'Avatar', value: 'avatar'},
                    { text: 'Name', value: 'name' },
                    { text: 'Edit', value: 'edit' },
                    { text: 'Delete', value: 'delete'}
                ],
            headersManagers: [
                    { text: 'ID', value: 'id'},
                    { text: 'Avatar', value: 'avatar'},
                    { text: 'Name', value: 'name' },
                    { text: 'Actions', value: 'actions' }
                ],
        };
    },
    computed: mapGetters({
        authUser: 'authCRM/getUser',
        employees: 'admin/getEmployees',
        managers: 'admin/getManagers',
    }),
    mounted() {
        this.initApp()
    },
    methods: {
        ...mapActions({
            'removeEmployee': 'admin/removeEmployee',
            'initApp' : 'admin/initApp',
        }),
        deleteItem(item) {
            this.$socket.emit('refreshUsersData')
            this.removeEmployee(item._id)
        }
    }
}
</script>

<style scoped>
td span,
thead {
    display: block;
    font-size: 14px !important;
}
.v-input--selection-controls {
    margin-top: 0 !important;
    padding-top: 0 !important;
}
.v-btn {
    margin-left: 30px;
}
a{
    text-decoration: none;
}
</style>


