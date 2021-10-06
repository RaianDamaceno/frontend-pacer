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
                :items="desserts"
                :items-per-page="8"
                class="elevation-1"
              ></v-data-table>
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
  export default {
    data () {
      return {
        dialog: false,
        widgets: false,
        role: 'P',
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'email', value: 'calories' },
          { text: 'Documento', value: 'fat' },
          { text: 'RA', value: 'carbs' },
          { text: 'Role', value: 'protein' },
          { text: 'Status', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
  }
</script>
