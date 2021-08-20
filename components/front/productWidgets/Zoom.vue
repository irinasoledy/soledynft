<template>
  <div class="zoom">
    <div class="zoom__image">
      <img :src="mainImg" @click="closeZoom" alt="">
    </div>
    <div class="zoom__close" @click="closeZoom">
      <v-icon color="#FFFF">
        mdi-close
      </v-icon>
    </div>
    <div class="zoom__nav">
      <img  v-for="(item, i) in images" :src="`https://back.soledy.com/images/${path}/og/${item.src}`" :key="i" @click="setMainImg" :class="[item.src === mainImg.src ? 'selected' : '', 'navImage']" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ["mainImage", "productImages", "path"],
  data () {
    return {
      images: this.productImages,
      mainImg: this.mainImage
    }
  },
  methods: {
    closeZoom () {
      this.$emit('closeZoom')
    },
    setMainImg (e) {
      const navImages = document.querySelectorAll(".navImage")
      navImages.forEach((e) => e.classList.remove("selected"))
      this.mainImg = e.target.getAttribute("src")
      e.target.classList.add("selected")
    }
  }
}
</script>

<style lang="scss" scoped>
  .zoom {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background: rgba($color: #000000, $alpha: 0.7);
    &__image {
      width: 100%;
      height: 100%;
      overflow: scroll;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        min-width: 500px;
        cursor: zoom-out;
      }
    }
    &__close {
      position: absolute;
      top: 10vh;
      right: 10vw;
      cursor: pointer;
    }
    &__nav {
      position: absolute;
      z-index: 3;
      left: 10vw;
      height: 100vh;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      img {
        width: 80px;
        margin: 10px 0;
        opacity: 0.5;
        transition: opacity .3s ease;
        cursor: zoom-in;
      }
      img.selected {
        opacity: 1;
        cursor: initial;
      }
    }
  }
</style>
