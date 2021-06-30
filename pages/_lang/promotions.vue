<template lang="html">
    <main class="about-content">
        <div
            v-for="(promotion, index) in promotions"
            :key="promotion.id"
            :id="`${promotion.alias}`"
            class="section"
            >
            <div class="banner-wrapper">
                <img :src="`${envAPI}/images/promotions/${promotion.img}`" v-if="!$mobileDetect.mobile()">
                <img :src="`${envAPI}/images/promotions/${promotion.img_mobile}`" v-else width="100%">
                <div class="headings">
                    <v-container>
                        <v-row>
                            <v-col class="col-md-7">
                                <h2 class="mb-4 heading-title">{{ promotion.translation.name }}</h2>
                                <p class="mb-4 heading-subtitle">{{ promotion.translation.description }}</p>
                                <div class="btn-wrapper-promo">
                                    <v-btn
                                        class="btn-custom" color="accent"
                                        @click="$nuxt.$emit('open-appointment-form')"
                                    >{{ promotion.translation.btn_text }}</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </div>

            <v-container class="text-center">
                <v-row align="center" justify="center">
                    <h4 class="uppercase-title">{{ trans.General.viewPromoDetails }}</h4>
                </v-row>

                <div v-for="(section, indexSec) in promotion.promo_sections" :key="indexSec" v-if="$mobileDetect.mobile()">
                    <v-row align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="promo-section-image" :src="`${envAPI}/images/promotions/${section.image}`" alt="">
                        </v-col>
                        <v-col cols="12" md="7" sm="12" xs="12" class="container-section" v-html="section.translation.body"></v-col>
                    </v-row>
                </div>

                <div v-for="(section, index) in promotion.promo_sections" :key="index"  v-if="!$mobileDetect.mobile()">
                    <v-row v-if="index % 2 == 0" align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="promo-section-image" :src="`${envAPI}/images/promotions/${section.image}`" alt="">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section" v-html="section.translation.body"></v-col>
                    </v-row>
                    <v-row v-else align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section" v-html="section.translation.body"></v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="promo-section-image" :src="`${envAPI}/images/promotions/${section.image}`" alt="">
                        </v-col>
                    </v-row>
                </div>

                <v-row align="center" justify="center">
                    <v-col cols="12" md="8" sm="12" xs="12">
                        <h4 class="minifed-title">
                            {{ trans.General.contactYouMessage }}
                        </h4>
                    </v-col>
                </v-row>
                <v-form
                    :ref="`feedBackForm_${promotion.id}`"
                    v-model="form.valid"
                    lazy-validation
                    >
                    <v-row align="center" justify="center" class="feed-back-promo">
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field
                                dark
                                class="name-filed-input"
                                :label="trans.ContactsAndForms.labelName"
                                outlined
                                v-model="form.name"
                                :rules="nameRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field
                            dark
                                type="number"
                                :label="trans.ContactsAndForms.labelPhone"
                                outlined
                                v-model="form.phone"
                                :rules="phoneRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="btn-promo-area">
                            <v-btn class="btn-custom" color="accent" width="300" @click="submitFeedback(promotion)">
                                {{ trans.General.freeConsultationMsg }}
                            </v-btn>
                        </v-col>
                        <v-col cols="12" class="phone-promo-area">
                            <span>{{ trans.General.or }}</span>
                        </v-col>
                        <v-col cols="12" class="bottom-spacer">
                            <v-btn class="btn-custom" color="accent" width="300" :href="`tel:${trans.ContactsAndForms.companyMainPhone1}`">
                                {{ trans.General.callNow }} {{ trans.ContactsAndForms.companyMainPhone1 }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </div>

        <div id="experts-area">
            <experts></experts>
        </div>
        <appointment-form></appointment-form>
        <chatBot :title="chatBotMessage" v-if="chatBotMessage"/>

    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Experts from "@/components/front/widgets/expertsWidget.vue"
import appointmentForm from "@/components/front/forms/appointmentForm.vue"
import userApi from '@/api/userApi'
import chatBot from '@/components/chat-module/chat-bot/chatBot'

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
    data: () => ({
        chatBotMessage: null,
        promotion: null,
        title: '',
        description: '',
        form: {
            valid: false,
            name: '',
            phone: '',
        },
        nameRules: [
            v => !!v || 'Name is required',
        ],
        phoneRules: [
            v => !!v || 'Phone is required',
        ],
    }),
    computed: mapGetters({
        services : 'getServices',
        language : 'getLanguage',
        envAPI : 'getEnvAPI',
        promotions : 'getPromotions',
        trans: 'getTranslations',
        user: 'chat/getUser',
    }),
    async mounted(){
        const alias = this.$route.hash
        this.title = this.trans.PageNames.defaultPageSeoTitle
        this.description = this.trans.PageNames.defaultPageSeoDesc
        this.promotion = await this.promotions.find((promo) => promo.alias == alias.substring(1))
        this.chatBotMessage = this.trans.General.botMessageTemplate1 + " " + this.promotion.translation.bot_message + '? '+ this.trans.General.botMessageTemplate2
    },
    methods: {
        submitFeedback(promotion) {
            const ref = 'feedBackForm_' + promotion.id
            if (this.$refs.[ref][0].validate()) {
                this.form.guestId = this.user._id
                this.form.trigger = "Promotion: " + promotion.translation.name
                userApi.bookUser(this.form, async response => {
                    this.form.name = ''
                    this.form.phone = ''
                    this.$refs.[ref][0].reset()
                })
            }
        }
    },
    components: { Experts, appointmentForm, chatBot }
}
</script>

