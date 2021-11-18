<template>
  <section id="intro" class="py-16">
    <v-container>
      <v-responsive class="max-auto mx-auto text-center" max-width="600">
        <v-avatar color="primary" size="70" class="mb-8">
          <v-icon x-large dark>mdi-web</v-icon>
        </v-avatar>
        <h2 class="text-h4 text-md-h3 text-center font-weight-black mb-7">
          PACER
        </h2>
        <p class="title font-weight-light">
          Este projeto foi desenvolvido no 6° Semestre do curso de Banco de Dados da FATEC
          de São José dos Campos, nas matérias de Topicos Avancados em Banco de Dados e Gestao
          de Processos de Desenvolvimento de Software.
        </p>
        <p class="title font-weight-light">
          O objetivo principal deste projeto é possibilitar a avaliação entre
          os integrantes de cada equipe cadastrada no sistema. Além disso possibilitar
          que os professores possam avaliar os alunos de cada equipe também.
        </p>
      </v-responsive>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
}
</script>
<style scoped>
.py-16{
  background-color: #f5f5f5;
}
</style>