<template>
  <section id="hero">
    <v-carousel
      height="calc(100vh - 64px)"
      dark
      cycle
      show-arrows-on-hover
      draggable="true"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(carousel, carindex) in carouselsData"
        :key="carindex"
        :src="carousel.src"
        class="gradient-fill"
      >
        <v-container fill-height>
          <div style="max-width: 600px">
            <div class="text-md-h2 mb-3 text-sm-h3 text-h5 font-weight-black">
              {{ carousel.heading.toUpperCase() }}
            </div>
            <p class="mb-5">{{ carousel.subHeading }}</p>
            <v-btn 
            a href="/login"
            :x-large="$vuetify.breakpoint.smAndUp" class="my-3 primary"
              >Acessar Plataforma</v-btn
            >
          </div>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      carouselsData: [
        {
          src: 'img/static/avaliacao2.png',
          heading: ' Ambiente colaborativo ',
          subHeading:
            '',
        },
        {
          src: 'img/static/Empresas-Vetor2.jpg',
          heading: ' Melhoria no desempenho ',
          subHeading:
            '',
        },
        {
          src: 'img/static/avaliacao.jpg',
          heading: ' Avaliação de desempenho ',
          subHeading:
            '',
        },
        {
          src: 'img/static/11-1-1024x600.jpg',
          heading: ' Foco em resultado ',
          subHeading:
            '',
        },
      ],
    }
  },
}
</script>

<style>
.gradient-fill .v-responsive__content {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    to right,
    rgba(3, 12, 41, 0.75),
    rgba(5, 11, 31, 0.65)
  );
}
</style>
