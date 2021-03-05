<template>
  <main class="about-content">
      <v-parallax
        dark
        src="/banner-about.jpg"
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
        <div class="container">
          <div class="row justify-center">
            <div class="col-lg-8 col-md-10 col-12">
                <p class="text-center">
                  Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.

                  Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.
                </p>
            </div>
          </div>
        </div>
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
    Experts,
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

  }),
}
</script>

<style lang="scss">
  .display-1 {
    color: $custom_blue !important;
    font-weight: 700 !important;
  }

  .about-content {
    .subheading {
      color: $custom_red !important
    }

    .v-parallax {
      height: 60vh !important;
    }

  }

  section {
    padding: 50px 0;
  }
</style>
