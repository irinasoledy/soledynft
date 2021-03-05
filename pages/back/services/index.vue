<template>
    <main>
        <div id="pageTable">
            <v-container grid-list-xl fluid>
                <v-layout row wrap>
                    <v-flex lg12>
                        <v-btn @click="handlleAddNew">Add new</v-btn>
                    </v-flex>
                    <v-flex lg12>
                        <vue-nestable v-model="services">
                            <vue-nestable-handle
                                slot-scope="{ item }"
                                :item="item">
                                {{ item.title }}
                            </vue-nestable-handle>
                        </vue-nestable>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <!-- Add new item dialog -->
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            max-width="600"
        >
            <v-card>
                <v-form ref="saveForm" v-model="valid" lazy-validation @submit.prevent="save">
                    <v-card-text class="pt-0">
                        <v-card-title class="d-flex justify-center">
                            <h5>Add new service</h5>
                        </v-card-title>
                        <v-text-field
                            v-for="language in languages"
                            :key="language.id"
                            :label="`Title [${language.code}]`"
                            v-model="titles[language.code]"
                            :rules="validateRules.required"
                            required
                        ></v-text-field>

                        <!-- <v-text-field
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
                        -->
                        <div class="text-center">
                            <v-btn color="primary" type="submit" class="mt-3 mb-3">
                                Save
                            </v-btn>
                            <v-btn color="error" class="mt-3 mb-3" @click="closeDialog">
                                Cancel
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-form>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    layout: 'dashboard',
    middleware: 'admin',
    data () {
        return {
            services: [],
            dialog: false,
            parentId: null,
            valid: true,
            titles: [],
            validateRules: {
                'required' : [v => !!v || 'This field is required']
            },
            nestableItems: [
                {
                    id: 0,
                    text: 'Andy'
                },
                {
                    id: 1,
                    text: 'Harry',
                    children: [{
                        id: 2,
                        text: 'David'
                    }]
                },
                {
                    id: 3,
                    text: 'Lisa'
                }
            ]
        }
    },
    computed: mapGetters({
        'languages': 'admin/getLanguages'
    }),
    methods: {
        handlleAddNew(){
            this.dialog = true
        },
        closeDialog(){
            this.dialog = false
        },
        async save(){
            if (this.$refs.saveForm.validate()) {
                const parsedTitles = {}
                this.languages.forEach((language) => {
                    parsedTitles[language.code] = this.titles[language.code]
                })
                await axios.post('/back/services/create', {titles: parsedTitles, parentId: this.parentId}).then((response) => {
                    this.services = response.data
                }).catch((e) => {
                    console.log('error save service')
                })
            }
        }
    }
}
</script>

<style media="screen">
    @import '@/assets/admin/nestable.css';
</style>
