<template>
  <section
    id="footer-top"
    :class="
      $vuetify.theme.dark
        ? 'blue-grey darken-4 grey--text text--lighten-1'
        : 'grey lighten-3 grey--text text--darken-4'
    "
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="py-12">
          <v-row no-gutters>
            <v-col cols="12">
              <img src='../../public/img/logo_v2.png' alt="PacerLogo" width="200" height="80">
            </v-col>
          </v-row></v-col
        >
        <v-col cols="12" md="5" class="py-12">
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn icon href="https://github.com/RaianDamaceno/frontend-pacer">
                <v-icon color="red">mdi-github</v-icon>
              </v-btn> Repositório Frontend do Projeto<br>
              <v-btn icon href="https://github.com/JoshuaSene/pacer-backend">
                <v-icon color="blue">mdi-github</v-icon>
              </v-btn> Repositório Backend do Projeto
            </v-col>
          </v-row>
        </v-col>  
        <v-col cols="12" md="2" class="py-12">
          <v-row no-gutters>
            <v-col cols="12">
              Projeto desenvolvido por Guilherme Anderson, Jonathas Henrique, Gustavo Joshua, Raian Damaceno, Marcos Vinicio, Paulo Cesar, Lucas Magno e João Pedro Filipini
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
//import footerContactForm from '~/components/sections/footerContactForm.vue'
export default {
  components: {
    //footerContactForm,
  },
  data() {
    return {
      social: [
        {
          platform: 'Facebook',
          link: 'https://www.facebook.com/',
          icon: 'mdi-facebook',
        },
        {
          platform: 'Twitter',
          link: 'https://twitter.com/',
          icon: 'mdi-twitter',
        },
        {
          platform: 'Instagram',
          link: 'https://www.instagram.com/',
          icon: 'mdi-instagram',
        },
        {
          platform: 'Linkedin',
          link: 'https://www.linkedin.com/',
          icon: 'mdi-linkedin',
        },
        {
          platform: 'Github',
          link: 'https://modevue.staticdesigner.com/',
          icon: 'mdi-github',
        },
      ],
    }
  },
}
</script>
