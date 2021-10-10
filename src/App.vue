<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > 
    
      <div class="d-flex align-center">
        <v-toolbar-title>Pacer</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
        <v-tab >
          <AdicionaCriteriosAva />
        </v-tab>
        <v-tab >
          <CriteriaRegistration />
        </v-tab>
        <v-tab>
          <UsersAprovation />
        </v-tab>
        <v-tab >
          <sprintRegistration />
        </v-tab>
        <v-tab >
          <CreateProject />
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
import UsersAprovation      from './components/UsersAprovation.vue'
import SprintRegistration from './components/SprintRegistration.vue'
import CreateProject from './components/CreateProject.vue';

export default Vue.extend({
  name: 'App',
  components: {
      AdicionaCriteriosAva,
      CriteriaRegistration,
      UsersAprovation,
      SprintRegistration,
      CreateProject
  },
  data: () => ({
    //
  }),
});
</script>
