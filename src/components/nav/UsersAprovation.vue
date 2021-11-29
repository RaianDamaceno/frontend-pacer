<template>
    <v-row
      justify="center"
    >
        <v-btn
            width="100%"
            class="light-blue darken-2"
            elevation="0"
            x-large
            center
            @click="dialog = true"
            >
            <v-icon>>mdi-view-dashboard</v-icon>
            Aprovacao de usuarios
        </v-btn>
      <v-menu
        bottom
        offset-y
      >
        ProjectCriteriaAdd
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
               
               <template v-slot:[`item.status`]="{ item }">
                <v-switch
                  v-model="item.status"
                ></v-switch>
              </template>
              
              </v-data-table>
            </v-list>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
  import api from '../../services/api'

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
          { text: "Aprovar", value: 'status'},
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
          await api.post('user/approve', updateArray)
            .then((response) => {
              this.$store.dispatch("messageSuccess", "Cadastro feito com sucesso");
              window.location.reload(true);
            }, (error) => {
              this.$store.dispatch("messageError", "Erro no cadastro");
            });
            this.$refs.form.reset();
          }
    },

    beforeMount() {
      api.get('user').then(response => {

        this.teste = response.data
        this.teste = this.teste.filter(item => item.status.toUpperCase() === 'PENDING');
        for(let i = 0; i < this.teste.length; i++) {
            if (this.teste[i].status !== 'ENABLED' ) {
              this.teste[i].status = false
            }
        }
      })
    }
  }
</script>
