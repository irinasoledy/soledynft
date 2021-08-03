<template>
    <div class="size">
        <div class="size__header">
            <span>Select your size</span>
            <span>Size Guide</span>
        </div>
        <div class="size__items">

            <div class="size__item" v-for="subproduct in subproducts" :key="subproduct.id">
                <label class="size__radio">
                    <input type="radio" name="size" :value="subproduct.parameter_value.id" />
                    <span class="size__mark">{{ subproduct.parameter_value.translation.name }}</span>
                </label>
            </div>

            <!-- <div class="size__item" v-for="size in sizes" :key="size.value">
                <label class="size__radio">
                    <input :checked="size.selected" type="radio" name="size" :value="size.value" />
                    <span class="size__mark">{{size.label}}</span>
                </label>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
  name: "Sizes",
  props: ["sizes", "subproducts"]
}
</script>

<style lang="scss" scoped>
  .size {
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
      min-width: 40px;
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
      border-width: 2px;
    }
  }
</style>
