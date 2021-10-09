<template>
  <div v-if="role === 'P'">
    <v-row
      justify="center"
    >
      <v-btn
        color="primary"
        class="ma-2"
        dark
        @click="dialog = true"
      >
        Usuários para aprovação
      </v-btn>
      <v-menu
        bottom
        offset-y
      >
        AdicionaCriteriosAva
      </v-menu>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
            
            <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Usuários para Aprovação</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="submitForm"
              >
                Salvar
              </v-btn>
            </v-toolbar-items>
            <v-menu
              bottom
              right
              offset-y
            >
            </v-menu>
          </v-toolbar>
          <v-card-text>
            <v-list
              three-line
              subheader
            >
              <v-subheader>Lista de Usuários para aprovação</v-subheader>
              <v-data-table :headers="headers" :items="teste" :items-per-page="10" class="elevation-1">
               
               <template v-slot:item.status="{ item }">
                <v-switch
                  v-model="item.status"
                  :label="`Switch 1: ${item.status}`"
                ></v-switch>
              </template>
              
              </v-data-table>
            </v-list>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from '../services/api'

  export default {
    data () {
      return {
        dialog: false,
        widgets: false,
        role: 'P',
        teste: null,
        headers: [
          {
            align: 'start',
            sortable: false,
          },
          { text: 'Nome', value: 'name' },
          { text: 'Login', value: 'login' },
          { text: 'CPF', value: 'document' },
          { text: 'Email', value: 'email' },
          { text: "Ativo", value: 'status'},
        ],
      }
    },

    methods: {
        async submitForm(){
          var updateArray = [];
          this.teste.forEach(async item => {
            const updateUser = {
              'id': item.idUser,
              'approved': item.status
            }
            
            updateArray.push(updateUser);
            console.log(updateUser);  
          })
          await axios.post('http://localhost:3000/user/approve', updateArray).then((response) => {
                console.log(response.data);
                alert("Cadastro feito com sucesso");
              }, (error) => {
                console.log(error);
                alert("Erro no cadastro");
              });
              this.$refs.form.reset();
          }
    },

    beforeMount() {
      api.get('user').then(response => {
        for(let i = 0; i < response.data.length; i++) {
            this.teste = response.data
            if(this.teste[i].status.toUpperCase() === 'ENABLED') {
              this.teste.splice(i, 1)
            } 
            if (this.teste[i].status !== 'ENABLED') {
              this.teste[i].status = false
            }
        }
        console.log(this.teste)
      })
    }
  }
</script>
