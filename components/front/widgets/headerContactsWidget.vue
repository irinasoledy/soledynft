<template>
    <v-list nav light>
        <v-list-item-group>
            <v-list-item href="tel:+37378563423">
                <v-list-item-icon>
                    <v-icon color="primary">mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    <a :href="`tel:${trans.ContactsAndForms.companyMainPhone1}`">
                        {{ trans.ContactsAndForms.companyMainPhone1 }}
                    </a>
                </v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="primary">mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-title color="primary">
                    <a :href="`mailto:${trans.ContactsAndForms.companyMainEmail1}`">
                        {{ trans.ContactsAndForms.companyMainEmail1 }}
                    </a>
                </v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        <v-list-item-group class="d-flex justify-space-around my-7">
            <a :href="trans.ContactsAndForms.companyInstagram">
                <v-btn color="secondary">
                    <v-icon>mdi-instagram</v-icon>
                </v-btn>
            </a>
            <a :href="`mailto:${trans.ContactsAndForms.companyMainEmail1}`">
                <v-btn color="secondary" ma-0>
                    <v-icon>mdi-email</v-icon>
                </v-btn>
            </a>
            <a :href="trans.ContactsAndForms.companyFacebook">
                <v-btn color="secondary" ma-0>
                    <v-icon>mdi-facebook</v-icon>
                </v-btn>
            </a>
        </v-list-item-group>
    </v-list>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: "headerContactsWidget",
    computed: mapGetters({
        trans: 'getTranslations',
    }),
}
</script>
