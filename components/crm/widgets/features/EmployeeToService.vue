<template lang="html">
    <v-card>
        <v-card-title>
            Assign a service:
        </v-card-title>
        <v-card-text>
            <v-form ref="sericeToEmplooyeForm" @submit.prevent="save">
                <div v-for="(service, index) in services">
                    <v-checkbox
                        v-model="selected"
                        :label="service.translation.name"
                        :value="service.id"
                        :disabled="service.children.length > 0"
                    ></v-checkbox>
                    <div class="child-area" v-if="service.children.length > 0">
                        <v-checkbox
                            v-for="child in service.children"
                            :key="child.id"
                            v-model="selected"
                            :label="child.translation.name"
                            :value="child.id"
                        ></v-checkbox>
                    </div>
                </div>
                <v-btn color="primary" type="submit">Save</v-btn>
            </v-form>
        </v-card-text>
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
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import crmApi from '@/api/crmApi'

export default {
    props: ['employee', 'employeeId'],
    data(){
        return {
            selected : [],
            user: this.employee,
            snackbar: false,
            snackbarText: "",
        }
    },
    mounted(){
        setTimeout(() => {
            this.getEmployeeServices()
        }, 0)
    },
    computed: mapGetters({
        'services' : 'getServices'
    }),
    methods: {
        async save(){
            const data = {
                services: this.selected,
                id: this.employee._id
            }
            crmApi.assignmentServiceToEmployee(data, response => {
                this.snackbar = true
                this.snackbarText = "The changes have been saved successfully!"
            })
        },
        async getEmployeeServices(){
            crmApi.getEmployeeServices(this.employee._id, response => {
                this.selected = response.map((serv) => {
                    return parseInt(serv.service)
                })
            })
        }
    }
}
</script>

<style>
.child-area{
    padding-left: 25px;
}
.v-input--selection-controls{
    padding: 0;
    margin: 0;
}
</style>

