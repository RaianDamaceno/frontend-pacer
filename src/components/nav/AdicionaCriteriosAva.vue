<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            width="100%"
            class="light-blue darken-3"
            elevation="0"
            x-large
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
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    :items='this.projects'
                    label="Grupos* "
                    required
                    id="project"
                    item-text="description"
                    item-value="idProject"
                    v-model="formProject"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete
                    :items='this.criterias'
                    label="Critérios*"
                    required
                    id="criteria"
                    item-text="descCriteria"
                    item-value="idCriteria"
                    v-model="formCriteria"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nota Minima*"
                    type="number"
                    required
                    id="notaMinima"
                    v-model="formNotaMinima"
                  ></v-text-field>
                  <v-text-field
                    label="Nota Maxima*"
                    type="number"
                    required
                    id="notaMaxima"
                    v-model="formNotaMaxima"
                  ></v-text-field>
                  <v-text-field
                    label="Peso do Criterio*"
                    type="number"
                    required
                    id="PesoCriterio"
                    v-model="formPesoNota"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
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
            @click="submitForm"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

  import api from '../../services/api'
  export default {
    data: () => ({
      dialog: false,
      projects: [],
      criterias: [],
      formProject: '',
      formCriteria: '',
      formNotaMinima: '',
      formNotaMaxima: '',
      formPesoNota: '',
    }),
    methods: {
        async getProjects() {
            await api.get('project').then((response) => {
              this.projects = response.data;
              console.log(response.data);
            }, (error) => {
              console.log(error);
            }); 
        },
        async getCriterias() {
            await api.get('criteria').then((response) => {
              this.criterias = response.data;
              console.log(response.data);
            }, (error) => {
              console.log(error);
            });
        },
        async submitForm(){
          this.dialog=false
          const associateCriteria = {
            'idProject': this.formProject,
            'idCriteria': this.formCriteria,
            'minGrade': parseInt(this.formNotaMinima, 10),
            'maxGrade': parseInt(this.formNotaMaxima, 10),
            'gradeWeight':parseInt(this.formPesoNota, 10),
            'snActivated': "s"
          }
           await api.post('criteria-project', associateCriteria).then((response) => {
              this.$store.dispatch("messageSuccess", "Cadastro feito com sucesso");
            }, (error) => {
              this.$store.dispatch("messageError", "Erro no cadastro");
            });
            this.$refs.form.reset();
        }
    },
    beforeMount() {
        this.getProjects();
        this.getCriterias();
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