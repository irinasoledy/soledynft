<template>
  <main class="experts-content">
      <div class="parallax-container">
        <v-parallax
          dark
          src="https://glassprotect.md/uploads/contact-us-inner-banner.png"
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
                Specialized Team
              </h1>
              <h4 class="subheading" color="secondary">
               " We are a team of jurists, hygienists and receptionists who work together to ensure that you receive the best treatment that you require at a very time that suits you. "
              </h4>
            </v-col>
          </v-row>
        </v-parallax>
      </div>
      <section class="experts">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="display-1 text-center c-title">
                Discută live cu experții noștri
              </div>
              <p class="text-center text">
                Suntem mândri că am reușit să formăm o echipă de frunte printre prestatorii de top ai serviciilor juridice. O echipă cu care putem mereu onora misiunea pe care ne-am asumat-o.
              </p>
            </v-col>
            <v-col
              v-for="(item, i) in experts"
              :key="i"
              class="col-lg-4 col-md-6 col-12 d-flex child-flex"

              >
              <v-card>
                <v-img
                  :src="item.src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                </v-img>
                <v-card-title class="title justify-center">
                  {{item.name}}
                </v-card-title>
                <v-card-subtitle class="text-center">
                  {{item.role}}
                </v-card-subtitle>
                <v-card-actions
                  class="pb-5 justify-center"
                >
                  <v-btn
                    color="secondary"
                  >
                    <v-icon left>mdi-phone</v-icon>
                    Sună
                  </v-btn>

                  <v-btn
                    color="info"
                  >
                    <v-icon left>mdi-chat</v-icon>
                    Chat
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <map-contact></map-contact>
  </main>
</template>

<script>
import MapContact from "@/components/mapContact.vue"
export default {
  layout: "default",
  components: {
    MapContact
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
    experts: [
      {
        name: "Lilia Balan",
        role: "Jurist",
        src: "https://image.tmdb.org/t/p/original/hs2xlX7jAgY0dib1RPmjMjqVLMC.jpg"
      },
      {
        name: "Ion Neaga",
        role: "Jurist",
        src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },
      {
        name: "Andrei Mancu",
        role: "Jurist",
        src: "https://monkey47.com/thumbs/species-rara/mark-braun/mark-braun-500x750-q75.jpg"
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

  .experts-content {
      .subheading {
        color: $custom_red !important
      }

      .v-parallax {
        height: 60vh !important;
        position: relative;

        h1, h4 {
          position: relative;
          z-index: 2;
          max-width: 400px;
          margin: auto;
        }

        h4 {
          padding: 10px 0;
          border-top: 3px solid $custom_yellow;
          border-bottom: 3px solid $custom_yellow;
        }
      }

      .parallax-container {
        position: relative;
      }
      .v-parallax:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background-color: hsla(0,0%,100%,.7);
          z-index: 2;
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
