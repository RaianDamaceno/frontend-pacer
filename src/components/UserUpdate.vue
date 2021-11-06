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
                  <v-subheader>Lista de Projetos Cadastrados</v-subheader>
                 <!--- <v-data-table editable="true" :headers="headers" :items="user">

                    <template v-slot:item.password="password">
                      <v-edit-dialog
                        :return-value.sync="password.item.password"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ password.item.password }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="password.item.password"
                            :rules="[max25chars]"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog> 
                    </template>

                    <template v-slot:item.email="email">
                      <v-edit-dialog
                        :return-value.sync="email.item.email"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ email.item.email }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="email.item.email"
                            :rules="[max25chars]"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog> 
                    </template>


                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        @click="deleteItem(item)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>--->

                   <v-container>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12">
                          <v-text-field
                            :value="this.user.name"
                            @change="console.log(this.user.name)"
                            label="Nome"
                            outlined
                            readonly
                          ></v-text-field>
                          <v-text-field
                            v-model="this.user.document"
                            label="Documentos"
                            outlined
                            readonly
                          ></v-text-field>
                          <v-text-field
                            v-model="this.user.login"
                            label="Usuário"
                            readonly
                            outlined
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
  import axios from 'axios'
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
        user: {
          document: '',
          email: '',
          idUser: '',
          login: '',
          name: '',
          password: '',
          role: '',
          snAtivo: '',
          status: '',
        },
      }
    },

    methods: {
        async submitForm(){
          console.log(this.user);
          const updatePassword = {
            'password': this.password,
          }
          console.log(updatePassword);
          

           await axios.patch(`http://localhost:3000/user/${this.user.idUser}`, updatePassword).then((response) => {
              console.log(response.data);
              alert("Cadastro feito com sucesso");
            }, (error) => {
              console.log(error);
              alert("Erro no cadastro");
            });

        },
       
    },

    beforeMount() {
      api.get(`user/${this.userID}`).then(response => {
        this.user = response.data[0]
      })
    }
  }

</script>
