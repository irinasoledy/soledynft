<template>
	<div class="contacts">
		<div class="banner">
			<div class="banner__image">
				<img :src="$banner('Contacts_Banner', $mobileDetect.mobile())" alt="banner" />
			</div>
			<div class="banner__text">
				<div class="banner__title">
					{{ $trans('ContactsAndForms', 'contactPagesTitle') }}
				</div>
				<p class="banner__paragraph">
                    {{ $trans('ContactsAndForms', 'contactPagesContactSubtitle') }}
                </p>
			</div>
		</div>
		<v-container>
			<v-row class="justify-space-around">
				<v-col class="col-12">
					<h3 class="c-title my-3">
                        {{ $trans('ContactsAndForms', 'contactPagesTitle') }}
					</h3>
				</v-col>
				<v-col class="col-xl-3 col-lg-3 col-md-6 col-12">
					<div class="contacts__item">
						<img src="/images/rm1.png" alt="">
						<p class="contacts__country">Romania</p>
						<p>{{ $trans('ContactsAndForms', 'companyMainName') }}</p>
						<p>
							<v-icon color="primary">mdi-map-marker</v-icon>
							{{ $trans('ContactsAndForms', 'companyMainAdres') }}
						</p>
						<a href="tel:+37379666626">
							<v-icon color="primary">mdi-phone</v-icon>
							{{ $trans('ContactsAndForms', 'labelPhoneViberWhatsapp') }} <a :href="`tel:${$trans('ContactsAndForms', 'companyMainPhone1')}`">{{ $trans('ContactsAndForms', 'companyMainPhone1') }}</a>
						</a>
						<a href="mailto:info@soledy.com">
							<v-icon color="primary">mdi-mail</v-icon>
                            {{ $trans('ContactsAndForms', 'labelCommunicationMethodOptionEmail') }}: <a :href="`mailto:${$trans('ContactsAndForms', 'companyMainEmail1')}`">{{ $trans('ContactsAndForms', 'companyMainEmail1') }}</a>
						</a>
						<div class="social">
							<a :href="$trans('ContactsAndForms', 'companyInstagram')">
								<v-icon color="primary">mdi-instagram</v-icon>
							</a>
							<a :href="$trans('ContactsAndForms', 'companyFacebook')">
								<v-icon color="primary">mdi-facebook</v-icon>
							</a>
						</div>
						<a class="butt" href="#contactsForm">
                            {{ $trans('Contacts', 'sendUsMessage') }}
						</a>
					</div>
				</v-col>

				<v-col class="col-xl-3 col-lg-3 col-md-6 col-12">
					<div class="contacts__item">
						<p class="text-center">
							<img width="100" src="https://terradigital.ro/md2.png" class="map-country-img"/>
						</p>
						<p class="text-center">{{ $trans('ContactsAndForms', 'companyMainNameMD') }}</p>
						<p class="text-center">
							<v-icon>mdi-marker</v-icon>
							{{ $trans('ContactsAndForms', 'companyMainAdresMD') }}
						</p>
						<p class="text-center">
							<v-icon>mdi-phone</v-icon>
							{{ $trans('ContactsAndForms', 'labelPhoneViberWhatsapp') }} <a :href="`tel:${trans.ContactsAndForms.companyMainPhone1MD}`">{{ $trans('ContactsAndForms', 'companyMainPhone1MD') }}</a>
						</p>
						<p class="text-center">
							<v-icon>mdi-email</v-icon>
							{{ $trans('ContactsAndForms', 'labelCommunicationMethodOptionEmail') }}: <a :href="`mailto:${trans.ContactsAndForms.companyMainEmail1MD}`">{{ $trans('ContactsAndForms', 'companyMainEmail1MD') }}</a>
						</p>
						<p class="text-center">
							<a :href="`https://${trans.ContactsAndForms.companyMainWebsiteMD}`">{{ $trans('ContactsAndForms', 'companyMainWebsiteMD') }}</a>
						</p>
						<div class="social">
							<a :href="$trans('ContactsAndForms', 'companyInstagram')">
								<v-icon color="primary">mdi-instagram</v-icon>
							</a>
							<a :href="$trans('ContactsAndForms', 'companyFacebook')">
								<v-icon color="primary">mdi-facebook</v-icon>
							</a>
						</div>
						<a class="butt" href="#contactsForm">
							{{ $trans('Contacts', 'sendUsMessage') }}
						</a>
					</div>
				</v-col>

				<v-col class="col-xl-3 col-lg-3 col-md-6 col-12">
					<div class="contacts__item">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Flag-map_of_Estonia.svg/1280px-Flag-map_of_Estonia.svg.png" alt="">
						<p class="contacts__country">Estonia</p>
						<p>{{ $trans('ContactsAndForms', 'companyMainNameEE') }}</p>
						<p>
							<v-icon color="primary">mdi-map-marker</v-icon>
							{{ $trans('ContactsAndForms', 'companyMainAdresEE') }}
						</p>
						<a href="tel:+37379666626">
							<v-icon color="primary">mdi-phone</v-icon>
                            {{ $trans('ContactsAndForms', 'labelPhoneViberWhatsapp') }} <a :href="`tel:${$trans('ContactsAndForms', 'companyMainPhone1EE')}`">{{ $trans('ContactsAndForms', 'companyMainPhone1EE') }}</a>
						</a>
						<a href="mailto:info@soledy.com">
							<v-icon color="primary">mdi-mail</v-icon>
                            {{ $trans('ContactsAndForms', 'labelCommunicationMethodOptionEmail') }}: <a :href="`mailto:${$trans('ContactsAndForms', 'companyMainEmail1EE')}`">{{ $trans('ContactsAndForms', 'companyMainEmail1EE') }}</a>
						</a>
						<div class="social">
							<a :href="$trans('ContactsAndForms', 'companyInstagram')">
								<v-icon color="primary">mdi-instagram</v-icon>
							</a>
							<a :href="$trans('ContactsAndForms', 'companyFacebook')">
								<v-icon color="primary">mdi-facebook</v-icon>
							</a>
						</div>
						<a class="butt" href="#contactsForm">
                            {{ $trans('Contacts', 'sendUsMessage') }}
						</a>
					</div>
				</v-col>
			</v-row>
			
			<v-row id="contactsForm" class="justify-center contacts__form">
				<v-col class="col-xl-3 col-lg-5 col-md-6 col-sm-6 col-12">
					<p class="form___title">
						{{ $trans('ContactsAndForms', 'graficLucruTitle') }}
					</p>
					<p>
                        {{ $trans('ContactsAndForms', 'mondayFriday') }}
						{{ $trans('ContactsAndForms', 'mondayFridayHours') }}
					</p>
					<p>
                        {{ $trans('ContactsAndForms', 'weekEnd') }}: {{ $trans('ContactsAndForms', 'closed') }}
					</p>
					<h3 class="c-title my-3">
						{{ $trans('Contacts', 'getInTouch') }}
					</h3>
					<p>
						{{ $trans('Contacts', 'fillTheForm') }}
					</p>

                    <v-form
                        class="contactForm text-center"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        v-if="!formSended"
                        >
                        <v-text-field
                            v-model="form.name"
                            dense outlined
                            :rules="nameRules"
                            :label="trans.ContactsAndForms.labelName"
                            required
                            ></v-text-field>
                        <v-text-field
                            dense outlined
                            v-model="form.email"
                            :rules="emailRules"
                            :label="$trans('ContactsAndForms', 'labelCommunicationMethodOptionEmail')"
                            required
                            ></v-text-field>
                        <v-text-field
                            dense outlined
                            v-model="form.phone"
                            :rules="phoneRules"
                            :label="trans.ContactsAndForms.labelPhone"
                            required
                            ></v-text-field>
                        <v-textarea
                            dense outlined
                            v-model="form.message"
                            name="input-7-4"
                            :label="trans.ContactsAndForms.labelMessage"
                            hint="Hint text"
                            ></v-textarea>
                        <v-btn
                            @click="submitFeedback()"
                            color="accent text--white"
                            class="mr-4 btn-primary-text"
                            >
                            {{ $trans('ContactsAndForms', 'sendButton') }}
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
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>



