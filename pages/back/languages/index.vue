<template>
<main>
    <div id="pageTable">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg3>
                    <v-card class="profile-edit">
                        <v-form ref="saveForm" v-model="valid" lazy-validation @submit.prevent="save">
                            <v-card-text class="pt-0">
                                <v-card-title class="d-flex justify-center">
                                    <h5>Create new Language</h5>
                                </v-card-title>
                                <v-text-field
                                    label="Language name"
                                    v-model="saveFormData.data.name"
                                    :rules="saveFormData.rules.nameRules"
                                    placeholder="English"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="Language code"
                                    v-model="saveFormData.data.code"
                                    :rules="saveFormData.rules.codeRules"
                                    placeholder="en"
                                    required
                                ></v-text-field>
                                <v-select
                                    :items="selectItems"
                                    item-text="value"
                                    item-value="key"
                                    v-model="saveFormData.data.status"
                                    :rules="saveFormData.rules.statusRules"
                                    label="Status"
                                ></v-select>
                                <v-btn color="primary" type="submit" class="mt-3 mb-3">
                                    Save
                                </v-btn>
                            </v-card-text>
                        </v-form>
                    </v-card>
                </v-flex>
                <v-flex lg9>
                    <v-card>
                        <v-card-text class="pa-0">
                            <v-data-table
                                :headers="complex.headers"
                                :items="languages"
                                class="elevation-1"
                                item-key="name"
                                >
                                    <template v-slot:[`item`]="{ item, index }">
                                    <tr>
                                        <td>
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            <span>{{ item.name }}</span>
                                        </td>
                                        <td>
                                            <span>{{ item.code }}</span>
                                        </td>
                                        <td>
                                            <v-btn depressed outlined icon fab dark color="primary" small v-if="item.status" @click="changeStatus(item._id, !item.status)">
                                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                                            </v-btn>
                                            <v-btn depressed outlined icon fab dark color="primary" small v-else @click="changeStatus(item._id, !item.status)">
                                                <v-icon>mdi-cancel</v-icon>
                                            </v-btn>
                                        </td>
                                        <td>
                                            <v-btn
                                                    depressed
                                                    outlined
                                                    icon
                                                    fab
                                                    dark
                                                    color="primary"
                                                    small @click="setEditLanguage(item)">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </td>
                                        <td>
                                            <v-btn @click="remove(item._id)" depressed outlined icon fab dark color="pink" small>
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
        <!-- snackbar -->
        <v-snackbar
            v-model="snackbar"
            :multi-line="true"
            right
            >
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>

        <!-- Edit dialog -->
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
        >
            <v-card v-if="editedLanguage">
                <v-form ref="editForm" v-model="valid" lazy-validation @submit.prevent="update">
                    <v-card-text class="pt-0">
                        <v-card-title class="d-flex justify-center">
                            <h5>Edit  {{ editedLanguage.name }} language</h5>
                        </v-card-title>
                        <v-text-field
                            label="Language name"
                            v-model="editedLanguage.name"
                            :rules="saveFormData.rules.nameRules"
                            placeholder="English"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Language code"
                            v-model="editedLanguage.code"
                            :rules="saveFormData.rules.codeRules"
                            placeholder="en"
                            required
                        ></v-text-field>
                        <div class="text-center">
                            <v-btn color="primary" type="submit" class="mt-3 mb-3">
                                Save
                            </v-btn>
                            <v-btn color="error" class="mt-3 mb-3" @click="cancelEditLanguage">
                                Cancel
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-form>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</main>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    layout: "dashboard",
    middleware: ['admin'],
    data() {
        return {
            dialog: false,
            editedLanguage: false,
            snackbar: false,
            snackbarText: "",
            languages: [],
            valid: false,
            selectItems: [
                {'key' : '0', 'value' : 'inactive'},
                {'key' : 1, 'value' : 'active'},
            ],
            saveFormData: {
                data: {
                    name : '',
                    code : '',
                    status: ''
                },
                rules: {
                    nameRules: [v => !!v || 'Language name is required'],
                    codeRules: [
                        v => !!v || 'Language code is required',
                        v => (v && v.length <= 3) || 'Code must be less than 3 characters'
                    ],
                    statusRules: [(v) => !!v || 'Status must be choose']
                }
            },
            complex: {
                headers: [
                    { text: 'ID', value: 'avaidtar'},
                    { text: 'Language', value: 'language' },
                    { text: 'Code', value: 'statcodeus' },
                    { text: 'Status', value: 'status' },
                    { text: 'Edit', value: 'edit' },
                    { text: 'Delete', value: 'delete'}
                ],
            },
        }
    },
    computed: mapGetters({
        employees: 'admin/getEmployees'
    }),
    mounted(){
        this.get()
    },
    methods: {
        ...mapActions({
            'removeEmployee': 'admin/removeEmployee'
        }),
        async get(){
            await axios.get('/back/languages/get').then((response) => {
                this.languages = response.data
            })
        },
        async save(){
            if(this.$refs.saveForm.validate()){
                await axios.post('/back/languages/create', this.saveFormData.data).then((response) => {
                        this.languages = response.data
                        this.snackbar = true
                        this.snackbarText = "Item has been created successfully!"
                        this.$refs.saveForm.reset()
                }).catch((e) => {
                    console.log(e);
                })
            }
        },
        async update(id){
            if(this.$refs.editForm.validate()){
                axios.post('/back/languages/update', this.editedLanguage).then(() => {
                    this.dialog = true
                    this.editedLanguage = false
                    this.snackbar = true
                    this.snackbarText = "Item has been edited!"
                })
                .catch((e) => {
                    console.log(e);
                })
            }
        },
        async remove(id){
            await axios.post('/back/languages/remove', {id}).then((response) => {
                    this.languages = response.data
                    this.snackbar = true
                    this.snackbarText = "Item has been remove!"
            }).catch((e) => {
                console.log(e);
            })
        },
        async changeStatus(id, status){
            await axios.post('/back/languages/change-status', {id, status}).then((response) => {
                this.languages = response.data
                this.snackbar = true
                this.snackbarText = "Item status has been changed!"
            }).catch((e) => {
                console.log(e);
            })
        },
        cancelEditLanguage(){
            this.get()
            this.editedLanguage = false
            this.dialog = false
        },
        setEditLanguage(language){
            this.editedLanguage = language
            this.dialog = true
        },
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
