<template>
    <main class="contact-content">
        <v-parallax dark src="/contact-banner.jpg">
            <v-row align="center" justify="center">
                <v-col
                    class="text-center"
                    cols="12"
                    >
                    <h1 class="display-1 mb-4">
                        {{ trans.ContactsAndForms.contactPagesTitle }}
                    </h1>
                    <h4 class="subheading" color="secondary">
                        {{ trans.ContactsAndForms.contactPagesContactSubtitle }}
                    </h4>
                </v-col>
            </v-row>
        </v-parallax>
        <section class="contact-section">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="display-1 text-center c-title white--text">
                            {{ trans.ContactsAndForms.contactPagesTitle }}
                        </div>
                    </v-col>
                    <div class="col-md-4">
                        <p class="text-center">
                            <img width="100" src="/rm1.png" class="map-country-img"/>
                        </p>
                        <p class="text-center">{{ trans.ContactsAndForms.companyMainName }}</p>
                        <p class="text-center white--text">
                            <v-icon class="white--text">mdi-marker</v-icon>
                            {{ trans.ContactsAndForms.companyMainAdres }}
                        </p>
                        <p class="text-center">
                            <v-icon class="white--text">mdi-phone</v-icon>
                            {{ trans.ContactsAndForms.labelPhoneViberWhatsapp }} <a class="white--text" :href="`tel:${trans.ContactsAndForms.companyMainPhone1}`">{{ trans.ContactsAndForms.companyMainPhone1 }}</a>
                        </p>
                        <p class="text-center">
                            <v-icon class="white--text">mdi-email</v-icon>
                            {{ trans.ContactsAndForms.labelEmail }}: <a class="white--text" :href="`mailto:${trans.ContactsAndForms.companyMainEmail1}`">{{ trans.ContactsAndForms.companyMainEmail1 }}</a>
                        </p>
                        <p class="text-center">
                            <a class="white--text" :href="`https://${trans.ContactsAndForms.companyWebsite1}`">{{ trans.ContactsAndForms.companyWebsite1 }}</a>
                        </p>
                        <p class="text-center">
                            <a class="white--text" :href="trans.ContactsAndForms.companyFacebook">{{ trans.ContactsAndForms.companyFacebook }}</a>
                        </p>
                        <p class="text-center">
                            <a class="white--text" :href="trans.ContactsAndForms.companyInstagram">{{ trans.ContactsAndForms.companyInstagram }}</a>
                        </p>
                    </div>

                    <div class="col-md-4">
                        <p class="text-center">
                            <img width="100" src="/md2.png" class="map-country-img"/>
                        </p>
                        <p class="text-center">{{ trans.ContactsAndForms.companyMainNameMD }}</p>
                        <p class="text-center white--text">
                            <v-icon class="white--text">mdi-marker</v-icon>
                            {{ trans.ContactsAndForms.companyMainAdresMD }}
                        </p>
                        <p class="text-center">
                            <v-icon class="white--text">mdi-phone</v-icon>
                            {{ trans.ContactsAndForms.labelPhoneViberWhatsapp }} <a class="white--text" :href="`tel:${trans.ContactsAndForms.companyMainPhone1MD}`">{{ trans.ContactsAndForms.companyMainPhone1MD }}</a>
                        </p>
                        <p class="text-center">
                            <v-icon class="white--text">mdi-email</v-icon>
                            {{ trans.ContactsAndForms.labelEmail }}: <a class="white--text" :href="`mailto:${trans.ContactsAndForms.companyMainEmail1MD}`">{{ trans.ContactsAndForms.companyMainEmail1MD }}</a>
                        </p>
                        <p class="text-center">
                            <a class="white--text" :href="`https://${trans.ContactsAndForms.companyMainWebsiteMD}`">{{ trans.ContactsAndForms.companyMainWebsiteMD }}</a>
                        </p>
                    </div>
                    <div class="col-md-4 white--text">
                        <p class="text-center">
                            <img width="100" src="/es4.png" class="map-country-img"/>
                        </p>
                        <p class="text-center">{{ trans.ContactsAndForms.companyMainNameEE }}</p>
                        <p class="text-center white--text">
                            <v-icon class="white--text">mdi-marker</v-icon>
                            {{ trans.ContactsAndForms.companyMainAdresEE }}
                        </p>
                        <p class="text-center">
                            <v-icon class="white--text">mdi-phone</v-icon>
                            {{ trans.ContactsAndForms.labelPhoneViberWhatsapp }} <a class="white--text" :href="`tel:${trans.ContactsAndForms.companyMainPhone1EE}`">{{ trans.ContactsAndForms.companyMainPhone1EE }}</a>
                        </p>
                        <p class="text-center">
                            <v-icon class="white--text">mdi-email</v-icon>
                            {{ trans.ContactsAndForms.labelEmail }}: <a class="white--text" :href="`mailto:${trans.ContactsAndForms.companyMainEmail1EE}`">{{ trans.ContactsAndForms.companyMainEmail1EE }}</a>
                        </p>
                        <p class="text-center">
                            <a class="white--text" :href="`https://${trans.ContactsAndForms.companyMainWebsiteEE}`">{{ trans.ContactsAndForms.companyMainWebsiteEE }}</a>
                        </p>
                    </div>
                    <div class="col-md-12">
                        <v-form
                            class="contactForm text-center"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            v-if="!formSended"
                            >
                            <v-text-field
                                solo
                                v-model="form.name"
                                :counter="10"
                                :rules="nameRules"
                                :label="trans.ContactsAndForms.labelName"
                                required
                                ></v-text-field>
                            <v-text-field
                                solo
                                v-model="form.email"
                                :rules="emailRules"
                                :label="trans.ContactsAndForms.labelEmail"
                                required
                                ></v-text-field>
                            <v-text-field
                                solo
                                v-model="form.phone"
                                :rules="phoneRules"
                                :label="trans.ContactsAndForms.labelPhone"
                                required
                                ></v-text-field>
                            <v-textarea
                                solo
                                v-model="form.message"
                                name="input-7-4"
                                :label="trans.ContactsAndForms.labelMessage"
                                hint="Hint text"
                                ></v-textarea>
                            <v-btn
                                @click="submitFeedback()"
                                color="accent"
                                class="mr-4 btn-primary-text"
                                >
                                {{ trans.ContactsAndForms.sendButton }}
                            </v-btn>
                        </v-form>
                        <v-card-text v-else>
                            <v-alert
                                dense
                                text
                                type="success"
                                >
                                Datele au fost transmise cu succes!!!
                            </v-alert>
                        </v-card-text>
                    </div>
                </v-row>
            </v-container>
        </section>
        <experts></experts>
        <section class="testimonials">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="display-1 text-center">
                            {{ trans.General.testemonialsServicesPageTitle1 }} {{ trans.General.testemonialsServicesPageTitle2 }}
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <Testimonials></Testimonials>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <map-contact></map-contact>
    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Testimonials from "@/components/front/sliders/testimonialsSlider"
