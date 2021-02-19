<template>
    <main>
        <div id="pageTable">
            <v-container grid-list-xl fluid>
                <v-btn :to="'/back/employees/create'">
                    Create new user
                </v-btn>
                <v-layout row wrap>
                    <v-flex lg12>
                        <v-card>
                            <v-toolbar flat color="white">
                                <v-text-field
                                    flat
                                    solo
                                    prepend-icon="mdi-magnify"
                                    placeholder="Type something"
                                    v-model="search"
                                    hide-details
                                    class="hidden-sm-and-down"
                                    ></v-text-field>
                                <v-btn icon>
                                    <v-icon>mdi-filter</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-divider></v-divider>

                            <v-card-text class="pa-0">
                                <v-data-table
                                    :headers="complex.headers"
                                    :search="search"
                                    :items="employees"
                                    class="elevation-1"
                                    item-key="name"
                                    v-model="selected"
                                    >
                                        <template v-slot:[`item`]="{ item }">
                                        <tr>
                                            <td>
                                                <v-avatar size="32">
                                                    <img :src="item.avatar" alt="">
                                                </v-avatar>
                                            </td>
                                            <td>
                                                <span>{{ item.name }}</span>
                                                <span>{{ item.email }}</span>
                                            </td>
                                            <td>
                                                <span>{{ item.type }}</span>
                                            </td>
                                            <td>
                                                <v-btn outlined  fab dark color="primary" small :to="'/back/history/employee/' + item._id">
                                                    <v-icon>mdi-mail</v-icon>
                                                </v-btn>
                                            </td>
                                            <td>
                                                <v-btn depressed outlined icon fab dark color="primary" small :to="'/back/employees/edit/' + item._id">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                            </td>
                                            <td>
                                                <v-btn @click="deleteItem(item)" depressed outlined icon fab dark color="pink" small>
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: "dashboard",
    middleware: ['admin'],
    data() {
        return {
            search: '',
            selected: [],
            complex: {
            headers: [
                { text: 'Avatar', value: 'avatar'},
                { text: 'Info', value: 'info' },
                { text: 'Role', value: 'role' },
                { text: 'History', value: 'history'},
                { text: 'Edit', value: 'edit' },
                { text: 'Delete', value: 'delete'}
                ],
            },
        };
    },
    computed: mapGetters({
        employees: 'admin/getEmployees'
    }),
    methods: {
        ...mapActions({
            'removeEmployee': 'admin/removeEmployee'
        }),
        deleteItem(item){
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
</style>
