<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="red accent-2"
            small                 
            fab
            right 
            bottom
            v-bind="attrs"
            v-on="on"
            @click="card = true"
            >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Criar Grupo</span>
        </v-card-title>
        <v-card-text>
          
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome Grupo*"
                  v-model="teamName"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
              <v-select
                  v-model="selectProjeto"
                  :items="projetos"
                  label="Projetos"
                  item-text="description"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
              <v-select
                  v-model="selectUsuario"
                  :items="estudantes"
                  label="Alunos"
                  item-text="name"
                  persistent-hint
                  return-object
                  single-line
                  multiple
                  v-on:change="checkScrumMaster"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-switch
                  v-model="isScrum"
                  v-if="scrumButton"
                  inset
                  :label="'É Scrum Master'"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
          <small>* Campos obrigatorios</small>
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
            @click="dialog = false, createTeam()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import api from '../services/api'
  export default {
    props: {
         projetos: Array,
         estudantes: Array
    },
    data: () => ({
      dialog: false,
      selectProjeto: "",
      selectUsuario: [],
      idProjeto: "",
      teamName: "",
      snActivated: "s",
      teamResponse: "",
      isScrum: false,
      scrumButton: true
    }),
     methods: {
        checkScrumMaster: function() {
          if(this.selectUsuario.length > 1) {
            this.scrumButton = false
          } else {
            this.scrumButton = true
          }
        },
        createTeam: function() {
            let payload = { 
                idProject: this.selectProjeto.idProject, 
                teamName: this.teamName, 
                snActivated: this.snActivated 
            };
            api.post("team", payload).then(response => {
              if(response.status === 201) {
                this.teamResponse = response.data
                if(this.selectUsuario.length != 0) {
                  this.addAlunos(this.teamResponse)
                }
                alert("Time Cadastrado Com sucesso")
                window.location.reload(true);
              } else {
                alert("Ocorreu um erro ao realizar o cadastro do Time")
              }
          })
        },
        addAlunos: function(teamResponse) {
          for(let i = 0; i < this.selectUsuario.length; i++) {
              let UserTeamPayload = {
                "idUser": this.selectUsuario[i].idUser,
                "idTeam": teamResponse.idTeam,
                "isScrumMaster": this.isScrum,
                "snActivated": "S"
              }
              api.post("user-team", UserTeamPayload)
          }
        }
    }
  }
</script>