<template>
  <section class="primary darken-1 white--text py-16">
    <v-container>
      <v-row>
        <v-col class="text-center">
          <div class="text-h5 text-md-h4 text-center font-weight-black py-3 mb-10">
            Vantagens na utilização do Pacer
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          sm="4"
          class="text-center"
        >
          <v-avatar
            size="80"
            class="display-1 white font-weight-bold primary--text mb-5"
            style="opacity: 1.15"
            >{{ card.callout }}</v-avatar
          >
          <div class="title text-uppercase mt-1 mb-4" v-text="card.title"></div>

          <p v-text="card.text"></p>
          <v-row no-gutters>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-btn
         href="/login"
         x-large rounded color="white primary--text mx-auto mt-10 px-16">
          <v-icon dark left> mdi-check-bold </v-icon>Acessar plataforma agora!
        </v-btn>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Identificar habilidades que precisam ser desenvolvidas',
          text:
            'Possíbilita de forma muito eficaz enxergar as possíveis habilidades dos colaboradores que precisam ser desenvolvidas para melhorarem sua performance em suas atividades. Com isso, ela pode ser aliada a uma gestão de conhecimento da organização para esse desenvolvimento de competências e habilidades.',
          callout: '01',
        },
        {
          title: 'Padronização das avaliações',
          text:
            'A objetividade do processo possibilita uma maior percepção do cumprimento dos objetivos traçados e se as metas colocadas foram viáveis.',
          callout: '02',
        },
        {
          title: 'Dar mais foco aos resultados',
          text:
            'Os colaboradores têm mais foco nos resultados que lhe são expostos de forma clara e objetiva. ',
          callout: '03',
        },
      ],
    }
  },
}
</script>
