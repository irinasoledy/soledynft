<template>
  <section class="map-contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-md-6 col-12">
          <v-card class="hours-plan">
            <h5>Zile lucrătoare</h5>
            <ul>
              <li><span>Luni</span><span>8:00-18:00</span></li>
              <li><span>Marți</span><span>8:00-18:00</span></li>
              <li><span>Miercuri</span><span>9:00-18:00</span></li>
              <li><span>Joi</span><span>8:00-18:00</span></li>
              <li><span>Vineri</span><span>8:00-18:00</span></li>
              <li><span>Sâmbătă-Duminică</span><span>Liber</span></li>
            </ul>
            <h5>Dorești programare?</h5>
              <v-btn
                  color="secondary"
                  dark
                  @click="$nuxt.$emit('open-appointment-form')"
              >
              <v-icon left>mdi-book-open</v-icon>
                Programează-te
              </v-btn>
              <appointment-form></appointment-form>
          </v-card>
        </div>
      </div>
    </div>
    <div class="mapouter">
      <div class="gmap_canvas">
        <iframe
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=bucuresti&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
        <a href="https://www.embedgooglemap.net"></a>
      </div>
      <style>
        .mapouter {
          text-align: right;
          height: 100%;
          width: 100%;
        }
        .gmap_canvas {
          overflow: hidden;
          background: none !important;
          height: 100%;
          width: 100%;
        }
      </style>
    </div>
  </section>
</template>
<script>
import appointmentForm from './forms/appointmentForm.vue'
export default {
  components: { appointmentForm },
  name: "MapContact",
  data: () => (
    {
      dialog: false
    }
  ),

}
</script>

<style lang="scss">
  .map-contact {
    padding: 0;
    position: relative;
    z-index: 1;

    .col-12 {
      padding: 0;
    }

    .hours-plan {
      background: $custom_blue;
      padding: 80px 15px;
      position: relative;
      z-index: 2;

      img {
        margin-bottom: 30px;
      }

      h5 {
        font-size: 20px;
        color: $custom_yellow;
        line-height: 1.1;
        margin-bottom: 20px;
      }

      li,
      p {
        font-size: 16px;
        color: #ffff;
        line-height: 1.1;
      }

      p {
        margin-bottom: 10px;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid rgba($color: rgb(133, 133, 133), $alpha: 0.85);

        span:last-child {
          color: rgba($color:  rgb(193, 193, 193), $alpha: 0.85);
        }
      }

      ul {
        margin-bottom: 40px;
        padding-left: 0;
      }

      .button {
        span {
          color: #fff;
        }

        #arrow {
          fill: #fff;
        }
      }
    }

    .mapouter {
      top: 0;
      right: 0;
      width: 100vw;
      height: 100%;
      min-height: 500px;
      z-index: 1;
      filter: grayscale(100%);
    }

    iframe {
      width: 100%;
      height: 100%;
      min-height: 500px;
    }
  }

  @media (min-width: 991px) {
      .map-contact {
        padding: 80px 0;

        .hours-plan {
          padding: 40px;
        }
        .mapouter {
          position: absolute;
          width: 100vw;
          height: 70vh;
        }
      }
  }
</style>