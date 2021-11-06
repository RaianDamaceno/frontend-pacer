<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > 
    
      <div class="d-flex align-center">
        <v-toolbar-title @click="goHome" class="title">Pacer</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
       <v-tab >
       <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Sprint
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title> <sprintRegistration /></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title> <sprintTable /></v-list-item-title>
            </v-list-item>
          </v-list>
      </v-menu>
    </v-tab>

    <v-tab >
       <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Criterios
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><AdicionaCriteriosAva /></v-list-item-title>
            </v-list-item>
            <v-list-item>
            <v-list-item-title><CriteriaRegistration /></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-tab>

    <v-tab >
       <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Projeto
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title><CreateProject /></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><projectTable /></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tab>

     <v-tab >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Pendências
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><PendingToScore /></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>

      <v-tab>
        <UsersAprovation />
      </v-tab>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import CriteriaRegistration from './components/criteria-registration.vue'
import AdicionaCriteriosAva from './components/AdicionaCriteriosAva.vue'
import PendingToScore from './components/PendingToScore.vue'
import UsersAprovation      from './components/UsersAprovation.vue'
import SprintRegistration from './components/SprintRegistration.vue'
import CreateProject from './components/CreateProject.vue'
import projectTable from './components/projectTable.vue'
import sprintTable from './components/SprintTable.vue';
export default Vue.extend({
  name: 'App',
  components: {
      AdicionaCriteriosAva,
      CriteriaRegistration,
      PendingToScore,
      UsersAprovation,
      SprintRegistration,
      CreateProject,
      projectTable,
      sprintTable
  },
  data: () => ({
    //
  }),
  methods: {
    goHome() {
      this.$router.push({ path: 'dashboard' })
    }
  }
});
</script>

<style>
  .title {
    cursor: pointer; 
  }
</style>
