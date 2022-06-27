<template>
  <div>
    <p class="productOne__bloc-text" v-html="text"></p>
    <p class="productOne__bloc-text" v-html="brandText"></p>
  </div>
</template>

<script>
export default {
  name: "AboutArea",
  props: ['text', 'brandText']
}
</script>

<style scoped>

</style>