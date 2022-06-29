<template>
  <div class="properties-area">

    <span class="properties-area-item" v-for="(property, key) in properties" :key="key" v-if="property">
      <p class="properties-area-item-name">{{ key }}</p>
      <p class="properties-area-item-value">{{ property }}</p>
    </span>

  </div>
</template>

<script>
export default {
  name: "PropertiesArea",
  props: ['properties']
}
</script>

<style scoped>

</style>