<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="800px"
    >
     
      <template v-slot:activator="{ on, attrs }">
          <v-avatar color="indigo"
          v-bind="attrs"
          v-on="on">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
      </template>
      

        <v-card>
            <v-card-title>
            <span class="text-h5">Projetos Cadastrados</span>
            </v-card-title>
            <v-card-text>
                <v-list
                three-line
                subheader
                >
                   <v-container>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12">
                          <v-text-field
                            :value="this.user.name"
                            label="Nome"
                            readonly
                            disabled
                          ></v-text-field>
                          <v-text-field
                            :value="this.user.document"
                            label="Documentos"
                            readonly
                            disabled
                          ></v-text-field>
                          <v-text-field
                            :value="this.user.login"
                            label="Usuário"
                            readonly
                            disabled
                          ></v-text-field>
                           <v-text-field
                            label="Alterar senha"
                            type="String"
                            v-model="password"
                            outlined
                          ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                     <small>*Campos obrigatorios</small>
                </v-list>
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

<script lang="ts">
  import api from '../services/api'
  
  export default {
    name: 'UserUpdate',
    props: {
     userID: String,
    },

  data () {
      return {
        dialogEdit:false,
        dialog: false,
        widgets: false,
        password: '',
        user: '',
        usuarioID: '',
      }
    },
    beforeMount() {
      api.get(`user/${this.userID}`).then(response => {
        this.user = response.data[0]
        this.usuarioID = response.data[0].idUser
      })
    },
    methods: {
        submitForm(){
          const updatePassword = {
            'password': this.password,
          }
          api.patch(`user/${this.userID}`, updatePassword).then(response => {
            alert("Atualizacao de dados realizado com sucesso");
          }).catch(error =>{
            alert("Erro ao atualizar cadastro");
          })
        },
    },
  }

</script>
