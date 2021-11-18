<template>
  <section
    id="testimonials"
    :class="$vuetify.theme.dark ? 'black' : 'white'"
    class="py-16"
  >
    <h2 class="text-h4 text-md-h3 text-center font-weight-black mb-8 my-8">
      Equipe de Desenvolvimento
    </h2>
    <v-carousel
      cycle
      draggable="true"
      hide-delimiter-background
      hide-delimiters
    >
      <v-carousel-item v-for="(item, i) in testimonials" :key="i" class="">
        <v-container fill-height>
          <div style="max-width: 700px" class="mx-auto text-center">
            <v-avatar size="128" class="mb-7">
              <img
                :src="`/img/static/team/${item.avtar}`"
                alt="John"
                width="128"
                height="128"
              />
            </v-avatar>
            <h3
              :class="
                $vuetify.theme.dark
                  ? 'black'
                  : 'white grey--text text--darken-2'
              "
              class="mb-1 font-weight-black text-uppercase"
            >
              {{ item.name }}
            </h3>
            <div class="mb-10 font-weight-light grey--text text-uppercase">
              {{ item.post }}
              <br>
              <v-btn icon :href="`${item.github}`">
                <v-icon color="blue">mdi-github</v-icon>
              </v-btn>
              <v-btn icon :href="`${item.linkedin}`">
                <v-icon color="blue">mdi-linkedin</v-icon>
              </v-btn>
            </div>
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
      testimonials: [
        {
          avtar: 'guilherme.jpg',
          name: 'Guilherme Anderson',
          post: 'SM - Desenvolvedor Full Stack',
          github: 'https://github.com/guianderson',
          linkedin: 'https://www.linkedin.com/in/raian-damaceno/'
        },
        {
          avtar: 'marcos.jpg',
          name: 'Marcos Vinicio',
          post: 'PO - Desenvolvedor Back end',
          github: 'https://github.com/MarcosVP-Fatec',
          linkedin: 'https://www.linkedin.com/in/marcos-vinicio-pereira-395415148/'
        },
        {
          avtar: 'jonathas.jpg',
          name: 'Jonathas Henrique',
          post: 'Desenvolvedor Full Stack',
          github: 'https://github.com/JonyHM',
          linkedin: 'https://www.linkedin.com/in/jonathas-moraes/'
        },
        {
          avtar: 'raian.jpg',
          name: 'Raian Damaceno',
          post: 'Desenvolvedor Front end',
          github: 'https://github.com/RaianDamaceno',
          linkedin: 'https://www.linkedin.com/in/raian-damaceno/'
        },
        {
          avtar: 'joshua.jpg',
          name: 'Gustavo Joshua',
          post: 'Desenvolvedor Back end',
          github: 'https://github.com/JoshuaSene',
          linkedin: 'https://www.linkedin.com/in/gustavo-joshua-sene-539927b5/'
        },
        {
          avtar: 'paulo_cesar.jpg',
          name: 'Paulo Cesar',
          post: 'Desenvolvedor Front end',
          github: 'https://github.com/paullo97',
          linkedin: 'https://www.linkedin.com/in/paulo-cesar-537396139/'
        },
        {
          avtar: 'lucas_magno.jpg',
          name: 'Lucas Magno',
          post: 'Desenvolvedor Front end',
          github: 'https://github.com/lucasmag26',
          linkedin: 'https://www.linkedin.com/in/lucas-magno-6a5765137/'
        },
        {
          avtar: 'joao.jpg',
          name: 'João Pedro Filipini',
          post: 'Desenvolvedor Back end',
          github: 'https://github.com/jpfilipini',
          linkedin: 'https://www.linkedin.com/in/joao-pedro-filipini/'
        }, 
      ],
    }
  },
}
</script>
