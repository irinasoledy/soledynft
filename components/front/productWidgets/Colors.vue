<template>
  <div class="color">
    <div class="color__header">
      <span>Select color</span>
    </div>
    <div class="color__items">
      <div class="color__item" v-for="color in colors" :key="color.value">
        <label class="color__radio">
          <input :checked="color.selected" type="radio" name="color" :value="color.value" />
          <span class="color__mark" :style="{background: color.value}"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Colors",
  props: ["colors"]
}
</script>

<style lang="scss" scoped>
  .color {
    &__header {
      font-size: 12px;
      color: $main-color;
      display: flex;
      justify-content: space-between;

      span:nth-child(2) {
        opacity: 0.5;
        text-decoration: underline;

        &:hover {
          opacity: 1;
        }
      }
    }
    &__items {
      display: flex;
      width: 100%;
      margin-top: 5px;
    }
    &__item {
      margin-right: 5px;
    }
    &__radio {
      width: 40px;
      height: 40px;
      position: relative;
      display: block;

      input {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }
    }
    &__mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
    input:checked ~ &__mark {
      color: $main-color;
      border-color: $main-color;
      border-width: 6px;
    }
  }
</style>
