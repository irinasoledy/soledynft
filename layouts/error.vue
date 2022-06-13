<template>
  <v-parallax
      dark
      class="container-404"
  >
    <v-container>
      <v-row
          align="center"
          justify="center"
      >
        <v-col cols="12">
          <h1 class="error_404">404</h1>
          <p class="subheading">
            We looked far and wide for that page and couldn't find it. Try one of these links to get back on track:
          </p>
          <p class="btn-wrapp-404">
            <v-btn to="/" class="primary">Go Home</v-btn>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'We are sorry, but the page where you looking for was not found...'
    }
  },
  head() {
    const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.container-404 {
  height: 90vh !important
}

.image-404 {
  max-width: 600px;
}

h1 {
  font-size: 30px !important;
  color: #293754;

}

.v-application .display-1 {
  font-size: 5.125rem !important;
}

.subheading {
  color: #734030 !important;
  font-size: 2rem;
  max-width: 600px;
  line-height: 1.2;
}

.error_404 {
  color: #734030;
  font-size: 5rem !important;
}

.v-parallax__image {
  bottom: auto;
}
</style>
