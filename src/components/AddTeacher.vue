<template>
  <div>
    <v-row style="padding-top: 16%; padding-left: 90%;">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="500px"
      >
          
        <template v-slot:activator="{ on, attrs }">
          
          <div class="text-xs-center">
            <v-btn fab dark small            
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>
              mdi-cog-outline
            </v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Adicionar Professor Avaliador</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="2"
                >
                </v-col>

                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-select
                    v-model="professorSelecionado"
                    :items="teachers"
                    item-text="name"
                    return-object
                    hint="Selecione o Professor"
                    :menu-props="{ maxHeight: '400' }"
                    label="Professores"                   
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
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
              @click="showTeacherName"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import api from '../services/api';
  export default {
    props: {
      projetoId: String,
    },
    data: () => ({
      dialog: false,
      tch: [],
      e6: [],
      role: '',
      teachers: [], 
      professorSelecionado:[],
      user_proj: [],
      prof_exists: ''
    }),
    methods: {
      async showTeacherName(){
        let payload = {
          "idProject": this.projetoId,
          "idUser": this.professorSelecionado.idUser,
          "optional": true,
          "snActivated": "S"
        } 
        await api.post(`project-user`, payload).then(response => {
          this.$store.dispatch(
            "messageSuccess",
            "Professor adicionado com sucesso!"
          );
          window.location.reload(true);
        }).catch(error => { 
          console.log(error);
          this.$store.dispatch(
            "messageError",
            "Falha ao adicionar Professor"
          );
        });
      }
    },
    beforeMount(){
      api.get('user').then(response => {
          this.teachers = response.data.filter(function(el) {
            return el.role == "TCH";
          });
      }),
      api.get('project-user').then(response => {
          this.user_proj.push(response.data);
      });
    },
  }
</script>
