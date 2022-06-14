<template lang="html">
  <main class="margin-top">
    <v-container>
      <v-row>
        <v-col>
          <v-progress-linear
              color="primary accent-4"
              indeterminate
              rounded
              height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$router.push('/ro/cart')
  }
}
</script>

<style lang="css" scoped>
.margin-top {
  margin-top: 150px;
}
</style>
