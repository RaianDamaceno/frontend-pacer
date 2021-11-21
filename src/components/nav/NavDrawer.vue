<template>
    <v-card 
      class="light-blue darken-2" 
      height="100%" 
      width="100%">
        <v-navigation-drawer 
          class="light-blue darken-2" 
          dark 
          width="100%" 
          permanent>
            <v-list flat>
                <v-list-item-group>
                    <v-btn v-bind="attrs" 
                     @click="goDashboard"
                      v-on="on" 
                      width="100%" 
                      class="light-blue darken-2" 
                      elevation="0" 
                      x-large>
                        Dashboard
                    </v-btn>
                </v-list-item-group>

                <v-list-item-group>
                    <v-list-item>
                        <user-update :userID="this.userLogged"/>
                    </v-list-item>
                </v-list-item-group>

                <v-list-group>
                    <template v-slot:activator>
                        <v-btn 
                          v-bind="attrs" 
                          v-on="on" 
                          width="100%" 
                          class="light-blue darken-2" 
                          elevation="0" 
                          x-large 
                          >
                            <v-icon> mdi-chevron-right </v-icon>
                            Sprint
                        </v-btn>
                    </template>
                    <v-list-item-group :value="true" no-action sub-group>
                        <v-list-item>
                            <sprint />
                        </v-list-item>
                    </v-list-item-group>
                    <v-list-item-group :value="true" no-action sub-group>
                        <v-list-item>
                            <sprint-table />
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>

                <v-list-item-group>
                <v-list-group>
                    <template v-slot:activator>
                        <v-btn 
                          v-bind="attrs" 
                          v-on="on" 
                          width="100%" 
                          class="light-blue darken-2" 
                          elevation="0" 
                          x-large 
                          >
                            <v-icon> mdi-chevron-right </v-icon>
                            Criterios
                        </v-btn>
                    </template>
                    <v-list-item-group :value="true" no-action sub-group>
                        <v-list-item>
                            <criteria-registration />
                        </v-list-item>
                    </v-list-item-group>
                    <v-list-item-group :value="true" no-action sub-group>
                        <v-list-item>
                            <criterios-ava />
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
                </v-list-item-group>
                <!-- ------------------------ -->

                <v-list-group>
                    <template v-slot:activator>
                        <v-btn 
                          v-bind="attrs" 
                          v-on="on" 
                          width="100%" 
                          class="light-blue darken-2" 
                          elevation="0" 
                          x-large 
                          >
                            <v-icon> mdi-chevron-right </v-icon>
                            Projetos
                        </v-btn>
                    </template>
                    <v-list-item-group :value="true" no-action sub-group>
                        <v-list-item>
                            <create-project />
                        </v-list-item>
                    </v-list-item-group>
                    <v-list-item-group :value="true" no-action sub-group>
                        <v-list-item>
                            <project-table />
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>

                 <v-list-item-group>
                    <v-list-item>
                        <pending-to-score />
                    </v-list-item>
                </v-list-item-group>

                  <v-list-item-group>
                    <v-list-item>
                        <user-aprovation />
                    </v-list-item>
                </v-list-item-group>
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
  import projectTable from './projectTable.vue'
  import CreateProject from './CreateProject.vue'
  import PendingToScore from './PendingToScore.vue'
  import SprintTable from './SprintTable.vue'
  import UserAprovation from './UsersAprovation.vue'
  import CriteriosAva from './AdicionaCriteriosAva.vue'
  export default {
    props: {
         userLogged: String,
    },
    components: { 
      UserUpdate,
      Sprint,
      CriteriaRegistration,
      projectTable,
      CreateProject,
      PendingToScore,
      SprintTable,
      UserAprovation,
      CriteriosAva
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