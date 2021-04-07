<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-card-title>
                <span class="headline">Programează-te</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            >
                            <v-text-field
                                label="Nume*"
                                required
                                hint="Introduceți numele"
                                ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            >
                            <v-text-field
                                label="Email*"
                                required
                                hint="Introduceți email"
                                ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            >
                            <v-text-field
                                label="Numărul de telefon*"
                                required
                                hint="Introduceți un număr de telefon valid"
                                ></v-text-field>
                        </v-col>
                        <v-col
                        v-if="items.length"
                            cols="12"
                            sm="12"
                            md="12"
                            >
                            <v-select
                                :items="items"
                                item-text="name"
                                :menu-props="{ top: true, offsetY: true }"
                                :label="trans.ContactsAndForms.labelCommunicationMethodName"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click.native="dialog = false"
                    >
                    Close
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click.native="dialog = false"
                    >
                    Send
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        dialog: false,
        name: '',
        items: [],
    }),
    computed: mapGetters({
        trans: 'getTranslations',
    }),
    methods: {
        submit () {
            this.$refs.observer.validate()
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
