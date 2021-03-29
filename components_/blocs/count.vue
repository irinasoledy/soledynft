<template>
  <v-sheet class="my-10 py-10 px-0 py-md-10 px-md-10  text-center cust-count">
    <h6 class="text-h6">Încărcați contul</h6>
    <div class="d-flex justify-space-between flex-wrap">
      <v-img
      max-width="130"
      v-for="(item, i) in img"
      :key="i"
      :src="item">

    </v-img>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "count",
  data: () => ({
    img: [
      "https://genesis-stars.com/local/assets/img/ico_pay/visa-master-ico.svg",
      "https://genesis-stars.com/local/assets/img/ico_pay/privat-ico.svg",
      "https://genesis-stars.com/local/assets/img/ico_pay/mir-ico.svg",
      "https://genesis-stars.com/local/assets/img/ico_pay/webmoney-ico.svg",
      "https://genesis-stars.com/local/assets/img/ico_pay/qiwi-ico.svg",
      "https://genesis-stars.com/local/assets/img/ico_pay/yandex-ico.svg"
    ]
  })
}
</script>

<style scoped>
  .cust-count {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    overflow: hidden;
  }
  .cust-count:after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 150vw;
    height: 100%;
    top: 0;
    left: -50vw;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>