<!-- <template>
    <v-app dark>
        <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
        </h1>
        <h1 v-else>
            {{ otherError }}
        </h1>
        <NuxtLink to="/">
            Home page
        </NuxtLink>
    </v-app>


    <main>


    </main>
</template> -->

<template>
  <v-parallax
    dark
    src=""
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h1 class="display-1 font-weight-thin mb-4">
          404
        </h1>
        <p class="subheading" color="primary">
            {{ otherError }}
        </p>
        <p class="btn-wrapp-404">
            <v-btn to="/" class="primary">Go Home</v-btn>
        </p>
      </v-col>
    </v-row>
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
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'We are sorry, but the page where you looking for was not found...'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 30px !important;
  color: #293754;

}
.v-application .display-1{
    font-size: 5.125rem !important;
}
.subheading{
    color: #293754;
}
.v-parallax__image{
    bottom: auto;
}
.btn-wrapp-404{
    margin-top: 30px;
}
</style>
