<template>
  <agile class="c-slider" :options="options">
    <div class="slide" v-for="(item, i) in testimonials" :key="i">
      <v-card
        class="c-card"
        >
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-text>"{{item.text}}"</v-card-text>
      </v-card>
    </div>
  </agile>
</template>
<script>
export default {
  name: "Testimonial",
  data: () => (
    {
      testimonials: [
        {
          name: "Marina Ceban",
          text: "Acționează, miscă oameni și lucruri, idei și concepte, oferă soluții — calități de maxim respect."
        },
        {
          name: "Marcel Chicu",
          text: "Profesioniști, cu verticalitate, experți în materie și pe teritoriul Italiei, gentili și o familie exemplu. Când Diaspora am cerut sa fim susținuți, am avut răspuns promt și s-au implicat/dedicat Binelui Comun. Cunosc limbi și folosesc rețelele de socializare. Altruiști, tineri și solidari în activități de Voluntariat. Grazie!"
        },
        {
          name: "Nicolae Movila",
          text: "Ori de câte ori am apelat la serviciile dvs., nu ne-ați dezamăgit dând dovadă de maximă corectitudine, eficiență, promptitudine și profesionalism. Mereu ați găsit cea mai buna soluție în concordanța cu cerințele noastre ce ne-a convins că sunteți o buna alegere. Sunt convins că ne vom baza în continuare pe serviciile dvs.!"
        },
        {
          name: "Nata Ciocan",
          text: "Seriozitate și profesionalism!! Cea mai bună colaborare este atunci când aceasta vine la pachet cu respectul, transparența și profesionalismul de care partenerul dă dovadă. În colaborarea pe care am avut-o, Casa de Avocatură Digore a dat dovadă de toate calitățile mai sus menționate, în opinia mea avem nevoie de astfel de oameni demni care să apere interesele cetățenilor din Republica Moldova și de peste hotarele ei.!"
        },
      ],
      options: {
        slidesToShow: 1,
        navButtons: false,
        dots: true,
        responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
      }
    }
  )
}
</script>

<style lang="scss">
  .c-slider {
    margin: 0 -15px;
    .agile__list {
      padding: 20px 0 !important;
    }
    .slide,
    .c-card {
      height: 100%;
    }

    .c-card {
      margin: 15px;
    }

    .agile__actions {
      margin-top: 20px;
    }


    .agile__dot {
      margin: 0 10px;

      button {
        background-color: rgb(147, 143, 143);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: .3s;
        width: 10px;
      }
      &:hover button {
        background-color: rgb(36, 35, 35)
      }
    } 
			
    .agile__dot--current button {
      background-color:  rgb(36, 35, 35)
    }
	
  }
</style>