<style lang="scss">
.v-expansion-panel::before{
    box-shadow: none !important;
}
.v-application--is-ltr .v-expansion-panel-header__icon{
    margin-left: 10px !important;
}
.accordion-title{
    font-size: 20px !important;
    margin-top: 25px;
}

.contact-btns{
    color: #FFF;
    padding-bottom: 40px;
}
.v-carousel__item{
    height: auto !important;
}
.v-carousel{
    height: auto !important;
}
.banner-wrapper{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.banner-wrapper .headings{
    position: absolute;
    left: 0px;
    top: 30%;
    width: 100%;
    height: auto;
}
.heading-title{
    margin-bottom: 20px;
    color: #FFF !important;
    font-size: 40px !important;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.0073529412em !important;
    font-family: "Roboto", sans-serif !important;
}
.heading-subtitle{
    margin-bottom: 50px;
    color: #FFF !important;
    font-size: 22px !important;
    line-height: 1.3;
}
.uppercase-title{
    text-transform: uppercase;
    margin: 40px 0;
    font-size: 1.7rem;
    color: $custom_blue;
}
.promo-section-image{
    width: 100%;
}
.minifed-title{
    text-transform: uppercase;
    font-size: 20px;
    color: $custom_blue;
}
.feed-back-promo{
    margin-top: 30px;
    .btn-promo-area{
        margin-top: -15px;
    }
    .phone-promo-area{
        padding: 0 !important;
        span{
            display: block;
            padding: 0;
            font-weight: bold;
        }
        p{
            font-size: 1.2rem;
            a{
                font-weight: bold;
                text-decoration: none;
            }
        }
    }
}
.bottom-spacer{
    margin-bottom: 30px;
}
.promo-section{
    margin-bottom: 40px;
}
.container-section{
    text-align: left;
    padding-left: 34px;
    ul{
        margin-top: 20px;
        margin-left: 20px;
        li{
            color: #4f5c65;
            padding-top: 5px;
    padding-bottom: 5px;
        }
    }
    p strong{
        font-size: 26px;
        color: $custom_blue;
    }
}
@media (max-width: 1281px) {
    .minifed-title{
        text-align: center;
    }
    .-full-width{
        width: 90%;
        margin-bottom: 9px;
    }
    .banner-wrapper h1{
        top: 40%;
        font-size: 1.2rem !important
    }
    .banner-wrapper img{
        max-height: 65vh;
    }
    .banner-wrapper .headings{
        position: absolute;
        left: 0px;
        top: 20%;
        width: 100%;
        height: auto;
    }
    .heading-title{
        text-align: center;
        padding: 0;
        margin-bottom: 20px;
        margin-top: 30px;
        color: #FFF !important;
        font-size: 24px !important;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: 0.0073529412em !important;
        font-family: "Roboto", sans-serif !important;
    }
    .heading-subtitle{
        text-align: center;
        padding: 0 !important;
        margin-bottom: 50px;
        color: #FFF !important;
        font-size: 18px !important;
        padding: 0 20px;
        line-height: 1.2;
    }
    .btn-wrapper-promo{
        text-align: center;
    }
    .uppercase-title{
        font-size: 20px;
        margin: 20px 0;
    }
    .container-section{
        padding-left: 15px;
    }
    .container-section p strong{
        font-size: 22px;
        line-height: 1;
    }
    .promo-section{
        margin-bottom: 20px;
    }
    .feed-back-promo .phone-promo-area{
        text-align: center;
    }
    .feed-back-promo .btn-promo-area{
        text-align: center;
    }
    .bottom-spacer{
        text-align: center;
    }
    .name-filed-input{
        margin-bottom: -31px !important;
    }
}
.btn-custom{
    color: $custom_blue !important;
}
</style>
