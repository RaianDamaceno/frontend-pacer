<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Critérios Avaliação
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Cadastro de Critérios de Avaliação</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items='this.projects'
                  label="Grupos* "
                  multiple
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                  <v-autocomplete
                  :items='this.criterias'
                  label="Critérios* "
                  multiple
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nota Minima*"
                  required
                ></v-text-field>
                <v-text-field
                  label="Nota Maxima*"
                  required
                ></v-text-field>
                <v-text-field
                  label="Peso do Criterio*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos obrigatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

  import axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      projects: [],
      criterias: []
    }),

    methods: {
        async getProjects() {
            await axios.get('http://localhost:3000/project').then((response) => {
              this.projects = response.data.map(obj => {return obj['description'];});
              console.log(response.data);
            }, (error) => {
              console.log(error);
            });
            console.log (this.projects)
        },
        async getcriterias() {
            await axios.get('http://localhost:3000/project').then((response) => {
              this.criterias = response.data.map(obj => {return obj['description'];});
              console.log(response.data);
            }, (error) => {
              console.log(error);
            });
            console.log (this.criterias)
        }
    },
    beforeMount() {
        this.getProjects();
    }
  }
</script>

<style scoped lang="scss">

    .card {
       width: 100%;
       height: 100%;
    }
    .container{
        width: 100%;
       height: 100%;
    }
</style>
