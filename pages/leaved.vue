<!-- <template lang="html">
    <div class="">
        <h4 class="text-center">The conference is over.</h4>
    </div>
</template> -->

<!-- <template>
      <v-container>
          <v-row
            justify="center"
            align="center"
          >
            <v-chip draggable>
              <h4 class="text-center">The conference is over.</h4>
            </v-chip>
          </v-row>
      </v-container>

</template> -->

<template>
  <v-parallax
    dark
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
          The conference is over.
        </h1>
        <h4 class="subheading">
            <NuxtLink to="/">
                go home
            </NuxtLink>
            <small> or </small>
            <NuxtLink to="/socket">
                create new conference
            </NuxtLink>
        </h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