import Experts from "@/components/front/widgets/expertsWidget.vue"
import MapContact from "@/components/front/widgets/mapWidget.vue"
import userApi from '@/api/userApi'

export default {
    layout: "default",
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    },
    components: {
        Testimonials,
        MapContact,
        Experts
    },
    data: () => ({
        formSended: false,
        title: '',
        description: '',
        valid: true,
        form: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        phoneRules: [
            v => !!v || 'Phone is required',
        ],
    }),
    computed: mapGetters({
        trans: 'getTranslations',
        user: 'chat/getUser',
    }),
    mounted() {
        this.setChatBotmessage(this.trans.General.botMessageTemplateContacts)
        this.title = this.trans.PageNames.defaultPageSeoTitle
        this.description = this.trans.PageNames.defaultPageSeoDesc
    },
    methods: {
        ...mapActions({
            setChatBotmessage: 'chat/setChatBotmessage'
        }),
        submitFeedback() {
            if (this.$refs.form.validate()) {
                this.form.guestId = this.user._id
                this.form.trigger = "Contact Form"
                userApi.bookUser(this.form, async response => {
                    this.$refs.form.reset()
                    this.formSended = true
                })
            }
        },
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}
</script>

<style lang="scss">
.contact-section {
    padding-top: 0 !important
}
.display-1 {
    color: #FFF !important;
    font-weight: 700 !important;
}
.contact-content {
    background-color: $custom_blue !important;
    color: #FFF;
    .subheading {
        color: $custom_red !important
    }
    .v-parallax {
        height: 60vh !important;
    }
    .contactForm {
        max-width: 50%;
        margin: auto;
    }
}
section {
    padding: 50px 0;
}
.map-country-img{
    height: 70px;
    width: auto;
}
textarea, input{
    color: $custom_blue !important;
}
.btn-primary-text{
    color: $custom_blue !important;
}
@media (max-width: 900px) {
    .contact-content {

        .contactForm {
            max-width: 100%;
            margin: auto;
        }
    }
}
</style>
