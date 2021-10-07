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
                @click="dialog = false"
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
              <v-data-table
                :headers="headers"
                :items="teste"
                :items-per-page="10"
                class="elevation-1"
              />
              <v-list-item></v-list-item>
            </v-list>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
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
            text: 'Nome',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Login', value: 'login' },
          { text: 'Nome', value: 'name' },
          { text: 'CPF', value: 'document' },
          { text: 'Email', value: 'email' },
          { text: "Ativo", value: 'snAtivo'}
        ],
      }
    },
    beforeMount() {
      api.get('user').then(response => {
        for(let i = 0; i < response.data.length; i++) {
            this.teste = response.data
            if(this.teste[i].snAtivo == 'S') {
              this.teste.splice(i, 1)
            } 
            if (this.teste[i].snAtivo== 'N') {
              this.teste[i].snAtivo = false
            }
        }
        console.log(this.teste)
      })
    }
  }
</script>
