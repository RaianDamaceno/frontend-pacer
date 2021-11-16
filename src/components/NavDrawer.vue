<template>
  <v-card
    class="light-blue darken-2"
    height="100%"
    width="100%"
  >
    <v-navigation-drawer
      class="light-blue darken-2"
      dark
      width="100%"
      permanent
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="goLogin">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  import UserUpdate from '../components/UserUpdate.vue'

  export default {
    components: { 
        // UserUpdate
    },
    data () {
      return {
       "items":[
                    {
                        "title":"Home",
                        "icon":"mdi-view-dashboard",
                        "component": "dashboard"
                    },
                    {
                        "title":"Minha Conta",
                        "icon":"mdi-account-multiple",
                        "component":""
                    },
                    {
                        "title":"Projetos",
                        "icon":"mdi-domain",
                        "component": "dashboard"
                    },
                    {
                        "title":"Grupos",
                        "icon":"mdi-account-supervisor-circle",
                        "component": "dashboard"
                    },
                    {
                        "title":"Criterios",
                        "icon":"mdi-thumb-up",
                        "component": "dashboard"
                    },
                    {
                        "title":"Sprint",
                        "icon":"mdi-clock-start",
                        "component": "dashboard"
                    },
                    {
                        "title":"Pendencias de avaliação",
                        "icon":"mdi-gavel"
                    }
                ],
      }
    },
    methods: {
        goLogin() {
            this.$router.push({ path: 'login' })
        },
        goDashboard() {
            this.$router.push({ path: 'dashboard' })
        },
  },
  }
</script>