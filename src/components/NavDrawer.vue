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
        <v-list flat>
          <v-list-item-group
            v-model="dashboard"
            >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        <v-list-item>
          <user-update />
        </v-list-item>
        <v-list-item>
          <sprint/>
        </v-list-item>
        <v-list-item>
          <criteria-registration/>
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
  import UserUpdate from './UserUpdate.vue'
  import Sprint from './SprintRegistration.vue'
  import CriteriaRegistration from './CriteriaRegistration.vue'

  export default {
    components: { 
      UserUpdate,
      Sprint,
      CriteriaRegistration
    },
    data: () => ({
      dashboard: true,
    }),
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