<script>

import { mapActions, mapGetters } from 'vuex'
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
        this.setChatBotmessage(this.$trans('General', 'botMessageTemplateContacts'))
        this.title = this.$trans('PageNames', 'defaultPageSeoTitle')
        this.description = this.$trans('PageNames', 'defaultPageSeoDesc')
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

<style lang="scss" scoped>
  .banner {
    position: relative;
    height: 70vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    &__text {
      flex-direction: column;
      background: none;
    }
    &__title {
      color: #ffff;
      text-align: center;
      margin-bottom: 30px;
    }
    &__paragraph {
      font-size: 18px;
      color: #ffffff !important;
      text-align: center;

    }
    &__image {
      width: 100%;
      height: 70vh;
    }
  }
  .contacts {
    .c-title {
      color: $red-color;
    }
    p, a {
        color: $main-color;
        font-size: 16px;
        display: block;
        margin-bottom: 5px;
        font-family: $font-text;
        text-align: center;
    }
    &__item {
      text-align: center;
      margin-bottom: 30px;

      img {
        max-width: 150px;
      }
    }
    &__country {
      font-size: 22px !important;
      font-weight: bold;
    }

    .social a {
      display: inline;
       margin-left: 10px;
    }
    .social {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .butt {
      top: 20px;
      font-family: $font-text;
      font-size: 20px;
      color: #42261D;
      padding: 10px;
      border: 1px solid #42261D;
      background: #fff1d7;
      display: inline;
    }
    p.form___title {
      font-weight: bold;
      font-size: 20px;
    }
    form {
      margin-top: 20px;
    }
  }
</style>
