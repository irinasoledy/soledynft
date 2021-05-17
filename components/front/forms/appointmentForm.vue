<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-card-title>
                <span class="headline">Programează-te</span>
            </v-card-title>
            <v-card-text v-if="!success">
                <v-container>
                    <v-form
                        ref="form"
                        v-model="form.valid"
                        lazy-validation
                        >
                        <v-text-field
                            label="Nume*"
                            v-model="form.name"
                            :rules="nameRules"
                            ></v-text-field>
                        <v-text-field
                            label="Email*"
                            v-model="form.email"
                            :rules="emailRules"
                            ></v-text-field>
                        <v-text-field
                            type="number"
                            label="Numărul de telefon*"
                            v-model="form.phone"
                            :rules="phoneRules"
                            ></v-text-field>
                        <v-select
                            v-if="items.length"
                            :items="items"
                            item-text="name"
                            :menu-props="{ top: true, offsetY: true }"
                            :label="trans.ContactsAndForms.labelCommunicationMethodName"
                            v-model="form.comunitatePreference"
                            ></v-select>
                        <v-textarea
                            label="Cometariu"
                            v-model="form.comment"
                        ></v-textarea>
                        <small>*indicates required field</small>
                        <v-btn
                            :disabled="!form.valid"
                            color="primary lighten-1"
                            class="mr-4 full-width"
                            @click="submit()"
                            >
                            Programeaza-te
                        </v-btn>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-text v-else>
                <v-alert
                    dense
                    text
                    type="success"
                    >
                    Datele au fost transmise cu succes!!!
                </v-alert>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import userApi from '@/api/userApi'

export default {
    data: () => ({
        dialog: false,
        name: '',
        items: [],
        success: false,
        form: {
            valid: false,
            name: '',
            email: '',
            phone: '',
            comunitatePreference: '',
            comment: '',
        },
        nameRules: [
            v => !!v || 'Name is required',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        phoneRules: [
            v => !!v || 'Phone is required',
        ]
    }),
    computed: mapGetters({
        trans: 'getTranslations',
        user: 'chat/getUser',
    }),
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                this.form.guestId = this.user._id
                userApi.bookUser(this.form, async response => {
                    this.success = true
                })
            }
        },
        clear(){
            this.name = ''
            this.phoneNumber = ''
            this.email = ''
            this.select = null
            this.checkbox = null
            this.$refs.observer.reset()
        },
    },
    mounted(){
        this.items = [
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionWhats},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionFb},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionViber},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionTel},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionInsta},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionPhone},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionEmail},
            {name: this.trans.ContactsAndForms.labelCommunicationMethodOptionOther}
        ]
    },
    created(){
        this.$nuxt.$on('open-appointment-form', () => {
            this.dialog = true
        })
    },
    beforeDestroy(){
        this.$nuxt.$off('open-appointment-form')
    }
}
</script>
