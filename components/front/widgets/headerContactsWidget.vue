<template>
    <v-list nav light>
        <div class="langs-wrapper">
            <span class="langs-block" v-for="(languageItem, index) in languages" @click="changeLang(languageItem)">
                <i class="active" v-if="language.id == languageItem.id">
                    {{ languageItem.name }}
                </i>
                <i v-else>
                    {{ languageItem.name }}
                </i>
            </span>
        </div>
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
        languages: 'getLanguages',
        language: 'getLanguage',
    }),
    methods: {
        ...mapActions(['changeLanguage']),
        changeLang(lang) {
            this.changeLanguage(lang.id).then(data => {
                const currentLang = '/' + this.language.lang
                const lastLang = this.$route.params.lang
                const fullPath = this.$route.fullPath
                let redirectTo = '/'

                if (lastLang) {
                    redirectTo = fullPath.replace('/' + lastLang, currentLang);
                } else {
                    redirectTo = currentLang;
                }
                this.$router.push(redirectTo)
            })
        },
    }
}
</script>

<style media="screen">
    .langs-wrapper{
        position: absolute;
        right: 5px;
        margin-top: 17px;
        z-index: 9;
    }
    .langs-block{
        margin: 0 10px;
    }
    .langs-block i{
        font-style: normal;
    }
    .langs-block .active{
        font-weight: bold;
        text-decoration: underline;
    }
</style>
