<template>
  <main class="contact-content">
      <v-parallax
        dark
        src="/contact-banner.jpg"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            class="text-center"
            cols="12"
          >
            <h1 class="display-1 mb-4">
              Lorem ipsum dolor sit.
            </h1>
            <h4 class="subheading" color="secondary">
              Build your application today!
            </h4>
          </v-col>
        </v-row>
      </v-parallax>
      <section>
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="display-1 text-center c-title">
                Contacte
              </div>
            </v-col>
            <div class="col-md-6">
              <p class="text-center">
                <img width="100" src="MD.png" alt="" />
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
              <p class="text-center">
                <v-btn
                  color="primary"
                  class="mr-4 mt-11 "
                >
                  Discută live cu expertul
                </v-btn>
              </p>
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
                  label="Nume"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  label="Telefon"
                  required
                ></v-text-field>
                <v-textarea
                  name="input-7-4"
                  label="Mesaj"
                  hint="Hint text"
                ></v-textarea>
                <v-btn
                  color="secondary"
                  class="mr-4"
                >
                  Trimite
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
                Clienții Noștri
              </div>
            </v-col>
            <v-col cols="12">
              <testimonial></testimonial>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <map-contact></map-contact>
  </main>
</template>

<script>
import Testimonial from "@/components/sliders/testimonial"
import MapContact from "@/components/mapContact.vue"
import Experts from "@/components/blocs/experts.vue"
export default {
  layout: "default",
  components: {
    Testimonial,
    MapContact,
    Experts
  },
  data: () => ({

    items: [
      {
        src: '/banner.jpg',
        text: 'Cetățenie Română'
      },
      {
        src: '/banner.jpg',
        text: 'Programări online'
      },
      {
        src: '/banner.jpg',
        text: 'Obținerea pașaportului românesc'
      },
      {
        src: '/banner.jpg',
        text: 'Programări online'
      },
    ],
    servicesSection: [
      {
        title: "Cetațenia română",
        src: "cetro.png"
      },
      {
        title: "Permis de ședere",
        src: "permsed.png"
      },
      {
        title: "Permis de muncă",
        src: "work.png"
      },
      {
        title: "Permis de Conducere",
        src: "permcond.png"
      },
      {
        title: "Obținerea alte acte/ certificate Ro",
        src: "lavoro.png"
      },
      {
        title: "Alte Servicii",
        src: "other.png"
      },
    ],
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
