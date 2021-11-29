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
          Cadastro de Sprint
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Cadastro de Sprint</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
                <v-row>
                    <v-col
                    cols="12"
                    sm="6"
                    >
                    <v-select
                      v-model="selectProject"
                      :items="projetos"
                      label="Projetos"
                      item-text="description"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                    <v-date-picker
                        v-model="formDates"
                        locale="pt-br"
                        range
                    >
                    </v-date-picker>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    >
                      <v-text-field
                          v-model="dateRangeText"
                          label="Date range"
                          prepend-icon="mdi-calendar"
                          readonly
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
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  import api from '../../services/api'
  export default {
    data: () => ({
      dialog: false,
      formDates: [date],
      initialDate: '',
      finalDate: '',
      initialDateNew: '',
      finalDateNew: '',
      selectProject:''
      
    }),
    beforeMount() {
      api.get('project').then(response => {
        this.projetos = response.data
      });
    },
    computed: {
      dateRangeText () {
        return this.formDates.join(' ~ ')
      },
    },
    methods: {
        async submitForm(){
          this.dialog=false
          this.initialDateNew = this.formDates[0].replaceAll("-","/");
          this.finalDateNew = this.formDates[1].replaceAll("-","/");
          console.log(this.initialDateNew);
          const CreateSprint = {
            'initialDate':  this.initialDateNew.split("/").reverse().join("/"),
            'finalDate':    this.finalDateNew.split("/").reverse().join("/"),
            'idProject':    this.selectProject.idProject
          }
           api.post('sprint', CreateSprint).then(() => {
              this.$store.dispatch("messageSuccess", "Cadastro de sprint realizado com sucesso");
            }, (error) => {
              console.log(error);
              this.$store.dispatch("messageError", error.response.data.message);
            });
            this.$refs.form.reset();
        },
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