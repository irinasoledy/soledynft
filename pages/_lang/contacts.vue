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
        <section>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="display-1 text-center c-title">
                            {{ trans.ContactsAndForms.contactPagesTitle }}
                        </div>
                    </v-col>
                    <div class="col-md-6">
                        <p class="text-center">
                            <img width="100" src="/MD.png"/>
                        </p>
                        <p class="text-center">
                            Moldova
                        </p>
                        <p class="text-center">Compania: IT MALL OU</p>
                        <p class="text-center">
                            <v-icon>mdi-marker</v-icon>
                            Adresa depozitului: România, Brașov, str. Zizinului 9B
                        </p>
                        <p class="text-center">
                            <v-icon>mdi-phone</v-icon>
                            Tel/ Viber/ Whatsapp: <a href="tel:+37379666626">+37379666626</a>
                        </p>
                        <p class="text-center">
                            <v-icon>mdi-email</v-icon>
                            Email: <a href="mailto:info@soledy.com">info@soledy.com</a>
                        </p>
                        <!-- <p class="text-center">
                            <v-btn
                                color="primary"
                                class="mr-4 mt-11 "
                                >
                                Discută live cu expertul
                            </v-btn>
                        </p> -->
                    </div>
                    <div class="col-md-6">
                        <v-form
                            class="contactForm"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            >
                            <v-text-field
                                v-model="name"
                                :counter="10"
                                :rules="nameRules"
                                :label="trans.ContactsAndForms.labelName"
                                required
                                ></v-text-field>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                :label="trans.ContactsAndForms.labelEmail"
                                required
                                ></v-text-field>
                            <v-text-field
                                :label="trans.ContactsAndForms.labelPhone"
                                required
                                ></v-text-field>
                            <v-textarea
                                name="input-7-4"
                                :label="trans.ContactsAndForms.labelMessage"
                                hint="Hint text"
                                ></v-textarea>
                            <v-btn
                                color="secondary"
                                class="mr-4"
                                >
                                {{ trans.ContactsAndForms.sendButton }}
                            </v-btn>
                        </v-form>
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
        title: '',
        description: '',
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),
    computed: mapGetters({
        trans: 'getTranslations'
    }),
    mounted(){
        this.title = this.trans.PageNames.defaultPageSeoTitle
        this.description = this.trans.PageNames.defaultPageSeoDesc
    },
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
}
</script>

<style lang="scss">
.display-1 {
    color: $custom_blue !important;
    font-weight: 700 !important;
}
.contact-content {
    .subheading {
        color: $custom_red !important
    }
    .v-parallax {
        height: 60vh !important;
    }
    .contactForm {
        max-width: 360px;
        margin: auto;
    }
}
section {
    padding: 50px 0;
}
</style>
